'use client';

// EditorialGallery
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ANIMATIONS_ENABLED, staggerContainer, scrollEntrance } from '@/lib/animations';

const IMAGES = [
  { src: '/hero-image-slideshow/2.webp', alt: 'Signature dish 1', className: 'mt-0 sm:mt-12' },
  { src: '/hero-image-slideshow/1.webp', alt: 'Signature dish 2', className: 'mt-0' },
  { src: '/hero-image-slideshow/4.webp', alt: 'Signature dish 3', className: 'mt-0 sm:mt-24' },
];

export function EditorialGallery() {
  const containerProps = ANIMATIONS_ENABLED
    ? {
        variants: staggerContainer,
        initial: 'hidden',
        whileInView: 'visible',
        viewport: { once: true, margin: '-100px' },
      }
    : {};

  const childProps = ANIMATIONS_ENABLED ? { variants: scrollEntrance } : {};

  return (
    <section className="relative overflow-hidden bg-brand-bg-primary px-6 py-16 sm:px-8 lg:px-12 lg:py-28">
      <motion.div {...containerProps} className="relative z-10 mx-auto max-w-7xl">
        {/* Header */}
        <motion.div {...childProps} className="mb-12 text-center md:mb-16">
          <p className="mb-3 font-body text-[10px] font-semibold uppercase tracking-[0.3em] text-brand-accent-gold">
            Culinary Excellence
          </p>
          <div className="relative inline-block">
            <h2 className="font-heading text-3xl font-bold text-brand-text-primary sm:text-4xl lg:text-5xl">
              A Symphony of Flavours
            </h2>
            <span className="absolute -bottom-3 left-1/2 h-[2px] w-12 -translate-x-1/2 rounded-full bg-brand-accent-gold" />
          </div>
        </motion.div>

        {/* Staggered Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3 sm:gap-4 md:gap-8">
          {IMAGES.map((img, i) => (
            <motion.div
              key={i}
              {...childProps}
              className={`relative aspect-[4/5] w-full overflow-hidden rounded-2xl ${img.className}`}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes="(max-width: 640px) 100vw, 33vw"
                className="object-cover transition-transform duration-[2s] ease-out hover:scale-[1.03]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-bg-primary/50 to-transparent opacity-0 transition-opacity duration-500 hover:opacity-100" />
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
