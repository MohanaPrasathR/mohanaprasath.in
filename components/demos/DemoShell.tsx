'use client';

import { MotionConfig } from 'framer-motion';

// Wraps every /demos page: restores the native cursor (the portfolio hides it
// for its custom cursor) and honours the visitor's reduced-motion setting.
export default function DemoShell({ children }: { children: React.ReactNode }) {
  return (
    <MotionConfig reducedMotion="user">
      <div className="demo-root">{children}</div>
    </MotionConfig>
  );
}
