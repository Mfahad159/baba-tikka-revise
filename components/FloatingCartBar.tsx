'use client';

import { useEffect, useState, useRef } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useCart } from '@/hooks/useCart';
import { formatPKR } from '@/lib/utils';
import { ANIMATIONS_ENABLED } from '@/lib/animations';

export function FloatingCartBar() {
  const [isMounted, setIsMounted] = useState(false);
  const [pulse, setPulse] = useState(false);
  const prevItemsRef = useRef(0);
  
  const { totalItems, totalPrice } = useCart();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Micro-interaction: Pulse when a new item is added to the cart
  useEffect(() => {
    if (isMounted && totalItems > prevItemsRef.current) {
      setPulse(true);
      const timer = setTimeout(() => setPulse(false), 300);
      return () => clearTimeout(timer);
    }
    prevItemsRef.current = totalItems;
  }, [totalItems, isMounted]);

  // SSR Guard & Cart route exception
  if (!isMounted) return null;
  if (pathname === '/cart') return null;

  const isVisible = totalItems > 0;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="floating-cart-bar"
          initial={ANIMATIONS_ENABLED ? { y: 100, opacity: 0 } : undefined}
          animate={ANIMATIONS_ENABLED ? { 
            y: 0, 
            opacity: 1, 
            scale: pulse ? 0.98 : 1, // Inverse pulse creating a slight "press" pop
          } : undefined}
          exit={ANIMATIONS_ENABLED ? { y: 100, opacity: 0 } : undefined}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          onClick={() => router.push('/cart')}
          className={`fixed bottom-0 left-0 right-0 z-50 cursor-pointer rounded-t-[28px] pb-[env(safe-area-inset-bottom)] transition-all duration-300 hover:brightness-105 active:scale-[0.99] ${
            pulse ? 'shadow-[0_-8px_30px_rgba(200,150,62,0.15)]' : 'shadow-[0_-8px_24px_rgba(0,0,0,0.5)]'
          } bg-brand-bg-elevated dark:bg-brand-bg-elevated-dark border-t border-brand-border/30 dark:border-brand-border-dark/30`}
        >
          <div className="mx-auto flex w-full max-w-screen-md items-center justify-between gap-3 px-5 py-3 sm:px-6">
            
            {/* Left: Item Count Circle Badge */}
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand-accent-gold dark:bg-brand-accent-gold-dark shadow-md sm:h-12 sm:w-12">
              <AnimatePresence mode="popLayout">
                <motion.span
                  key={totalItems}
                  initial={ANIMATIONS_ENABLED ? { y: 15, opacity: 0 } : undefined}
                  animate={ANIMATIONS_ENABLED ? { y: 0, opacity: 1 } : undefined}
                  exit={ANIMATIONS_ENABLED ? { y: -15, opacity: 0, position: 'absolute' } : undefined}
                  transition={{ duration: 0.2 }}
                  className="font-body text-base font-bold text-brand-bg-primary"
                >
                  {totalItems}
                </motion.span>
              </AnimatePresence>
            </div>

            {/* Right: Elongated Action Pill */}
            <div className="flex flex-1 items-center justify-center gap-2 rounded-full bg-brand-accent-gold dark:bg-brand-accent-gold-dark py-2.5 shadow-md sm:py-3 cursor-pointer">
              <span className="font-heading text-base font-semibold tracking-wide text-brand-bg-primary sm:text-lg">
                Cart {totalPrice > 0 && `— ${formatPKR(totalPrice)}`}
              </span>
              <ArrowRight size={18} strokeWidth={2.5} className="ml-1 text-brand-bg-primary" />
            </div>
            
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
