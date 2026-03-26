'use client';

// TestimonialsSection — Applied brand.bg.secondary token and completely overhauled
// the design to match the dark Ichiban-style aesthetic from Phase A audit.

import { motion } from 'framer-motion';
import { ANIMATIONS_ENABLED, staggerContainer, scrollEntrance } from '@/lib/animations';

interface Testimonial {
  id: string;
  quote: string;
  author: string;
  location: string;
}

const TESTIMONIALS: Testimonial[] = [
  {
    id: 't1',
    quote: 'The tikka here is absolutely unmatched — crispy outside, juicy inside. We drive from the other side of town just for this.',
    author: 'Fatima R.',
    location: 'Verified Diner',
  },
  {
    id: 't2',
    quote: "Best karahi I've had in years. The white karahi especially has that home-cooked depth that most restaurants can't replicate.",
    author: 'Ahmed K.',
    location: 'Local Guide',
  },
  {
    id: 't3',
    quote: 'We ordered the Sajji Deal for a family gathering and it was the star of the evening. Everyone kept asking where we got it from.',
    author: 'Sara M.',
    location: 'Family Diner',
  },
  {
    id: 't4',
    quote: 'The ambiance is warm, the service is quick, and the Mutton Champ melts in your mouth. This is our go-to for special occasions.',
    author: 'Usman T.',
    location: 'Food Critic',
  },
  {
    id: 't5',
    quote: "Dynamite Prawns are dangerously addictive. Never thought I'd find seafood this good at a Pakistani grill restaurant.",
    author: 'Nadia H.',
    location: 'First Time Guest',
  },
  {
    id: 't6',
    quote: 'Consistent quality across all branches — rare for a restaurant to maintain this standard. Truly a culinary gem.',
    author: 'Bilal A.',
    location: 'Regular Customer',
  },
];

// Dynamically generate 24 dense cards per row to flawlessly mask 4K ultrawide marquee scroll bounds
const row1 = Array(8).fill(TESTIMONIALS.slice(0, 3)).flat();
const row2 = Array(8).fill(TESTIMONIALS.slice(3)).flat();

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <div className="w-72 sm:w-80 flex-none rounded-2xl border border-brand-border bg-brand-bg-elevated p-5 sm:p-6 shadow-sm transition-colors hover:border-brand-accent-gold/40 dark:border-brand-border-dark dark:bg-brand-bg-elevated-dark dark:hover:border-brand-accent-gold-dark/40">
      <span className="font-heading text-4xl sm:text-5xl leading-none text-brand-accent-gold/40 dark:text-brand-accent-gold-dark/40">&ldquo;</span>
      <p className="mt-1 font-body text-xs sm:text-sm leading-relaxed text-brand-text-secondary dark:text-brand-text-secondary-dark">
        {testimonial.quote}
      </p>
      <div className="mt-5 flex items-center justify-between border-t border-brand-border pt-4 dark:border-brand-border-dark sm:mt-6">
        <p className="font-body text-xs sm:text-sm font-semibold text-brand-text-primary dark:text-brand-text-primary-dark">
          {testimonial.author}
        </p>
        <p className="font-body text-[10px] sm:text-xs text-brand-text-secondary/70 dark:text-brand-text-secondary-dark/70">{testimonial.location}</p>
      </div>
    </div>
  );
}

export function TestimonialsSection() {
  const headerProps = ANIMATIONS_ENABLED
    ? {
        initial: 'hidden',
        whileInView: 'visible',
        viewport: { once: true, margin: '-50px' },
        variants: staggerContainer,
      }
    : {};

  const childProps = ANIMATIONS_ENABLED ? { variants: scrollEntrance } : {};

  return (
    <section id="testimonials" className="overflow-hidden bg-brand-bg-secondary py-24 shadow-[inset_0_20px_40px_rgba(0,0,0,0.05)] transition-colors duration-300 dark:bg-brand-bg-secondary-dark dark:shadow-[inset_0_20px_40px_rgba(0,0,0,0.4)]">
      <motion.div {...headerProps} className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div {...childProps} className="mb-14 text-center">
          <p className="mb-3 font-body text-[10px] font-semibold uppercase tracking-[0.3em] text-brand-accent-gold dark:text-brand-accent-gold-dark">
            What People Say
          </p>
          <div className="relative inline-block">
            <h2 className="font-heading text-4xl font-semibold text-brand-text-primary dark:text-brand-text-primary-dark lg:text-5xl">
              Loved by Everyone
            </h2>
            <span className="absolute -bottom-3 left-1/2 h-[2px] w-12 -translate-x-1/2 rounded-full bg-brand-accent-gold dark:bg-brand-accent-gold-dark" />
          </div>
        </motion.div>
      </motion.div>

      <div
        className={['flex gap-5 px-4', ANIMATIONS_ENABLED ? 'animate-marquee-left' : 'overflow-x-auto'].join(' ')}
        aria-hidden={ANIMATIONS_ENABLED}
      >
        {row1.map((t, i) => (
          <TestimonialCard key={`row1-${t.id}-${i}`} testimonial={t} />
        ))}
      </div>

      <div
        className={['mt-5 flex gap-5 px-4', ANIMATIONS_ENABLED ? 'animate-marquee-right' : 'overflow-x-auto'].join(' ')}
        aria-hidden={ANIMATIONS_ENABLED}
      >
        {row2.map((t, i) => (
          <TestimonialCard key={`row2-${t.id}-${i}`} testimonial={t} />
        ))}
      </div>

      {!ANIMATIONS_ENABLED && (
        <div className="sr-only">
          {TESTIMONIALS.map((t) => (
            <blockquote key={t.id}>
              <p>{t.quote}</p>
              <cite>
                {t.author}, {t.location}
              </cite>
            </blockquote>
          ))}
        </div>
      )}
    </section>
  );
}
