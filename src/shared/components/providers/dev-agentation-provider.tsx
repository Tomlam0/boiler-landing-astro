'use client';

import { lazy } from 'react';

const AgentationProvider = lazy(() =>
  import('./agentation-provider').then((mod) => ({ default: mod.AgentationProvider }))
);

export function DevAgentationProvider() {
  if (import.meta.env.PROD) return null;

  return <AgentationProvider />;
}
