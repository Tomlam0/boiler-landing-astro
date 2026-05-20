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

// Each workspace's Presentation iframe points at its own environment URL.
// Staging build → SITE_URL is the staging URL.
// Local dev → SITE_URL is the local dev URL.
// Production has no Presentation tool (static HTML can't render live drafts).
const SITE_URL = import.meta.env.SITE_URL;

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
  plugins: [...sharedPlugins, presentationFor(ensureUrl(SITE_URL, 'SITE_URL'))],
  document: {
    actions: (prev: { action?: string }[]) =>
      prev.filter(({ action }) => action === 'discardChanges'),
  },
});

// No Presentation tool here. Prod runs as static HTML — draft mode requires
// SSR, so live preview is impossible. Editors switch to the staging Studio
// to draft and preview, then come back here only to click Publish.
const productionWorkspace = () => ({
  ...baseSettings,
  name: 'production',
  title: 'Production',
  basePath: '/',
  dataset: 'production',
  plugins: sharedPlugins,
});

const localWorkspace = () => ({
  ...baseSettings,
  name: 'local',
  title: 'Local',
  basePath: '/',
  dataset: 'development',
  plugins: [...sharedPlugins, presentationFor(ensureUrl(SITE_URL, 'SITE_URL')), visionTool()],
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
