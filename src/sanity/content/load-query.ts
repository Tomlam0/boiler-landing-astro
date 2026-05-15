import type { ClientPerspective, QueryParams } from '@sanity/client';
import { sanityClient } from 'sanity:client';
import { env } from 'cloudflare:workers';

function parsePerspective(raw: string | undefined): ClientPerspective | undefined {
  if (!raw) return undefined;
  const decoded = decodeURIComponent(raw);
  // Release-based perspectives are JSON-encoded arrays; drafts is a plain string.
  if (decoded.startsWith('[')) {
    try {
      return JSON.parse(decoded) as ClientPerspective;
    } catch {
      return undefined;
    }
  }
  return decoded as ClientPerspective;
}

export async function loadQuery<QueryResponse>({
  query,
  params,
  perspectiveCookie = undefined,
}: {
  query: string;
  params?: QueryParams;
  perspectiveCookie?: string | undefined;
}) {
  const draftMode = perspectiveCookie ? true : false;
  // Read the token at call time from Worker runtime bindings (not at module
  // load — `import.meta.env` resolves to undefined at build time for secrets
  // that aren't injected into the Vite build environment).
  const token = draftMode ? env.SANITY_API_READ_TOKEN : undefined;

  if (draftMode && !token) {
    throw new Error(
      'The `SANITY_API_READ_TOKEN` environment variable is required during Visual Editing.'
    );
  }

  const perspective: ClientPerspective = draftMode
    ? (parsePerspective(perspectiveCookie) ?? 'drafts')
    : 'published';

  try {
    const { result, resultSourceMap } = await sanityClient.fetch<QueryResponse>(
      query,
      params ?? {},
      {
        filterResponse: false,
        perspective,
        resultSourceMap: draftMode ? 'withKeyArraySelector' : false,
        stega: draftMode,
        ...(draftMode ? { token } : {}),
        // Always bypass Sanity's CDN: the build runs right after a publish
        // webhook, and the CDN can still be serving up to ~60s of stale data.
        // Different queries have independent cache keys, so a single build
        // could mix old + new content (e.g., blog list page shows old title
        // while article detail shows new title). Querying live guarantees
        // every page is built from the same fresh snapshot.
        useCdn: false,
      }
    );

    return { data: result, sourceMap: resultSourceMap, perspective };
  } catch (error) {
    // Soft-fail so pages render with hard-coded fallbacks instead of crashing.
    console.warn('[sanity] loadQuery failed, falling back to null:', (error as Error).message);
    return { data: null as QueryResponse, sourceMap: undefined, perspective };
  }
}
