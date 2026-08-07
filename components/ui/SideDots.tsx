'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const sections = [
  { id: 'hero',     label: 'Home' },
  { id: 'about',    label: 'About' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills',   label: 'Skills' },
  { id: 'resume',   label: 'Resume' },
  { id: 'contact',  label: 'Contact' },
];

export default function SideDots() {
  const [active, setActive] = useState('hero');
  const [hovered, setHovered] = useState<string | null>(null);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return;

      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActive(id);
        },
        { threshold: 0.4 }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div
      className="fixed right-6 top-1/2 -translate-y-1/2 z-[300] flex flex-col items-center gap-4"
      aria-label="Section navigation"
    >
      {sections.map(({ id, label }) => {
        const isActive = active === id;
        return (
          <div
            key={id}
            className="relative flex items-center justify-end"
            onMouseEnter={() => setHovered(id)}
            onMouseLeave={() => setHovered(null)}
          >
            {/* Label tooltip */}
            <AnimatePresence>
              {hovered === id && (
                <motion.span
                  initial={{ opacity: 0, x: 8 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 8 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-6 whitespace-nowrap text-[10px] tracking-[0.25em] uppercase font-mono text-gold"
                  style={{ fontFamily: "'JetBrains Mono', monospace" }}
                >
                  {label}
                </motion.span>
              )}
            </AnimatePresence>

            {/* Dot */}
            <button
              onClick={() => scrollTo(id)}
              aria-label={`Go to ${label}`}
              className="relative flex items-center justify-center w-5 h-5"
            >
              {/* Outer ring when active */}
              {isActive && (
                <motion.span
                  layoutId="dot-ring"
                  className="absolute w-4 h-4 rounded-full border border-gold/50"
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
              )}
              {/* Inner dot */}
              <motion.span
                className="rounded-full"
                animate={{
                  width:  isActive ? 6 : 3,
                  height: isActive ? 6 : 3,
                  backgroundColor: isActive ? '#D4AF37' : 'rgba(247,247,245,0.25)',
                }}
                transition={{ duration: 0.3 }}
              />
            </button>
          </div>
        );
      })}
    </div>
  );
}

