# CLAUDE.md — boiler-landing-astro

Astro 5 boilerplate with React islands. Node 24, pnpm, TypeScript strict, Tailwind v4, shadcn/ui.

## Folder Conventions
```
src/pages/              → file-based routing (.astro pages)
src/layouts/            → Astro layout components
src/features/<domain>/  → components/, data/, schemas/ per feature
src/shared/             → components/ui, components/layout, components/services, components/seo, lib, hooks, types
src/styles/             → globals.css, keyframes.css
```
Features own their logic. `shared/` = reusables used by ≥2 features.
New feature domain → `src/features/<domain>/components/`, `src/features/<domain>/data/`.

## Astro-Specific Patterns
- **Static by default**: Pages are `.astro` files (zero JS). Use `client:load` for interactive React islands.
- **Layouts**: Use `src/layouts/base-layout.astro` with `<slot />` for page content.
- **SEO**: Use `<Head />` component in layouts. Metadata via `resolveMetadata()` or `marketingMetadata`.
- **Routing**: File-based in `src/pages/`. Dynamic routes with `[param].astro`. 404 via `src/pages/404.astro`.
- **React islands**: Only hydrate components that need interactivity (`client:load`, `client:visible`, `client:idle`).
- **Static content**: Prefer Astro components over React for non-interactive UI.

## Design System
Tailwind v4 CSS-first via `@tailwindcss/vite` (no `tailwind.config.ts`). Tokens in `src/styles/globals.css`: `--background`, `--foreground`, `--primary`, `--primary-foreground`, `--secondary`, `--muted`, `--muted-foreground`, `--accent`, `--destructive`, `--border`, `--input`, `--ring`.
```ts
cn('bg-primary text-primary-foreground', className);              // ✅ Always
cva('base', { variants: { variant: { default: 'bg-primary' } } }); // ✅ Always
// ❌ No hex values, no arbitrary colors (bg-[#1a1a1a], text-gray-800) — use semantic tokens
// ❌ Never create new primitives — extend shared/components/ui/
```
Add shadcn: `pnpm dlx shadcn@latest add <component>` (alias `@/shared/components/ui`).

## Metadata & Structured Data
`shared/lib/seo/`: `metadata.ts` (resolveMetadata, marketingMetadata), `structured-data.ts` (JSON-LD @graph).
```ts
// Static — marketingMetadata
import { marketingMetadata } from '@/shared/lib/seo/metadata';
// Use in .astro page frontmatter
const metadata = marketingMetadata.home;
// Dynamic — resolveMetadata
import { resolveMetadata } from '@/shared/lib/seo/metadata';
const metadata = resolveMetadata({ title, description, path: `blog/${slug}` });
// Pass to layout
<BaseLayout metadata={metadata}>
```

## Env Validation
`shared/lib/env.ts` uses Zod for runtime validation. Env var: `SITE_URL`.
For non-Astro scripts: set `SKIP_ENV_VALIDATION=true` to bypass validation.

## File Size Limits
Keep files small. Soft ceilings: **React components ≤200 lines**, **Astro pages ≤250 lines**, **services/logic ≤300 lines**, **utils ≤400 lines**.

## Island Directives — Performance Guide
Choose the **least eager** directive that works:
| Directive | When JS loads | Use for |
|-----------|--------------|---------|
| `client:load` | Immediately | Above-the-fold interactive UI (nav with mobile menu, critical CTAs with JS logic) |
| `client:idle` | Browser idle (`requestIdleCallback`) | Non-critical: analytics, dev tools, chat widgets |
| `client:visible` | Element enters viewport (`IntersectionObserver`) | Animations (`MotionPreset`), below-fold interactive sections, forms |
| `client:media="(query)"` | Media query matches | Mobile-only or desktop-only interactivity |
| `client:only="react"` | Immediately, **no SSR HTML** | Components that can't run server-side (WebGL, `window`-dependent) |
| _(no directive)_ | **Never** — zero JS sent | Static display components (`Footer`, badges, cards) |

Rules:
- **Default to no directive.** Only add `client:` when the component uses hooks, state, or browser APIs.
- **Animations (`MotionPreset`) → `client:visible`**, not `client:load`. They trigger on view anyway.
- **Nav with mobile menu → `client:load`** (needs immediate interactivity).
- **Dev-only providers → `client:idle`** (never block page load for dev tools).
- Never use `client:load` on components below the fold — use `client:visible`.

## Do / Don't
- ✅ `cn()` for class merging — ❌ raw string concatenation
- ✅ Semantic tokens (`text-muted-foreground`) — ❌ arbitrary (`text-[#999]`, hex)
- ✅ Least eager `client:` directive possible — ❌ `client:load` everywhere by default
- ✅ No `client:` on static display components — ❌ hydrating static content
- ✅ Astro components for static UI — ❌ React for non-interactive sections
- ✅ All `<a>` tags with `draggable={false}` — ❌ links without `draggable={false}`
- ✅ `MotionPreset` for animations (motion library) — ❌ raw `motion.div` unless custom animation needed
- ✅ `select-none` on non-content pages — ❌ selectable UI chrome (nav, buttons)

## Scripts
```bash
pnpm dev       # Astro dev server
pnpm build     # Production build
pnpm preview   # Preview production build
pnpm ts        # Astro check + TypeScript check (no emit)
pnpm lint      # ESLint (flat config, only-warn)
pnpm lint:fix  # ESLint autofix
pnpm format    # Prettier write
pnpm knip      # Dead code detection
```
