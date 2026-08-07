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
      className="fixed top-0 left-0 right-0 z-[300] flex items-center justify-between px-6 md:px-12 lg:px-20"
      style={{ height: '84px' }}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
    >
      {/* Blur background on scroll */}
      <div
        className="absolute inset-0 transition-all duration-500"
        style={{
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(20px)' : 'none',
          background: scrolled ? 'rgba(5,5,5,0.85)' : 'transparent',
          borderBottom: scrolled ? '1px solid rgba(255,255,255,0.1)' : '1px solid transparent',
        }}
      />

      {/* Big Logo */}
      <button
        onClick={() => scrollTo('hero')}
        className="relative z-10 flex items-center group py-2"
        aria-label="Back to top"
      >
        <svg
          className="w-14 h-14 md:w-16 md:h-16 text-white transition-transform duration-300 group-hover:scale-105"
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="100" height="100" rx="16" fill="#121212" stroke="#FFFFFF" strokeWidth="6"/>
          <path d="M16 75 V25 L36 60 L56 25 V75" stroke="#FFFFFF" strokeWidth="9" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M68 75 V25 Q90 25 90 45 Q90 62 68 62" stroke="#FFFFFF" strokeWidth="9" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
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
