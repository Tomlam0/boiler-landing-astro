/// <reference types="astro/client" />
/// <reference types="@sanity/astro/module" />

interface ImportMetaEnv {
  readonly SANITY_API_READ_TOKEN?: string;
  readonly SANITY_REVALIDATE_SECRET?: string;
  readonly CLOUDFLARE_ZONE_ID?: string;
  readonly CLOUDFLARE_PURGE_TOKEN?: string;
}
