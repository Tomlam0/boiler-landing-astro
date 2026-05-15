import { defineConfig } from 'sanity';
import { visionTool } from '@sanity/vision';
import { presentationTool } from 'sanity/presentation';
import { structureTool } from 'sanity/structure';
import { GrTest } from 'react-icons/gr';
import { media } from 'sanity-plugin-media';

import { projectId } from './src/sanity/env';
import { structure } from './src/sanity/custom-structure';
import { schema } from './src/sanity/schemas';
import { resolve } from './src/sanity/presentation/resolve';

// Vite can only statically replace literal `import.meta.env.X` accesses, so
// each URL must be read by literal name then validated. Injected by sanity.cli.ts.
function ensureUrl(value: string | undefined, key: string): string {
  if (!value) {
    throw new Error(
      `Missing required env var "${key}". Set it before deploying or running the studio.`
    );
  }
  return value;
}

// Production runs as pure static HTML — it has no SSR, no draft cookies, no
// Visual Editing. So BOTH workspaces (staging + production) point their
// Presentation iframe at the staging URL, which is the SSR-enabled mirror
// where editors can preview drafts live before publishing.
const STAGING_URL = import.meta.env.SITE_URL_STAGING;
const LOCAL_URL = import.meta.env.SITE_URL;

const previewModeRoutes = {
  enable: '/api/draft-mode/enable',
  disable: '/api/draft-mode/disable',
} as const;

function presentationFor(origin: string) {
  return presentationTool({
    resolve,
    previewUrl: { origin, previewMode: previewModeRoutes },
  });
}

const sharedPlugins = [
  structureTool({ structure }),
  media({
    creditLine: { enabled: true },
    maximumUploadSize: 2_000_000,
  }),
];

const baseSettings = {
  projectId,
  schema,
  icon: GrTest,
  scheduledPublishing: { enabled: false },
  scheduledDrafts: { enabled: false },
  releases: { enabled: false },
};

// Staging workspace points at the production dataset. Mutating actions are
// stripped so editors can only draft and discard — no way to publish or
// delete live content from here. Only the prod studio can mutate.
const stagingWorkspace = () => ({
  ...baseSettings,
  name: 'staging',
  title: 'Staging',
  basePath: '/',
  dataset: 'production',
  plugins: [...sharedPlugins, presentationFor(ensureUrl(STAGING_URL, 'SITE_URL_STAGING'))],
  document: {
    actions: (prev: { action?: string }[]) =>
      prev.filter(({ action }) => action === 'discardChanges'),
  },
});

const productionWorkspace = () => ({
  ...baseSettings,
  name: 'production',
  title: 'Production',
  basePath: '/',
  dataset: 'production',
  // Presentation points at the staging SSR mirror — prod itself is static HTML
  // with no draft-mode capability, so previews always happen on staging.
  plugins: [...sharedPlugins, presentationFor(ensureUrl(STAGING_URL, 'SITE_URL_STAGING'))],
});

const localWorkspace = () => ({
  ...baseSettings,
  name: 'local',
  title: 'Local',
  basePath: '/',
  dataset: 'development',
  plugins: [
    ...sharedPlugins,
    presentationFor(ensureUrl(LOCAL_URL, 'SITE_URL')),
    visionTool(),
  ],
});

// STUDIO_TARGET selects WHICH studio bundle is built:
//   - "staging"    → studio for the staging hostname (e.g. <slug>-staging.sanity.studio)
//   - "production" → studio for the prod hostname (e.g. <slug>.sanity.studio)
//   - undefined    → local `sanity dev`, only the local workspace is mounted
const target = process.env.STUDIO_TARGET;
const isLocal = process.env.NODE_ENV === 'development';

let workspaces;
if (target === 'staging') workspaces = [stagingWorkspace()];
else if (target === 'production') workspaces = [productionWorkspace()];
else if (isLocal) workspaces = [localWorkspace()];
else throw new Error('STUDIO_TARGET must be set to "staging" or "production" for cloud deploys.');

export default defineConfig(workspaces);
