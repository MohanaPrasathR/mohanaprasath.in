'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { certifications } from '@/lib/data';

export default function Certifications() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="certifications" ref={ref} className="relative py-12 md:py-20 overflow-hidden">
      {/* Background divider line */}
      <div
        className="absolute top-0 left-0 w-full h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(212,175,55,0.25), transparent)' }}
      />

      <div className="max-w-[1400px] mx-auto px-4 sm:px-8 md:px-12 lg:px-20">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div>
            <motion.div
              className="flex items-center gap-3 mb-6"
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="gold-line" />
              <span
                className="text-xs tracking-[0.3em] text-gold font-mono uppercase"
                style={{ fontFamily: "'JetBrains Mono', monospace" }}
              >
                Credentials &amp; Learning
              </span>
            </motion.div>

            <motion.h2
              className="section-title text-white-primary"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              Certifications &amp;<br />
              <span style={{ WebkitTextStroke: '1px rgba(247,247,245,0.25)', color: 'transparent' }}>
                Verifications
              </span>
            </motion.h2>
          </div>

          <motion.p
            className="text-sm text-white-muted max-w-md font-mono"
            style={{ fontFamily: "'JetBrains Mono', monospace" }}
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            // Verified technical credentials and professional accreditations.
          </motion.p>
        </div>

        {/* Certification Cards Grid / Bar */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {certifications.map((cert, i) => (
            <motion.div
              key={cert.id || i}
              className="group relative flex flex-col justify-between p-8 border border-white/[0.08] bg-white/[0.02] hover:border-gold/50 hover:bg-white/[0.04] transition-all duration-500 rounded-none"
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.7, delay: 0.2 + i * 0.12 }}
            >
              {/* Top Row: Badge & Date */}
              <div>
                <div className="flex items-center justify-between gap-4 mb-6">
                  <span
                    className="text-xs font-mono text-gold px-2.5 py-1 border border-gold/20 bg-gold/5"
                    style={{ fontFamily: "'JetBrains Mono', monospace" }}
                  >
                    {cert.issuer}
                  </span>
                  <span
                    className="text-xs text-white-faint font-mono"
                    style={{ fontFamily: "'JetBrains Mono', monospace" }}
                  >
                    {cert.date}
                  </span>
                </div>

                {/* Title */}
                <h3
                  className="text-2xl text-white-primary font-light mb-3 group-hover:text-gold transition-colors duration-300"
                  style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                >
                  {cert.title}
                </h3>

                {/* Credential ID */}
                {cert.credentialId && (
                  <p
                    className="text-xs text-white-muted font-mono mb-6"
                    style={{ fontFamily: "'JetBrains Mono', monospace" }}
                  >
                    ID: <span className="text-white-primary">{cert.credentialId}</span>
                  </p>
                )}

                {/* Skills tags */}
                {cert.skills && (
                  <div className="flex flex-wrap gap-2 mb-8">
                    {cert.skills.map((skill) => (
                      <span
                        key={skill}
                        className="text-[11px] font-mono px-2 py-0.5 border border-white/[0.06] text-white-muted"
                        style={{ fontFamily: "'JetBrains Mono', monospace" }}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Bottom: Verification Link */}
              <a
                href={cert.credentialUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 pt-4 border-t border-white/[0.06] text-xs font-mono text-gold group-hover:text-white-primary transition-colors duration-300 uppercase tracking-widest"
                style={{ fontFamily: "'JetBrains Mono', monospace" }}
              >
                <span>VERIFY CERTIFICATE</span>
                <svg
                  className="w-3.5 h-3.5 transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                </svg>
              </a>
            </motion.div>
          ))}
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
