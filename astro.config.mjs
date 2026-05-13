// @ts-check

import cloudflare from '@astrojs/cloudflare';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import sanity from '@sanity/astro';
import tailwindcss from '@tailwindcss/vite';
import { existsSync } from 'node:fs';
import { defineConfig } from 'astro/config';

// Load .env files before config evaluation (import.meta.env is not available here)
for (const file of ['.env', '.env.local']) {
  if (existsSync(file)) process.loadEnvFile(file);
}

// Real env validation happens at app boot via Zod in src/shared/lib/env.ts.
// Here we tolerate a missing projectId so `astro check` (typecheck) works in CI.
const sanityProjectId = process.env.SANITY_PROJECT_ID || 'placeholder';

export default defineConfig({
  site: process.env.SITE_URL || 'http://localhost:4321',

  // Deployed to Cloudflare Workers Static Assets (hybrid).
  // Content pages prerendered as static HTML served from Cloudflare's CDN.
  // The embedded Sanity Studio (`/studio`) is dynamically rendered via a Worker.
  output: 'server',
  adapter: cloudflare({
    imageService: 'compile',
  }),

  integrations: [
    sanity({
      projectId: sanityProjectId,
      dataset: process.env.SANITY_DATASET || 'production',
      // false for static builds — data is fetched at build time, no CDN cache needed
      useCdn: false,
      studioBasePath: '/studio',
    }),
    react(),
    sitemap(),
  ],

  vite: {
    // Expose Sanity config to client-side code (Studio runs in the browser).
    define: {
      'import.meta.env.SANITY_PROJECT_ID': JSON.stringify(sanityProjectId),
      'import.meta.env.SANITY_DATASET': JSON.stringify(process.env.SANITY_DATASET || 'production'),
    },
    plugins: [tailwindcss()],
    resolve: {
      // Force single instance of React across all packages
      dedupe: ['react', 'react-dom'],
    },
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
