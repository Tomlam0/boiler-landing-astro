// Polls `/api/draft-mode/check` until the dataset's latest mutation timestamp
// differs from the baseline, or until `maxWaitMs` elapses. Lets the iframe
// reload _after_ Sanity has propagated the new write — without this guard,
// rapid edits trigger a reload while the API still serves stale data.

const POLL_INTERVAL_MS = 150;

export async function waitForMutation(
  baseline: string | null,
  maxWaitMs = 3000
): Promise<string | null> {
  const start = Date.now();

  while (Date.now() - start < maxWaitMs) {
    try {
      const res = await fetch('/api/draft-mode/check', { cache: 'no-store' });
      if (res.ok) {
        const { latestMutation } = (await res.json()) as { latestMutation: string | null };
        if (latestMutation !== baseline) return latestMutation;
      }
    } catch {
      // network blip — keep polling
    }
    await new Promise((r) => setTimeout(r, POLL_INTERVAL_MS));
  }

  return null;
}
