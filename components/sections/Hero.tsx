'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { personal } from '@/lib/data';
import type { Variants } from "framer-motion";

/* ── Stagger reveal variant ─────────────────────────────────── */
const charVariants = {
  hidden: { y: '110%', opacity: 0 },
  visible: (i: number) => ({
    y: '0%',
    opacity: 1,
    transition: { duration: 1.0, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] as const },
  }),
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay: i * 0.1 + 0.6, ease: [0.16, 1, 0.3, 1] as const },
  }),
};

export default function Hero({ ready }: { ready: boolean }) {
  const bgRef = useRef<HTMLDivElement>(null);
  const orbRef = useRef<HTMLDivElement>(null);

  // Subtle mouse-parallax background
  useEffect(() => {
    if (!bgRef.current) return;
    const onMove = (e: MouseEvent) => {
      const xPct = (e.clientX / window.innerWidth - 0.5) * 20;
      const yPct = (e.clientY / window.innerHeight - 0.5) * 20;
      gsap.to(bgRef.current, { x: xPct, y: yPct, duration: 2, ease: 'power1.out' });
      gsap.to(orbRef.current, { x: xPct * 1.5, y: yPct * 1.5, duration: 2.5, ease: 'power1.out' });
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  const firstName = personal.nameFirst.split('');
  const lastName = personal.nameLast.split('');

  return (
    <section
      id="hero"
      className="relative flex flex-col justify-end pb-8 sm:pb-16 md:pb-20 px-4 sm:px-8 md:px-12 lg:px-20 overflow-hidden pt-20 sm:pt-28 md:pt-32 md:min-h-screen"
    >
      {/* ── Animated background ─── */}
      <div ref={bgRef} className="absolute inset-0 pointer-events-none" aria-hidden>
        {/* Gold orb */}
        <div
          ref={orbRef}
          className="absolute top-[20%] right-[10%] w-[clamp(300px,40vw,600px)] h-[clamp(300px,40vw,600px)] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(212,175,55,0.06) 0%, transparent 70%)',
            filter: 'blur(60px)',
          }}
        />
        {/* Second orb */}
        <div
          className="absolute bottom-[10%] left-[-5%] w-[clamp(200px,30vw,400px)] h-[clamp(200px,30vw,400px)] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(212,175,55,0.04) 0%, transparent 70%)',
            filter: 'blur(80px)',
          }}
        />
        {/* Subtle grid */}
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(247,247,245,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(247,247,245,0.3) 1px, transparent 1px)',
            backgroundSize: '80px 80px',
          }}
        />
      </div>

      {/* ── Hero content ─── */}
      <div className="relative z-10 max-w-[1400px] w-full mx-auto">
        {/* Available badge */}
        {ready && (
          <motion.div
            className="flex items-center gap-2 mb-10 md:mb-14"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <span className="w-2 h-2 rounded-full bg-gold animate-pulse-slow" />
            <span className="text-xs tracking-[0.25em] text-white-muted font-mono uppercase" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
              {personal.availability}
            </span>
          </motion.div>
        )}

        {/* Name */}
        <div className="mb-4 md:mb-6">
          {/* MOHANA */}
          <div className="clip-reveal flex">
            {firstName.map((char, i) => (
              <motion.span
                key={i}
                custom={0}
                variants={charVariants}
                initial="hidden"
                animate={ready ? 'visible' : 'hidden'}
                className="hero-title"
                style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
              >
                {char}
              </motion.span>
            ))}
          </div>
          {/* PRASATH */}
          <div className="clip-reveal flex">
            {lastName.map((char, i) => (
              <motion.span
                key={i}
                custom={i + firstName.length}
                variants={charVariants}
                initial="hidden"
                animate={ready ? 'visible' : 'hidden'}
                className="hero-title text-transparent"
                style={{
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                  WebkitTextStroke: '1px rgba(247,247,245,0.4)',
                }}
              >
                {char}
              </motion.span>
            ))}
          </div>
        </div>

        {/* Divider line + title row */}
        <motion.div
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 md:gap-0"
          custom={0}
          variants={fadeUp}
          initial="hidden"
          animate={ready ? 'visible' : 'hidden'}
        >
          <div className="flex items-center gap-4">
            <div className="gold-line" />
            <span
              className="text-sm md:text-base tracking-[0.2em] text-white-muted font-mono uppercase"
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
            >
              {personal.title}
            </span>
          </div>

          {/* Tagline + CTA */}
          <div className="flex flex-col md:items-end gap-4">
            <p
              className="text-sm md:text-base text-white-muted max-w-xs md:text-right"
              style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
            >
              {personal.tagline}
            </p>

            {/* Resume Download */}
            <motion.a
              href={personal.resumeUrl}
              download="Mohana_Prasath_Resume.pdf"
              className="group inline-flex items-center gap-3 px-5 py-2.5 border border-gold/30 hover:border-gold text-sm text-gold hover:bg-gold hover:text-bg transition-all duration-500"
              custom={1}
              variants={fadeUp}
              initial="hidden"
              animate={ready ? 'visible' : 'hidden'}
              style={{ fontFamily: "'JetBrains Mono', monospace", letterSpacing: '0.15em' }}
            >
              <svg
                className="w-3.5 h-3.5 group-hover:-translate-y-0.5 transition-transform duration-300"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
              </svg>
              RÉSUMÉ
            </motion.a>
          </div>
        </motion.div>
      </div>

      {/* ── Scroll indicator ─── */}
      {ready && (
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8, duration: 1 }}
        >
          <span className="text-[10px] tracking-[0.3em] text-white-faint font-mono uppercase" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
            Scroll
          </span>
          <div className="w-px h-12 bg-gradient-to-b from-gold/40 to-transparent">
            <div
              className="w-px bg-gold"
              style={{
                height: '40%',
                animation: 'scrollBar 1.5s ease-in-out infinite',
              }}
            />
          </div>
          <style>{`
            @keyframes scrollBar {
              0%   { transform: translateY(0); opacity: 1; }
              100% { transform: translateY(200%); opacity: 0; }
            }
          `}</style>
        </motion.div>
      )}
    </section>
  );
}
