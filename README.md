<a id="readme-top"></a>

<div align="center">

# Project

![Astro](https://img.shields.io/badge/Astro-BC52EE?style=for-the-badge&logo=astro&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Shadcn/ui](https://img.shields.io/badge/shadcn/ui-8A2BE2?style=for-the-badge&2F&logo=shadcnui&color=131316)
![Sanity](https://img.shields.io/badge/Sanity-F03E2F?style=for-the-badge&logo=sanity&logoColor=white)
![Cloudflare](https://img.shields.io/badge/Cloudflare-F38020?style=for-the-badge&logo=cloudflare&logoColor=white)

A modern Astro application with React islands, **Sanity Studio CMS** (deployed standalone with Visual Editing + draft preview), Tailwind CSS, and Shadcn/ui. Deployed to **Cloudflare Workers** via `@astrojs/cloudflare` with edge-cached HTML and tag-based revalidation on publish.

</div>

<details>

<summary>📋 Table of Contents</summary>

- [▶️ Prerequisites](#prerequisites)

- [🏗️ Project Structure](#project-structure)
  - [Architecture](#architecture)

  - [Scripts](#scripts)

  - [Import Aliases](#import-aliases)

  - [File Naming Convention](#file-naming-convention)

- [⚙️ Project Installation](#project-installation)

- [🚀 Quick Start](#quick-start)

- [💿 Project Usage](#project-usage)
  - [Component Architecture](#component-architecture)

  - [Sanity Studio & Visual Editing](#sanity-studio--visual-editing)

  - [Cache Strategy](#cache-strategy)

- [🔐 Security Monitoring](#security-monitoring)

- [💰 Cloudflare Budget Management](#cloudflare-budget-management)

- [🤝 Contributing](#contributing)

- [📞 Contact](#contact)

</details>

## Prerequisites

To run the project locally:

- **nvm** — installs and switches Node versions. Run `nvm use` in the project root to pick up the version pinned in `.nvmrc`.
- **Corepack enabled** — run `corepack enable` once on your machine. It reads the `packageManager` field in `package.json` and ensures everyone uses the same pinned `pnpm` version (no global install needed).
- **Sanity.io account** with access to your project (for dataset access in local dev).
- **Cloudflare account** for the deployment target (free Workers plan is enough).

# 🏗️

# Project Structure

## Architecture

```bash
├── .github/                          # GitHub Actions workflows for CI/CD.
├── .husky/                           # Husky hooks for commit validation.
├── src/
│   ├── assets/                       # Optimized assets (images, fonts).
│   ├── layouts/                      # Astro layout components.
│   │   ├── base-layout.astro
│   │   └── public-layout.astro
│   ├── middleware.ts                 # Cache-Control + Vary: Cookie for edge caching.
│   ├── pages/                        # File-based routing.
│   │   ├── api/
│   │   │   ├── contact/submit.ts     # Contact form endpoint.
│   │   │   ├── draft-mode/           # Sanity Presentation draft flow.
│   │   │   │   ├── enable.ts
│   │   │   │   ├── disable.ts
│   │   │   │   └── check.ts          # Polling endpoint for SanityLive.
│   │   │   └── revalidate/purge.ts   # Sanity webhook → Cloudflare cache purge.
│   │   ├── blog/                     # Blog list + article pages.
│   │   ├── contact/
│   │   ├── mentions-legales/
│   │   ├── 404.astro
│   │   ├── index.astro
│   │   └── robots.txt.ts
│   ├── features/                     # Feature modules — components, data co-located.
│   │   ├── blog/
│   │   ├── contact/
│   │   ├── landing/
│   │   └── legal/
│   ├── sanity/                       # All Sanity-related code, grouped by concern.
│   │   ├── clients/                  # client (public) + backend-client (server-only, with token).
│   │   ├── content/                  # load-query, fragments, image, settings, cache-tags.
│   │   ├── preview/                  # Draft mode + Visual Editing islands & helpers.
│   │   ├── studio/                   # Custom Studio components used inside schemas.
│   │   ├── presentation/             # Presentation tool resolve.
│   │   └── schemas/                  # Doc schemas with co-located GROQ queries.
│   ├── shared/                       # Cross-cutting concerns.
│   │   ├── components/
│   │   │   ├── layout/               # Nav, Footer.
│   │   │   ├── seo/                  # Head component.
│   │   │   ├── services/             # MotionPreset, etc.
│   │   │   └── ui/                   # Shadcn/ui primitives.
│   │   ├── hooks/
│   │   ├── lib/                      # env, seo/, utils.
│   │   └── types/
│   └── styles/                       # Global CSS, design tokens.
├── sanity.config.ts                  # Studio config — staging/production/local workspaces.
├── sanity.cli.ts                     # Studio bundler config (env injection).
└── public/                           # Static assets (favicon, OG images).
```

This project uses a **Feature-Driven Architecture** where each feature owns its logic. `shared/` contains only reusables used by ≥2 features. `sanity/` holds the CMS layer (schemas, queries, client setup) consumed by pages.

## Scripts

<div align="right">

[⬆️ Back to Top](#readme-top)

</div>

### Development

```bash
pnpm dev              # Astro (:4321) + Sanity Studio (:3333) in parallel via concurrently
pnpm dev:astro        # Astro only
pnpm dev:sanity       # Sanity Studio only
pnpm build            # Build the application for production
pnpm preview          # Preview the production build
```

### Code Quality

```bash
pnpm ts               # Check TypeScript types (astro check + tsc)
pnpm lint             # Check for linting errors
pnpm lint:fix         # Fix linting errors
pnpm format           # Format code with Prettier
pnpm format:check     # Check if code is formatted
pnpm knip             # Analyze unused exports and dependencies
```

### Sanity

```bash
pnpm typegen                  # Regenerate src/sanity/sanity.types.ts after schema changes
pnpm deploy:sanity:staging    # Deploy the staging Studio to <slug>-staging.sanity.studio
pnpm deploy:sanity:prod       # Deploy the production Studio to <slug>.sanity.studio
```

### Git & Commit

```bash
pnpm cz               # Create conventional commit messages with emojis
```

## Import Aliases

<div align="right">

[⬆️ Back to Top](#readme-top)

</div>

This project uses import aliases for easier module resolution.

The aliases are defined in the tsconfig.json file as follows:

```bash
 "baseUrl": ".",
    "paths":
      "@/*": ["./src/*"],
```

This alias allows you to import modules using the `@/` prefix instead of relative paths.

## File Naming Convention

<div align="right">

[⬆️ Back to Top](#readme-top)

</div>

We use **kebab-case** for file names (`my-component.tsx` instead of `MyComponent.tsx`) to ensure cross-platform compatibility.

This prevents case-sensitivity issues between Windows (case-insensitive) and Linux/Unix (case-sensitive) systems, making the codebase more robust across different development environments.

# 💿

# Project Installation

<div align="right">

[⬆️ Back to Top](#readme-top)

</div>

1. Clone the repository:

```bash
git clone https://github.com/Tomlam0/boiler-landing-astro.git
cd project
```

2. Install the dependencies:

```bash
pnpm i
```

3. Create `.env.local` from `.env.example`:

```bash
cp .env.example .env.local
```

At minimum you'll need `SANITY_PROJECT_ID`, `SANITY_DATASET`, `SITE_URL`, and `SANITY_API_READ_TOKEN` (for draft preview). See [`BOILERPLATE-SETUP.md`](./BOILERPLATE-SETUP.md) for the full env + GitHub secrets reference and the Sanity / Cloudflare account setup walkthrough.

## Quick Start

<div align="right">

[⬆️ Back to Top](#readme-top)

</div>

**Launch the development environment:**

```bash
pnpm dev
```

The application will be available at `http://localhost:4321`.

# 🔧

# Project Usage

## Component Architecture

<div align="right">

[⬆️ Back to Top](#readme-top)

</div>

This project follows a modular component architecture with clear separation of concerns:

### Component Organization

- **`shared/components/ui/`**: Shadcn/ui primitives (Button, Sheet, etc.)
- **`shared/components/layout/`**: Layout components (Nav, Footer)
- **`shared/components/services/`**: Reusable components (MotionPreset, etc.)
- **`shared/components/seo/`**: SEO head component
- **`features/<name>/components/`**: Feature-scoped components, co-located with their data

### Astro Islands Pattern

- **Static by default**: Pages are `.astro` files with zero client JS
- **React islands**: Interactive components use `client:load`, `client:visible`, or `client:idle`
- **CVA in templates**: Use `buttonVariants()` directly in Astro templates instead of `<Button asChild>`

## Sanity Studio & Visual Editing

<div align="right">

[⬆️ Back to Top](#readme-top)

</div>

Sanity drives the content layer. The Studio is deployed standalone on `<slug>.sanity.studio` with three workspaces gated by `STUDIO_TARGET`:

- **staging** → production dataset, **publish actions stripped** so editors can only preview/discard. Used for client recette before going live.
- **production** → production dataset, full publish rights.
- **local** → development dataset, available via `pnpm dev:sanity` on `:3333`.

The Visual Editing + draft mode setup follows the [official Sanity Astro guide](https://www.sanity.io/docs/visual-editing/astro-visual-editing): a perspective cookie validated by `/api/draft-mode/enable` switches `loadQuery` to draft perspective, mounts client-only React islands (`<SanityVisualEditing>`, `<SanityLive>`, `<DisableDraftMode>`), and refreshes the iframe via `postMessage` or a server-polled endpoint for standalone tabs.

Visitors without the cookie pay **zero JS overhead** — the entire preview stack is `client:only` and gated by the layout.

## Cache Strategy

<div align="right">

[⬆️ Back to Top](#readme-top)

</div>

Public pages are SSR'd through Cloudflare Workers, then edge-cached with `Cache-Control: public, s-maxage=60, stale-while-revalidate=300` so the typical TTFB is ~10-30ms once warm.

Each page stamps its responses with `Cache-Tag` headers (e.g. `homepage`, `blog`, `article-<id>`, `settings`). When an editor publishes in Sanity, a webhook hits `/api/revalidate/purge`, which validates the signature and calls Cloudflare's REST API to **globally purge** the affected tags across all 300+ POPs in seconds.

Without the webhook (e.g. on the Sanity free plan where you might want the 2 webhook slots used elsewhere), the 60s TTL is the fallback — content auto-refreshes within a minute of publish.

See [`src/middleware.ts`](./src/middleware.ts), [`src/sanity/content/cache-tags.ts`](./src/sanity/content/cache-tags.ts), and [`src/pages/api/revalidate/purge.ts`](./src/pages/api/revalidate/purge.ts).

## Security Monitoring

<div align="right">

[⬆️ Back to Top](#readme-top)

</div>

This project uses **Dependabot** for automated security vulnerability scanning of npm dependencies.

### 🔐 Enabling Dependabot

To activate Dependabot for this repository:

1. Navigate to repository **Settings** > **Advanced Security**
2. Enable features in this order:
   - **Dependency graph** ✅
   - **Dependabot alerts** ✅

### 🛡️ How It Works

Once activated, Dependabot will:

- Scan your dependencies for known vulnerabilities
- Send alerts via GitHub&apos;s Security tab

### ⚙️ Configuration Options

The `.github/dependabot.yml` file controls update behavior:

- **Monitoring-only mode**: No automatic pull requests will be created
- **Daily vulnerability scans**: Checks run every day at 03:00 Europe/Paris time
- **Security focus**: All version updates are ignored, only critical security issues trigger alerts

This configuration allows you to review security vulnerabilities at your own pace and decide when to apply updates manually.

> **Note**: The `.github/dependabot.yml` file is already configured with `open-pull-requests-limit: 0` for monitoring-only behavior.

## Cloudflare Budget Management

![Cloudflare](https://img.shields.io/badge/Cloudflare-F38020?style=for-the-badge&logo=cloudflare&logoColor=white)

<div align="right">

[⬆️ Back to Top](#readme-top)

</div>

### Workers Free Tier

The landing is deployed to **Cloudflare Workers Static Assets**. The free tier covers most small to medium projects:

- **100,000 requests/day** to the Worker (static asset requests served from the CDN do not count)
- **10ms CPU time per request** (largely irrelevant for prerendered pages)

> **Note**: Pages are prerendered at build time and served from Cloudflare's global CDN, so traffic on static routes does not consume Worker quota.

#### 🚨 **Budget Exceeded Protocol**

If quotas are approached:

1. **Check Cloudflare Analytics** - Identify traffic spikes or unusual usage patterns
2. **Review Worker Logs** (`wrangler tail`) - Look for unexpected dynamic invocations
3. **Optimize Performance** - Implement caching, reduce dynamic routes, optimize images

#### ⚙️ **Monitoring Usage**

1. Navigate to **Cloudflare Dashboard** → **Workers & Pages** → your Worker
2. Review the **Metrics** tab for request volume and CPU time
3. Configure **Notifications** under Account → Notifications for usage alerts

## Contributing

<div align="right">

[⬆️ Back to Top](#readme-top)

</div>

Please read the [**Contributing Guidelines**](./CONTRIBUTING.md)

## Contact

<div align="right">

[⬆️ Back to Top](#readme-top)

</div>

For any questions, please contact contact@thomas-lambert-dev.com.
