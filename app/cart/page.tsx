'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, Minus, Plus, Trash2, ArrowRight, ArrowLeft } from 'lucide-react';
import { NavBar } from '@/components/sections/NavBar';
import { useCart } from '@/hooks/useCart';
import { formatPKR } from '@/lib/utils';
import { ANIMATIONS_ENABLED } from '@/lib/animations';
import { useIsMobile } from '@/hooks/useIsMobile';
import PageTransition from '@/components/PageTransition';

const DELIVERY_FEE = 150;

export default function CartPage() {
  const { cartItems, updateQuantity, removeFromCart, clearCart, totalPrice } = useCart();
  const isMobile = useIsMobile();
  const [ordering, setOrdering] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleCheckout = () => {
    setOrdering(true);
    setTimeout(() => {
      clearCart();
      setSuccess(true);
      setOrdering(false);
    }, 1500);
  };

  if (success) {
    return (
      <PageTransition>
        <main className="flex min-h-[100svh] flex-col bg-brand-bg-primary pt-28 transition-colors duration-300 dark:bg-brand-bg-primary-dark">
          <NavBar />
          <div className="mx-auto flex w-full max-w-xl flex-1 flex-col items-center justify-center p-6 text-center">
            <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-brand-accent-gold/10 text-brand-accent-gold dark:bg-brand-accent-gold-dark/10 dark:text-brand-accent-gold-dark">
              <svg
                className="h-10 w-10 text-brand-accent-gold dark:text-brand-accent-gold-dark"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="font-heading text-3xl font-bold text-brand-text-primary dark:text-brand-text-primary-dark">Order Received</h1>
            <p className="mt-4 font-body text-brand-text-secondary dark:text-brand-text-secondary-dark">
              Your order is being prepared. We will notify you once it&apos;s out for delivery.
            </p>
            <Link
              href="/"
              className="mt-8 rounded-full bg-brand-accent-gold px-8 py-3.5 font-body text-sm font-semibold text-brand-bg-primary transition-opacity hover:opacity-90 dark:bg-brand-accent-gold-dark dark:text-brand-text-primary-dark"
            >
              Back to Home
            </Link>
          </div>
        </main>
      </PageTransition>
    );
  }

  // Empty State Layout
  if (cartItems.length === 0) {
    return (
      <PageTransition>
        <main className="flex min-h-[100svh] flex-col bg-brand-bg-primary pt-28 transition-colors duration-300 dark:bg-brand-bg-primary-dark">
          <NavBar />
          <div className="mx-auto flex flex-1 flex-col items-center justify-center p-6 text-center">
            <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-brand-bg-secondary text-brand-text-secondary/50 dark:bg-brand-bg-secondary-dark dark:text-brand-text-secondary-dark/50">
              <ShoppingCart size={40} strokeWidth={1.5} />
            </div>
            <h2 className="font-heading text-2xl font-bold text-brand-text-primary dark:text-brand-text-primary-dark">Your cart is empty</h2>
            <p className="mt-3 max-w-sm font-body text-sm text-brand-text-secondary dark:text-brand-text-secondary-dark">
              Looks like you haven&apos;t added any dishes yet. Start exploring our rich menu.
            </p>
            <Link
              href="/menu"
              className="mt-8 inline-flex items-center gap-2 rounded-full border border-brand-accent-gold/50 bg-brand-accent-gold/5 px-6 py-3 font-body text-sm font-medium text-brand-accent-gold transition-colors hover:bg-brand-accent-gold hover:text-brand-bg-primary dark:border-brand-accent-gold-dark/50 dark:bg-brand-accent-gold-dark/5 dark:text-brand-accent-gold-dark dark:hover:bg-brand-accent-gold-dark dark:hover:text-brand-text-primary-dark"
            >
              Explore Menu
              <ArrowRight size={14} />
            </Link>
          </div>
        </main>
      </PageTransition>
    );
  }

  // Active Cart Layout
  const finalTotal = totalPrice + DELIVERY_FEE;

  return (
    <PageTransition>
      <main className="min-h-[100svh] bg-brand-bg-primary pt-28 transition-colors duration-300 dark:bg-brand-bg-primary-dark">
        <NavBar />
        
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 flex items-center justify-between">
            <h1 className="font-heading text-3xl font-bold text-brand-text-primary dark:text-brand-text-primary-dark">Your Cart</h1>
            <Link
              href="/menu"
              className="inline-flex items-center gap-2 rounded-full border border-brand-accent-gold/40 px-4 py-2 font-body text-xs sm:text-sm font-medium text-brand-accent-gold transition-all hover:bg-brand-accent-gold/10 active:scale-95 dark:border-brand-accent-gold-dark/40 dark:text-brand-accent-gold-dark dark:hover:bg-brand-accent-gold-dark/10"
            >
              <ArrowLeft size={14} />
              Back to Menu
            </Link>
          </div>

          <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:gap-12">
            
            {/* LEFT: Items List */}
            <div className="flex-1 space-y-4">
              <AnimatePresence mode="popLayout">
                {cartItems.map((item) => (
                  <motion.div
                    key={item.id}
                    layout={ANIMATIONS_ENABLED}
                    initial={ANIMATIONS_ENABLED ? { opacity: 0, y: isMobile ? 10 : 20 } : {}}
                    animate={{ opacity: 1, y: 0 }}
                    exit={ANIMATIONS_ENABLED ? { opacity: 0, x: isMobile ? -10 : -20 } : {}}
                    transition={{ duration: 0.2, ease: 'easeOut' }} // SNAPPY
                    className="flex flex-row items-center gap-4 rounded-2xl border border-brand-border bg-brand-bg-secondary p-4 dark:border-brand-border-dark dark:bg-brand-bg-secondary-dark sm:p-5"
                  >
                    {/* Thumbnail */}
                    <div className="relative h-20 w-20 flex-none overflow-hidden rounded-xl border border-brand-border dark:border-brand-border-dark sm:h-24 sm:w-24">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        sizes="(max-width: 640px) 80px, 96px"
                        className="object-cover"
                      />
                    </div>

                    {/* Info */}
                    <div className="flex flex-1 flex-col sm:flex-row sm:items-center sm:justify-between sm:gap-4">
                      <div className="min-w-0 flex-1">
                        <h3 className="truncate font-heading text-lg font-semibold text-brand-text-primary dark:text-brand-text-primary-dark">
                          {item.name}
                        </h3>
                        <p className="mt-1 font-sans font-medium text-sm tracking-tight text-brand-accent-gold dark:text-brand-accent-gold-dark">{formatPKR(item.price)}</p>
                      </div>

                      {/* Actions Row */}
                      <div className="mt-4 flex items-center justify-between gap-4 sm:mt-0 sm:justify-end">
                        {/* Qty Controls */}
                        <div className="flex h-9 items-center rounded-full border border-brand-border bg-brand-bg-primary px-3 dark:border-brand-border-dark dark:bg-brand-bg-primary-dark">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="text-brand-text-secondary transition-colors hover:text-brand-text-primary dark:text-brand-text-secondary-dark dark:hover:text-brand-text-primary-dark"
                            disabled={item.quantity <= 1}
                          >
                            <Minus size={14} strokeWidth={2.5} />
                          </button>
                          <span className="min-w-[28px] text-center font-body text-[13px] font-bold text-brand-text-primary dark:text-brand-text-primary-dark">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="text-brand-text-secondary transition-colors hover:text-brand-text-primary dark:text-brand-text-secondary-dark dark:hover:text-brand-text-primary-dark"
                          >
                            <Plus size={14} strokeWidth={2.5} />
                          </button>
                        </div>

                        {/* Subtotal */}
                        <div className="hidden min-w-[80px] text-right font-sans font-medium tracking-tight text-brand-text-primary dark:text-brand-text-primary-dark sm:block">
                          {formatPKR(item.price * item.quantity)}
                        </div>

                        {/* Delete */}
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="rounded-full bg-red-500/10 p-2 text-red-400 transition-colors hover:bg-red-500 hover:text-white"
                          aria-label="Remove item"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* RIGHT: Order Summary Sticky Card */}
            <div className="sticky top-28 w-full max-w-sm rounded-3xl border border-brand-border bg-brand-bg-secondary p-6 dark:border-brand-border-dark dark:bg-brand-bg-secondary-dark lg:flex-none">
              <h2 className="mb-6 font-heading text-xl font-bold text-brand-text-primary dark:text-brand-text-primary-dark">Order Summary</h2>
              
              <div className="space-y-4 font-body text-sm">
                <div className="flex justify-between text-brand-text-secondary dark:text-brand-text-secondary-dark">
                  <span>Subtotal</span>
                  <span className="font-sans font-medium tracking-tight text-brand-text-primary dark:text-brand-text-primary-dark">{formatPKR(totalPrice)}</span>
                </div>
                <div className="flex justify-between text-brand-text-secondary dark:text-brand-text-secondary-dark">
                  <span>Delivery logic <span className="ml-1 text-[10px] uppercase tracking-widest text-brand-accent-gold dark:text-brand-accent-gold-dark">(TODO)</span></span>
                  <span className="font-sans font-medium tracking-tight text-brand-text-primary dark:text-brand-text-primary-dark">{formatPKR(DELIVERY_FEE)}</span>
                </div>
                <div className="my-4 h-px w-full bg-brand-border dark:bg-brand-border-dark" />
                <div className="flex justify-between font-heading text-lg font-bold text-brand-text-primary dark:text-brand-text-primary-dark">
                  <span>Total</span>
                  <span className="font-sans font-bold tracking-tight text-brand-accent-gold dark:text-brand-accent-gold-dark">{formatPKR(finalTotal)}</span>
                </div>
              </div>

              <button
                onClick={handleCheckout}
                disabled={ordering}
                className="group mt-8 flex w-full items-center justify-center gap-2 rounded-full bg-brand-accent-gold px-6 py-4 font-body text-base font-semibold text-brand-bg-primary shadow-xl shadow-brand-accent-gold/20 transition-all hover:brightness-105 hover:shadow-brand-accent-gold/40 disabled:opacity-70 active:scale-[0.98] dark:bg-brand-accent-gold-dark dark:text-brand-text-primary-dark dark:shadow-brand-accent-gold-dark/20 dark:hover:brightness-110 dark:hover:shadow-brand-accent-gold-dark/40"
              >
                {ordering ? (
                  <span className="h-5 w-5 animate-spin rounded-full border-2 border-brand-bg-primary/20 border-t-brand-bg-primary dark:border-brand-text-primary-dark/20 dark:border-t-brand-text-primary-dark" />
                ) : (
                  <>
                    Confirm Order
                    <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                  </>
                )}
              </button>

              <p className="mt-5 text-center font-body text-xs text-brand-text-secondary/70 dark:text-brand-text-secondary-dark/70">
                Payments are currently cash-on-delivery. API integration for online payments happens in Phase 3.
              </p>
            </div>

          </div>
        </div>
      </main>
    </PageTransition>
  );
}
