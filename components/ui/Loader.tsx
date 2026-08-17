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

      {/* ── 1:1 Pixel-Perfect User MP Shield Monogram Vector SVG ── */}
      <svg
        ref={logoRef}
        viewBox="0 0 100 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-[clamp(160px,28vw,280px)] filter drop-shadow-[0_0_25px_rgba(255,255,255,0.45)]"
        aria-label="Exact User MP Shield Monogram"
      >
        {/* M Top Bar */}
        <rect x="10" y="10" width="38.5" height="12" fill="#FFFFFF" />

        {/* P Top Bar */}
        <rect x="51.5" y="10" width="38.5" height="12" fill="#FFFFFF" />

        {/* M Leftmost Pillar */}
        <polygon points="10,26 17.5,26 17.5,90 10,85" fill="#FFFFFF" />

        {/* M Left-Center Leg */}
        <polygon points="21,26 25.5,26 29.25,43 29.25,97 20.5,92" fill="#FFFFFF" />

        {/* M Right-Center Leg */}
        <polygon points="29.25,43 33,26 38,26 38,102 29.25,97" fill="#FFFFFF" />

        {/* M Rightmost Pillar */}
        <polygon points="41,26 48.5,26 48.5,109 41,104" fill="#FFFFFF" />

        {/* P Main Stem */}
        <polygon points="51.5,26 63,26 63,98 50,109 51.5,26" fill="#FFFFFF" />

        {/* P Loop Top Bar */}
        <rect x="63" y="26" width="27" height="14" fill="#FFFFFF" />

        {/* P Loop Chamfered Wall & Return */}
        <polygon points="78,40 90,40 90,68 74,84 63,84 63,70 78,70" fill="#FFFFFF" />
      </svg>
    </div>
  );
}
