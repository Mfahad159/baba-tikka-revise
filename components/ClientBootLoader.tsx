'use client';

import { useState, useEffect } from 'react';
import { BabaTikkahLoader } from '@/components/BabaTikkahLoader';

export function ClientBootLoader() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // Only fire loader if untouched in localStorage
    if (localStorage.getItem('baba-tikkah-visited')) {
      setLoaded(true);
    }
  }, []);

  // Return absolutely nothing (transparently) once the sequence finishes.
  // Rendering the Loader standalone as a sibling avoids ripping out the SSR'd page content beneath it!
  if (loaded) return null;

  return (
    <BabaTikkahLoader
      onComplete={() => {
        localStorage.setItem('baba-tikkah-visited', 'true');
        setLoaded(true);
      }}
    />
  );
}
