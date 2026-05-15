/// <reference types="astro/client" />
/// <reference types="@sanity/astro/module" />

interface ImportMetaEnv {
  readonly SANITY_API_READ_TOKEN?: string;
  // Staging-only — webhook → GitHub repository_dispatch → prod rebuild
  readonly SANITY_REVALIDATE_SECRET?: string;
  readonly REPO_DISPATCH_TOKEN?: string;
  readonly GITHUB_REPO?: string;
}
