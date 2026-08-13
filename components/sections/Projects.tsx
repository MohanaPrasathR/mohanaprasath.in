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
        className="px-4 sm:px-8 md:px-12 lg:px-20 pt-10 md:pt-24 pb-8 md:pb-16"
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
          transition={{ duration: 0.9, delay: 0.1, ease: "easeOut" }}
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
      className="relative py-12 md:py-20 flex items-center border-t border-white/[0.05] group overflow-hidden"
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
        className="absolute right-6 md:right-12 top-1/2 -translate-y-1/2 select-none pointer-events-none z-0"
        initial={{ opacity: 0, x: 40 }}
        animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 40 }}
        transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
      >
        <span
          className="font-display font-semibold"
          style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: 'clamp(9rem, 22vw, 24rem)',
            lineHeight: 1,
            color: 'rgba(255, 255, 255, 0.06)',
            WebkitTextStroke: '2px rgba(255, 255, 255, 0.5)',
          }}
        >
          {project.id}
        </span>
      </motion.div>

      {/* Content */}
      <div className="relative z-10 max-w-[1400px] w-full mx-auto px-6 md:px-12 lg:px-20 py-6 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
        {/* Left */}
        <div>
          <motion.div
            className="flex items-center gap-4 mb-8"
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <span
              className="project-number font-bold text-red-500 text-sm tracking-widest"
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
            >
              {project.id}
            </span>
            <span className="w-8 h-px bg-red-600" />
            <span
              className="text-xs text-white font-semibold tracking-[0.25em] font-mono uppercase bg-red-600/20 px-2.5 py-1 rounded border border-red-500/40"
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
            >
              {project.category}
            </span>
          </motion.div>

          <motion.h3
            className="font-display font-light text-white mb-6"
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: 'clamp(2.5rem, 6vw, 6rem)',
              lineHeight: 0.95,
              letterSpacing: '-0.02em',
            }}
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.9, delay: 0.2, ease: "easeOut" }}
          >
            {project.title}
          </motion.h3>

          {/* Tech stack */}
          <motion.div
            className="flex flex-wrap gap-2.5"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.7, delay: 0.35 }}
          >
            {project.tech.map((t) => (
              <span
                key={t}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-mono font-semibold text-white bg-white/10 border border-white/30 rounded-md shadow-sm hover:border-red-500 hover:bg-white/20 transition-all duration-300"
                style={{ fontFamily: "'JetBrains Mono', monospace", letterSpacing: '0.08em' }}
              >
                <span>{t}</span>
              </span>
            ))}
          </motion.div>
        </div>

        {/* Right */}
        <div className="flex flex-col gap-6">
          <motion.p
            className="text-base md:text-lg text-white font-normal leading-relaxed"
            style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.9, delay: 0.3, ease: "easeOut" }}
          >
            {project.description}
          </motion.p>

          <motion.p
            className="text-sm text-gray-300 font-normal leading-relaxed"
            style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {project.longDescription}
          </motion.p>

          {/* Action buttons: Demo & Github */}
          <motion.div
            className="flex flex-wrap items-center gap-3 pt-2"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.7, delay: 0.5 }}
          >
            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-2.5 bg-sky-200 hover:bg-sky-300 text-gray-900 font-mono text-sm font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-300 flex items-center gap-2"
                style={{ fontFamily: "'JetBrains Mono', monospace" }}
              >
                <span>Demo</span>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                </svg>
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-2.5 bg-sky-200 hover:bg-sky-300 text-gray-900 font-mono text-sm font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-300 flex items-center gap-2"
                style={{ fontFamily: "'JetBrains Mono', monospace" }}
              >
                <span>Github</span>
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                </svg>
              </a>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
