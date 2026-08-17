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

      {/* ── Crystal Clear Solid White Bold MP Monogram ── */}
      <svg
        ref={logoRef}
        viewBox="0 0 230 140"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-[clamp(160px,28vw,280px)] filter drop-shadow-[0_0_20px_rgba(255,255,255,0.4)]"
        aria-label="Crystal Clear Bold MP Monogram"
      >
        {/* Crisp Solid M */}
        <path
          d="M 16 120 V 20 H 34 L 70 82 L 106 20 H 124 V 120 H 104 V 58 L 75 108 H 65 L 36 58 V 120 H 16 Z"
          fill="#FFFFFF"
        />
        {/* Crisp Solid P */}
        <path
          d="M 140 120 V 20 H 186 C 206 20 216 32 216 54 C 216 76 206 88 186 88 H 162 V 120 H 140 Z M 162 40 V 68 H 184 C 192 68 196 63 196 54 C 196 45 192 40 184 40 H 162 Z"
          fill="#FFFFFF"
        />
      </svg>
    </div>
  );
}
