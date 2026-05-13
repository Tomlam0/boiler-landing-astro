import { createClient } from '@sanity/client';

import { apiVersion, dataset, projectId } from '../env';

// Server-only Sanity client with read token for fetching drafts or private data.
// Astro routes import this only from frontmatter scripts that run on the server
// (Cloudflare Worker) or at build time — never from React islands.
export const backendClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  token: import.meta.env.SANITY_API_READ_TOKEN,
});
