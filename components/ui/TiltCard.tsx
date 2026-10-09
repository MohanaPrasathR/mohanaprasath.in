'use client';

import { motion, useMotionTemplate, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useMotionOK } from '@/lib/useMotion';

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  /** Degrees of tilt at the card edge. */
  max?: number;
  /** CSS colour of the light that follows the pointer. */
  glow?: string;
}

// Leans toward the pointer in 3D and shines a soft light under it. Mouse only, and skipped
// when the visitor prefers reduced motion. The card's own styling lives on the child.
export default function TiltCard({ children, className = '', max = 7, glow = 'rgba(220,38,38,0.22)' }: TiltCardProps) {
  const reduce = !useMotionOK();
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const hover = useMotionValue(0);
  const rotateY = useSpring(useTransform(px, [0, 1], [-max, max]), { stiffness: 220, damping: 20 });
  const rotateX = useSpring(useTransform(py, [0, 1], [max, -max]), { stiffness: 220, damping: 20 });
  const glowX = useTransform(px, (v) => `${v * 100}%`);
  const glowY = useTransform(py, (v) => `${v * 100}%`);
  const shine = useMotionTemplate`radial-gradient(320px circle at ${glowX} ${glowY}, ${glow}, transparent 65%)`;
  const glowOpacity = useSpring(hover, { stiffness: 160, damping: 24 });

  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (reduce || e.pointerType !== 'mouse') return;
    const r = e.currentTarget.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width);
    py.set((e.clientY - r.top) / r.height);
    hover.set(1);
  };
  const onLeave = () => {
    px.set(0.5);
    py.set(0.5);
    hover.set(0);
  };

  return (
    <motion.div
      className={`relative ${className}`}
      style={{ rotateX, rotateY, transformPerspective: 1000 }}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
    >
      {children}
      <motion.div
        aria-hidden
        className="absolute inset-0 rounded-2xl pointer-events-none mix-blend-screen"
        style={{ background: shine, opacity: glowOpacity }}
      />
    </motion.div>
  );
}
