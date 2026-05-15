import type { APIRoute } from 'astro';
import { isValidSignature, SIGNATURE_HEADER_NAME } from '@sanity/webhook';

import { tagsForDoc } from '@/sanity/content/cache-tags';

export const prerender = false;

// Sanity webhook → purge Cloudflare cache entries by tag.
// `caches.default.delete()` only purges the local POP, so we call the REST API
// which purges across the entire CF edge network in a few seconds.
export const POST: APIRoute = async ({ request }) => {
  const secret = import.meta.env.SANITY_REVALIDATE_SECRET;
  const zoneId = import.meta.env.CLOUDFLARE_ZONE_ID;
  const purgeToken = import.meta.env.CLOUDFLARE_PURGE_TOKEN;

  if (!secret || !zoneId || !purgeToken) {
    return new Response('Server misconfigured', { status: 500 });
  }

  const signature = request.headers.get(SIGNATURE_HEADER_NAME);
  const body = await request.text();

  if (!signature || !(await isValidSignature(body, signature, secret))) {
    return new Response('Invalid signature', { status: 401 });
  }

  let payload: { _id?: string; _type?: string };
  try {
    payload = JSON.parse(body);
  } catch {
    return new Response('Malformed body', { status: 400 });
  }

  if (!payload._id || !payload._type) {
    return new Response('Missing _id or _type', { status: 400 });
  }

  const tags = tagsForDoc({ _id: payload._id, _type: payload._type });
  if (tags.length === 0) {
    return Response.json({ purged: [], skipped: payload._type });
  }

  const purgeRes = await fetch(`https://api.cloudflare.com/client/v4/zones/${zoneId}/purge_cache`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${purgeToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ tags }),
  });

  if (!purgeRes.ok) {
    const detail = await purgeRes.text();
    console.error('[revalidate] Cloudflare purge failed:', purgeRes.status, detail);
    return new Response('Cloudflare purge failed', { status: 502 });
  }

  return Response.json({ purged: tags });
};
