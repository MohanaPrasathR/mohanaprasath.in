'use client';

import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { projects } from '@/lib/data';

export default function Projects() {
  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true, margin: '-80px' });
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <section id="projects" className="relative">
      {/* Section header */}
      <div
        ref={headerRef}
        className="px-6 md:px-12 lg:px-20 pt-24 pb-16"
      >
        <motion.div
          className="flex items-center gap-3 mb-10"
          initial={{ opacity: 0 }}
          animate={headerInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="gold-line" />
          <span
            className="text-xs tracking-[0.3em] text-gold font-mono uppercase"
            style={{ fontFamily: "'JetBrains Mono', monospace" }}
          >
            Featured Projects
          </span>
        </motion.div>

        <motion.h2
          className="section-title text-white-primary"
          style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
          initial={{ opacity: 0, y: 40 }}
          animate={headerInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          Selected<br />
          <span style={{ WebkitTextStroke: '1px rgba(247,247,245,0.25)', color: 'transparent' }}>
            Work
          </span>
        </motion.h2>
      </div>

      {/* Fullscreen project sections */}
      {projects.map((project, i) => (
        <ProjectSlide
          key={project.id}
          project={project}
          index={i}
          isActive={activeIndex === i}
          onHover={setActiveIndex}
        />
      ))}
    </section>
  );
}

function ProjectSlide({
  project,
  index,
  isActive,
  onHover,
}: {
  project: (typeof projects)[0];
  index: number;
  isActive: boolean;
  onHover: (i: number | null) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-150px' });

  return (
    <div
      ref={ref}
      className="relative min-h-screen flex items-center border-t border-white/[0.05] group"
      style={{ backgroundColor: project.bgTone }}
      onMouseEnter={() => onHover(index)}
      onMouseLeave={() => onHover(null)}
    >
      {/* Hover gold overlay */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{ opacity: isActive ? 1 : 0 }}
        transition={{ duration: 0.6 }}
        style={{
          background: 'radial-gradient(ellipse at center, rgba(212,175,55,0.04) 0%, transparent 70%)',
        }}
      />

      {/* Project number — large background text */}
      <motion.div
        className="absolute right-6 md:right-12 top-1/2 -translate-y-1/2 select-none pointer-events-none"
        initial={{ opacity: 0, x: 40 }}
        animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 40 }}
        transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
      >
        <span
          className="font-display font-thin"
          style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: 'clamp(8rem, 20vw, 22rem)',
            lineHeight: 1,
            color: 'transparent',
            WebkitTextStroke: '1px rgba(212,175,55,0.08)',
          }}
        >
          {project.id}
        </span>
      </motion.div>

      {/* Content */}
      <div className="relative z-10 max-w-[1400px] w-full mx-auto px-6 md:px-12 lg:px-20 py-24 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Left */}
        <div>
          <motion.div
            className="flex items-center gap-4 mb-8"
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <span
              className="project-number"
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
            >
              {project.id}
            </span>
            <span className="w-8 h-px bg-gold/40" />
            <span
              className="text-xs text-white-muted tracking-[0.2em] font-mono uppercase"
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
            >
              {project.category}
            </span>
          </motion.div>

          <motion.h3
            className="font-display font-light text-white-primary mb-6"
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: 'clamp(2.5rem, 6vw, 6rem)',
              lineHeight: 0.95,
              letterSpacing: '-0.02em',
            }}
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            {project.title}
          </motion.h3>

          {/* Tech stack */}
          <motion.div
            className="flex flex-wrap gap-2"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.7, delay: 0.35 }}
          >
            {project.tech.map((t) => (
              <span
                key={t}
                className="px-3 py-1 text-xs border border-white/10 text-white-muted font-mono"
                style={{ fontFamily: "'JetBrains Mono', monospace", letterSpacing: '0.08em' }}
              >
                {t}
              </span>
            ))}
          </motion.div>
        </div>

        {/* Right */}
        <div className="flex flex-col gap-6">
          <motion.p
            className="text-base md:text-lg text-white-muted leading-relaxed"
            style={{ fontFamily: "'Inter', system-ui, sans-serif", fontWeight: 300 }}
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.9, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            {project.description}
          </motion.p>

          <motion.p
            className="text-sm text-white-faint leading-relaxed"
            style={{ fontFamily: "'Inter', system-ui, sans-serif", fontWeight: 300 }}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {project.longDescription}
          </motion.p>

          <motion.div
            className="flex items-center gap-6 pt-2"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
          >
            <span
              className="text-xs text-gold font-mono tracking-[0.2em]"
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
            >
              {project.year}
            </span>
            <div className="flex-1 h-px bg-white/5" />
          </motion.div>
        </div>
      </div>
    </div>
  );
}
