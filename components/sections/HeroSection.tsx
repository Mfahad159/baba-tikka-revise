'use client';

// HeroSection — Dark moody redesign unified with Phase A brand tokens.
// Top-left: Headline + subtext + CTA + customer badges
// Center-right: Large floating dish image (radial vignette fades into dark bg)
// Bottom: "Book Reservation" pill (top-right) + horizontal dish mini-cards strip

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { ANIMATIONS_ENABLED } from '@/lib/animations';

const SLIDE_IMAGES = [
  '/hero-image-slideshow/1.webp',
  '/hero-image-slideshow/2.webp',
  '/hero-image-slideshow/3.webp',
  '/hero-image-slideshow/4.webp',
  '/hero-image-slideshow/5.webp',
];

const SLIDE_INTERVAL_MS = 4000;

const HERO_COPY = {
  headline: ['Taste, Tradition &', 'True Authenticity'],
  subtext:
    'Embark on an unforgettable culinary journey at Baba Tikkah — where every dish tells a story of 25 years of perfection.',
  cta: { label: 'Explore Menu', href: '/#menu' },
  book: { label: 'Book Reservation', href: '/#reservations' },
};


const CUSTOMER_AVATARS = [
  { color: '#C8963E', label: 'A' },
  { color: '#2E7D32', label: 'F' },
  { color: '#7B1FA2', label: 'U' },
  { color: '#1565C0', label: 'S' },
];

const EASE_OUT = 'easeOut' as const;
const EASE_IN = 'easeIn' as const;

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
    <section className="relative min-h-[100svh] overflow-hidden bg-brand-bg-primary pt-20 transition-colors duration-300 dark:bg-brand-bg-primary-dark">
      {/* Ambient glow blobs */}
      <div className="pointer-events-none absolute left-0 top-0 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/4 rounded-full bg-brand-accent-gold/10 blur-[120px] dark:bg-brand-accent-gold-dark/5" />
      <div className="pointer-events-none absolute right-0 top-1/3 h-[600px] w-[600px] translate-x-1/3 rounded-full bg-amber-900/10 blur-[140px] dark:bg-amber-900/20" />

      {/* Book Reservation floating pill */}
      <motion.div
        {...(ANIMATIONS_ENABLED ? { initial: { opacity: 0, y: -12 }, animate: { opacity: 1, y: 0 }, transition: { delay: 0.5, duration: 0.5, ease: EASE_OUT } } : {})}
        className="absolute right-8 top-24 z-20 hidden md:block"
      >
        <Link
          href={HERO_COPY.book.href}
          className="flex items-center gap-2 rounded-full border border-brand-border bg-brand-text-primary/5 px-5 py-2.5 font-body text-xs font-medium text-brand-text-primary/80 backdrop-blur-md transition-colors hover:border-brand-accent-gold/50 hover:text-brand-accent-gold dark:border-brand-border-dark dark:bg-brand-text-primary-dark/5 dark:text-brand-text-primary-dark/80 dark:hover:border-brand-accent-gold-dark/50 dark:hover:text-brand-accent-gold-dark"
        >
          {HERO_COPY.book.label}
          <ArrowRight size={13} />
        </Link>
      </motion.div>

      <div className="relative mx-auto flex min-h-[calc(100svh-5rem)] max-w-7xl flex-col items-start px-6 sm:px-8 lg:flex-row lg:items-center lg:px-12 pb-16">
        {/* LEFT: text block */}
        <div className="relative z-10 flex flex-1 flex-col items-center justify-center pt-12 text-center lg:items-start lg:pt-0 lg:text-left">
          <motion.h1
            {...entry(0.1)}
            className="max-w-2xl font-heading text-5xl font-bold leading-[1.1] tracking-tight text-brand-text-primary dark:text-brand-text-primary-dark sm:text-6xl md:text-[64px] lg:text-[72px]"
          >
            {HERO_COPY.headline.map((l, i) => <span key={i} className="block">{l}</span>)}
          </motion.h1>

          <motion.p
            {...entry(0.24)}
            className="mt-5 max-w-lg font-body text-sm leading-relaxed text-brand-text-secondary dark:text-brand-text-secondary-dark sm:text-base md:text-lg lg:max-w-md"
          >
            {HERO_COPY.subtext}
          </motion.p>

          <motion.div {...entry(0.36)} className="mt-8 flex justify-center lg:justify-start">
            <Link
              href={HERO_COPY.cta.href}
              className="inline-flex items-center gap-2 rounded-full bg-brand-accent-gold px-7 py-3.5 font-body text-sm font-semibold text-brand-bg-primary shadow-lg shadow-brand-accent-gold/30 transition-all hover:brightness-105 active:scale-95 dark:bg-brand-accent-gold-dark dark:text-brand-bg-primary-dark dark:shadow-brand-accent-gold-dark/30 dark:hover:brightness-110"
            >
              {HERO_COPY.cta.label}
              <ArrowRight size={15} />
            </Link>
          </motion.div>

          {/* Customer avatars widget */}
          <motion.div
            {...entry(0.48)}
            className="mx-auto mt-10 flex w-fit items-center gap-4 rounded-2xl border border-brand-border bg-brand-bg-secondary px-4 py-3 backdrop-blur-sm dark:border-brand-border-dark dark:bg-brand-bg-secondary-dark lg:mx-0"
          >
            <div className="flex items-center">
              {CUSTOMER_AVATARS.map((a, i) => (
                <div
                  key={i}
                  className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-brand-bg-primary font-body text-xs font-bold text-white dark:border-brand-bg-primary-dark"
                  style={{ backgroundColor: a.color, marginLeft: i > 0 ? '-8px' : '0' }}
                >
                  {a.label}
                </div>
              ))}
            </div>
            <div>
              <p className="font-body text-[11px] font-semibold text-brand-text-primary dark:text-brand-text-primary-dark">Our Happy Customers</p>
              <div className="flex items-center gap-1">
                <Star size={10} className="fill-brand-accent-gold text-brand-accent-gold dark:fill-brand-accent-gold-dark dark:text-brand-accent-gold-dark" />
                <span className="font-body text-[10px] text-brand-text-secondary dark:text-brand-text-secondary-dark">4.9 · 2,400+ reviews</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* RIGHT: Floating dish image */}
        <div
          className="relative flex flex-1 items-center justify-center py-10 md:py-16 lg:py-0"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div className="relative aspect-square w-full max-w-[320px] sm:max-w-[400px] lg:max-w-[520px]">
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
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_40%,_rgba(250,247,242,0.8)_85%)] dark:bg-[radial-gradient(ellipse_at_center,_transparent_40%,_#1A1A1A_85%)]" />
          </div>

          <button onClick={prev} aria-label="Previous dish" className="absolute left-0 top-1/2 hidden h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-brand-border bg-brand-text-primary/5 text-brand-text-secondary transition hover:border-brand-accent-gold/50 hover:text-brand-accent-gold dark:border-brand-border-dark dark:bg-brand-text-primary-dark/5 dark:text-brand-text-secondary-dark dark:hover:border-brand-accent-gold-dark/50 dark:hover:text-brand-accent-gold-dark sm:flex">
            <ChevronLeft size={16} />
          </button>
          <button onClick={next} aria-label="Next dish" className="absolute right-0 top-1/2 hidden h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-brand-accent-gold text-brand-bg-primary shadow-lg shadow-brand-accent-gold/40 transition hover:brightness-105 dark:bg-brand-accent-gold-dark dark:text-brand-bg-primary-dark dark:shadow-brand-accent-gold-dark/40 dark:hover:brightness-110 sm:flex">
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

    </section>
  );
}
