'use client';

import * as React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { motion, AnimatePresence } from 'framer-motion';
import { ANIMATIONS_ENABLED } from '@/lib/animations';
import { useIsMobile } from '@/hooks/useIsMobile';

export function ThemeToggle() {
  const { setTheme, resolvedTheme } = useTheme();
  const isMobile = useIsMobile();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => setMounted(true), []);

  if (!mounted) {
    // Return a dummy placeholder of exact same dimensions to avoid layout shift
    return <div className="h-[44px] w-[44px]" aria-hidden="true" />;
  }

  const isDark = resolvedTheme === 'dark';

  return (
    <button
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className="relative flex h-[44px] w-[44px] items-center justify-center text-brand-text-secondary transition-colors hover:text-brand-accent-gold dark:text-brand-text-secondary-dark dark:hover:text-brand-accent-gold-dark"
      aria-label="Toggle theme"
    >
      <AnimatePresence mode="wait" initial={false}>
        {isDark ? (
          <motion.div
            key="sun"
            initial={ANIMATIONS_ENABLED ? { opacity: 0, rotate: isMobile ? 0 : -90 } : undefined}
            animate={ANIMATIONS_ENABLED ? { opacity: 1, rotate: 0 } : undefined}
            exit={ANIMATIONS_ENABLED ? { opacity: 0, rotate: isMobile ? 0 : 90 } : undefined}
            transition={{ duration: 0.15 }} // Snappy: faster icons
            className="absolute"
            style={{ willChange: 'transform, opacity' }}
          >
            <Sun size={20} />
          </motion.div>
        ) : (
          <motion.div
            key="moon"
            initial={ANIMATIONS_ENABLED ? { opacity: 0, rotate: isMobile ? 0 : 90 } : undefined}
            animate={ANIMATIONS_ENABLED ? { opacity: 1, rotate: 0 } : undefined}
            exit={ANIMATIONS_ENABLED ? { opacity: 0, rotate: isMobile ? 0 : -90 } : undefined}
            transition={{ duration: 0.15 }} // Snappy
            className="absolute"
            style={{ willChange: 'transform, opacity' }}
          >
            <Moon size={20} />
          </motion.div>
        )}
      </AnimatePresence>
    </button>
  );
}
