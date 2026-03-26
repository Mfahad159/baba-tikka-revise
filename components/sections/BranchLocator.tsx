'use client';

// BranchLocator
// Applied Phase A design tokens: brand.bg.primary alternating background with Framer scroll exits.

import { motion } from 'framer-motion';
import { ANIMATIONS_ENABLED, staggerContainer, scrollEntrance } from '@/lib/animations';

interface Branch {
  id: string;
  name: string;
  address: string;
  delivery: string[];
  reservation: string[];
}

const BRANCHES: Branch[] = [
  {
    id: 'd-ground',
    name: 'D-Ground Branch',
    address: '111-B Peoples Colony#1 D-Ground Faisalabad',
    delivery: ['041-111-161616', '0304-111-1616'],
    reservation: ['0341-1118889', '0321-6650956'],
  },
  {
    id: 'kohinoor',
    name: 'Kohinoor Branch',
    address: 'P-131 Main Boulevard Kohinoor City Faisalabad',
    delivery: ['041-111-161616', '0304-111-1616'],
    reservation: ['0341-1119990', '0341-5888885'],
  },
  {
    id: 'canal-road',
    name: 'Canal Road Branch',
    address: 'East Canal Road 204-Rb Near Raza Garden Faisalabad',
    delivery: ['041-111-161616', '0304-111-1616'],
    reservation: ['0345-9668335'],
  },
  {
    id: 'fawara-chowk',
    name: 'Fawara Branch',
    address: 'Near Fawara Chowk Ground Faisalabad',
    delivery: ['0301-6061313', '0321-1179222'],
    reservation: ['0321-7693193'],
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
    <section id="branches" className="bg-brand-bg-primary py-24 transition-colors duration-300 dark:bg-brand-bg-primary-dark">
      <motion.div {...containerProps} className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div {...childProps} className="mb-14 text-center">
          <p className="mb-3 font-body text-[10px] font-semibold uppercase tracking-[0.3em] text-brand-accent-gold dark:text-brand-accent-gold-dark">
            Find Us
          </p>
          <div className="relative inline-block">
            <h2 className="font-heading text-4xl font-semibold text-brand-text-primary dark:text-brand-text-primary-dark lg:text-5xl">
              Our Branches
            </h2>
            <span className="absolute -bottom-3 left-1/2 h-[2px] w-12 -translate-x-1/2 rounded-full bg-brand-accent-gold dark:bg-brand-accent-gold-dark" />
          </div>
          <p className="mx-auto mt-6 max-w-xl font-body text-base text-brand-text-secondary dark:text-brand-text-secondary-dark">
            Four premium locations across Faisalabad — always close to you.
          </p>
        </motion.div>

        {/* Branch cards */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {BRANCHES.map((branch) => (
            <motion.div
              {...childProps}
              key={branch.id}
              className="group flex flex-col rounded-2xl border border-brand-border bg-brand-bg-elevated p-6 transition-colors hover:border-brand-accent-gold/40 dark:border-brand-border-dark dark:bg-brand-bg-elevated-dark dark:hover:border-brand-accent-gold-dark/40 sm:p-8"
            >
              <span className="mb-4 inline-block h-2 w-2 rounded-full bg-brand-accent-gold transition-transform group-hover:scale-125 dark:bg-brand-accent-gold-dark" />

              <h3 className="font-heading text-xl font-semibold text-brand-text-primary dark:text-brand-text-primary-dark">
                {branch.name}
              </h3>
              
              <div className="mt-3 font-body text-xs text-brand-text-secondary dark:text-brand-text-secondary-dark">
                <p className="leading-relaxed">{branch.address}</p>
              </div>

              {/* Dynamic Telephone Blocks */}
              <div className="mt-6 flex-1 space-y-4">
                {/* Delivery */}
                <div className="rounded-xl border border-brand-border/30 bg-brand-bg-secondary p-3.5 dark:border-brand-border-dark/30 dark:bg-brand-bg-secondary-dark">
                  <p className="mb-2 font-body text-[10px] font-bold uppercase tracking-widest text-brand-accent-gold dark:text-brand-accent-gold-dark">
                    Delivery
                  </p>
                  <div className="flex flex-col gap-1.5 font-body text-sm font-medium text-brand-text-primary dark:text-brand-text-primary-dark">
                    {branch.delivery.map((phone, idx) => (
                      <a key={idx} href={`tel:${phone.replace(/-/g, '')}`} className="transition-colors hover:text-brand-accent-gold dark:hover:text-brand-accent-gold-dark">
                        {phone}
                      </a>
                    ))}
                  </div>
                </div>

                {/* Reservation */}
                <div className="rounded-xl border border-brand-border/30 bg-brand-bg-secondary p-3.5 dark:border-brand-border-dark/30 dark:bg-brand-bg-secondary-dark">
                  <p className="mb-2 font-body text-[10px] font-bold uppercase tracking-widest text-brand-accent-gold dark:text-brand-accent-gold-dark">
                    Reservation
                  </p>
                  <div className="flex flex-col gap-1.5 font-body text-sm font-medium text-brand-text-primary dark:text-brand-text-primary-dark">
                    {branch.reservation.map((phone, idx) => (
                      <a key={idx} href={`tel:${phone.replace(/-/g, '')}`} className="transition-colors hover:text-brand-accent-gold dark:hover:text-brand-accent-gold-dark">
                        {phone}
                      </a>
                    ))}
                  </div>
                </div>
              </div>

              {/* Get Directions */}
              <a
                href={`https://maps.google.com/?q=${encodeURIComponent(branch.address)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center gap-1 font-body text-xs font-semibold text-brand-accent-gold/70 transition-colors hover:text-brand-accent-gold dark:text-brand-accent-gold-dark/70 dark:hover:text-brand-accent-gold-dark"
              >
                Live Location →
              </a>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
