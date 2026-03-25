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
    location: 'DHA, Lahore',
  },
  {
    id: 't2',
    quote: "Best karahi I've had in years. The white karahi especially has that home-cooked depth that most restaurants can't replicate.",
    author: 'Ahmed K.',
    location: 'Gulberg, Lahore',
  },
  {
    id: 't3',
    quote: 'We ordered the Sajji Deal for a family gathering and it was the star of the evening. Everyone kept asking where we got it from.',
    author: 'Sara M.',
    location: 'Johar Town, Lahore',
  },
  {
    id: 't4',
    quote: 'The ambiance is warm, the service is quick, and the Mutton Champ melts in your mouth. This is our go-to for special occasions.',
    author: 'Usman T.',
    location: 'Model Town, Lahore',
  },
  {
    id: 't5',
    quote: "Dynamite Prawns are dangerously addictive. Never thought I'd find seafood this good at a Pakistani grill restaurant.",
    author: 'Nadia H.',
    location: 'Bahria Town, Lahore',
  },
  {
    id: 't6',
    quote: 'Consistent quality across all three branches — rare for a restaurant to maintain this standard. Truly a Lahore gem.',
    author: 'Bilal A.',
    location: 'PIA Housing, Lahore',
  },
];

const row1 = [...TESTIMONIALS.slice(0, 3), ...TESTIMONIALS.slice(0, 3)];
const row2 = [...TESTIMONIALS.slice(3), ...TESTIMONIALS.slice(3)];

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <div className="w-80 flex-none rounded-2xl border border-brand-border bg-brand-bg-elevated p-6 shadow-sm transition-colors hover:border-brand-accent-gold/40">
      <span className="font-heading text-5xl leading-none text-brand-accent-gold/40">&ldquo;</span>
      <p className="mt-1 font-body text-sm leading-relaxed text-brand-text-secondary">
        {testimonial.quote}
      </p>
      <div className="mt-6 flex items-center justify-between border-t border-brand-border pt-4">
        <p className="font-body text-sm font-semibold text-brand-text-primary">
          {testimonial.author}
        </p>
        <p className="font-body text-xs text-brand-text-secondary/70">{testimonial.location}</p>
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
    <section id="testimonials" className="overflow-hidden bg-brand-bg-secondary py-24 shadow-[inset_0_20px_40px_rgba(0,0,0,0.2)]">
      <motion.div {...headerProps} className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div {...childProps} className="mb-14 text-center">
          <p className="mb-3 font-body text-[10px] font-semibold uppercase tracking-[0.3em] text-brand-accent-gold">
            What People Say
          </p>
          <div className="relative inline-block">
            <h2 className="font-heading text-4xl font-semibold text-brand-text-primary lg:text-5xl">
              Loved by Lahore
            </h2>
            <span className="absolute -bottom-3 left-1/2 h-[2px] w-12 -translate-x-1/2 rounded-full bg-brand-accent-gold" />
          </div>
        </motion.div>
      </motion.div>

      <div
        className={['flex gap-5 px-4', ANIMATIONS_ENABLED ? 'animate-marquee-left' : 'overflow-x-auto'].join(' ')}
        aria-hidden={ANIMATIONS_ENABLED}
      >
        {row1.map((t, i) => (
          <TestimonialCard key={`${t.id}-${i}`} testimonial={t} />
        ))}
      </div>

      <div
        className={['mt-5 flex gap-5 px-4', ANIMATIONS_ENABLED ? 'animate-marquee-right' : 'overflow-x-auto'].join(' ')}
        aria-hidden={ANIMATIONS_ENABLED}
      >
        {row2.map((t, i) => (
          <TestimonialCard key={`${t.id}-${i}`} testimonial={t} />
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
