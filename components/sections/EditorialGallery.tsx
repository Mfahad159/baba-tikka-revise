'use client';

// EditorialGallery — A static, elegant composition of signature dishes.
// Replaces the infinite marquee with a high-end, diligent editorial layout.
// Design: 3-column staggered grid with subtle hover scale and motion fade-in.

import Image from 'next/image';
import { motion } from 'framer-motion';

const IMAGES = [
  { src: '/hero-image-slideshow/2.webp', alt: 'Signature dish 1', className: 'mt-0 sm:mt-12' },
  { src: '/hero-image-slideshow/1.webp', alt: 'Signature dish 2', className: 'mt-0' },
  { src: '/hero-image-slideshow/4.webp', alt: 'Signature dish 3', className: 'mt-0 sm:mt-24' },
];

export function EditorialGallery() {
  return (
    <section className="relative bg-[#0C0C0C] px-6 py-16 sm:px-8 lg:px-12 lg:py-28 overflow-hidden">
      <div className="relative z-10 mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-12 text-center md:mb-16">
          <p className="mb-3 font-body text-[10px] font-semibold uppercase tracking-[0.3em] text-brand-gold">
            Culinary Excellence
          </p>
          <h2 className="font-heading text-3xl font-bold text-white sm:text-4xl">
            A Symphony of Flavours
          </h2>
        </div>

        {/* Staggered Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3 sm:gap-4 md:gap-8">
          {IMAGES.map((img, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.8, ease: 'easeOut', delay: i * 0.15 }}
              className={`relative aspect-[4/5] w-full overflow-hidden rounded-2xl ${img.className}`}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes="(max-width: 640px) 100vw, 33vw"
                className="object-cover transition-transform duration-[2s] ease-out hover:scale-[1.03]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 transition-opacity duration-500 hover:opacity-100" />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Bottom fade into the cream MenuHighlights section below it */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-b from-transparent to-brand-cream" />
    </section>
  );
}
