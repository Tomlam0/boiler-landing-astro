import type { APIRoute } from 'astro';
import { isValidSignature, SIGNATURE_HEADER_NAME } from '@sanity/webhook';
import { env } from 'cloudflare:workers';

export const prerender = false;

// Sanity webhook → GitHub repository_dispatch → triggers prod rebuild.
// Lives on the staging Worker (the only env with SSR) so the GitHub token
// stays in Worker secrets — never exposed to Sanity's webhook config.
//
// Worker secrets must be read via `cloudflare:workers` import at runtime —
// `import.meta.env.*` is replaced at build time by Vite and resolves to
// `undefined` for secrets that aren't injected into the build environment.
export const POST: APIRoute = async ({ request }) => {
  const webhookSecret = env.SANITY_REVALIDATE_SECRET;
  const githubToken = env.REPO_DISPATCH_TOKEN;
  const repo = env.GITHUB_REPO;

  if (!webhookSecret || !githubToken || !repo) {
    return new Response('Server misconfigured', { status: 500 });
  }

  const signature = request.headers.get(SIGNATURE_HEADER_NAME);
  const body = await request.text();

  if (!signature || !(await isValidSignature(body, signature, webhookSecret))) {
    return new Response('Invalid signature', { status: 401 });
  }

  const dispatchRes = await fetch(`https://api.github.com/repos/${repo}/dispatches`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${githubToken}`,
      Accept: 'application/vnd.github+json',
      'X-GitHub-Api-Version': '2022-11-28',
      'User-Agent': 'sanity-webhook',
    },
    body: JSON.stringify({
      event_type: 'sanity-content-update',
      client_payload: JSON.parse(body),
    }),
  });

  if (!dispatchRes.ok) {
    const detail = await dispatchRes.text();
    console.error('[rebuild] GitHub dispatch failed:', dispatchRes.status, detail);
    // Surface the GitHub error verbatim so Sanity's webhook log shows the
    // real cause (bad PAT scope, missing repo access, etc.). The endpoint
    // is HMAC-protected, so only Sanity itself can read this response.
    return new Response(`GitHub dispatch failed (${dispatchRes.status}): ${detail}`, {
      status: 502,
    });
  }

  return Response.json({ triggered: true });
};
