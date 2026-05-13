import type { QueryParams } from 'sanity';
import { sanityClient } from 'sanity:client';

const visualEditingEnabled = import.meta.env.PUBLIC_SANITY_VISUAL_EDITING_ENABLED === 'true';
const token = import.meta.env.SANITY_API_READ_TOKEN;

export async function loadQuery<QueryResponse>({
  query,
  params,
}: {
  query: string;
  params?: QueryParams;
}) {
  if (visualEditingEnabled && !token) {
    throw new Error(
      'The `SANITY_API_READ_TOKEN` environment variable is required during Visual Editing.'
    );
  }

  const perspective = visualEditingEnabled ? 'drafts' : 'published';

  try {
    const { result, resultSourceMap } = await sanityClient.fetch<QueryResponse>(
      query,
      params ?? {},
      {
        filterResponse: false,
        perspective,
        resultSourceMap: visualEditingEnabled ? 'withKeyArraySelector' : false,
        stega: visualEditingEnabled,
        ...(visualEditingEnabled ? { token } : {}),
        useCdn: !visualEditingEnabled && !import.meta.env.DEV,
      }
    );

    return {
      data: result,
      sourceMap: resultSourceMap,
      perspective,
    };
  } catch (error) {
    // Fall back to null when Sanity is unreachable (missing project id, invalid dataset, etc.)
    // so pages still render their hard-coded fallbacks instead of failing the build.
    console.warn('[sanity] loadQuery failed, falling back to null:', (error as Error).message);
    return {
      data: null as QueryResponse,
      sourceMap: undefined,
      perspective,
    };
  }
}
