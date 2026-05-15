import type { APIRoute } from 'astro';
import { isValidSignature, SIGNATURE_HEADER_NAME } from '@sanity/webhook';

export const prerender = false;

// Sanity webhook → GitHub repository_dispatch → triggers prod rebuild.
// Lives on the staging Worker (the only env with SSR) so the GitHub token
// stays in Worker secrets — never exposed to Sanity's webhook config.
export const POST: APIRoute = async ({ request }) => {
  const webhookSecret = import.meta.env.SANITY_REVALIDATE_SECRET;
  const githubToken = import.meta.env.REPO_DISPATCH_TOKEN;
  const repo = import.meta.env.GITHUB_REPO;

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
    return new Response('GitHub dispatch failed', { status: 502 });
  }

  return Response.json({ triggered: true });
};
