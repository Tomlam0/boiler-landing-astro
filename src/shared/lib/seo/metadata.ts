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
  ogImageUrl: string;
}

const DEFAULT_SITE_NAME = 'Projet';

export function resolveMetadata(config: MetadataConfig): SeoMetadata {
  const {
    title,
    description,
    path = '',
    noIndex = false,
    ogImage,
    siteName = DEFAULT_SITE_NAME,
  } = config;

  const url = `${env.SITE_URL}${path}`;
  const ogImageUrl = ogImage || `${env.SITE_URL}images/og-image.webp`;

  return { title, description, path, noIndex, ogImage, siteName, url, ogImageUrl };
}

export const marketingMetadata = {
  home: resolveMetadata({
    title: 'Projet — Site vitrine',
    description:
      "Découvrez Projet, entreprise française spécialisée dans son domaine d'expertise. Services et contact.",
    siteName: 'Projet',
  }),

  terms: resolveMetadata({
    title: 'Mentions légales — Projet',
    description:
      "Consultez la politique de confidentialité, les conditions générales d'utilisation et la politique de cookies de Projet.",
    path: 'mentions-legales',
    siteName: 'Projet',
  }),
} as const;
