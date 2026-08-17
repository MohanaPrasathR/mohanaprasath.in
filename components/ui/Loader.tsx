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

      {/* ── Authentic Solid White Shield Crest MP Monogram ── */}
      <svg
        ref={logoRef}
        viewBox="0 0 200 240"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-[clamp(150px,26vw,260px)] filter drop-shadow-[0_0_30px_rgba(255,255,255,0.5)]"
        aria-label="Solid White Shield Crest MP Monogram"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="
            M 20 20
            H 180
            V 140
            L 100 220
            L 20 140
            Z

            M 20 42 H 180 V 48 H 20 Z

            M 50 60
            L 70 120
            L 90 60
            H 78
            L 70 95
            L 62 60
            Z

            M 96 20 H 104 V 165 L 96 157 Z

            M 124 60
            H 160
            V 95
            H 124
            Z

            M 124 112
            H 180
            V 140
            L 100 220
            V 180
            L 124 156
            Z

            M 20 140
            L 100 220
            V 180
            L 46 126
            H 20
            Z
          "
          fill="#FFFFFF"
        />
      </svg>
    </div>
  );
}
