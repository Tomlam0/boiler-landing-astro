import { defineMiddleware } from 'astro:middleware';
import { perspectiveCookieName } from '@sanity/preview-url-secret/constants';

// `Vary: Cookie` prevents the public cached HTML from being served to draft
// visitors (their perspective cookie would otherwise be ignored by the CDN).

const PUBLIC_CACHE = 'public, s-maxage=60, stale-while-revalidate=300';
const NO_CACHE = 'private, no-store';

export const onRequest = defineMiddleware(async (context, next) => {
  const response = await next();

  const isDraft = context.cookies.has(perspectiveCookieName);
  const isApi = context.url.pathname.startsWith('/api/');
  const cacheable = !isDraft && !isApi && context.request.method === 'GET' && response.status === 200;

  response.headers.set('Cache-Control', cacheable ? PUBLIC_CACHE : NO_CACHE);
  if (cacheable) response.headers.set('Vary', 'Cookie');

  return response;
});
