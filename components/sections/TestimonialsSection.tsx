'use client';

// TestimonialsSection — placeholder quote cards with optional auto-scroll animation.
// TODO: Replace TESTIMONIALS data with real customer quotes before launch.
// TODO: Consider adding a star rating field to the type when real reviews are added.
//
// Animation: gentle horizontal marquee (CSS infinite scroll) — gated by ANIMATIONS_ENABLED.
// VISUAL CHOICE: Two rows scrolling in opposite directions gives a premium editorial feel.

import { ANIMATIONS_ENABLED } from '@/lib/animations';

interface Testimonial {
  id: string;
  quote: string; // TODO: replace with real quote
  author: string; // TODO
  location: string; // TODO
}

// ─── Testimonial data ─────────────────────────────────────────────────────────
// TODO: Replace all entries with real customer testimonials before launch.
const TESTIMONIALS: Testimonial[] = [
  {
    id: 't1',
    quote: 'The tikka here is absolutely unmatched — crispy outside, juicy inside. We drive from the other side of town just for this.',
    author: 'Fatima R.',
    location: 'DHA, Lahore',
  },
  {
    id: 't2',
    quote: 'Best karahi I\'ve had in years. The white karahi especially has that home-cooked depth that most restaurants can\'t replicate.',
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
    quote: 'Dynamite Prawns are dangerously addictive. Never thought I\'d find seafood this good at a Pakistani grill restaurant.',
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

// Duplicate for seamless infinite marquee loop
const row1 = [...TESTIMONIALS.slice(0, 3), ...TESTIMONIALS.slice(0, 3)];
const row2 = [...TESTIMONIALS.slice(3), ...TESTIMONIALS.slice(3)];

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    // VISUAL CHOICE: w-80 card width — shows ~1.5 cards on mobile, signalling that more exist
    <div className="w-80 flex-none rounded-2xl bg-white p-6 shadow-sm">
      {/* Quote mark */}
      <span className="font-heading text-4xl leading-none text-brand-gold">&ldquo;</span>
      <p className="mt-2 font-body text-sm leading-relaxed text-brand-charcoal/80">
        {testimonial.quote}
      </p>
      <div className="mt-4 border-t border-brand-charcoal/10 pt-4">
        <p className="font-body text-sm font-semibold text-brand-charcoal">
          {testimonial.author}
        </p>
        <p className="font-body text-xs text-brand-charcoal/50">{testimonial.location}</p>
      </div>
    </div>
  );
}

export function TestimonialsSection() {
  return (
    <section id="testimonials" className="overflow-hidden bg-brand-cream py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="mb-10 text-center">
          <p className="mb-2 font-body text-xs font-semibold uppercase tracking-[0.25em] text-brand-gold">
            What People Say
          </p>
          <h2 className="font-heading text-4xl font-semibold text-brand-charcoal lg:text-5xl">
            Loved by Lahore
          </h2>
        </div>
      </div>

      {/* Marquee rows — full bleed (outside max-width padding) */}
      {/* Row 1: scrolls left */}
      <div
        className={[
          'flex gap-5 px-4',
          ANIMATIONS_ENABLED ? 'animate-marquee-left' : 'overflow-x-auto',
        ].join(' ')}
        aria-hidden={ANIMATIONS_ENABLED} // hidden from a11y when auto-scrolling; static version is readable
      >
        {row1.map((t, i) => (
          <TestimonialCard key={`${t.id}-${i}`} testimonial={t} />
        ))}
      </div>

      {/* Row 2: scrolls right — VISUAL CHOICE: opposite direction creates depth */}
      <div
        className={[
          'mt-5 flex gap-5 px-4',
          ANIMATIONS_ENABLED ? 'animate-marquee-right' : 'overflow-x-auto',
        ].join(' ')}
        aria-hidden={ANIMATIONS_ENABLED}
      >
        {row2.map((t, i) => (
          <TestimonialCard key={`${t.id}-${i}`} testimonial={t} />
        ))}
      </div>

      {/* Static accessible copy when animations are off */}
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
