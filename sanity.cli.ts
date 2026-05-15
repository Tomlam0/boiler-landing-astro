import { defineCliConfig } from 'sanity/cli';
import { loadEnv } from 'vite';

const fileEnv = loadEnv('production', __dirname, '');

function pick(key: string): string {
  const value = process.env[key] ?? fileEnv[key];
  if (!value) {
    throw new Error(
      `Missing required env var "${key}". Add it to .env.local before running this command.`
    );
  }
  return value;
}

function maybe(key: string): string | undefined {
  return process.env[key] ?? fileEnv[key] ?? undefined;
}

const target = process.env.STUDIO_TARGET;
const isCloudBuild = target === 'staging' || target === 'production';

// Build-time env injected into the Studio bundle so `sanity.config.ts` can
// read it via `import.meta.env.*` (Vite replaces statically). Both cloud
// workspaces (staging + production) point their Presentation iframe at the
// staging SSR URL, so SITE_URL_STAGING is the only cloud URL needed.
const STUDIO_BUILD_ENV: Record<string, string | undefined> = {
  SANITY_PROJECT_ID: pick('SANITY_PROJECT_ID'),
  STUDIO_TARGET: target,
  SITE_URL: isCloudBuild ? undefined : pick('SITE_URL'),
  SITE_URL_STAGING: isCloudBuild ? pick('SITE_URL_STAGING') : maybe('SITE_URL_STAGING'),
};

export default defineCliConfig({
  api: {
    projectId: STUDIO_BUILD_ENV.SANITY_PROJECT_ID!,
    dataset: process.env.SANITY_DATASET || fileEnv.SANITY_DATASET || 'production',
  },
  typegen: {
    path: './src/**/*.{ts,tsx,astro}',
    schema: 'schema.json',
    generates: './src/sanity/sanity.types.ts',
  },
  vite: (prev) => {
    return {
      ...prev,
      // Sanity sets strictPort: true by default — opt out so `sanity dev`
      // auto-increments to the next free port instead of crashing when 3333
      // is already taken by another local studio.
      server: { ...prev.server, strictPort: false },
      define: {
        ...prev.define,
        ...Object.fromEntries(
          Object.entries(STUDIO_BUILD_ENV).flatMap(([key, value]) => [
            [`process.env.${key}`, JSON.stringify(value)],
            [`import.meta.env.${key}`, JSON.stringify(value)],
          ])
        ),
      },
    };
  },
});
