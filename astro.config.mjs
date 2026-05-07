// @ts-check

import cloudflare from '@astrojs/cloudflare';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import { existsSync } from 'node:fs';
import { defineConfig } from 'astro/config';

// Load .env files before config evaluation (import.meta.env is not available here)
for (const file of ['.env', '.env.local']) {
  if (existsSync(file)) process.loadEnvFile(file);
}

export default defineConfig({
  site: process.env.SITE_URL || 'http://localhost:4321',

  // Deployed to Cloudflare Workers Static Assets (hybrid).
  // Content pages prerendered as static HTML served from Cloudflare's CDN.
  output: 'server',
  adapter: cloudflare({
    imageService: 'compile',
  }),

  integrations: [react(), sitemap()],

  vite: {
    plugins: [tailwindcss()],
  },

  server: {
    headers: {
      'X-Frame-Options': 'DENY',
      'X-Content-Type-Options': 'nosniff',
      'Referrer-Policy': 'strict-origin-when-cross-origin',
      'Permissions-Policy': 'camera=(), microphone=(), geolocation=(), display-capture=(), usb=()',
    },
  },
});
