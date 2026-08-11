'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

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
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const isScrolled = window.scrollY > 30;
      setScrolled((prev) => (prev !== isScrolled ? isScrolled : prev));
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActive(id); },
        { threshold: 0.3 }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const scrollTo = (id: string) => {
    setMenuOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-[300] flex items-center justify-between px-6 md:px-12 lg:px-20 h-16 md:h-20"
      initial={{ opacity: 1, y: 0 }}
      animate={{ opacity: 1, y: 0 }}
    >
      {/* Background overlay on scroll */}
      <div
        className="absolute inset-0 transition-all duration-500"
        style={{
          backdropFilter: scrolled || menuOpen ? 'blur(20px)' : 'none',
          WebkitBackdropFilter: scrolled || menuOpen ? 'blur(20px)' : 'none',
          background: scrolled || menuOpen ? 'rgba(5,5,5,0.92)' : 'transparent',
          borderBottom: scrolled || menuOpen ? '1px solid rgba(255,255,255,0.08)' : '1px solid transparent',
        }}
      />

      {/* Arman-Style Monogram Logo */}
      <button
        onClick={() => scrollTo('hero')}
        className="relative z-10 flex items-center gap-3 group shrink-0"
        aria-label="Back to top"
      >
        <svg
          className="w-8 h-8 md:w-10 md:h-10 text-white transition-transform duration-300 group-hover:scale-105"
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="100" height="100" rx="16" fill="#121212" stroke="#FFFFFF" strokeWidth="5"/>
          <path d="M18 75 V25 L38 60 L58 25 V75" stroke="#FFFFFF" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M70 75 V25 Q90 25 90 45 Q90 62 70 62" stroke="#FFFFFF" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <span
          className="font-mono text-xs md:text-sm font-bold tracking-[0.25em] text-white"
          style={{ fontFamily: "'JetBrains Mono', monospace" }}
        >
          MP
        </span>
      </button>

      {/* Desktop Navigation Links */}
      <nav className="relative z-10 hidden md:flex items-center gap-8">
        {sections.slice(1).map(({ id, label }) => {
          const isActive = active === id;
          return (
            <button
              key={id}
              onClick={() => scrollTo(id)}
              className="relative group text-xs tracking-[0.25em] uppercase font-mono transition-colors duration-300 py-1"
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                color: isActive ? '#DC2626' : 'rgba(247,247,245,0.7)',
              }}
            >
              {label}
              <span
                className="absolute -bottom-0.5 left-0 h-[2px] bg-red-600 transition-all duration-300"
                style={{ width: isActive ? '100%' : '0%' }}
              />
              {!isActive && (
                <span className="absolute -bottom-0.5 left-0 h-[2px] bg-white/30 w-0 group-hover:w-full transition-all duration-300" />
              )}
            </button>
          );
        })}
      </nav>

      {/* Mobile Hamburger Button */}
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="relative z-50 md:hidden p-2 text-white focus:outline-none"
        aria-label="Toggle menu"
      >
        <div className="w-6 h-5 flex flex-col justify-between">
          <span
            className={`w-full h-0.5 bg-white transition-transform duration-300 ${
              menuOpen ? 'rotate-45 translate-y-2.5' : ''
            }`}
          />
          <span
            className={`w-full h-0.5 bg-white transition-opacity duration-300 ${
              menuOpen ? 'opacity-0' : ''
            }`}
          />
          <span
            className={`w-full h-0.5 bg-white transition-transform duration-300 ${
              menuOpen ? '-rotate-45 -translate-y-2.5' : ''
            }`}
          />
        </div>
      </button>

      {/* Mobile Menu Drawer Overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 top-[64px] z-40 bg-bg/98 backdrop-blur-2xl md:hidden flex flex-col justify-center px-8 py-12"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex flex-col gap-6">
              {sections.map(({ id, label }, index) => {
                const isActive = active === id;
                return (
                  <button
                    key={id}
                    onClick={() => scrollTo(id)}
                    className="flex items-center justify-between text-left group border-b border-white/10 pb-4"
                  >
                    <span
                      className={`text-2xl tracking-[0.2em] font-mono uppercase transition-colors duration-300 ${
                        isActive ? 'text-red-600 font-bold' : 'text-white/80 group-hover:text-white'
                      }`}
                      style={{ fontFamily: "'JetBrains Mono', monospace" }}
                    >
                      {label}
                    </span>
                    <span
                      className="font-mono text-xs text-white/40 tracking-widest"
                      style={{ fontFamily: "'JetBrains Mono', monospace" }}
                    >
                      0{index + 1}
                    </span>
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
