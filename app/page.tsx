'use client';

import { useState, useCallback, useEffect } from 'react';
import dynamic from 'next/dynamic';

import Loader from '@/components/ui/Loader';
import Navbar from '@/components/ui/Navbar';
import SmoothScroll from '@/components/ui/SmoothScroll';
import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import Projects from '@/components/sections/Projects';
import Skills from '@/components/sections/Skills';
import Resume from '@/components/sections/Resume';
import Certifications from '@/components/sections/Certifications';
import Contact from '@/components/sections/Contact';

// Custom cursor is client-only
const CustomCursor = dynamic(() => import('@/components/ui/CustomCursor'), { ssr: false });

export default function Home() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if ('scrollRestoration' in window.history) {
        window.history.scrollRestoration = 'manual';
      }
      window.scrollTo(0, 0);
    }
  }, []);

  const handleLoaderComplete = useCallback(() => {
    setReady(true);
    if (typeof window !== 'undefined') {
      window.scrollTo(0, 0);
    }
  }, []);

  return (
    <>
      {/* Grain film overlay */}
      <div className="grain" aria-hidden />

      {/* Custom cursor */}
      <CustomCursor />

      {/* Cinematic loader */}
      <Loader onComplete={handleLoaderComplete} />

      {/* Fixed top navbar — always visible, all sections */}
      {ready && <Navbar />}

      {/* Smooth scroll wrapper */}
      <SmoothScroll>
        <main>
          <Hero ready={ready} />
          <About />
          <Projects />
          <Skills />
          <Resume />
          <Certifications />
          <Contact />
        </main>
      </SmoothScroll>
    </>
  );
}

