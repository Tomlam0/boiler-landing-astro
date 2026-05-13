import type { ClientPerspective, QueryParams } from '@sanity/client';
import { sanityClient } from 'sanity:client';

const token = import.meta.env.SANITY_API_READ_TOKEN;

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
        useCdn: !draftMode && !import.meta.env.DEV,
      }
    );

    return { data: result, sourceMap: resultSourceMap, perspective };
  } catch (error) {
    // Soft-fail so pages render with hard-coded fallbacks instead of crashing.
    console.warn('[sanity] loadQuery failed, falling back to null:', (error as Error).message);
    return { data: null as QueryResponse, sourceMap: undefined, perspective };
  }
}
