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
      className="relative py-12 md:py-20 flex items-center border-t border-white/[0.05] group overflow-hidden project-slide"
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
          className="font-display font-semibold project-number-bg"
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

    // Java
    if (t.includes('java') && !t.includes('script')) {
      return (
        <svg className="w-4 h-4 text-[#f89820] fill-current" viewBox="0 0 24 24">
          <path d="M8.85 16.84s-.67.43.48.58c1.39.18 2.15.17 3.73-.18 0 0 .54.34.88.58-4.14 1.76-8.9-.3-5.09-.98zm-1.07-2.61s-.77.58.37.75c1.55.23 2.76.24 5.34-.31 0 0 .37.31.65.49-5.18 1.83-10.74-.23-6.36-.93zm6.39-4.88c.64.71.49 1.34.49 1.34s.82-.44.4-1.28c-.46-.91-1.63-1.42-2.14-2.12-.9-1.26-.07-2.73-.07-2.73s-.99.5-1.12 1.78c-.14 1.37.58 2.08 1.25 2.53.51.35.88.37 1.19.48zm-1.92 11.23c2.72-.18 5.48-.91 5.48-.91l-.4.53s-2.31.75-5.59.88c-3.53.15-7.44-.09-7.44-.09s.42-.48.97-.6c1.69-.37 4.2-.07 6.98.19zm6.65-4.47s.74.52-.39.81c-2.3.59-5.11.83-8.86.84-2.88 0-6.19-.28-6.19-.28s.47-.41 1.05-.57c3.34-.89 12.35-.91 14.39-.8zm-4.73-8.08s.77.77-.52 1.95c-1.39 1.28-.7 2.05-.7 2.05s.74-.46.33-.92c-.39-.45-.63-.73-.24-1.21.46-.57 1.13-.98 1.13-1.87zM11.66.55s1.95 1.58-.69 3.65c-2.11 1.66-.46 2.6-.46 2.6s.79-.58.35-1.13c-.43-.53-.87-.8-.44-1.39.46-.63 1.24-1.3 1.24-2.38v-1.4zM4.94 20.91s1.39.38 3.8.44c2.81.08 6.55-.17 9.07-.94 0 0-.25.32-.7.54-3.14.93-7.91 1.02-11.45.38-.45-.09-.72-.42-.72-.42z"/>
        </svg>
      );
    }

    // Spring Boot / Spring
    if (t.includes('spring')) {
      return (
        <svg className="w-4 h-4 text-[#6db33f] fill-current" viewBox="0 0 24 24">
          <path d="M21.57 14.63c-.68 3.51-3.77 6.13-7.49 6.13-4.22 0-7.65-3.43-7.65-7.65 0-3.32 2.11-6.14 5.08-7.2-.26.91-.4 1.88-.4 2.87 0 4.6 3.73 8.33 8.33 8.33.74 0 1.46-.1 2.13-.48zM19.16 3.16c-4.42-1.37-9.35.29-12.06 4.09C4.4 11.05 4.63 15.65 7.42 18.9c3.08 3.58 8.08 4.7 12.38 2.76 4.31-1.95 6.84-6.62 5.97-11.28-.88-4.66-4.52-6.53-6.61-7.22z"/>
        </svg>
      );
    }

    // Angular
    if (t.includes('angular')) {
      return (
        <svg className="w-4 h-4 text-[#dd0031] fill-current" viewBox="0 0 24 24">
          <path d="M12 2.5L2.5 5.9l1.4 12.2L12 22.5l8.1-4.4 1.4-12.2L12 2.5zm0 2.8l6.1 2.2-1 8.8-5.1 2.8-5.1-2.8-1-8.8 6.1-2.2zm0 3.2l-3.6 8h1.7l.7-1.8h2.4l.7 1.8h1.7l-3.6-8zm-1.1 5l1.1-2.8 1.1 2.8h-2.2z"/>
        </svg>
      );
    }

    // NLP (Natural Language Processing)
    if (t.includes('nlp')) {
      return (
        <svg className="w-4 h-4 text-[#c084fc] fill-none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
        </svg>
      );
    }

    // Machine Learning / AI / Data Science
    if (t.includes('machine learning') || t.includes('ai')) {
      return (
        <svg className="w-4 h-4 text-[#f472b6] fill-none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <circle cx="6" cy="6" r="3" fill="currentColor" fillOpacity="0.2"/>
          <circle cx="18" cy="6" r="3" fill="currentColor" fillOpacity="0.2"/>
          <circle cx="6" cy="18" r="3" fill="currentColor" fillOpacity="0.2"/>
          <circle cx="18" cy="18" r="3" fill="currentColor" fillOpacity="0.2"/>
          <circle cx="12" cy="12" r="3" fill="currentColor" fillOpacity="0.4"/>
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.5 7.5l7 7M15.5 7.5l-7 7M6 9v6M18 9v6M9 6h6M9 18h6"/>
        </svg>
      );
    }

    // Random Forest / Decision Trees
    if (t.includes('random forest')) {
      return (
        <svg className="w-4 h-4 text-[#34d399] fill-none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 2L8 8h3v4H7l-3 5h5v5h6v-5h5l-3-5h-4V8h3l-4-6z"/>
        </svg>
      );
    }

    // Pandas
    if (t.includes('pandas')) {
      return (
        <svg className="w-4 h-4 text-[#38bdf8] fill-none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="4" width="18" height="16" rx="2" strokeWidth="2"/>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M10 4v16M16 4v16"/>
        </svg>
      );
    }

    // Scikit-Learn
    if (t.includes('scikit')) {
      return (
        <svg className="w-4 h-4 text-[#fb923c] fill-current" viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/>
        </svg>
      );
    }

    // MySQL / Relational
    if (t.includes('mysql')) {
      return (
        <svg className="w-4 h-4 text-[#00758f] fill-none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 7c0-2.21 3.58-4 8-4s8 1.79 8 4-3.58 4-8 4-8-1.79-8-4z"/>
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 7v5c0 2.21 3.58 4 8 4s8-1.79 8-4V7"/>
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 12v5c0 2.21 3.58 4 8 4s8-1.79 8-4v-5"/>
        </svg>
      );
    }

    // JPA / Hibernate
    if (t.includes('jpa') || t.includes('hibernate')) {
      return (
        <svg className="w-4 h-4 text-[#a3e635] fill-none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8 7v10M16 7v10M4 12h16M7 4h10a3 3 0 013 3v10a3 3 0 01-3 3H7a3 3 0 01-3-3V7a3 3 0 013-3z"/>
        </svg>
      );
    }

    // JUnit
    if (t.includes('junit')) {
      return (
        <svg className="w-4 h-4 text-[#22c55e] fill-none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
        </svg>
      );
    }

    // Swagger / OpenAPI
    if (t.includes('swagger') || t.includes('openapi')) {
      return (
        <svg className="w-4 h-4 text-[#84cc16] fill-current" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="10" fillOpacity="0.2"/>
          <path d="M12 2a10 10 0 100 20 10 10 0 000-20zm-2 15l-4-4 1.4-1.4 2.6 2.6 6.6-6.6 1.4 1.4-8 8z"/>
        </svg>
      );
    }

    // Next.js
    if (t.includes('next')) {
      return (
        <svg className="w-4 h-4 text-white fill-current" viewBox="0 0 24 24">
          <path d="M12 0C5.37 0 0 5.37 0 12s5.37 12 12 12 12-5.37 12-12S18.63 0 12 0zm5.66 18.06L9.5 7.7v8.8H7.7V7.5h1.8l8.16 10.56zM15 7.5v4.5h-1.8V7.5H15z"/>
        </svg>
      );
    }

    // React
    if (t.includes('react')) {
      return (
        <svg className="w-4 h-4 text-[#61dafb]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="2" fill="currentColor"/>
          <ellipse cx="12" cy="12" rx="10" ry="4.5"/>
          <ellipse cx="12" cy="12" rx="10" ry="4.5" transform="rotate(60 12 12)"/>
          <ellipse cx="12" cy="12" rx="10" ry="4.5" transform="rotate(120 12 12)"/>
        </svg>
      );
    }

    // TypeScript
    if (t.includes('typescript') || t === 'ts') {
      return (
        <svg className="w-4 h-4 text-[#38bdf8] fill-current" viewBox="0 0 24 24">
          <path d="M1.5 0h21A1.5 1.5 0 0124 1.5v21a1.5 1.5 0 01-1.5 1.5h-21A1.5 1.5 0 010 22.5v-21A1.5 1.5 0 011.5 0zM12 8.5H6.5v2.3h1.9v8.7h2.7v-8.7h1.9V8.5zm7.3 3.8c-.5-.6-1.3-.9-2.4-.9-1 0-1.8.3-2.3.9-.6.6-.8 1.4-.8 2.5 0 1.2.3 2.1.9 2.7.6.6 1.4.9 2.4.9 1.1 0 1.9-.3 2.4-.9.6-.6.8-1.5.8-2.7 0-1.1-.2-2-.8-2.5zm-1.1 4.1c-.3.4-.8.6-1.4.6-.6 0-1.1-.2-1.4-.6-.3-.4-.4-1-.4-1.8 0-.8.1-1.4.4-1.8.3-.4.8-.6 1.4-.6.6 0 1.1.2 1.4.6.3.4.4 1 .4 1.8 0 .8-.1 1.4-.4 1.8z"/>
        </svg>
      );
    }

    // JavaScript
    if (t.includes('javascript') || t === 'js') {
      return (
        <svg className="w-4 h-4 text-[#facc15] fill-current" viewBox="0 0 24 24">
          <path d="M0 0h24v24H0V0zm22.034 18.276c-.175-1.017-.892-1.79-2.08-2.285-.506-.214-1.077-.384-1.63-.52l-.458-.113c-.633-.153-1.043-.324-1.229-.533-.186-.21-.247-.468-.247-.775 0-.347.114-.645.341-.892.227-.247.566-.37 1.016-.37.428 0 .753.114.975.341.223.227.362.535.419.923l1.832-.37c-.122-.752-.458-1.378-1.009-1.876-.55-.499-1.294-.748-2.232-.748-.962 0-1.724.262-2.285.787-.56.524-.841 1.206-.841 2.045 0 .734.201 1.343.603 1.828.402.485 1.008.83 1.818 1.035l.655.166c.743.184 1.248.393 1.516.629.267.235.401.542.401.918 0 .428-.148.795-.445 1.1-.297.306-.734.459-1.311.459-.62 0-1.1-.17-1.44-.511-.341-.341-.533-.808-.577-1.402l-1.868.219c.105 1.005.515 1.799 1.232 2.384.716.586 1.637.878 2.763.878 1.135 0 2.033-.28 2.695-.839.663-.56.994-1.306.994-2.24zm-8.814-6.495H11.23v6.806c0 .76-.118 1.327-.354 1.703-.236.376-.646.564-1.231.564-.42 0-.765-.079-1.036-.236-.271-.157-.467-.376-.59-.655l-1.633.996c.358.646.852 1.131 1.48 1.455.629.323 1.382.485 2.259.485 1.258 0 2.2-.349 2.827-1.049.629-.699.943-1.747.943-3.143v-6.93z"/>
        </svg>
      );
    }

    // Python
    if (t.includes('python')) {
      return (
        <svg className="w-4 h-4 text-[#fbbf24] fill-current" viewBox="0 0 24 24">
          <path d="M11.9 2c-5.2 0-4.9 2.3-4.9 2.3v2.4h5v.7H5.2S2.9 7.1 2.9 12.3c0 5.2 2 5 2 5h1.2v-2.5c0-2.8 2.4-2.8 2.4-2.8h4.9s2.3.1 2.3-2.3V4.3S17.1 2 11.9 2zm-2.6 1.6c.5 0 .9.4.9.9s-.4.9-.9.9-.9-.4-.9-.9.4-.9.9-.9zm.2 18.4c5.2 0 4.9-2.3 4.9-2.3v-2.4h-5v-.7h6.8s2.3.3 2.3-4.9c0-5.2-2-5-2-5h-1.2v2.5c0 2.8-2.4 2.8-2.4 2.8H7.9s-2.3-.1-2.3 2.3v4.9s-1.4 2.3 3.8 2.3zm2.6-1.6c-.5 0-.9-.4-.9-.9s.4-.9.9-.9.9.4.9.9-.4.9-.9.9z"/>
        </svg>
      );
    }

    // Node.js
    if (t.includes('node')) {
      return (
        <svg className="w-4 h-4 text-[#4ade80] fill-current" viewBox="0 0 24 24">
          <path d="M12 2L2 7.8v8.4L12 22l10-5.8V7.8L12 2zm0 2.3l7.5 4.3v5.8L12 18.7l-7.5-4.3V8.6L12 4.3z"/>
        </svg>
      );
    }

    // Express
    if (t.includes('express')) {
      return (
        <svg className="w-4 h-4 text-gray-200 fill-none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z"/>
        </svg>
      );
    }

    // Flask
    if (t.includes('flask')) {
      return (
        <svg className="w-4 h-4 text-gray-100 fill-none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"/>
        </svg>
      );
    }

    // SQL / DBMS
    if (t.includes('sql') || t.includes('dbms')) {
      return (
        <svg className="w-4 h-4 text-[#38bdf8] fill-none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 7c0-2.21 3.58-4 8-4s8 1.79 8 4-3.58 4-8 4-8-1.79-8-4z"/>
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 7v5c0 2.21 3.58 4 8 4s8-1.79 8-4V7"/>
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 12v5c0 2.21 3.58 4 8 4s8-1.79 8-4v-5"/>
        </svg>
      );
    }

    // CSS Modules / CSS
    if (t.includes('css')) {
      return (
        <svg className="w-4 h-4 text-[#60a5fa] fill-current" viewBox="0 0 24 24">
          <path d="M3 3l1.6 18L12 23l7.4-2L21 3H3zm14.3 4.5l-.3 3.5H8.8l.3 3.5h7.9l-.6 6.5-4.4 1.2-4.4-1.2-.3-3h2.3l.1 1.4 2.3.6 2.3-.6.2-2.7H6.3l-.8-8.4h11.8z"/>
        </svg>
      );
    }

    // REST APIs / Generic Networking
    if (t.includes('rest') || t.includes('api')) {
      return (
        <svg className="w-4 h-4 text-[#38bdf8] fill-none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
        </svg>
      );
    }

    // Default Tech Tag Icon
    return (
      <svg className="w-4 h-4 text-[#a855f7] fill-none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"/>
      </svg>
    );
  };

  return (
    <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/[0.05] hover:bg-white/[0.1] border border-white/20 hover:border-red-500/60 rounded-lg text-xs font-mono font-semibold text-white transition-all duration-300 shadow-sm backdrop-blur-sm">
      {getIcon(name)}
      <span>{name}</span>
    </span>
  );
}
