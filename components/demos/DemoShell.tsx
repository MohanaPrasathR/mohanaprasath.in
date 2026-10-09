'use client';

import { MotionConfig } from 'framer-motion';
import { useMotionOK } from '@/lib/useMotion';

// Wraps every /demos page: restores the native cursor (the portfolio hides it
// for its custom cursor) and honours the visitor's reduced-motion setting, unless they
// opened a page with ?motion=on (see useMotionOK).
export default function DemoShell({ children }: { children: React.ReactNode }) {
  const motionOK = useMotionOK();
  return (
    <MotionConfig reducedMotion={motionOK ? 'never' : 'always'}>
      <div className="demo-root">{children}</div>
    </MotionConfig>
  );
}
