/// <reference types="astro/client" />
/// <reference types="@sanity/astro/module" />

interface ImportMetaEnv {
  readonly SANITY_API_READ_TOKEN?: string;
  // Staging-only — webhook → GitHub repository_dispatch → prod rebuild
  readonly SANITY_REVALIDATE_SECRET?: string;
  readonly REPO_DISPATCH_TOKEN?: string;
  readonly GITHUB_REPO?: string;
}

// Cloudflare Worker runtime bindings. Secrets pushed via `wrangler secret put`
// are read at runtime through `cloudflare:workers` (NOT `import.meta.env.*`,
// which is replaced at build time and resolves to `undefined` for secrets
// that aren't injected into the build environment).
declare module 'cloudflare:workers' {
  export const env: {
    SANITY_API_READ_TOKEN?: string;
    SANITY_REVALIDATE_SECRET?: string;
    REPO_DISPATCH_TOKEN?: string;
    GITHUB_REPO?: string;
  };
}
