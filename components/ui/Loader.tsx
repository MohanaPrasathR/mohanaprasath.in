'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

interface LoaderProps {
  onComplete: () => void;
}

export default function Loader({ onComplete }: LoaderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<SVGSVGElement>(null);
  const nameRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      // ── 1. Initial state ──────────────────────────────────────────
      gsap.set([logoRef.current, nameRef.current, lineRef.current], {
        autoAlpha: 0,
      });
      gsap.set(logoRef.current, { scale: 1.35, y: 15 });
      gsap.set(nameRef.current, { y: 20 });
      gsap.set(lineRef.current, { scaleX: 0, transformOrigin: 'center center' });

      // ── 2. Logo power impact entry ─────────────────────────
      tl.to(logoRef.current, {
        autoAlpha: 1,
        scale: 1,
        y: 0,
        duration: 0.9,
        ease: 'power3.out',
        delay: 0.15,
      });

      // ── 3. Gold line expands ──────────────────────────────────────
      tl.to(
        lineRef.current,
        {
          autoAlpha: 1,
          scaleX: 1,
          duration: 0.9,
          ease: 'expo.out',
        },
        '-=0.5'
      );

      // ── 4. Name fades up ──────────────────────────────────────────
      tl.to(
        nameRef.current,
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.8,
          ease: 'expo.out',
        },
        '-=0.6'
      );

      // ── 5. Hold ───────────────────────────────────────────────────
      tl.to({}, { duration: 0.5 });

      // ── 6. Seamless Fade Out ───────────────────────────────────────
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

      {/* Subtle radial glow behind logo */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          width: '520px',
          height: '520px',
          borderRadius: '50%',
          background:
            'radial-gradient(circle, rgba(212,175,55,0.07) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      {/* ── Ultra-Bold Khabib Style Monogram SVG ── */}
      <svg
        ref={logoRef}
        viewBox="0 0 200 130"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-[clamp(140px,24vw,240px)] mb-6 drop-shadow-[0_0_25px_rgba(220,38,38,0.6)]"
        aria-label="MP Khabib Style Bold Monogram"
      >
        {/* M - Heavy Bold Block */}
        <path
          d="M16 110 V20 L62 78 L108 20 V110"
          stroke="#F8FAFC"
          strokeWidth="16"
          strokeLinecap="square"
          strokeLinejoin="miter"
          fill="none"
        />
        {/* P - Heavy Bold Block */}
        <path
          d="M136 110 V20 H176 C196 20 196 68 176 68 H136"
          stroke="#F8FAFC"
          strokeWidth="16"
          strokeLinecap="square"
          strokeLinejoin="miter"
          fill="none"
        />
        {/* Red Accent Power Block */}
        <rect x="115" y="96" width="14" height="14" fill="#DC2626" rx="2" />
      </svg>

      {/* ── Red separator power line ── */}
      <div
        ref={lineRef}
        style={{
          width: 'clamp(100px, 18vw, 160px)',
          height: '2px',
          background:
            'linear-gradient(90deg, transparent, #DC2626 30%, #DC2626 70%, transparent)',
          marginBottom: '1.4rem',
        }}
      />

      {/* ── Name label ── */}
      <div ref={nameRef} style={{ textAlign: 'center' }}>
        <p
          className="font-mono text-xs md:text-sm font-bold tracking-[0.4em] text-white uppercase"
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            lineHeight: 1,
          }}
        >
          MOHANA PRASATH
        </p>
      </div>
    </div>
  );
}
