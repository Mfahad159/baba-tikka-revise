'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, Minus, Plus, Trash2, ArrowRight } from 'lucide-react';
import { NavBar } from '@/components/sections/NavBar';
import { useCart } from '@/hooks/useCart';
import { formatPKR } from '@/lib/utils';
import { ANIMATIONS_ENABLED } from '@/lib/animations';

// TODO: delivery fee real logic depending on branch rules
const DELIVERY_FEE = 150;

export default function CartPage() {
  const { cartItems, updateQuantity, removeFromCart, clearCart, totalPrice } = useCart();
  const [mounted, setMounted] = useState(false);
  const [ordering, setOrdering] = useState(false);
  const [success, setSuccess] = useState(false);

  // SSR hydration safety
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const handleCheckout = () => {
    setOrdering(true);
    // TODO: implement real Supabase order API
    setTimeout(() => {
      clearCart();
      setSuccess(true);
      setOrdering(false);
    }, 1500);
  };

  if (success) {
    return (
      <main className="flex min-h-[100svh] flex-col bg-[#0C0C0C] pt-28">
        <NavBar />
        <div className="mx-auto flex w-full max-w-xl flex-1 flex-col items-center justify-center p-6 text-center">
          <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-brand-gold/10 text-brand-gold">
            <svg
              className="h-10 w-10 text-brand-gold"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="font-heading text-3xl font-bold text-white">Order Received</h1>
          <p className="mt-4 font-body text-white/50">
            Your order is being prepared. We will notify you once it&apos;s out for delivery.
          </p>
          <Link
            href="/"
            className="mt-8 rounded-full bg-brand-gold px-8 py-3.5 font-body text-sm font-semibold text-white transition-opacity hover:opacity-90"
          >
            Back to Home
          </Link>
        </div>
      </main>
    );
  }

  // Empty State Layout
  if (cartItems.length === 0) {
    return (
      <main className="flex min-h-[100svh] flex-col bg-[#0C0C0C] pt-28">
        <NavBar />
        <div className="mx-auto flex flex-1 flex-col items-center justify-center p-6 text-center pb-20">
          <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-white/5 text-white/20">
            <ShoppingCart size={40} strokeWidth={1.5} />
          </div>
          <h2 className="font-heading text-2xl font-bold text-white">Your cart is empty</h2>
          <p className="mt-3 max-w-sm font-body text-sm text-white/45">
            Looks like you haven&apos;t added any dishes yet. Start exploring our rich menu.
          </p>
          <Link
            href="/#menu"
            className="mt-8 inline-flex items-center gap-2 rounded-full border border-brand-gold/50 bg-brand-gold/5 px-6 py-3 font-body text-sm font-medium text-brand-gold transition-colors hover:bg-brand-gold hover:text-white"
          >
            Explore Menu
            <ArrowRight size={14} />
          </Link>
        </div>
      </main>
    );
  }

  // Active Cart Layout
  const finalTotal = totalPrice + DELIVERY_FEE;

  return (
    <main className="min-h-[100svh] bg-[#0C0C0C] pb-24 pt-28">
      <NavBar />
      
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h1 className="mb-8 font-heading text-3xl font-bold text-white">Your Cart</h1>

        <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:gap-12">
          
          {/* LEFT: Items List */}
          <div className="flex-1 space-y-4">
            <AnimatePresence mode="popLayout">
              {cartItems.map((item) => (
                <motion.div
                  key={item.id}
                  layout={ANIMATIONS_ENABLED}
                  initial={ANIMATIONS_ENABLED ? { opacity: 0, scale: 0.95 } : {}}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={ANIMATIONS_ENABLED ? { opacity: 0, x: -20, scale: 0.95 } : {}}
                  transition={{ duration: 0.25, ease: 'easeOut' }}
                  className="flex flex-row items-center gap-4 rounded-2xl border border-white/5 bg-[#141414] p-4 sm:p-5"
                >
                  {/* Thumbnail */}
                  <div className="relative h-20 w-20 flex-none overflow-hidden rounded-xl border border-white/10 sm:h-24 sm:w-24">
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
                      <h3 className="truncate font-heading text-lg font-semibold text-white">
                        {item.name}
                      </h3>
                      <p className="mt-1 font-body text-sm text-brand-cream">{formatPKR(item.price)}</p>
                    </div>

                    {/* Actions Row */}
                    <div className="mt-4 flex items-center justify-between gap-4 sm:mt-0 sm:justify-end">
                      {/* Qty Controls */}
                      <div className="flex h-9 items-center rounded-full border border-white/10 bg-[#0C0C0C] px-3">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="text-white/40 transition-colors hover:text-white"
                          disabled={item.quantity <= 1}
                        >
                          <Minus size={14} strokeWidth={2.5} />
                        </button>
                        <span className="min-w-[28px] text-center font-body text-[13px] font-bold text-white">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="text-white/40 transition-colors hover:text-white"
                        >
                          <Plus size={14} strokeWidth={2.5} />
                        </button>
                      </div>

                      {/* Subtotal */}
                      <div className="hidden min-w-[80px] text-right font-body font-semibold text-white sm:block">
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
          <div className="sticky top-28 w-full max-w-sm rounded-3xl border border-white/5 bg-[#141414] p-6 lg:flex-none">
            <h2 className="mb-6 font-heading text-xl font-bold text-white">Order Summary</h2>
            
            <div className="space-y-4 font-body text-sm">
              <div className="flex justify-between text-white/50">
                <span>Subtotal</span>
                <span className="text-white">{formatPKR(totalPrice)}</span>
              </div>
              <div className="flex justify-between text-white/50">
                <span>Delivery logic <span className="text-[10px] text-brand-gold uppercase tracking-widest ml-1">(TODO)</span></span>
                <span className="text-white">{formatPKR(DELIVERY_FEE)}</span>
              </div>
              <div className="my-4 h-px w-full bg-white/5" />
              <div className="flex justify-between font-heading text-lg font-bold text-brand-cream">
                <span>Total</span>
                <span>{formatPKR(finalTotal)}</span>
              </div>
            </div>

            <button
              onClick={handleCheckout}
              disabled={ordering}
              className="group mt-8 flex w-full items-center justify-center gap-2 rounded-full bg-brand-gold px-6 py-4 font-body text-base font-semibold text-white shadow-xl shadow-brand-gold/20 transition-all hover:bg-brand-gold-dark hover:shadow-brand-gold/40 disabled:opacity-70 active:scale-[0.98]"
            >
              {ordering ? (
                <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/20 border-t-white" />
              ) : (
                <>
                  Confirm Order
                  <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                </>
              )}
            </button>

            <p className="mt-5 text-center font-body text-xs text-white/30">
              Payments are currently cash-on-delivery. API integration for online payments happens in Phase 3.
            </p>
          </div>

        </div>
      </div>
    </main>
  );
}
