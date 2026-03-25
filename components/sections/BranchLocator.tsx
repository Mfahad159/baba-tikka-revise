'use client';

// BranchLocator
// Applied Phase A design tokens: brand.bg.primary alternating background with Framer scroll exits.

import { motion } from 'framer-motion';
import { ANIMATIONS_ENABLED, staggerContainer, scrollEntrance } from '@/lib/animations';

interface Branch {
  id: string;
  name: string;
  area: string;
  address: string;
  phone: string;
  hours: {
    weekday: string;
    weekend: string;
  };
}

const BRANCHES: Branch[] = [
  {
    id: 'branch-gulberg',
    name: 'Gulberg Branch',
    area: 'Gulberg, Lahore',
    address: 'Street address, Gulberg III, Lahore',
    phone: '+92 300 0000000',
    hours: {
      weekday: 'Mon–Fri: 12pm – 12am',
      weekend: 'Sat–Sun: 12pm – 2am',
    },
  },
  {
    id: 'branch-dha',
    name: 'DHA Branch',
    area: 'DHA, Lahore',
    address: 'Street address, DHA Phase 5, Lahore',
    phone: '+92 300 0000001',
    hours: {
      weekday: 'Mon–Fri: 12pm – 12am',
      weekend: 'Sat–Sun: 12pm – 2am',
    },
  },
  {
    id: 'branch-johar',
    name: 'Johar Town Branch',
    area: 'Johar Town, Lahore',
    address: 'Street address, Johar Town, Lahore',
    phone: '+92 300 0000002',
    hours: {
      weekday: 'Mon–Fri: 12pm – 12am',
      weekend: 'Sat–Sun: 12pm – 2am',
    },
  },
];

export function BranchLocator() {
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
    <section id="branches" className="bg-brand-bg-primary py-24">
      <motion.div {...containerProps} className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div {...childProps} className="mb-14 text-center">
          <p className="mb-3 font-body text-[10px] font-semibold uppercase tracking-[0.3em] text-brand-accent-gold">
            Find Us
          </p>
          <div className="relative inline-block">
            <h2 className="font-heading text-4xl font-semibold text-brand-text-primary lg:text-5xl">
              Our Branches
            </h2>
            <span className="absolute -bottom-3 left-1/2 h-[2px] w-12 -translate-x-1/2 rounded-full bg-brand-accent-gold" />
          </div>
          <p className="mx-auto mt-6 max-w-xl font-body text-base text-brand-text-secondary">
            Three locations across Lahore — always close to you.
          </p>
        </motion.div>

        {/* Branch cards */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {BRANCHES.map((branch) => (
            <motion.div
              {...childProps}
              key={branch.id}
              className="group rounded-2xl border border-brand-border bg-brand-bg-elevated p-8 transition-colors hover:border-brand-accent-gold/40"
            >
              <span className="mb-5 inline-block h-2 w-2 rounded-full bg-brand-accent-gold transition-transform group-hover:scale-125" />

              <h3 className="font-heading text-2xl font-semibold text-brand-text-primary">
                {branch.name}
              </h3>
              <p className="mt-1 font-body text-sm font-medium text-brand-accent-gold">
                {branch.area}
              </p>

              <div className="mt-5 space-y-2 font-body text-sm text-brand-text-secondary">
                <p>{branch.address}</p>
                <p>{branch.phone}</p>
              </div>

              {/* Hours */}
              <div className="mt-6 rounded-xl border border-brand-border/50 bg-brand-bg-secondary p-4 font-body text-xs text-brand-text-secondary">
                <p className="flex justify-between">
                  <span>Mon–Fri</span>
                  <span className="text-brand-text-primary">12pm – 12am</span>
                </p>
                <div className="my-2 h-px w-full bg-brand-border/50" />
                <p className="flex justify-between">
                  <span>Sat–Sun</span>
                  <span className="text-brand-text-primary">12pm – 2am</span>
                </p>
              </div>

              {/* Get Directions */}
              <a
                href={`https://maps.google.com/?q=${encodeURIComponent(branch.address)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center gap-1 font-body text-xs font-semibold text-brand-accent-gold/70 transition-colors hover:text-brand-accent-gold"
              >
                Get Directions →
              </a>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
