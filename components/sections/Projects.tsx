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
          className="section-title text-white font-bold tracking-tight"
          style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
          initial={{ opacity: 0, y: 40 }}
          animate={headerInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.9, delay: 0.1, ease: "easeOut" }}
        >
          FEATURED<br />
          <span className="text-red-500 font-bold">
            PROJECTS
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

          {/* Tech stack brand icons */}
          <motion.div
            className="flex flex-wrap gap-3 items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.7, delay: 0.35 }}
          >
            {project.tech.map((t) => (
              <TechIcon key={t} name={t} />
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

function TechIcon({ name }: { name: string }) {
  const getIcon = (tech: string) => {
    const t = tech.toLowerCase();
    if (t.includes('next')) {
      return (
        <svg className="w-4 h-4 text-white fill-current" viewBox="0 0 24 24">
          <path d="M12 0C5.37 0 0 5.37 0 12s5.37 12 12 12 12-5.37 12-12S18.63 0 12 0zm5.66 18.06L9.5 7.7v8.8H7.7V7.5h1.8l8.16 10.56zM15 7.5v4.5h-1.8V7.5H15z"/>
        </svg>
      );
    }
    if (t.includes('react')) {
      return (
        <svg className="w-4 h-4 text-sky-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="2" fill="currentColor"/>
          <ellipse cx="12" cy="12" rx="10" ry="4.5"/>
          <ellipse cx="12" cy="12" rx="10" ry="4.5" transform="rotate(60 12 12)"/>
          <ellipse cx="12" cy="12" rx="10" ry="4.5" transform="rotate(120 12 12)"/>
        </svg>
      );
    }
    if (t.includes('typescript') || t === 'ts') {
      return (
        <svg className="w-4 h-4 text-blue-400 fill-current" viewBox="0 0 24 24">
          <path d="M1.5 0h21A1.5 1.5 0 0124 1.5v21a1.5 1.5 0 01-1.5 1.5h-21A1.5 1.5 0 010 22.5v-21A1.5 1.5 0 011.5 0zM12 8.5H6.5v2.3h1.9v8.7h2.7v-8.7h1.9V8.5zm7.3 3.8c-.5-.6-1.3-.9-2.4-.9-1 0-1.8.3-2.3.9-.6.6-.8 1.4-.8 2.5 0 1.2.3 2.1.9 2.7.6.6 1.4.9 2.4.9 1.1 0 1.9-.3 2.4-.9.6-.6.8-1.5.8-2.7 0-1.1-.2-2-.8-2.5zm-1.1 4.1c-.3.4-.8.6-1.4.6-.6 0-1.1-.2-1.4-.6-.3-.4-.4-1-.4-1.8 0-.8.1-1.4.4-1.8.3-.4.8-.6 1.4-.6.6 0 1.1.2 1.4.6.3.4.4 1 .4 1.8 0 .8-.1 1.4-.4 1.8z"/>
        </svg>
      );
    }
    if (t.includes('python')) {
      return (
        <svg className="w-4 h-4 text-amber-300 fill-current" viewBox="0 0 24 24">
          <path d="M11.9 2c-5.2 0-4.9 2.3-4.9 2.3v2.4h5v.7H5.2S2.9 7.1 2.9 12.3c0 5.2 2 5 2 5h1.2v-2.5c0-2.8 2.4-2.8 2.4-2.8h4.9s2.3.1 2.3-2.3V4.3S17.1 2 11.9 2zm-2.6 1.6c.5 0 .9.4.9.9s-.4.9-.9.9-.9-.4-.9-.9.4-.9.9-.9zm.2 18.4c5.2 0 4.9-2.3 4.9-2.3v-2.4h-5v-.7h6.8s2.3.3 2.3-4.9c0-5.2-2-5-2-5h-1.2v2.5c0 2.8-2.4 2.8-2.4 2.8H7.9s-2.3-.1-2.3 2.3v4.9s-1.4 2.3 3.8 2.3zm2.6-1.6c-.5 0-.9-.4-.9-.9s.4-.9.9-.9.9.4.9.9-.4.9-.9.9z"/>
        </svg>
      );
    }
    if (t.includes('node')) {
      return (
        <svg className="w-4 h-4 text-emerald-400 fill-current" viewBox="0 0 24 24">
          <path d="M12 2L2 7.8v8.4L12 22l10-5.8V7.8L12 2zm0 2.3l7.5 4.3v5.8L12 18.7l-7.5-4.3V8.6L12 4.3z"/>
        </svg>
      );
    }
    if (t.includes('express')) {
      return (
        <svg className="w-4 h-4 text-gray-200 fill-current" viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 14.5h-4V15h4v1.5zm1.5-3.5h-5.5V11H14.5v2zm1.5-3.5h-7V7.5h7V9z"/>
        </svg>
      );
    }
    if (t.includes('flask')) {
      return (
        <svg className="w-4 h-4 text-gray-100 fill-current" viewBox="0 0 24 24">
          <path d="M9 2v2h1v4.17A7.001 7.001 0 005 15c0 3.87 3.13 7 7 7s7-3.13 7-7c0-3.1-2.02-5.73-5-6.83V4h1V2H9zm3 8a5 5 0 015 5H7a5 5 0 015-5z"/>
        </svg>
      );
    }
    if (t.includes('sql') || t.includes('dbms')) {
      return (
        <svg className="w-4 h-4 text-cyan-400 fill-current" viewBox="0 0 24 24">
          <path d="M12 3C7.58 3 4 4.79 4 7v10c0 2.21 3.58 4 8 4s8-1.79 8-4V7c0-2.21-3.58-4-8-4zm0 2c3.87 0 6 1.34 6 2s-2.13 2-6 2-6-1.34-6-2 2.13-2 6-2zm0 6c-3.87 0-6-1.34-6-2v2.5c0 .66 2.13 2 6 2s6-1.34 6-2V9c0 .66-2.13 2-6 2zm0 5c-3.87 0-6-1.34-6-2v2.5c0 .66 2.13 2 6 2s6-1.34 6-2V14c0 .66-2.13 2-6 2z"/>
        </svg>
      );
    }
    if (t.includes('css')) {
      return (
        <svg className="w-4 h-4 text-blue-500 fill-current" viewBox="0 0 24 24">
          <path d="M3 3l1.6 18L12 23l7.4-2L21 3H3zm14.3 4.5l-.3 3.5H8.8l.3 3.5h7.9l-.6 6.5-4.4 1.2-4.4-1.2-.3-3h2.3l.1 1.4 2.3.6 2.3-.6.2-2.7H6.3l-.8-8.4h11.8z"/>
        </svg>
      );
    }
    // Default AI / ML / Scikit-Learn / Pandas icon
    return (
      <svg className="w-4 h-4 text-purple-400 fill-current" viewBox="0 0 24 24">
        <path d="M12 2L9.5 7.5L4 10l5.5 2.5L12 18l2.5-5.5L20 10l-5.5-2.5L12 2zm0 18l-1.5 3L9 20l-3-1.5L9 17l1.5-3L12 17l3 1.5L12 20z"/>
      </svg>
    );
  };

  return (
    <span className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-white/10 hover:bg-white/20 border border-white/30 hover:border-red-500 rounded-lg text-xs font-mono font-semibold text-white transition-all duration-300 shadow-sm backdrop-blur-sm">
      {getIcon(name)}
      <span>{name}</span>
    </span>
  );
}
