// Read directly from import.meta.env — Vite replaces at build time.
// Used by both the Astro app and the Sanity Studio bundle.
export const apiVersion = import.meta.env.SANITY_API_VERSION ?? '2026-01-01';
export const dataset = import.meta.env.SANITY_DATASET ?? 'production';
export const projectId = import.meta.env.SANITY_PROJECT_ID ?? '';
export const studioUrl = import.meta.env.SANITY_STUDIO_URL ?? 'http://localhost:3333';
