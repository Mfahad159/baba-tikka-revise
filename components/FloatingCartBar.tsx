'use client';

import { useEffect, useState, useRef } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart } from 'lucide-react';
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
          className={`fixed bottom-4 left-4 right-4 mx-auto max-w-screen-md z-50 cursor-pointer overflow-hidden rounded-2xl border border-brand-accent-gold/20 pb-[env(safe-area-inset-bottom)] transition-all duration-300 hover:brightness-110 active:scale-[0.98] ${
            pulse ? 'border-brand-accent-gold shadow-[0_4px_30px_rgba(200,150,62,0.3)]' : 'shadow-[0_4px_24px_rgba(0,0,0,0.4)]'
          } bg-brand-bg-primary/95 backdrop-blur-md`}
        >
          <div className="flex w-full items-center justify-between px-5 py-3 sm:px-6">
            
            {/* Left: Item Count Badge */}
            <div className="flex w-[80px] shrink-0 items-center justify-start">
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-brand-accent-gold font-body text-xs font-bold text-brand-bg-primary shadow-sm sm:h-8 sm:w-8 sm:text-sm">
                <AnimatePresence mode="popLayout">
                  <motion.span
                    key={totalItems}
                    initial={ANIMATIONS_ENABLED ? { y: 15, opacity: 0 } : undefined}
                    animate={ANIMATIONS_ENABLED ? { y: 0, opacity: 1 } : undefined}
                    exit={ANIMATIONS_ENABLED ? { y: -15, opacity: 0, position: 'absolute' } : undefined}
                    transition={{ duration: 0.2 }}
                  >
                    {totalItems}
                  </motion.span>
                </AnimatePresence>
              </div>
            </div>

            {/* Center: CTA Text */}
            <div className="flex flex-1 items-center justify-center gap-2">
              <ShoppingCart size={16} className="text-brand-text-primary" />
              <span className="font-heading text-base font-medium text-brand-text-primary sm:text-lg">
                Go to Cart
              </span>
            </div>

            {/* Right: Total Price */}
            <div className="flex w-[80px] shrink-0 items-center justify-end text-right">
              <span className="font-body text-sm font-bold tracking-wide text-brand-accent-gold sm:text-base">
                {formatPKR(totalPrice)}
              </span>
            </div>
            
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
