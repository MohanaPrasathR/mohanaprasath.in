'use client';

import { useEffect, useState } from 'react';

interface LoaderProps {
  onComplete: () => void;
}

export default function Loader({ onComplete }: LoaderProps) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    // Complete loader after red curtain wipe finishes (3.0s)
    const completeTimer = setTimeout(() => {
      setVisible(false);
      onComplete();
    }, 3050);

    return () => {
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  if (!visible) return null;

  return (
    <div
      id="arman-loader"
      className="fixed inset-0 z-[99999] bg-[#060608] flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Grain film overlay */}
      <div className="grain" aria-hidden />

      {/* Arman-Style Red Curtain Wipe Transition */}
      <div
        className="absolute inset-0 z-30 bg-red-600 pointer-events-none"
        style={{
          animation: 'armanWipe 0.55s cubic-bezier(0.77, 0, 0.18, 1) 2.4s forwards',
          transform: 'translateX(-101%)',
        }}
      />

      {/* Center Loader Content Container */}
      <div className="relative z-20 flex flex-col items-center gap-5 px-4 text-center">
        {/* Arman-Style MP Monogram Sequential Line Drawing SVG */}
        <svg
          id="arman-loader-svg"
          viewBox="0 0 527 527"
          xmlns="http://www.w3.org/2000/svg"
          className="w-[125px] h-[125px] md:w-[155px] md:h-[155px] filter drop-shadow-[0_0_25px_rgba(255,255,255,0.4)]"
          aria-label="Arman Style Animated MP Monogram"
        >
          {/* Path 1: M Left Outer Pillar */}
          <path
            d="M 40 40 V 390 L 100 425 V 40 Z"
            stroke="#FFFFFF"
            strokeWidth="10"
            strokeLinejoin="miter"
            fill="none"
            className="arman-draw-path-1"
          />

          {/* Path 2: M Center Chevron V */}
          <polygon
            points="100,130 140,250 180,130 180,375 140,400 100,375"
            stroke="#FFFFFF"
            strokeWidth="10"
            strokeLinejoin="miter"
            fill="none"
            className="arman-draw-path-2"
          />

          {/* Path 3: M Right Outer Pillar */}
          <path
            d="M 180 40 H 240 V 390 L 180 425 Z"
            stroke="#FFFFFF"
            strokeWidth="10"
            strokeLinejoin="miter"
            fill="none"
            className="arman-draw-path-3"
          />

          {/* Path 4: P Left Main Stem */}
          <polygon
            points="287,40 347,40 347,450 287,410"
            stroke="#FFFFFF"
            strokeWidth="10"
            strokeLinejoin="miter"
            fill="none"
            className="arman-draw-path-4"
          />

          {/* Path 5: P Outer Loop & Chamfer */}
          <path
            d="M 347 40 H 487 V 230 L 415 295 H 347 Z M 347 95 H 435 V 190 L 395 230 H 347 Z"
            fillRule="evenodd"
            stroke="#FFFFFF"
            strokeWidth="10"
            strokeLinejoin="miter"
            fill="none"
            className="arman-draw-path-5"
          />
        </svg>

        {/* Arman-Style Monospace Tagline Fade-Up */}
        <div
          className="font-mono text-xs md:text-sm tracking-[0.45em] text-red-500 font-bold uppercase mt-1"
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            animation: 'armanFadeUp 0.8s ease 1.4s forwards',
            opacity: 0,
          }}
        >
          MOHANA PRASATH
        </div>

        {/* Arman-Style Red Loading Bar Fill */}
        <div
          className="w-[160px] md:w-[200px] h-[2px] bg-white/10 overflow-hidden rounded-full mt-1"
          style={{
            animation: 'armanFadeUp 0.5s ease 1.5s forwards',
            opacity: 0,
          }}
        >
          <div
            className="h-full bg-red-600"
            style={{
              animation: 'armanBarFill 1.0s cubic-bezier(0.4, 0, 0.2, 1) 1.6s forwards',
              width: '0%',
            }}
          />
        </div>
      </div>
    </div>
  );
}
