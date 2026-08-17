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

      {/* ── Arman Style White Shield Crest MP Monogram ── */}
      <svg
        ref={logoRef}
        viewBox="0 0 200 160"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-[clamp(150px,26vw,260px)] filter drop-shadow-[0_0_25px_rgba(255,255,255,0.4)]"
        aria-label="Arman Style White Shield Crest MP Monogram"
      >
        {/* Left Bar of M */}
        <path d="M 10 10 H 34 V 82 L 10 70 Z" fill="#FFFFFF" />
        
        {/* Center V & Right Bar of M */}
        <path d="M 40 10 H 58 L 72 52 L 86 10 H 104 V 127 L 84 116 V 38 L 72 74 L 60 38 V 94 L 40 82 Z" fill="#FFFFFF" />
        
        {/* P Outer Loop & Stem (Tapered to Shield Bottom) */}
        <path d="M 112 10 H 190 V 72 H 138 V 147 L 112 133 Z M 138 26 H 168 V 52 H 138 Z" fillRule="evenodd" fill="#FFFFFF" />
      </svg>
    </div>
  );
}
