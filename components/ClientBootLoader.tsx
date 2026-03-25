'use client';

import { useState, useEffect } from 'react';
import { BabaTikkahLoader } from '@/components/BabaTikkahLoader';

export function ClientBootLoader() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // TODO: skip loader if 'baba-tikkah-visited' key exists in localStorage
    // Uncomment this logic when moving to production so return visitors don't see it every time
    // if (localStorage.getItem('baba-tikkah-visited')) {
    //   setLoaded(true);
    // }
  }, []);

  // Return absolutely nothing (transparently) once the sequence finishes.
  // Rendering the Loader standalone as a sibling avoids ripping out the SSR'd page content beneath it!
  if (loaded) return null;

  return (
    <BabaTikkahLoader
      onComplete={() => {
        // localStorage.setItem('baba-tikkah-visited', 'true');
        setLoaded(true);
      }}
    />
  );
}
