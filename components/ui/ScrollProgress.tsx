'use client';

import { motion, useScroll, useSpring } from 'framer-motion';

// Thin red line along the top edge that fills as the page scrolls.
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });

  return (
    <motion.div
      aria-hidden
      className="fixed top-0 left-0 right-0 h-[3px] origin-left bg-red-600 pointer-events-none z-[9990]"
      style={{ scaleX, boxShadow: '0 0 12px rgba(220,38,38,0.7)' }}
    />
  );
}
