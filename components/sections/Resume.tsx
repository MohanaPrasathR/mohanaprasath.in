'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { experience, education, personal } from '@/lib/data';

export default function Resume() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="resume" ref={ref} className="relative py-12 md:py-20 overflow-hidden">
      <div
        className="absolute top-0 left-0 w-full h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(212,175,55,0.25), transparent)' }}
      />

      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20">
        {/* Header */}
        <motion.div
          className="flex items-center gap-3 mb-10"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="gold-line" />
          <span
            className="text-xs tracking-[0.3em] text-gold font-mono uppercase"
            style={{ fontFamily: "'JetBrains Mono', monospace" }}
          >
            Résumé
          </span>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 mb-12">
          {/* Title + CTA */}
          <div className="flex flex-col justify-between gap-12">
            <motion.h2
              className="section-title text-white-primary"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
              transition={{ duration: 0.9, delay: 0.1, ease: "easeOut" }}
            >
              Experience<br />
              <span style={{ WebkitTextStroke: '1px rgba(247,247,245,0.2)', color: 'transparent' }}>
                &amp; Growth
              </span>
            </motion.h2>

            {/* Download CTA */}
            <motion.a
              href={personal.resumeUrl}
              download="Mohana_Prasath_Resume.pdf"
              className="group self-start inline-flex items-center gap-4 px-8 py-4 border border-gold/30 hover:border-gold hover:bg-gold hover:text-bg transition-all duration-500"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              style={{ fontFamily: "'JetBrains Mono', monospace", letterSpacing: '0.15em' }}
            >
              <span className="text-sm text-gold group-hover:text-bg transition-colors duration-300 tracking-[0.2em]">
                DOWNLOAD RÉSUMÉ
              </span>
              <svg
                className="w-4 h-4 text-gold group-hover:text-bg group-hover:translate-y-0.5 transition-all duration-300"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
              </svg>
            </motion.a>
          </div>

          {/* Experience timeline */}
          <div className="flex flex-col gap-0">
            {experience.map((item, i) => (
              <motion.div
                key={i}
                className="relative flex gap-6 pb-10 last:pb-0"
                initial={{ opacity: 0, x: 30 }}
                animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
                transition={{ duration: 0.8, delay: 0.2 + i * 0.12, ease: "easeOut" }}
              >
                {/* Timeline line */}
                <div className="flex flex-col items-center">
                  <div className="w-2 h-2 rounded-full border border-gold flex-shrink-0 mt-1.5" />
                  {i < experience.length - 1 && (
                    <div className="w-px flex-1 mt-2 bg-white/[0.06]" />
                  )}
                </div>

                <div className="flex-1 pb-2">
                  <div className="flex flex-wrap items-baseline justify-between gap-2 mb-1">
                    <h3
                      className="text-lg text-white-primary font-light"
                      style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 400 }}
                    >
                      {item.role}
                    </h3>
                    <span
                      className="text-xs text-gold font-mono"
                      style={{ fontFamily: "'JetBrains Mono', monospace", letterSpacing: '0.1em' }}
                    >
                      {item.period}
                    </span>
                  </div>
                  <p
                    className="text-sm text-gold/60 mb-3 font-mono"
                    style={{ fontFamily: "'JetBrains Mono', monospace", letterSpacing: '0.08em' }}
                  >
                    {item.company}
                  </p>
                  <p
                    className="text-sm text-white-muted leading-relaxed mb-3"
                    style={{ fontFamily: "'Inter', system-ui, sans-serif", fontWeight: 300 }}
                  >
                    {item.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 text-xs border border-white/[0.06] text-white-faint font-mono"
                        style={{ fontFamily: "'JetBrains Mono', monospace", letterSpacing: '0.06em' }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Education */}
        {education.map((ed, i) => (
          <motion.div
            key={i}
            className="border-t border-white/[0.06] pt-10 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.7, delay: 0.6 }}
          >
            <div>
              <p
                className="text-xs text-gold font-mono tracking-[0.2em] uppercase mb-2"
                style={{ fontFamily: "'JetBrains Mono', monospace" }}
              >
                Education
              </p>
              <h3
                className="text-xl text-white-primary font-light"
                style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
              >
                {ed.degree}
              </h3>
              <p
                className="text-sm text-white-muted font-mono mt-1"
                style={{ fontFamily: "'JetBrains Mono', monospace" }}
              >
                {ed.institution}
              </p>
            </div>
            <div className="text-right">
              <p
                className="text-sm text-gold font-mono"
                style={{ fontFamily: "'JetBrains Mono', monospace", letterSpacing: '0.1em' }}
              >
                {ed.period}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      <div
        className="absolute bottom-0 left-0 w-full h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(212,175,55,0.15), transparent)' }}
      />
    </section>
  );
}
