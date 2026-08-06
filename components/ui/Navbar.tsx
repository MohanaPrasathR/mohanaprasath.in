'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const sections = [
  { id: 'hero',     label: 'Home' },
  { id: 'about',    label: 'About' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills',   label: 'Skills' },
  { id: 'resume',   label: 'Resume' },
  { id: 'contact',  label: 'Contact' },
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
      style={{ height: '64px' }}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
    >
      {/* Blur background on scroll */}
      <div
        className="absolute inset-0 transition-all duration-500"
        style={{
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(20px)' : 'none',
          background: scrolled ? 'rgba(5,5,5,0.7)' : 'transparent',
          borderBottom: scrolled ? '1px solid rgba(212,175,55,0.07)' : '1px solid transparent',
        }}
      />

      {/* Logo */}
      <button
        onClick={() => scrollTo('hero')}
        className="relative z-10 font-mono text-xs tracking-[0.35em] text-white-primary hover:text-gold transition-colors duration-300"
        style={{ fontFamily: "'JetBrains Mono', monospace" }}
        aria-label="Back to top"
      >
        MP
      </button>

      {/* Nav links — all always visible */}
      <nav className="relative z-10 flex items-center gap-6 md:gap-8">
        {sections.slice(1).map(({ id, label }) => {
          const isActive = active === id;
          return (
            <button
              key={id}
              onClick={() => scrollTo(id)}
              className="relative group text-[11px] tracking-[0.25em] uppercase font-mono transition-colors duration-300"
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
