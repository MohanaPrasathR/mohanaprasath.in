'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { personal } from '@/lib/data';

import type { Variants } from "framer-motion";

const fadeUp = (delay = 0): Variants => ({
  hidden: {
    opacity: 0,
    y: 50,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.9,
      delay,
      ease: "easeOut",
    
    },
  },
});
export default function About() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section
      id="about"
      ref={ref}
      className="relative flex items-center px-4 sm:px-8 md:px-12 lg:px-20 py-12 md:py-24 overflow-hidden"
    >
      {/* Background accent */}
      <div
        className="absolute top-0 left-0 w-full h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(212,175,55,0.3), transparent)' }}
      />

      <div className="max-w-[1400px] w-full mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
        {/* Left — section label + title */}
        <div>
          <motion.div
            variants={fadeUp(0)}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            className="flex items-center gap-3 mb-10"
          >
            <span className="gold-line" />
            <span
              className="text-xs tracking-[0.3em] text-gold font-mono uppercase"
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
            >
              Who I Am
            </span>
          </motion.div>

          <div className="overflow-hidden mb-4">
            <motion.h2
              variants={fadeUp(0.1)}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
              className="section-title text-white-primary"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
            >
              Engineer.
            </motion.h2>
          </div>
          <div className="overflow-hidden">
            <motion.h2
              variants={fadeUp(0.2)}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
              className="section-title text-white-muted"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
            >
              Builder.
            </motion.h2>
          </div>
          <div className="overflow-hidden">
            <motion.h2
              variants={fadeUp(0.3)}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
              className="section-title"
              style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                WebkitTextStroke: '1.5px rgba(220,38,38,0.6)',
                color: 'transparent',
              }}
            >
              Craftsman.
            </motion.h2>
          </div>
        </div>

        {/* Right — bio */}
        <div className="flex flex-col gap-8">
          <motion.p
            variants={fadeUp(0.3)}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            className="text-lg md:text-xl text-white-primary leading-relaxed"
            style={{ fontFamily: "'Inter', system-ui, sans-serif", fontWeight: 300 }}
          >
            {personal.bio}
          </motion.p>

          <motion.p
            variants={fadeUp(0.4)}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            className="text-base text-white-muted leading-relaxed"
            style={{ fontFamily: "'Inter', system-ui, sans-serif", fontWeight: 300 }}
          >
            {personal.bioLine2}
          </motion.p>

          {/* Stats row */}
          <motion.div
            variants={fadeUp(0.5)}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            className="grid grid-cols-2 gap-6 pt-6 border-t border-white/20"
          >
            {[
              { num: '6+', label: 'Certifications' },
              { num: '5+', label: 'Projects Built' },
            ].map((stat) => (
              <div key={stat.label} className="p-4 rounded-xl border border-white/10 bg-white/[0.03] backdrop-blur-sm">
                <p
                  className="text-3xl md:text-4xl font-display font-bold text-white mb-1"
                  style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                >
                  {stat.num}
                </p>
                <p
                  className="text-xs text-gray-300 font-semibold tracking-[0.1em] uppercase font-mono"
                  style={{ fontFamily: "'JetBrains Mono', monospace" }}
                >
                  {stat.label}
                </p>
              </div>
            ))}
          </motion.div>

          {/* Location pill */}
          <motion.div
            variants={fadeUp(0.6)}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            className="inline-flex items-center gap-2 self-start"
          >
            <svg className="w-3 h-3 text-gold" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
            </svg>
            <span
              className="text-xs text-white-muted tracking-[0.2em] font-mono"
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
            >
              {personal.location}
            </span>
          </motion.div>
        </div>
      </div>

      {/* Bottom line */}
      <div
        className="absolute bottom-0 left-0 w-full h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(212,175,55,0.15), transparent)' }}
      />
    </section>
  );
}
