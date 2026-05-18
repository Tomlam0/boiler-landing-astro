import { createClient } from '@sanity/client';

import { SETTINGS_QUERY } from '../schemas/documents/settings/settings.queries';

export interface SocialLinks {
  twitter: string | null;
  linkedin: string | null;
  github: string | null;
  instagram: string | null;
  facebook: string | null;
  youtube: string | null;
}

export interface SiteSettings {
  copyright: string | null;
  faviconUrl: string | null;
  ogImageUrl: string | null;
  social: SocialLinks;
}

const DEFAULTS: SiteSettings = {
  copyright: null,
  faviconUrl: null,
  ogImageUrl: null,
  social: {
    twitter: null,
    linkedin: null,
    github: null,
    instagram: null,
    facebook: null,
    youtube: null,
  },
};

interface RawSettings {
  copyright?: string | null;
  faviconUrl?: string | null;
  ogImageUrl?: string | null;
  socialTwitter?: string | null;
  socialLinkedin?: string | null;
  socialGithub?: string | null;
  socialInstagram?: string | null;
  socialFacebook?: string | null;
  socialYoutube?: string | null;
}

export async function getSettings(): Promise<SiteSettings> {
  const projectId = import.meta.env.SANITY_PROJECT_ID;
  if (!projectId) return DEFAULTS;

  const client = createClient({
    projectId,
    dataset: import.meta.env.SANITY_DATASET || 'production',
    apiVersion: import.meta.env.SANITY_API_VERSION || '2026-01-01',
    useCdn: !import.meta.env.DEV,
  });

  try {
    const raw = await client.fetch<RawSettings | null>(SETTINGS_QUERY);
    return {
      copyright: raw?.copyright ?? null,
      faviconUrl: raw?.faviconUrl ?? null,
      ogImageUrl: raw?.ogImageUrl ?? null,
      social: {
        twitter: raw?.socialTwitter ?? null,
        linkedin: raw?.socialLinkedin ?? null,
        github: raw?.socialGithub ?? null,
        instagram: raw?.socialInstagram ?? null,
        facebook: raw?.socialFacebook ?? null,
        youtube: raw?.socialYoutube ?? null,
      },
    };
  } catch (error) {
    console.warn(
      '[sanity] getSettings failed, falling back to defaults:',
      (error as Error).message
    );
    return DEFAULTS;
  }
}
