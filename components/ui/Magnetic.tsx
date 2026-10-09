'use client';

import { useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useMotionOK } from '@/lib/useMotion';

interface MagneticProps {
  children: React.ReactNode;
  /** How far the element follows the pointer, as a fraction of the pointer's offset from its centre. */
  strength?: number;
  className?: string;
}

// The wrapped element drifts toward the mouse while it is nearby, then springs back.
// Does nothing on touch screens or when the visitor prefers reduced motion.
export default function Magnetic({ children, strength = 0.35, className = 'inline-block' }: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = !useMotionOK();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 16, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 220, damping: 16, mass: 0.4 });

  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (reduce || e.pointerType !== 'mouse' || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * strength);
    y.set((e.clientY - (r.top + r.height / 2)) * strength);
  };
  const onLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div ref={ref} className={className} style={{ x: sx, y: sy }} onPointerMove={onMove} onPointerLeave={onLeave}>
      {children}
    </motion.div>
  );
}
