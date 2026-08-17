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
    if (id === 'hero') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setActive('hero');
      return;
    }
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  useEffect(() => {
    const saved = localStorage.getItem('theme') as 'dark' | 'light' | null;
    if (saved) {
      setTheme(saved);
      if (saved === 'light') {
        document.documentElement.classList.add('light-mode');
      }
    }
  }, []);

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    localStorage.setItem('theme', next);
    if (next === 'light') {
      document.documentElement.classList.add('light-mode');
    } else {
      document.documentElement.classList.remove('light-mode');
    }
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
          background: scrolled || menuOpen ? (theme === 'light' ? 'rgba(248,250,252,0.95)' : 'rgba(5,5,5,0.92)') : 'transparent',
          borderBottom: scrolled || menuOpen ? (theme === 'light' ? '1px solid rgba(15,23,42,0.1)' : '1px solid rgba(255,255,255,0.08)') : '1px solid transparent',
        }}
      />

      {/* Outstanding Glowing MP Monogram Emblem + Brand Name */}
      <button
        onClick={() => scrollTo('hero')}
        className="relative z-10 flex items-center gap-3.5 group shrink-0"
        aria-label="Back to top"
      >
        {/* Outer Animated Glow Ring & Gradient Border */}
        <div className="relative p-[1.5px] rounded-xl bg-gradient-to-br from-red-600 via-red-500 to-amber-500 shadow-[0_0_18px_rgba(220,38,38,0.4)] group-hover:shadow-[0_0_30px_rgba(220,38,38,0.85)] group-hover:scale-105 transition-all duration-500">
          {/* Inner Emblem Box */}
          <div
            className={`w-10 h-10 md:w-11 md:h-11 rounded-[10.5px] flex items-center justify-center relative overflow-hidden transition-colors duration-300 ${
              theme === 'light'
                ? 'bg-slate-900 text-white'
                : 'bg-neutral-950/95 text-white backdrop-blur-md'
            }`}
          >
            {/* Ambient inner red glow */}
            <div className="absolute inset-0 bg-gradient-to-tr from-red-600/30 via-transparent to-amber-500/20 opacity-70 group-hover:opacity-100 transition-opacity duration-500" />

            {/* Pure White Sharp 3D Monogram Vector SVG */}
            <svg
              viewBox="0 0 260 200"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-7 h-7 relative z-10 transition-transform duration-500 group-hover:scale-110"
            >
              <path
                d="M 28 55 L 50 32 H 78 L 62 55 V 140 L 42 162 H 28 V 55 Z
                   M 62 55 L 122 135 L 182 55 V 140 L 162 162 H 146 V 55 Z
                   M 162 55 L 180 32 H 222 C 244 32 254 46 254 68 C 254 90 244 104 222 104 H 192 V 148 L 172 168 H 156 V 55 Z
                   M 192 52 H 218 C 230 52 236 58 236 68 C 236 78 230 84 218 84 H 192 V 52 Z"
                fill="#FFFFFF"
                stroke="#F8FAFC"
                strokeWidth="3"
                strokeLinejoin="miter"
              />
              <path
                d="M 36 58 L 48 44 H 68 L 56 58 V 132 L 44 148 H 36 Z
                   M 56 58 L 122 126 L 174 58 V 132 L 164 148 H 154 V 58 Z
                   M 170 58 L 182 44 H 214 C 230 44 238 52 238 68 C 238 84 230 92 214 92 H 184 V 138 L 170 152 Z
                   M 184 60 H 210 C 220 60 224 63 224 68 C 224 73 220 76 210 76 H 184 Z"
                fill="#FFFFFF"
                opacity="0.9"
              />
            </svg>
          </div>
        </div>

        {/* Brand Name & Subtitle Badge */}
        <div className="flex flex-col text-left">
          <span
            className={`font-mono text-xs md:text-sm font-bold tracking-[0.22em] uppercase transition-colors duration-300 ${
              theme === 'light'
                ? 'text-slate-900 group-hover:text-red-600'
                : 'text-white group-hover:text-red-500'
            }`}
            style={{ fontFamily: "'JetBrains Mono', monospace" }}
          >
            MOHANA PRASATH
          </span>
          <span
            className="text-[9px] font-mono tracking-[0.22em] text-red-500 uppercase font-semibold flex items-center gap-1.5"
            style={{ fontFamily: "'JetBrains Mono', monospace" }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-red-600 animate-pulse" />
            AI &amp; FULL STACK
          </span>
        </div>
      </button>

      {/* Desktop Navigation Links + Theme Toggle */}
      <nav className="relative z-10 hidden md:flex items-center gap-6">
        {sections.slice(1).map(({ id, label }) => {
          const isActive = active === id;
          return (
            <button
              key={id}
              onClick={() => scrollTo(id)}
              className="relative group text-xs tracking-[0.2em] uppercase font-mono transition-colors duration-300 py-1"
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                color: isActive ? '#DC2626' : (theme === 'light' ? '#0F172A' : 'rgba(247,247,245,0.8)'),
              }}
            >
              {label}
              <span
                className="absolute -bottom-0.5 left-0 h-[2px] bg-red-600 transition-all duration-300"
                style={{ width: isActive ? '100%' : '0%' }}
              />
              {!isActive && (
                <span className="absolute -bottom-0.5 left-0 h-[2px] bg-red-500/40 w-0 group-hover:w-full transition-all duration-300" />
              )}
            </button>
          );
        })}

        {/* Theme Toggle Button */}
        <button
          onClick={toggleTheme}
          className={`ml-2 p-2 rounded-full border transition-all duration-300 flex items-center justify-center ${
            theme === 'light'
              ? 'border-slate-300 bg-white text-slate-800 hover:border-red-500 hover:bg-slate-100 shadow-sm'
              : 'border-white/30 bg-white/10 text-white hover:border-red-500 hover:bg-white/20 shadow-sm'
          }`}
          title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} mode`}
          aria-label="Toggle theme"
        >
          {theme === 'dark' ? (
            /* Sun Icon for Light mode */
            <svg className="w-4 h-4 text-amber-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          ) : (
            /* Moon Icon for Dark mode */
            <svg className="w-4 h-4 text-sky-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
            </svg>
          )}
        </button>
      </nav>

      {/* Mobile Hamburger Button */}
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className={`relative z-50 md:hidden p-2 focus:outline-none ${
          theme === 'light' ? 'text-slate-900' : 'text-white'
        }`}
        aria-label="Toggle menu"
      >
        <div className="w-6 h-5 flex flex-col justify-between">
          <span
            className={`w-full h-0.5 transition-transform duration-300 ${
              theme === 'light' ? 'bg-slate-900' : 'bg-white'
            } ${menuOpen ? 'rotate-45 translate-y-2.5' : ''}`}
          />
          <span
            className={`w-full h-0.5 transition-opacity duration-300 ${
              theme === 'light' ? 'bg-slate-900' : 'bg-white'
            } ${menuOpen ? 'opacity-0' : ''}`}
          />
          <span
            className={`w-full h-0.5 transition-transform duration-300 ${
              theme === 'light' ? 'bg-slate-900' : 'bg-white'
            } ${menuOpen ? '-rotate-45 -translate-y-2.5' : ''}`}
          />
        </div>
      </button>

      {/* Mobile Menu Drawer Overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className={`fixed inset-0 top-[64px] z-40 backdrop-blur-2xl md:hidden flex flex-col justify-center px-8 py-12 ${
              theme === 'light' ? 'bg-slate-50/98 text-slate-900' : 'bg-bg/98 text-white'
            }`}
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
                    className={`flex items-center justify-between text-left group border-b pb-4 ${
                      theme === 'light' ? 'border-slate-200' : 'border-white/10'
                    }`}
                  >
                    <span
                      className={`text-2xl tracking-[0.2em] font-mono uppercase transition-colors duration-300 ${
                        isActive
                          ? 'text-red-600'
                          : theme === 'light'
                          ? 'text-slate-900 group-hover:text-red-600'
                          : 'text-white group-hover:text-red-500'
                      }`}
                      style={{ fontFamily: "'JetBrains Mono', monospace" }}
                    >
                      {label}
                    </span>
                    <span
                      className="text-xs font-mono text-red-500"
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
