'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { NavBar } from '@/components/sections/NavBar';
import { ANIMATIONS_ENABLED, staggerContainer, scrollEntrance } from '@/lib/animations';
import PageTransition from '@/components/PageTransition';

export default function StoryPage() {
  const containerProps = ANIMATIONS_ENABLED
    ? {
        variants: staggerContainer,
        initial: 'hidden',
        animate: 'visible',
      }
    : {};

  const childProps = ANIMATIONS_ENABLED ? { variants: scrollEntrance } : {};

  return (
    <PageTransition>
      <main className="min-h-[100svh] bg-brand-bg-primary dark:bg-brand-bg-primary-dark pt-28 transition-colors duration-300">
        <NavBar />

      <motion.div {...containerProps} className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        
        {/* Header Title */}
        <motion.div {...childProps} className="mb-14 text-center">
          <p className="mb-3 font-body text-[10px] font-semibold uppercase tracking-[0.3em] text-brand-accent-gold dark:text-brand-accent-gold-dark">
            Our Heritage
          </p>
          <div className="relative inline-block">
            <h1 className="font-heading text-4xl font-bold text-brand-text-primary dark:text-brand-text-primary-dark lg:text-5xl">
              The Baba Tikkah Story
            </h1>
            <span className="absolute -bottom-3 left-1/2 h-[2px] w-12 -translate-x-1/2 rounded-full bg-brand-accent-gold dark:bg-brand-accent-gold-dark" />
          </div>
        </motion.div>

        {/* Feature Heritage Image */}
        <motion.div {...childProps} className="relative aspect-[16/9] w-full overflow-hidden rounded-3xl sm:aspect-[21/9]">
          <Image
            src="/images/imgi_31_DSC00073.jpg"
            alt="Baba Tikkah Heritage Grill"
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 1024px"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-bg-primary dark:from-brand-bg-primary-dark via-transparent to-transparent opacity-90" />
          <div className="absolute bottom-0 left-0 w-full p-6 sm:p-10">
            <h2 className="font-heading text-2xl font-semibold text-brand-text-primary dark:text-brand-text-primary-dark sm:text-4xl text-shadow-sm">
              Serving delicious food since 1987.
            </h2>
          </div>
        </motion.div>

        {/* Editorial Prose */}
        <motion.div {...childProps} className="mx-auto mt-16 max-w-3xl space-y-8 font-body text-base leading-relaxed text-brand-text-secondary dark:text-brand-text-secondary-dark sm:text-lg">
          <p>
            For over three decades, Baba Tikkah has stood as a monumental pillar of culinary authenticity in Faisalabad. What started in 1987 as a humble, passion-driven venture has blossomed into a city-wide phenomenon, deeply interweaving itself into the memories, celebrations, and daily lives of countless families across the region.
          </p>
          <p>
            At the absolute core of our kitchen is an uncompromising commitment to original recipe integrity. We believe that true flavour cannot be rushed. Our signature <span className="font-semibold text-brand-text-primary dark:text-brand-text-primary-dark">Tikka Kabab</span> and <span className="font-semibold text-brand-text-primary dark:text-brand-text-primary-dark">Mutton Champ</span> are the direct results of painstaking marinades, secret hand-ground spice blends passed down through generations, and the irreplaceable, primal magic of live charcoal grilling.
          </p>
          <div className="my-10 border-l-2 border-brand-accent-gold dark:border-brand-accent-gold-dark pl-6 italic">
            <p className="text-xl text-brand-text-primary dark:text-brand-text-primary-dark">
              &quot;We don&apos;t just serve meals; we preserve a legacy of taste that speaks directly to the soul of traditional Pakistani dining.&quot;
            </p>
          </div>
          <p>
            Today, with four premium branches spanning D-Ground to Kohinoor City, Baba Tikkah continues to evolve—embracing modern dining expectations while fiercely guarding the smoky, rich flavours that put us on the map 37+ years ago. Whether you are craving the slow-cooked depth of our White Karahi or the fiery punch of our Dynamite Prawns, every dish that leaves our pass carries the undisputed hallmark of true mastery.
          </p>
          <p className="font-semibold text-brand-accent-gold dark:text-brand-accent-gold-dark">
            Welcome to Baba Tikkah. The Name of Taste.
          </p>
        </motion.div>

      </motion.div>
      </main>
    </PageTransition>
  );
}
