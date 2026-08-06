'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { personal } from '@/lib/data';

const navItems = [
  { label: 'Who I Am', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Skills', href: '#skills' },
  { label: 'Resume', href: '#resume' },
  { label: 'Contact', href: '#contact' },
];

export default function FloatingMenu() {
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [lastY, setLastY] = useState(0);

  // Hide on scroll down, show on scroll up
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setHidden(y > lastY && y > 100);
      setLastY(y);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [lastY]);

  const handleNav = (href: string) => {
    setOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      {/* Floating menu button */}
      <motion.div
        className="fixed top-6 right-6 z-[200]"
        animate={{ y: hidden && !open ? -80 : 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <button
          onClick={() => setOpen(!open)}
          className="menu-backdrop w-14 h-14 rounded-full flex flex-col items-center justify-center gap-1.5 group"
          aria-label="Toggle menu"
        >
          <motion.span
            className="block h-px bg-white-primary"
            animate={{ width: open ? 20 : 16, rotate: open ? 45 : 0, y: open ? 4 : 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          />
          <motion.span
            className="block h-px bg-white-primary"
            animate={{ width: 20, rotate: open ? -45 : 0, y: open ? -4 : 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          />
        </button>
      </motion.div>

      {/* Logo top-left */}
      <motion.a
        href="#hero"
        className="fixed top-6 left-6 z-[200] font-mono text-xs tracking-[0.3em] text-white-muted hover:text-gold transition-colors duration-300"
        style={{ fontFamily: "'JetBrains Mono', monospace" }}
        animate={{ y: hidden && !open ? -80 : 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
      >
        MP
      </motion.a>

      {/* Fullscreen overlay menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[199] bg-bg flex flex-col items-center justify-center"
            style={{ backgroundColor: '#050505' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
          >
            <div className="grain" aria-hidden />

            <nav className="flex flex-col items-center gap-2">
              {navItems.map((item, i) => (
                <motion.button
                  key={item.label}
                  onClick={() => handleNav(item.href)}
                  className="group relative overflow-hidden text-center"
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.5, delay: i * 0.07, ease: "easeOut" }}
                >
                  <span
                    className="block font-display font-light text-white-primary hover:text-gold transition-colors duration-300"
                    style={{
                      fontFamily: "'Cormorant Garamond', Georgia, serif",
                      fontSize: 'clamp(2.5rem, 7vw, 6rem)',
                      lineHeight: 1.1,
                    }}
                  >
                    {item.label}
                  </span>
                </motion.button>
              ))}
            </nav>

            {/* Bottom bar */}
            <motion.div
              className="absolute bottom-8 left-8 right-8 flex items-end justify-between"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <p className="text-xs text-white-muted tracking-[0.2em] font-mono uppercase" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                {personal.location}
              </p>
              <div className="flex gap-6">
                {personal.socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-white-muted hover:text-gold tracking-widest font-mono transition-colors duration-300 uppercase"
                    style={{ fontFamily: "'JetBrains Mono', monospace" }}
                  >
                    {s.label}
                  </a>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
