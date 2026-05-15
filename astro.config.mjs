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
const sanityDataset = process.env.SANITY_DATASET;
const studioUrl = process.env.SANITY_STUDIO_URL || 'http://localhost:3333';

export default defineConfig({
  site: process.env.SITE_URL || 'http://localhost:4321',

  // `'server'` is required for the cookie-based draft mode to work — static
  // pages can't read per-request cookies. Public reads still hit Sanity's CDN.
  output: 'server',
  adapter: cloudflare({
    imageService: 'compile',
  }),

  integrations: [
    sanity({
      projectId: sanityProjectId,
      dataset: sanityDataset,
      useCdn: false,
      // stega encodes invisible field references into Sanity strings so the
      // Visual Editing overlays can click-through to the matching field in
      // the Studio. Disabled by loadQuery for public visitors.
      stega: { studioUrl },
    }),
    react(),
    sitemap(),
  ],

  vite: {
    // Expose Sanity config to client-side code (Studio runs in the browser).
    define: {
      'import.meta.env.SANITY_PROJECT_ID': JSON.stringify(sanityProjectId),
      'import.meta.env.SANITY_DATASET': JSON.stringify(sanityDataset),
    },
    plugins: [tailwindcss()],
    resolve: {
      // Force single instance of React across all packages
      dedupe: ['react', 'react-dom'],
    },
    // Pre-bundle modules `@sanity/visual-editing` reaches for at runtime; this
    // mirrors the official Sanity Astro Visual Editing guide and silences the
    // "Failed to resolve dependency" warnings at build time.
    optimizeDeps: {
      include: [
        'react/compiler-runtime',
        'lodash/isObject.js',
        'lodash/groupBy.js',
        'lodash/keyBy.js',
        'lodash/partition.js',
        'lodash/sortedIndex.js',
      ],
    },
  },

  server: {
    headers: {
      'X-Content-Type-Options': 'nosniff',
      'Referrer-Policy': 'strict-origin-when-cross-origin',
      'Permissions-Policy': 'camera=(), microphone=(), geolocation=(), display-capture=(), usb=()',
    },
  },
});
