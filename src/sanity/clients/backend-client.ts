import { createClient } from '@sanity/client';
import { env } from 'cloudflare:workers';

import { apiVersion, dataset, projectId } from '../env';

// Server-only — never import from a React island, the token would leak.
// Factory: the token must be read at runtime via `cloudflare:workers` (not
// `import.meta.env`, which is build-time only).
export function createBackendClient() {
  return createClient({
    projectId,
    dataset,
    apiVersion,
    useCdn: false,
    token: env.SANITY_API_READ_TOKEN,
  });
}
