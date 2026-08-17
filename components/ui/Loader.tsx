'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

interface LoaderProps {
  onComplete: () => void;
}

export default function Loader({ onComplete }: LoaderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<SVGSVGElement>(null);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      // ── 1. Initial state ──────────────────────────────────────────
      gsap.set(logoRef.current, {
        autoAlpha: 0,
        scale: 1.4,
      });

      // ── 2. Pure White Sharp MP Logo Power Slam ─────────────────────────
      tl.to(logoRef.current, {
        autoAlpha: 1,
        scale: 1,
        duration: 0.95,
        ease: 'power3.out',
        delay: 0.15,
      });

      // ── 3. Hold ───────────────────────────────────────────────────
      tl.to({}, { duration: 0.6 });

      // ── 4. Seamless Fade Out ───────────────────────────────────────
      tl.to(
        containerRef.current,
        {
          autoAlpha: 0,
          duration: 0.7,
          ease: 'power2.inOut',
          onComplete: () => {
            setVisible(false);
            onComplete();
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, [onComplete]);

  if (!visible) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center"
      style={{ backgroundColor: '#050505' }}
    >
      {/* Grain overlay */}
      <div className="grain" aria-hidden />

      {/* Radiant White radial glow behind logo */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          width: '560px',
          height: '560px',
          borderRadius: '50%',
          background:
            'radial-gradient(circle, rgba(255,255,255,0.12) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      {/* ── Exact User-Requested MP Shield Monogram Vector SVG ── */}
      <svg
        ref={logoRef}
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-[clamp(160px,28vw,280px)] filter drop-shadow-[0_0_25px_rgba(255,255,255,0.45)]"
        aria-label="Exact MP Shield Monogram Logo"
      >
        {/* Top Left Bar */}
        <path d="M 10 10 H 96 V 30 H 10 Z" fill="#FFFFFF" />

        {/* Top Right Bar */}
        <path d="M 104 10 H 190 V 30 H 104 Z" fill="#FFFFFF" />

        {/* Left M Outer Pillar */}
        <path d="M 10 36 H 26 V 134 L 10 126 Z" fill="#FFFFFF" />

        {/* Left M Center Leg */}
        <path d="M 32 36 H 45 L 53 60 V 151 L 32 139 Z" fill="#FFFFFF" />

        {/* Right M Center Leg */}
        <path d="M 53 60 L 61 36 H 74 V 163 L 53 151 Z" fill="#FFFFFF" />

        {/* Right M Inner Pillar */}
        <path d="M 80 36 H 96 V 176 L 80 167 Z" fill="#FFFFFF" />

        {/* Top M Center Chevron Join */}
        <path d="M 45 36 H 61 L 53 60 Z" fill="#FFFFFF" />

        {/* P Main Stem (Tapered at bottom right) */}
        <path d="M 104 36 H 125 V 176 L 104 188 Z" fill="#FFFFFF" />

        {/* P Loop Outer Frame with Chamfered Bottom Right Corner */}
        <path d="M 125 36 H 190 V 92 L 165 117 H 125 V 101 H 165 L 174 92 V 52 H 125 V 36 Z" fill="#FFFFFF" />
      </svg>
    </div>
  );
}
