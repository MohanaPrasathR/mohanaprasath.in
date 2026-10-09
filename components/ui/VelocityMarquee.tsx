'use client';

import { useRef } from 'react';
import {
  motion,
  useAnimationFrame,
  useInView,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from 'framer-motion';
import { useMotionOK } from '@/lib/useMotion';

interface VelocityMarqueeProps {
  items: string[];
  /** Resting speed in percent of one loop per second. */
  speed?: number;
}

// Wrap a number into [min, max) so the strip loops without a jump.
const wrap = (min: number, max: number, v: number) => {
  const range = max - min;
  return ((((v - min) % range) + range) % range) + min;
};

// A looping strip of items that drifts steadily, speeds up while the page scrolls and
// reverses when you scroll back up. Visitors who prefer reduced motion get a static list.
export default function VelocityMarquee({ items, speed = -3 }: VelocityMarqueeProps) {
  const reduce = !useMotionOK();
  const wrapperRef = useRef<HTMLDivElement>(null);
  const visible = useInView(wrapperRef);
  const baseX = useMotionValue(0);
  const direction = useRef(1);

  const { scrollY } = useScroll();
  const velocity = useSpring(useVelocity(scrollY), { damping: 50, stiffness: 400 });
  // at most 3 extra strip-widths of speed, so even a hard scroll stays readable
  const boost = useTransform(velocity, [-2500, 0, 2500], [-3, 0, 3]);
  const x = useTransform(baseX, (v) => `${wrap(-50, 0, v)}%`);

  useAnimationFrame((_, delta) => {
    if (reduce || !visible) return;
    const b = boost.get();
    if (b < -0.05) direction.current = -1;
    else if (b > 0.05) direction.current = 1;
    const step = direction.current * speed * (delta / 1000);
    baseX.set(baseX.get() + step + step * Math.abs(b));
  });

  const group = (hidden: boolean) => (
    <div className="flex shrink-0 gap-16 pr-16" aria-hidden={hidden || undefined}>
      {items.map((item, i) => (
        <span
          key={i}
          className="flex items-center gap-4 whitespace-nowrap text-sm font-bold text-white font-mono"
          style={{ fontFamily: "'JetBrains Mono', monospace", letterSpacing: '0.15em' }}
        >
          {item}
          <span className="text-red-500 font-bold text-base">◆</span>
        </span>
      ))}
    </div>
  );

  if (reduce) {
    return (
      <div ref={wrapperRef} className="flex flex-wrap justify-center gap-x-10 gap-y-3 px-6">
        {items.map((item) => (
          <span key={item} className="text-sm font-bold text-white font-mono" style={{ fontFamily: "'JetBrains Mono', monospace", letterSpacing: '0.15em' }}>
            {item}
          </span>
        ))}
      </div>
    );
  }

  return (
    <div ref={wrapperRef} className="overflow-hidden">
      <motion.div className="flex w-max" style={{ x }}>
        {group(false)}
        {group(true)}
      </motion.div>
    </div>
  );
}
