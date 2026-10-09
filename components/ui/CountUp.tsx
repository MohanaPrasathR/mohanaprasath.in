'use client';

import { useEffect, useRef } from 'react';
import { animate } from 'framer-motion';
import { useMotionOK } from '@/lib/useMotion';

export const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

interface CountUpProps {
  value: number;
  format?: (n: number) => string;
  duration?: number;
  /** Seconds to wait before each count starts. */
  delay?: number;
}

// Tweens from the previously shown number to `value` whenever it changes.
export default function CountUp({ value, format = (n) => Math.round(n).toString(), duration = 0.9, delay = 0 }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const shown = useRef(0);
  const formatRef = useRef(format);
  formatRef.current = format;
  const reduce = !useMotionOK();

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (reduce) {
      shown.current = value;
      node.textContent = formatRef.current(value);
      return;
    }
    const controls = animate(shown.current, value, {
      duration,
      delay,
      ease: EASE,
      onUpdate: (v) => {
        shown.current = v;
        node.textContent = formatRef.current(v);
      },
    });
    return () => controls.stop();
  }, [value, duration, delay, reduce]);

  return <span ref={ref}>{format(0)}</span>;
}
