'use client';

// HeroSection — Dark moody redesign. Reference: Ichiban restaurant layout.
// Adapted for Baba Tikkah: Pakistani restaurant, charcoal bg, gold accents.
//
// Layout:
//   Top-left: Headline + subtext + CTA + customer badges
//   Center-right: Large floating dish image (radial vignette fades into dark bg)
//   Bottom: "Book Reservation" pill (top-right) + horizontal dish mini-cards strip
//
// SWAP POINTS:
//   HERO_COPY — text
//   HERO_DISH — the large floating centre image (no cutout needed, vignette does the work)
//   BOTTOM_DISHES — the 3 mini cards in the strip at the bottom
//   CUSTOMER_AVATARS — placeholder avatar images

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { ANIMATIONS_ENABLED } from '@/lib/animations';
import { DishCard } from '@/components/ui/DishCard';

const PRICES: Record<string, number> = {
  tikka: 0,    // TODO: fill real price
  karahi: 0,   // TODO: fill real price
  sajji: 0,    // TODO: fill real price
};

// ─── Data ──────────────────────────────────────────────────────────────────────

// The large centre dish — rotates as a slideshow
const SLIDE_IMAGES = [
  '/hero-image-slideshow/1.webp',
  '/hero-image-slideshow/2.webp',
  '/hero-image-slideshow/3.webp',
  '/hero-image-slideshow/4.webp',
  '/hero-image-slideshow/5.webp',
];

const SLIDE_INTERVAL_MS = 4000;

// TODO: Replace with real headline + subtext
const HERO_COPY = {
  headline: ['Taste, Tradition &', 'True Authenticity'],
  subtext:
    'Embark on an unforgettable culinary journey at Baba Tikkah — where every dish tells a story of 25 years of perfection.',
  cta: { label: 'Explore Menu', href: '#menu' },
  book: { label: 'Book Reservation', href: '#reservations' },
};

// Bottom dish strip — 3 highlighted items
// TODO: replace descriptions/prices/ratings with real data
const BOTTOM_DISHES = [
  {
    id: 'tikka',
    name: 'Tikka Kabab',
    desc: 'Char-grilled, secret spice marinade',
    rating: 4.9,
    image: '/images/imgi_43_TikkahKabab.jpg',
  },
  {
    id: 'karahi',
    name: 'Chicken Karahi',
    desc: 'Slow-cooked, hand-ground masala',
    rating: 4.8,
    image: '/images/imgi_33_ChickenWhiteKarahi.jpg',
  },
  {
    id: 'sajji',
    name: 'Sajji Special',
    desc: 'Live charcoal, Balochi herbs',
    rating: 4.9,
    image: '/images/imgi_89_SajjiDeal.png',
  },
];

// TODO: Replace with real customer photo URLs in Phase 3
const CUSTOMER_AVATARS = [
  { color: '#C8963E', label: 'A' },
  { color: '#2E7D32', label: 'F' },
  { color: '#7B1FA2', label: 'U' },
  { color: '#1565C0', label: 'S' },
];

// ─── Helpers ───────────────────────────────────────────────────────────────────

const EASE_OUT = 'easeOut' as const;
const EASE_IN = 'easeIn' as const;

// ─── Component ─────────────────────────────────────────────────────────────────

export function HeroSection() {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(
      () => setCurrent((p) => (p + 1) % SLIDE_IMAGES.length),
      SLIDE_INTERVAL_MS,
    );
    return () => clearInterval(id);
  }, [paused]);

  const prev = useCallback(() => setCurrent((p) => (p - 1 + SLIDE_IMAGES.length) % SLIDE_IMAGES.length), []);
  const next = useCallback(() => setCurrent((p) => (p + 1) % SLIDE_IMAGES.length), []);

  const entry = (delay: number) =>
    ANIMATIONS_ENABLED
      ? { initial: { opacity: 0, y: 28 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.65, ease: EASE_OUT, delay } }
      : {};

  return (
    // VISUAL CHOICE: bg-[#0C0C0C] — true near-black, slightly warmer than pure #000.
    // Change to bg-brand-charcoal for a slightly lighter dark if needed.
    <section className="relative min-h-[100svh] overflow-hidden bg-[#0C0C0C] pt-20">

      {/* ── Ambient glow blobs ────────────────────────────────────────────────
           Subtle radial glows give depth on pure black — common in premium food UIs.
           VISUAL CHOICE: gold glow top-left + muted amber right. Remove if too subtle on your monitor. */}
      <div className="pointer-events-none absolute left-0 top-0 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/4 rounded-full bg-brand-gold/5 blur-[120px]" />
      <div className="pointer-events-none absolute right-0 top-1/3 h-[600px] w-[600px] translate-x-1/3 rounded-full bg-amber-900/10 blur-[140px]" />

      {/* ── Book Reservation floating pill — top right ────────────────────── */}
      <motion.div
        {...(ANIMATIONS_ENABLED ? { initial: { opacity: 0, y: -12 }, animate: { opacity: 1, y: 0 }, transition: { delay: 0.5, duration: 0.5, ease: EASE_OUT } } : {})}
        className="absolute right-8 top-24 z-20 hidden md:block"
      >
        <Link
          href={HERO_COPY.book.href}
          className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-2.5 font-body text-xs font-medium text-white/80 backdrop-blur-md transition-colors hover:border-brand-gold/50 hover:text-brand-gold"
        >
          {HERO_COPY.book.label}
          <ArrowRight size={13} />
        </Link>
      </motion.div>

      {/* ── Main grid: left text + right floating dish ────────────────────── */}
      <div className="relative mx-auto flex min-h-[calc(100svh-5rem-120px)] max-w-7xl flex-col items-start px-6 sm:px-8 lg:flex-row lg:items-center lg:px-12">

        {/* LEFT: text block */}
        <div className="relative z-10 flex flex-1 flex-col items-center justify-center pt-12 text-center lg:items-start lg:pt-0 lg:text-left">
          {/* Headline */}
          {/* VISUAL CHOICE: text-5xl → 7xl. Adjust at lg:text-[80px] for extreme impact. */}
          <motion.h1
            {...entry(0.1)}
            className="max-w-2xl font-heading text-5xl font-bold leading-[1.1] tracking-tight text-white sm:text-6xl md:text-[64px] lg:text-[72px]"
          >
            {HERO_COPY.headline.map((l, i) => <span key={i} className="block">{l}</span>)}
          </motion.h1>

          {/* Subtext */}
          <motion.p
            {...entry(0.24)}
            className="mt-5 max-w-lg font-body text-sm leading-relaxed text-white/45 sm:text-base md:text-lg lg:max-w-md"
          >
            {HERO_COPY.subtext}
          </motion.p>

          {/* CTA */}
          <motion.div {...entry(0.36)} className="mt-8 flex justify-center lg:justify-start">
            <Link
              href={HERO_COPY.cta.href}
              className="inline-flex items-center gap-2 rounded-full bg-brand-gold px-7 py-3.5 font-body text-sm font-semibold text-white shadow-lg shadow-brand-gold/30 transition-all hover:bg-brand-gold-dark hover:shadow-brand-gold/50 active:scale-95"
            >
              {HERO_COPY.cta.label}
              <ArrowRight size={15} />
            </Link>
          </motion.div>

          {/* Customer avatars widget */}
          <motion.div
            {...entry(0.48)}
            className="mx-auto mt-10 flex w-fit items-center gap-4 rounded-2xl border border-white/8 bg-white/4 px-4 py-3 backdrop-blur-sm lg:mx-0"
          >
            <div className="flex items-center">
              {CUSTOMER_AVATARS.map((a, i) => (
                <div
                  key={i}
                  className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-[#0C0C0C] font-body text-xs font-bold text-white"
                  style={{ backgroundColor: a.color, marginLeft: i > 0 ? '-8px' : '0' }}
                >
                  {a.label}
                </div>
              ))}
            </div>
            <div>
              <p className="font-body text-[11px] font-semibold text-white">Our Happy Customers</p>
              {/* TODO: Replace with real customer count */}
              <div className="flex items-center gap-1">
                <Star size={10} className="fill-brand-gold text-brand-gold" />
                <span className="font-body text-[10px] text-white/50">4.9 · 2,400+ reviews</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* RIGHT: Floating dish image — large, vignette-blended */}
        <div
          className="relative flex flex-1 items-center justify-center py-10 md:py-16 lg:py-0"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {/* VISUAL CHOICE: w-[340px] → 560px desktop. The bigger the more dramatic. */}
          <div className="relative h-[300px] w-[300px] sm:h-[400px] sm:w-[400px] lg:h-[520px] lg:w-[520px]">
            <AnimatePresence mode="sync">
              <motion.div
                key={current}
                initial={{ opacity: 0, scale: 1.06 }}
                animate={{ opacity: 1, scale: 1, transition: { duration: 0.75, ease: EASE_OUT } }}
                exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.4, ease: EASE_IN } }}
                className="absolute inset-0"
              >
                <Image
                  src={SLIDE_IMAGES[current]}
                  alt={`Baba Tikkah signature dish ${current + 1}`}
                  fill
                  sizes="(max-width: 640px) 300px, (max-width: 1024px) 400px, 520px"
                  className="object-contain drop-shadow-2xl"
                  priority={current === 0}
                />
              </motion.div>
            </AnimatePresence>

            {/* Vignette gradient fades dish edges into the dark bg — "floating" illusion */}
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_40%,_#0C0C0C_85%)]" />
          </div>

          {/* Prev / Next slide arrows */}
          <button onClick={prev} aria-label="Previous dish" className="absolute left-0 top-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/60 transition hover:border-brand-gold/50 hover:text-brand-gold">
            <ChevronLeft size={16} />
          </button>
          <button onClick={next} aria-label="Next dish" className="absolute right-0 top-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full bg-brand-gold text-white shadow-lg shadow-brand-gold/40 transition hover:bg-brand-gold-dark">
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      {/* ── Bottom dish strip
           Mirrors the reference mini-card row at the bottom of the hero.
           VISUAL CHOICE: dark card with border-white/10 — glassy on pure black bg. */}
      <motion.div
        {...(ANIMATIONS_ENABLED ? { initial: { opacity: 0, y: 32 }, animate: { opacity: 1, y: 0 }, transition: { delay: 0.55, duration: 0.6, ease: EASE_OUT } } : {})}
        className="relative z-10 mx-auto max-w-7xl px-6 pb-8 sm:px-8 lg:px-12"
      >
        <div className="flex flex-col gap-3 sm:flex-row sm:gap-4 md:grid md:grid-cols-3">
          {BOTTOM_DISHES.map((dish, i) => (
            <motion.div
              key={dish.id}
              className="flex min-w-0"
              {...(ANIMATIONS_ENABLED
                ? {
                    initial: { opacity: 0, y: 15 },
                    animate: { opacity: 1, y: 0 },
                    transition: { duration: 0.5, delay: 0.6 + i * 0.1 },
                  }
                : {})}
            >
              <DishCard dish={{ ...dish, price: PRICES[dish.id] ?? 0 }} />
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
