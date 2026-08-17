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

      {/* ── Pure White Sharp 3D Angular MP Monogram ── */}
      <svg
        ref={logoRef}
        viewBox="0 0 260 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-[clamp(170px,32vw,320px)] drop-shadow-[0_0_40px_rgba(255,255,255,0.85)]"
        aria-label="Pure White Sharp MP Monogram Intro Logo"
      >
        {/* Outer Metallic Bevel Frame */}
        <path
          d="M 28 55 L 50 32 H 78 L 62 55 V 140 L 42 162 H 28 V 55 Z
             M 62 55 L 122 135 L 182 55 V 140 L 162 162 H 146 V 55 Z
             M 162 55 L 180 32 H 222 C 244 32 254 46 254 68 C 254 90 244 104 222 104 H 192 V 148 L 172 168 H 156 V 55 Z
             M 192 52 H 218 C 230 52 236 58 236 68 C 236 78 230 84 218 84 H 192 V 52 Z"
          fill="#FFFFFF"
          stroke="#F8FAFC"
          strokeWidth="4"
          strokeLinejoin="miter"
        />

        {/* Inner Highlight Layer for 3D Bevel effect */}
        <path
          d="M 36 58 L 48 44 H 68 L 56 58 V 132 L 44 148 H 36 Z
             M 56 58 L 122 126 L 174 58 V 132 L 164 148 H 154 V 58 Z
             M 170 58 L 182 44 H 214 C 230 44 238 52 238 68 C 238 84 230 92 214 92 H 184 V 138 L 170 152 Z
             M 184 60 H 210 C 220 60 224 63 224 68 C 224 73 220 76 210 76 H 184 Z"
          fill="#FFFFFF"
          opacity="0.9"
        />
      </svg>
    </div>
  );
}
