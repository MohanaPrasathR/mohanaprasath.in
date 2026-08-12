'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { skills } from '@/lib/data';

const allSkills = skills.flatMap((s) => s.items);

export default function Skills() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="skills" ref={ref} className="relative py-12 md:py-20 overflow-hidden">
      {/* Accent line */}
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
            Expertise
          </span>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start mb-12">
          {/* Title */}
          <div>
            <motion.h2
              className="section-title text-white-primary"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
              transition={{ duration: 0.9, delay: 0.1, ease: "easeOut" }}
            >
              The Stack
            </motion.h2>
            <motion.p
              className="mt-6 text-base text-white-muted max-w-sm leading-relaxed"
              style={{ fontFamily: "'Inter', system-ui, sans-serif", fontWeight: 300 }}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8, delay: 0.25 }}
            >
              Tools I reach for when I need to build something that actually works.
            </motion.p>
          </div>

          {/* Categories grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {skills.map((group, gi) => (
              <motion.div
                key={group.category}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.7, delay: 0.2 + gi * 0.08, ease: "easeOut" }}
              >
                <p
                  className="text-xs font-bold tracking-[0.25em] text-red-500 font-mono uppercase mb-4"
                  style={{ fontFamily: "'JetBrains Mono', monospace" }}
                >
                  {group.category}
                </p>
                <div className="flex flex-col gap-2">
                  {group.items.map((item, ii) => (
                    <motion.div
                      key={item}
                      className="group flex items-center gap-3 py-2.5 border-b border-white/10 hover:border-red-500/50 transition-colors duration-300"
                      initial={{ opacity: 0, x: -10 }}
                      animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                      transition={{ duration: 0.5, delay: 0.3 + gi * 0.08 + ii * 0.05 }}
                    >
                      <span
                        className="w-1.5 h-1.5 rounded-full bg-red-500 group-hover:scale-125 transition-all duration-300 flex-shrink-0"
                      />
                      <span
                        className="text-sm font-medium text-white group-hover:text-red-400 transition-colors duration-300"
                        style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
                      >
                        {item}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Marquee strip ─── */}
      <div className="w-full overflow-hidden bg-white/[0.05] border-y border-white/20 py-5 my-4">
        <div className="marquee-track">
          {[...allSkills, ...allSkills].map((skill, i) => (
            <span
              key={i}
              className="flex items-center gap-4 whitespace-nowrap text-sm font-bold text-white font-mono"
              style={{ fontFamily: "'JetBrains Mono', monospace", letterSpacing: '0.15em' }}
            >
              {skill}
              <span className="text-red-500 font-bold text-base">◆</span>
            </span>
          ))}
        </div>
      </div>

      <div
        className="absolute bottom-0 left-0 w-full h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(212,175,55,0.15), transparent)' }}
      />
    </section>
  );
}
