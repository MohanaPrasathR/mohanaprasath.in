'use client';

import { useEffect, useState, useRef } from 'react';

export default function CustomCursor() {
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Disable custom cursor on mobile touch screens
    const isTouch = window.matchMedia('(hover: none) and (pointer: coarse)').matches || 'ontouchstart' in window;
    if (isTouch) {
      setIsTouchDevice(true);
      return;
    }

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let mouseX = -100;
    let mouseY = -100;
    let ringX = -100;
    let ringY = -100;
    let rafId: number;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.style.transform = `translate3d(${mouseX - 5}px, ${mouseY - 5}px, 0)`;
    };

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const animateRing = () => {
      ringX = lerp(ringX, mouseX, 0.25);
      ringY = lerp(ringY, mouseY, 0.25);
      ring.style.transform = `translate3d(${ringX - 18}px, ${ringY - 18}px, 0)`;
      rafId = requestAnimationFrame(animateRing);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (target && target.closest('a, button, [data-cursor], input, textarea')) {
        ring.style.width = '48px';
        ring.style.height = '48px';
        ring.style.borderColor = '#DC2626';
        ring.style.backgroundColor = 'rgba(220, 38, 38, 0.15)';
        ring.style.boxShadow = '0 0 16px rgba(220, 38, 38, 0.5)';
        dot.style.transform = `translate3d(${mouseX - 6}px, ${mouseY - 6}px, 0) scale(1.3)`;
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (target && target.closest('a, button, [data-cursor], input, textarea')) {
        ring.style.width = '36px';
        ring.style.height = '36px';
        ring.style.borderColor = 'rgba(220, 38, 38, 0.6)';
        ring.style.backgroundColor = 'transparent';
        ring.style.boxShadow = 'none';
        dot.style.transform = `translate3d(${mouseX - 5}px, ${mouseY - 5}px, 0) scale(1)`;
      }
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    document.addEventListener('mouseover', handleMouseOver, { passive: true });
    document.addEventListener('mouseout', handleMouseOut, { passive: true });

    rafId = requestAnimationFrame(animateRing);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
      cancelAnimationFrame(rafId);
    };
  }, []);

  if (isTouchDevice) return null;

  return (
    <>
      {/* Zero-latency Instant Red Dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-2.5 h-2.5 rounded-full bg-red-600 pointer-events-none z-[9999]"
        style={{
          willChange: 'transform',
          boxShadow: '0 0 12px rgba(220, 38, 38, 1)',
        }}
      />
      {/* Smooth Trailing Red Ring */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 w-9 h-9 rounded-full border border-red-600/60 pointer-events-none z-[9998]"
        style={{
          willChange: 'transform',
          transition: 'width 0.2s ease-out, height 0.2s ease-out, border-color 0.2s ease, background-color 0.2s ease, box-shadow 0.2s ease',
        }}
      />
    </>
  );
}
