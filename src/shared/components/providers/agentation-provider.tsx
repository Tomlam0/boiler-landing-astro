'use client';

import { Agentation } from 'agentation';
import { useEffect } from 'react';

export function AgentationProvider() {
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `.styles-module__toolbar___wNsdK {
        top: auto !important;
        bottom: 1rem !important;
        left: auto !important;
        right: 1rem !important;
      }

    `;
    document.head.appendChild(style);
    return () => style.remove();
  }, []);

  return <Agentation endpoint="http://localhost:4747" />;
}
