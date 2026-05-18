import { defineMiddleware } from 'astro:middleware';
import { perspectiveCookieName } from '@sanity/preview-url-secret/constants';

// Short edge TTL + stale-while-revalidate: published content shows up within
// ~10s, and visitors never see latency thanks to SWR (CF serves stale while
// refetching in the background). `Vary: Cookie` keeps draft visitors out of
// the public cache.

const PUBLIC_CACHE = 'public, s-maxage=10, stale-while-revalidate=60';
const NO_CACHE = 'private, no-store';

export const onRequest = defineMiddleware(async (context, next) => {
  const response = await next();

  const isDraft = context.cookies.has(perspectiveCookieName);
  const isApi = context.url.pathname.startsWith('/api/');
  const cacheable =
    !isDraft && !isApi && context.request.method === 'GET' && response.status === 200;

  response.headers.set('Cache-Control', cacheable ? PUBLIC_CACHE : NO_CACHE);
  if (cacheable) response.headers.set('Vary', 'Cookie');

  return response;
});
