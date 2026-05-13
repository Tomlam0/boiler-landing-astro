import { client } from '@/sanity/lib/client';
import { SETTINGS_QUERY } from '@/sanity/schemas/documents/settings/settings.queries';
import { env } from '@/shared/lib/env';

export interface MetadataConfig {
  title: string;
  description: string;
  path?: string;
  noIndex?: boolean;
  ogImage?: string;
  siteName?: string;
}

export interface SeoMetadata extends MetadataConfig {
  url: string;
  ogImageUrl: string | null;
  faviconUrl: string | null;
}

const DEFAULT_SITE_NAME = 'Projet';

// Fetch the Sanity `settings` singleton to source the favicon + OG image URLs.
// Soft-fail: a fresh dataset may not have these uploaded yet — the page still
// renders, just without the centralised assets (head.astro falls back to
// `/favicon.ico` and a static OG image under public/).
export async function resolveMetadata(config: MetadataConfig): Promise<SeoMetadata> {
  const {
    title,
    description,
    path = '',
    noIndex = false,
    ogImage,
    siteName = DEFAULT_SITE_NAME,
  } = config;

  const url = `${env.SITE_URL}${path}`;

  const settings = await client.fetch(SETTINGS_QUERY).catch(() => null);

  const ogImageUrl = ogImage ?? settings?.ogImageUrl ?? null;
  const faviconUrl = settings?.faviconUrl ?? null;

  return { title, description, path, noIndex, ogImage, siteName, url, ogImageUrl, faviconUrl };
}
