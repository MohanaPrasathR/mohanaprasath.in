'use client';

import { useEffect } from 'react';

export default function DisableInspect() {
  useEffect(() => {
    // 1. Disable Right Click Context Menu
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
    };

    // 2. Disable DevTools and Source Shortcuts (F12, Ctrl+Shift+I/J/C, Ctrl+U, Ctrl+S)
    const handleKeyDown = (e: KeyboardEvent) => {
      const isCmdOrCtrl = e.ctrlKey || e.metaKey;
      const isAltOrShift = e.altKey || e.shiftKey;

      if (
        // F12 key
        e.key === 'F12' ||
        // Ctrl+Shift+I / Cmd+Alt+I (Inspect)
        (isCmdOrCtrl && e.shiftKey && (e.key === 'I' || e.key === 'i')) ||
        (e.metaKey && e.altKey && (e.key === 'I' || e.key === 'i')) ||
        // Ctrl+Shift+J / Cmd+Alt+J (Console)
        (isCmdOrCtrl && e.shiftKey && (e.key === 'J' || e.key === 'j')) ||
        (e.metaKey && e.altKey && (e.key === 'J' || e.key === 'j')) ||
        // Ctrl+Shift+C / Cmd+Alt+C (Element picker)
        (isCmdOrCtrl && e.shiftKey && (e.key === 'C' || e.key === 'c')) ||
        (e.metaKey && e.altKey && (e.key === 'C' || e.key === 'c')) ||
        // Ctrl+U / Cmd+U (View source)
        (isCmdOrCtrl && (e.key === 'U' || e.key === 'u')) ||
        // Ctrl+S / Cmd+S (Save page)
        (isCmdOrCtrl && (e.key === 'S' || e.key === 's'))
      ) {
        e.preventDefault();
        e.stopPropagation();
      }
    };

    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return null;
}
