'use client';

import { useRef } from 'react';
import { motion, MotionValue, useScroll, useTransform } from 'framer-motion';
import { useMotionOK } from '@/lib/useMotion';

function Word({ word, range, progress }: { word: string; range: [number, number]; progress: MotionValue<number> }) {
  const opacity = useTransform(progress, range, [0.18, 1]);
  return (
    <span className="relative inline-block mr-[0.28em]">
      <motion.span style={{ opacity }}>{word}</motion.span>
    </span>
  );
}

// A paragraph whose words light up one after another as it scrolls into the middle of the screen.
// The full text stays in the DOM for screen readers; reduced-motion visitors see it fully lit.
export default function ScrollWords({ text, className, style }: { text: string; className?: string; style?: React.CSSProperties }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const reduce = !useMotionOK();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.85', 'end 0.55'] });
  const words = text.split(' ');

  if (reduce) {
    return <p ref={ref} className={className} style={style}>{text}</p>;
  }

  return (
    <p ref={ref} className={className} style={style} aria-label={text}>
      {words.map((word, i) => {
        const start = i / words.length;
        return <Word key={i} word={word} range={[start, Math.min(1, start + 1.5 / words.length)]} progress={scrollYProgress} />;
      })}
    </p>
  );
}
