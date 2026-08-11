'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { personal } from '@/lib/data';

export default function Contact() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section
      id="contact"
      ref={ref}
      className="relative flex flex-col py-16 md:py-24 overflow-hidden"
    >
      {/* Top gold line */}
      <div
        className="absolute top-0 left-0 w-full h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(212,175,55,0.3), transparent)' }}
      />

      {/* Background radial glow */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at bottom, rgba(212,175,55,0.05) 0%, transparent 70%)',
          filter: 'blur(40px)',
        }}
      />

      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20 w-full flex flex-col flex-1 justify-center gap-20">

        {/* Section label */}
        <motion.div
          className="flex items-center gap-3"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="gold-line" />
          <span
            className="text-xs tracking-[0.3em] text-gold font-mono uppercase"
            style={{ fontFamily: "'JetBrains Mono', monospace" }}
          >
            Connect
          </span>
        </motion.div>

        {/* Headline */}
        <div>
          <motion.h2
            className="section-title text-white-primary mb-4"
            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
            initial={{ opacity: 0, y: 50 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 1, delay: 0.1, ease: "easeOut" }}
          >
            Let&apos;s build
          </motion.h2>
          <motion.h2
            className="section-title"
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              WebkitTextStroke: '1px rgba(247,247,245,0.2)',
              color: 'transparent',
            }}
            initial={{ opacity: 0, y: 50 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
          >
            something great.
          </motion.h2>
        </div>

        {/* Social link rows */}
        <motion.div
          className="flex flex-col gap-0"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          {personal.socials.map((s, i) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-between py-8 border-t border-white/[0.06] hover:border-gold/30 transition-all duration-500"
            >
              {/* Number + Label */}
              <div className="flex items-center gap-6">
                <span
                  className="text-xs text-gold font-mono tracking-[0.2em]"
                  style={{ fontFamily: "'JetBrains Mono', monospace" }}
                >
                  0{i + 1}
                </span>
                <span
                  className="font-display font-light text-white-primary group-hover:text-gold transition-colors duration-500"
                  style={{
                    fontFamily: "'Cormorant Garamond', Georgia, serif",
                    fontSize: 'clamp(2rem, 5vw, 4.5rem)',
                    lineHeight: 1,
                  }}
                >
                  {s.label}
                </span>
              </div>

              {/* Arrow circle */}
              <motion.div
                className="w-10 h-10 rounded-full border border-white/10 group-hover:border-gold/40 flex items-center justify-center group-hover:bg-gold/5 transition-all duration-500"
                whileHover={{ scale: 1.1 }}
              >
                <svg
                  className="w-4 h-4 text-white-faint group-hover:text-gold transition-colors duration-300 -rotate-45"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                </svg>
              </motion.div>
            </a>
          ))}

          {/* Bottom border */}
          <div className="border-t border-white/[0.06]" />
        </motion.div>
      </div>

      {/* Footer */}
      <motion.div
        className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20 w-full flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pt-12"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.7, delay: 0.7 }}
      >
        <p
          className="text-xs text-white-faint font-mono tracking-[0.15em]"
          style={{ fontFamily: "'JetBrains Mono', monospace" }}
        >
          © {new Date().getFullYear()} Mohana Prasath R.
        </p>
        <p
          className="text-xs text-white-faint font-mono tracking-[0.15em]"
          style={{ fontFamily: "'JetBrains Mono', monospace" }}
        >
          Chennai, India
        </p>
      </motion.div>
    </section>
  );
}
