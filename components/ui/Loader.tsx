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

      {/* ── Exact User-Uploaded logomp.png Image ── */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        ref={logoRef}
        src="/logomp.png"
        alt="MP Shield Monogram Logo"
        className="w-[clamp(160px,28vw,280px)] h-auto object-contain filter drop-shadow-[0_0_25px_rgba(255,255,255,0.45)]"
      />
    </div>
  );
}
