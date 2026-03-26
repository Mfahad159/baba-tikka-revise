'use client';

// MenuHighlights
// Phase B: Converted to a featured grid layout combining decision fatigue prevention (max 3 items)
// and strict visual dominance (featured card occupying larger grid space).

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ANIMATIONS_ENABLED, staggerContainer, scrollEntrance } from '@/lib/animations';
import { DishCard, DishData } from '@/components/ui/DishCard';

const MENU_ITEMS: DishData[] = [
  {
    id: 'sajji-deal',
    name: 'Sajji Deal',
    desc: 'Whole slow-roasted Sajji with fragrant rice — the undisputed star of our kitchen. Feeds the whole family.',
    price: 2800,
    rating: 4.9,
    image: '/images/imgi_89_SajjiDeal.png',
    // Phase B Psychology Triggers
    isSignature: true,
    isFeatured: true,
    popularityLabel: 'Ordered 200+ times today',
  },
  {
    id: 'chicken-karahi',
    name: 'Chicken White Karahi',
    desc: 'Slow-cooked in a rich white gravy with ginger, garlic, and hand-ground spices.',
    price: 1450,
    rating: 4.8,
    image: '/images/imgi_33_ChickenWhiteKarahi.jpg',
    // Phase B Psychology Triggers
    isLimitedAvailability: true,
  },
  {
    id: 'tikka-kabab',
    name: 'Tikka Kabab',
    desc: 'Tender pieces of chicken marinated in our secret spice blend, char-grilled to perfection.',
    price: 850,
    rating: 4.9,
    image: '/images/imgi_43_TikkahKabab.jpg',
    popularityLabel: 'Cult favorite',
  },
];

export function MenuHighlights() {
  const containerProps = ANIMATIONS_ENABLED
    ? {
        variants: staggerContainer,
        initial: 'hidden',
        whileInView: 'visible',
        viewport: { once: true, margin: '-50px' },
      }
    : {};

  const childProps = ANIMATIONS_ENABLED ? { variants: scrollEntrance } : {};

  return (
    <section id="menu" className="bg-brand-bg-secondary py-24 shadow-[inset_0_20px_40px_rgba(0,0,0,0.2)]">
      <motion.div {...containerProps} className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section header */}
        <motion.div {...childProps} className="mb-14 text-center">
          <p className="mb-3 font-body text-[10px] font-semibold uppercase tracking-[0.3em] text-brand-accent-gold">
            Our Specialties
          </p>
          <div className="relative inline-block">
            <h2 className="font-heading text-4xl font-semibold text-brand-text-primary lg:text-5xl">
              Menu Highlights
            </h2>
            <span className="absolute -bottom-3 left-1/2 h-[2px] w-12 -translate-x-1/2 rounded-full bg-brand-accent-gold" />
          </div>
          <p className="mx-auto mt-6 max-w-xl font-body text-base text-brand-text-secondary">
            A curated selection of our finest dishes. No endless scrolling—just the absolute best we have to offer.
          </p>
        </motion.div>

        {/* 
          Phase B Layout: 1 Featured Card + 2 Standard Cards.
          Mobile: 2 columns, Featured spans both.
          Tablet: 3 columns, Featured spans 2 columns, standard span 1. 
        */}
        <div className="grid grid-cols-2 gap-3 sm:gap-6 lg:grid-cols-3 lg:gap-8">
          {MENU_ITEMS.slice(0, 3).map((item) => {
            const colSpan = item.isFeatured 
              ? 'col-span-2 lg:col-span-2' 
              : 'col-span-1 lg:col-span-1';

            return (
              <motion.article
                {...childProps}
                key={item.id}
                className={`flex w-full ${colSpan}`}
              >
                <DishCard dish={item} />
              </motion.article>
            );
          })}
        </div>

        {/* View Full Menu CTA - Secondary ghost styling so it doesn't compete with Add to Cart */}
        <motion.div {...childProps} className="mt-14 text-center">
          <Link
            href="/menu" // TODO: connect to full menu page when available
            className="inline-flex items-center gap-2 rounded-full border border-brand-accent-gold/40 px-8 py-3.5 font-body text-sm font-semibold text-brand-accent-gold transition-all hover:bg-brand-accent-gold/10 hover:text-brand-accent-gold active:scale-95"
          >
            View Full Menu
            <span aria-hidden>→</span>
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}
