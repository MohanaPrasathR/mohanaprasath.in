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
      gsap.set(logoRef.current, { scale: 0.85, y: 20 });
      gsap.set(nameRef.current, { y: 24 });
      gsap.set(lineRef.current, { scaleX: 0, transformOrigin: 'left center' });

      // ── 2. Logo draws in ──────────────────────────────────────────
      tl.to(logoRef.current, {
        autoAlpha: 1,
        scale: 1,
        y: 0,
        duration: 1.1,
        ease: 'expo.out',
        delay: 0.2,
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
      tl.to({}, { duration: 0.85 });

      // ── 6. Logo + name fade out ───────────────────────────────────
      tl.to([logoRef.current, nameRef.current, lineRef.current], {
        autoAlpha: 0,
        y: -16,
        duration: 0.55,
        ease: 'power3.in',
        stagger: 0.04,
      });

      // ── 7. Overlay wipes up ───────────────────────────────────────
      tl.to(
        containerRef.current,
        {
          yPercent: -100,
          duration: 1.1,
          ease: 'expo.inOut',
          onComplete: () => {
            setVisible(false);
            onComplete();
          },
        },
        '-=0.1'
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

      {/* ── Monogram SVG ── */}
      <svg
        ref={logoRef}
        viewBox="0 0 160 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ width: 'clamp(110px, 20vw, 180px)', marginBottom: '1.5rem' }}
        aria-label="MP monogram"
      >
        {/* M */}
        <path
          d="M10 100 L10 20 L40 70 L70 20 L70 100"
          stroke="#F7F7F5"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        {/* P */}
        <path
          d="M90 100 L90 20"
          stroke="#F7F7F5"
          strokeWidth="2.5"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M90 20 L125 20 Q150 20 150 47 Q150 74 125 74 L90 74"
          stroke="#F7F7F5"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        {/* Gold accent dot */}
        <circle cx="80" cy="110" r="2.5" fill="#D4AF37" />
      </svg>

      {/* ── Gold separator line ── */}
      <div
        ref={lineRef}
        style={{
          width: 'clamp(80px, 14vw, 140px)',
          height: '1px',
          background:
            'linear-gradient(90deg, transparent, #D4AF37 30%, #D4AF37 70%, transparent)',
          marginBottom: '1.4rem',
        }}
      />

      {/* ── Name label ── */}
      <div ref={nameRef} style={{ textAlign: 'center' }}>
        <p
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 'clamp(0.6rem, 1.4vw, 0.78rem)',
            letterSpacing: '0.35em',
            color: '#9A9A9A',
            textTransform: 'uppercase',
            lineHeight: 1,
          }}
        >
          Mohana Prasath
        </p>
      </div>
    </div>
  );
}
