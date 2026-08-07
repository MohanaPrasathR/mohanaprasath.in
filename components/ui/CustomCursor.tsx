'use client';

import { useEffect, useRef } from 'react';

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    const canvas = canvasRef.current;
    if (!dot || !ring || !canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    handleResize();
    window.addEventListener('resize', handleResize);

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let ringX = mouseX;
    let ringY = mouseY;
    let raf: number;

    const points: { x: number; y: number }[] = [];
    const MAX_POINTS = 14;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.style.transform = `translate3d(${mouseX - 3}px, ${mouseY - 3}px, 0)`;

      points.unshift({ x: mouseX, y: mouseY });
      if (points.length > MAX_POINTS) {
        points.pop();
      }
    };

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const render = () => {
      ringX = lerp(ringX, mouseX, 0.15);
      ringY = lerp(ringY, mouseY, 0.15);
      ring.style.transform = `translate3d(${ringX - 18}px, ${ringY - 18}px, 0)`;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (points.length > 1) {
        // Draw trailing dotted line path
        ctx.beginPath();
        ctx.setLineDash([4, 6]);
        ctx.lineWidth = 1.5;
        ctx.strokeStyle = 'rgba(220, 38, 38, 0.6)';
        ctx.moveTo(points[0].x, points[0].y);
        for (let i = 1; i < points.length; i++) {
          ctx.lineTo(points[i].x, points[i].y);
        }
        ctx.stroke();

        // Draw alternating red and white trailing dots
        for (let i = 1; i < points.length; i++) {
          const pt = points[i];
          const radius = Math.max(1, (MAX_POINTS - i) / 3.5);
          const opacity = (MAX_POINTS - i) / MAX_POINTS;
          ctx.beginPath();
          ctx.arc(pt.x, pt.y, radius, 0, Math.PI * 2);
          ctx.fillStyle = i % 2 === 0 ? `rgba(255, 255, 255, ${opacity * 0.9})` : `rgba(220, 38, 38, ${opacity})`;
          ctx.fill();
        }
      }

      raf = requestAnimationFrame(render);
    };

    const onMouseEnterLink = () => {
      ring.style.width = '52px';
      ring.style.height = '52px';
      ring.style.borderColor = '#DC2626';
      ring.style.backgroundColor = 'rgba(220, 38, 38, 0.12)';
      ring.style.boxShadow = '0 0 20px rgba(220, 38, 38, 0.5)';
      dot.style.transform = `translate3d(${mouseX - 4}px, ${mouseY - 4}px, 0) scale(1.4)`;
      dot.style.backgroundColor = '#FFFFFF';
    };

    const onMouseLeaveLink = () => {
      ring.style.width = '36px';
      ring.style.height = '36px';
      ring.style.borderColor = 'rgba(220, 38, 38, 0.6)';
      ring.style.backgroundColor = 'transparent';
      ring.style.boxShadow = 'none';
      dot.style.transform = `translate3d(${mouseX - 3}px, ${mouseY - 3}px, 0) scale(1)`;
      dot.style.backgroundColor = '#DC2626';
    };

    const bindLinks = () => {
      document.querySelectorAll('a, button, [data-cursor], input, textarea').forEach((el) => {
        el.removeEventListener('mouseenter', onMouseEnterLink);
        el.removeEventListener('mouseleave', onMouseLeaveLink);
        el.addEventListener('mouseenter', onMouseEnterLink);
        el.addEventListener('mouseleave', onMouseLeaveLink);
      });
    };

    window.addEventListener('mousemove', onMouseMove);
    raf = requestAnimationFrame(render);
    bindLinks();

    const observer = new MutationObserver(bindLinks);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(raf);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      {/* Canvas Dotted Line & Trailing Path */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-[9997]"
      />
      {/* Red Cursor Dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-2.5 h-2.5 rounded-full bg-red-600 pointer-events-none z-[9999]"
        style={{
          willChange: 'transform',
          transition: 'transform 0.15s ease-out, background-color 0.2s ease',
          boxShadow: '0 0 10px rgba(220, 38, 38, 0.9)',
        }}
      />
      {/* Trailing Ring */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 w-9 h-9 rounded-full border border-red-600/60 pointer-events-none z-[9998]"
        style={{
          willChange: 'transform',
          transition: 'width 0.25s ease-out, height 0.25s ease-out, border-color 0.25s ease, background-color 0.25s ease, box-shadow 0.25s ease',
        }}
      />
    </>
  );
}
