'use client';

// EditorialGallery
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ANIMATIONS_ENABLED, staggerContainer, scrollEntrance, mobileStaggerContainer, mobileScrollEntrance } from '@/lib/animations';
import { useIsMobile } from '@/hooks/useIsMobile';

const GALLERY_IMAGES = [
  {
    src: '/images/imgi_43_TikkahKabab.jpg',
    alt: 'Masterfully crafted Tikka Kabab',
    className: 'md:col-span-2 md:row-span-2',
    label: 'Flame-Grilled Signatures',
  },
  {
    src: '/images/imgi_33_ChickenWhiteKarahi.jpg',
    alt: 'Rich and creamy White Karahi',
    className: 'md:col-span-1 md:row-span-1',
    label: 'Authentic Curries',
  },
  {
    src: '/images/imgi_15_MuttonChanpHalf.jpg',
    alt: 'Succulent Mutton Champ',
    className: 'md:col-span-1 md:row-span-1',
    label: 'Charcoal Specials',
  },
];

export function EditorialGallery() {
  const isMobile = useIsMobile();

  const containerProps = ANIMATIONS_ENABLED
    ? {
        variants: isMobile ? mobileStaggerContainer : staggerContainer,
        initial: 'hidden',
        whileInView: 'visible',
        viewport: { once: true, amount: 0.2 },
      }
    : {};

  const childProps = ANIMATIONS_ENABLED 
    ? { variants: isMobile ? mobileScrollEntrance : scrollEntrance } 
    : {};

  return (
    <section className="relative overflow-hidden bg-brand-bg-primary dark:bg-brand-bg-primary-dark transition-colors duration-300 px-6 py-16 sm:px-8 lg:px-12 lg:py-28">
      <motion.div {...containerProps} className="relative z-10 mx-auto max-w-7xl">
        {/* Header */}
        <motion.div {...childProps} className="mb-12 text-center md:mb-16">
          <p className="mb-3 font-body text-[10px] font-semibold uppercase tracking-[0.3em] text-brand-accent-gold dark:text-brand-accent-gold-dark">
            Culinary Excellence
          </p>
          <div className="relative inline-block">
            <h2 className="font-heading text-3xl font-bold text-brand-text-primary dark:text-brand-text-primary-dark sm:text-4xl lg:text-5xl">
              A Symphony of Flavours
            </h2>
            <span className="absolute -bottom-3 left-1/2 h-[2px] w-12 -translate-x-1/2 rounded-full bg-brand-accent-gold dark:bg-brand-accent-gold-dark" />
          </div>
        </motion.div>

        {/* Premium Bento Grid */}
        <div className="grid grid-cols-1 gap-4 sm:gap-6 md:h-[650px] md:grid-cols-3 md:grid-rows-2 lg:h-[750px] lg:gap-8">
          {GALLERY_IMAGES.map((img, i) => (
            <motion.div
              key={i}
              {...childProps}
              className={`group relative overflow-hidden rounded-3xl bg-brand-bg-secondary dark:bg-brand-bg-secondary-dark ${img.className} ${
                img.className.includes('md:row-span-2') ? 'aspect-square md:aspect-auto' : 'aspect-[4/3] md:aspect-auto'
              }`}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes={img.className.includes('md:col-span-2') ? "(max-width: 768px) 100vw, 66vw" : "(max-width: 768px) 100vw, 33vw"}
                className="object-cover transition-transform duration-[2.5s] ease-out sm:group-hover:scale-[1.05]"
              />
              
              {/* Premium Inner Shadow Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-brand-bg-primary/90 dark:from-brand-bg-primary-dark/90 via-transparent to-transparent opacity-80" />
              
              {/* Inner Label */}
              <div className="absolute bottom-0 left-0 p-6 sm:p-8">
                <p className="font-heading text-xl font-semibold tracking-wide text-brand-text-primary dark:text-brand-text-primary-dark md:text-2xl">
                  {img.label}
                </p>
                <div className="mt-3 h-[2px] w-8 bg-brand-accent-gold dark:bg-brand-accent-gold-dark transition-all duration-500 group-hover:w-16" />
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
