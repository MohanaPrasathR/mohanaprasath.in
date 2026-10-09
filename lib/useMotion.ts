'use client';

import { useEffect, useState } from 'react';
import { useReducedMotion } from 'framer-motion';

const KEY = 'motion-preference';

/**
 * Whether decorative motion should play. It follows the visitor's system setting
 * ("reduce motion"), unless they chose otherwise: opening any page with `?motion=on`
 * (or `?motion=off`) overrides the system setting and is remembered in this browser.
 * `?motion=auto` clears the override.
 *
 * It starts as `true` so the first browser render matches the server's HTML (otherwise
 * React reports a hydration mismatch), then settles on the real answer after mounting.
 */
export function useMotionOK(): boolean {
  const reduced = useReducedMotion();
  const [ok, setOk] = useState(true);

  useEffect(() => {
    let override: boolean | null = null;
    try {
      const asked = new URLSearchParams(window.location.search).get('motion');
      if (asked === 'on' || asked === 'off') localStorage.setItem(KEY, asked);
      if (asked === 'auto') localStorage.removeItem(KEY);
      const saved = localStorage.getItem(KEY);
      override = saved === 'on' ? true : saved === 'off' ? false : null;
    } catch {
      // storage blocked: fall back to the system setting
    }
    setOk(override ?? !reduced);
  }, [reduced]);

  return ok;
}
