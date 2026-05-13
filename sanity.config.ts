import { defineConfig } from 'sanity';
import { visionTool } from '@sanity/vision';
import { structureTool } from 'sanity/structure';
import { GrTest } from 'react-icons/gr';
import { media } from 'sanity-plugin-media';

import { projectId } from './src/sanity/env';
import { structure } from './src/sanity/custom-structure';
import { schema } from './src/sanity/schemas';

const basePlugins = [
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
  plugins: basePlugins,
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
  plugins: basePlugins,
});

const localWorkspace = () => ({
  ...baseSettings,
  name: 'local',
  title: 'Local',
  basePath: '/',
  dataset: 'development',
  plugins: [...basePlugins, visionTool()],
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
