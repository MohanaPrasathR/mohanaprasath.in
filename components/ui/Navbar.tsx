'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const sections = [
  { id: 'hero',           label: 'Home' },
  { id: 'about',          label: 'About' },
  { id: 'projects',       label: 'Projects' },
  { id: 'skills',         label: 'Skills' },
  { id: 'resume',         label: 'Resume' },
  { id: 'certifications', label: 'Certifications' },
  { id: 'contact',        label: 'Contact' },
];

export default function Navbar() {
  const [active, setActive] = useState('hero');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    // Track scroll for background blur
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    // IntersectionObserver to highlight active section
    const observers: IntersectionObserver[] = [];
    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActive(id); },
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
    <motion.header
      className="fixed top-0 left-0 right-0 z-[300] flex items-center justify-between px-4 sm:px-8 md:px-12 lg:px-20 h-16 md:h-20"
      initial={{ opacity: 1, y: 0 }}
      animate={{ opacity: 1, y: 0 }}
    >
      {/* Blur background on scroll */}
      <div
        className="absolute inset-0 transition-all duration-500"
        style={{
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(20px)' : 'none',
          background: scrolled ? 'rgba(5,5,5,0.88)' : 'transparent',
          borderBottom: scrolled ? '1px solid rgba(255,255,255,0.08)' : '1px solid transparent',
        }}
      />

      {/* Sleek Logo */}
      <button
        onClick={() => scrollTo('hero')}
        className="relative z-10 flex items-center gap-2.5 group shrink-0"
        aria-label="Back to top"
      >
        <svg
          className="w-9 h-9 md:w-10 md:h-10 text-white transition-transform duration-300 group-hover:scale-105"
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="100" height="100" rx="16" fill="#141414" stroke="#FFFFFF" strokeWidth="5"/>
          <path d="M18 75 V25 L38 60 L58 25 V75" stroke="#FFFFFF" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M70 75 V25 Q90 25 90 45 Q90 62 70 62" stroke="#FFFFFF" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <span className="font-mono text-xs font-bold tracking-[0.25em] text-white hidden sm:inline-block">
          MP
        </span>
      </button>

      {/* Nav links — responsive gap and scaling */}
      <nav className="relative z-10 flex items-center gap-2.5 sm:gap-5 md:gap-8 max-w-[calc(100vw-120px)] overflow-x-auto no-scrollbar py-1">
        {sections.slice(1).map(({ id, label }) => {
          const isActive = active === id;
          return (
            <button
              key={id}
              onClick={() => scrollTo(id)}
              className="relative group text-[9px] sm:text-[11px] tracking-[0.18em] sm:tracking-[0.25em] uppercase font-mono transition-colors duration-300 whitespace-nowrap"
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                color: isActive ? '#D4AF37' : 'rgba(154,154,154,0.8)',
              }}
            >
              {label}
              {/* Active underline */}
              <span
                className="absolute -bottom-1 left-0 h-px bg-gold transition-all duration-300"
                style={{ width: isActive ? '100%' : '0%' }}
              />
              {/* Hover underline for inactive */}
              {!isActive && (
                <span className="absolute -bottom-1 left-0 h-px bg-white/20 w-0 group-hover:w-full transition-all duration-300" />
              )}
            </button>
          );
        })}
      </nav>
    </motion.header>
  );
}
