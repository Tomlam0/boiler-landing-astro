import type { APIRoute } from 'astro';
import { perspectiveCookieName } from '@sanity/preview-url-secret/constants';

import { backendClient } from '@/sanity/lib/backend-client';

export const prerender = false;

// Server-side proxy for `<SanityLive>`: the read token never leaves the
// Worker, so the browser polls this endpoint instead of subscribing directly.
export const GET: APIRoute = async ({ cookies }) => {
  if (!cookies.has(perspectiveCookieName)) {
    return new Response('Not in draft mode', { status: 401 });
  }

  try {
    const result = await backendClient.fetch<{ _updatedAt: string } | null>(
      '*[!(_id in path("system.**"))] | order(_updatedAt desc)[0]{ _updatedAt }'
    );
    return new Response(JSON.stringify({ latestMutation: result?._updatedAt ?? null }), {
      headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' },
    });
  } catch (err) {
    console.warn('[draft-mode/check] sanity fetch failed:', (err as Error).message);
    return new Response('Sanity unreachable', { status: 502 });
  }
};
