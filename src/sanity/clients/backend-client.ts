import { createClient } from '@sanity/client';

import { apiVersion, dataset, projectId } from '../env';

// Server-only — never import from a React island, the token would leak.
export const backendClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  token: import.meta.env.SANITY_API_READ_TOKEN,
});
