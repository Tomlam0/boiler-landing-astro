import type { APIRoute } from 'astro';

import { env } from '@/shared/lib/env';

export const GET: APIRoute = () => {
  const siteUrl = env.SITE_URL;

  const robotsTxt = `
User-agent: *
Allow: /
Disallow: /private/
Disallow: /api/

User-agent: GPTBot
User-agent: ChatGPT-User
User-agent: Google-Extended
User-agent: Claude-Web
User-agent: PerplexityBot
User-agent: Amazonbot
User-agent: anthropic-ai
User-agent: Bytespider
User-agent: CCBot
User-agent: cohere-ai
Disallow: /
Allow: /llms.txt

Sitemap: ${siteUrl}sitemap-index.xml
Host: ${siteUrl}
`.trim();

  return new Response(robotsTxt, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
};
