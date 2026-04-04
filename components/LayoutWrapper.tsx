'use client';

import { useState, useEffect } from 'react';
import { useCart } from '@/hooks/useCart';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ANIMATIONS_ENABLED } from '@/lib/animations';

export function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);
  const { totalItems } = useCart();
  const pathname = usePathname();
  
  useEffect(() => setMounted(true), []);

  const showPadding = totalItems > 0 && pathname !== '/cart';
  
  return (
    <div className={`flex min-h-[100svh] w-full flex-col transition-[padding] duration-300 ease-out ${showPadding ? 'pb-20 sm:pb-24' : ''}`}>
      <AnimatePresence mode="wait">
        <motion.div
          key={pathname}
          initial={mounted && ANIMATIONS_ENABLED ? { opacity: 0 } : undefined}
          animate={mounted && ANIMATIONS_ENABLED ? { opacity: 1 } : undefined}
          exit={mounted && ANIMATIONS_ENABLED ? { opacity: 0 } : undefined}
          transition={{ duration: 0.15, ease: 'easeInOut' }}
          className="flex flex-1 flex-col"
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
