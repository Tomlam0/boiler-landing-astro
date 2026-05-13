import { useEffect, useRef } from 'react';
import { useIsPresentationTool } from '@sanity/visual-editing/react';

// Live-refreshes standalone draft tabs by polling a server-side endpoint
// (the read token never reaches the browser). Inside the Presentation iframe,
// `<VisualEditing>`'s own `refresh` callback handles it — skip to avoid double
// reload.

const POLL_MS = 2500;
const RELOAD_DEBOUNCE_MS = 400;

export default function SanityLive() {
  const isPresentationTool = useIsPresentationTool();
  const reloadTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (isPresentationTool !== false) return;

    let cancelled = false;
    let lastSeen: string | null | undefined = undefined;

    const scheduleReload = () => {
      if (reloadTimerRef.current) clearTimeout(reloadTimerRef.current);
      reloadTimerRef.current = setTimeout(() => window.location.reload(), RELOAD_DEBOUNCE_MS);
    };

    const check = async () => {
      if (cancelled) return;
      try {
        const res = await fetch('/api/draft-mode/check', { cache: 'no-store' });
        if (!res.ok) return;
        const { latestMutation } = (await res.json()) as { latestMutation: string | null };

        if (lastSeen === undefined) {
          lastSeen = latestMutation;
          return;
        }
        if (lastSeen !== latestMutation) scheduleReload();
      } catch (err) {
        console.warn('[SanityLive] poll failed:', (err as Error).message);
      }
    };

    void check();
    const interval = setInterval(check, POLL_MS);

    return () => {
      cancelled = true;
      clearInterval(interval);
      if (reloadTimerRef.current) clearTimeout(reloadTimerRef.current);
    };
  }, [isPresentationTool]);

  return null;
}
