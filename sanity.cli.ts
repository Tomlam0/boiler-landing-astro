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

// Build-time env injected into the Studio bundle so `sanity.config.ts` can
// read it via `import.meta.env.*` (Vite replaces statically). SITE_URL is
// required only when the build will mount the Presentation tool — that is,
// for the staging cloud build and local dev. The production Studio is
// publish-only (no Presentation), so SITE_URL is not needed there.
const STUDIO_BUILD_ENV: Record<string, string | undefined> = {
  SANITY_PROJECT_ID: pick('SANITY_PROJECT_ID'),
  STUDIO_TARGET: target,
  SITE_URL: target === 'production' ? undefined : pick('SITE_URL'),
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
