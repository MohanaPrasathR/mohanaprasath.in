'use client';

import Link from 'next/link';
import { personal, education, certifications, projects, skills } from '@/lib/data';

export default function ResumePage() {
  return (
    <main className="min-h-screen bg-[#050505] text-white p-6 md:p-12 font-sans selection:bg-red-500 selection:text-white">
      {/* Top Header Bar */}
      <div className="max-w-4xl mx-auto flex items-center justify-between pb-8 mb-8 border-b border-white/20">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-mono text-gray-300 hover:text-white transition-colors"
        >
          ← Back to Portfolio
        </Link>
        <button
          onClick={() => window.print()}
          className="px-5 py-2 bg-red-600 hover:bg-red-700 text-white font-mono text-xs font-semibold rounded-lg shadow-lg transition-all"
        >
          Print / Save as PDF 📄
        </button>
      </div>

      {/* Resume Card */}
      <div className="max-w-4xl mx-auto bg-white/[0.03] border border-white/20 rounded-2xl p-8 md:p-12 shadow-2xl backdrop-blur-md">
        {/* Name & Contact Header */}
        <div className="border-b border-white/10 pb-8 mb-8">
          <h1
            className="text-4xl md:text-5xl font-light text-white mb-2"
            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
          >
            {personal.nameFirst} {personal.nameLast}
          </h1>
          <p className="text-red-400 font-mono text-sm mb-4">{personal.title}</p>
          <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-gray-300">
            <span>📍 {personal.location}</span>
            <span>✉️ {personal.email}</span>
            <span>📞 {personal.phone}</span>
            <a
              href="https://www.linkedin.com/in/mohana-prasath-r-6268b132a/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sky-400 hover:underline"
            >
              LinkedIn ↗
            </a>
            <a
              href="https://github.com/MohanaPrasathR"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sky-400 hover:underline"
            >
              GitHub ↗
            </a>
          </div>
        </div>

        {/* Executive Summary */}
        <div className="mb-8">
          <h2 className="text-xs font-mono text-red-500 uppercase tracking-widest mb-3">Professional Summary</h2>
          <p className="text-gray-200 text-sm leading-relaxed">{personal.bio}</p>
        </div>

        {/* Education */}
        <div className="mb-8">
          <h2 className="text-xs font-mono text-red-500 uppercase tracking-widest mb-4">Education</h2>
          <div className="space-y-4">
            {education.map((edu, i) => (
              <div key={i} className="flex flex-col md:flex-row md:items-center justify-between p-4 rounded-xl bg-white/[0.02] border border-white/10">
                <div>
                  <h3 className="text-base font-semibold text-white">{edu.degree}</h3>
                  <p className="text-xs text-gray-400">{edu.institution}</p>
                </div>
                <span className="text-xs font-mono text-red-400 mt-2 md:mt-0">{edu.period}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Technical Certifications */}
        <div className="mb-8">
          <h2 className="text-xs font-mono text-red-500 uppercase tracking-widest mb-4">Licenses & Certifications</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {certifications.map((cert) => (
              <div key={cert.id} className="p-4 rounded-xl bg-white/[0.02] border border-white/10 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-xs font-mono mb-2">
                    <span className="text-red-400">{cert.issuer}</span>
                    <span className="text-gray-400">{cert.date}</span>
                  </div>
                  <h3 className="text-sm font-semibold text-white mb-2">{cert.title}</h3>
                  {cert.credentialId && (
                    <p className="text-[11px] font-mono text-gray-400 mb-2">ID: {cert.credentialId}</p>
                  )}
                </div>
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {cert.skills.map((s) => (
                    <span key={s} className="text-[10px] font-mono bg-white/10 px-2 py-0.5 rounded text-gray-200">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Featured Projects */}
        <div className="mb-8">
          <h2 className="text-xs font-mono text-red-500 uppercase tracking-widest mb-4">Key Projects</h2>
          <div className="space-y-4">
            {projects.map((proj) => (
              <div key={proj.id} className="p-5 rounded-xl bg-white/[0.02] border border-white/10">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-base font-semibold text-white">{proj.title}</h3>
                  <span className="text-xs font-mono text-gray-400">{proj.year}</span>
                </div>
                <p className="text-xs text-gray-300 mb-3">{proj.description}</p>
                <div className="flex flex-wrap gap-2">
                  {proj.tech.map((t) => (
                    <span key={t} className="text-[10px] font-mono bg-white/10 border border-white/20 px-2 py-0.5 rounded text-gray-200">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Skills & Expertise */}
        <div>
          <h2 className="text-xs font-mono text-red-500 uppercase tracking-widest mb-4">Technical Skills</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {skills.map((cat) => (
              <div key={cat.category} className="p-4 rounded-xl bg-white/[0.02] border border-white/10">
                <h3 className="text-xs font-mono text-gray-400 uppercase mb-2">{cat.category}</h3>
                <div className="flex flex-wrap gap-2">
                  {cat.items.map((item) => (
                    <span key={item} className="text-xs font-mono bg-white/10 px-2.5 py-1 rounded text-white font-medium">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
