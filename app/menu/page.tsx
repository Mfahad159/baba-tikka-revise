'use client';

import { useState } from 'react';
import { NavBar } from '@/components/sections/NavBar';
import { DishCard, DishData } from '@/components/ui/DishCard';
import { motion, AnimatePresence } from 'framer-motion';
import { ANIMATIONS_ENABLED, staggerContainer, scrollEntrance, mobileStaggerContainer, mobileScrollEntrance } from '@/lib/animations';
import { useIsMobile } from '@/hooks/useIsMobile';

const MENU_CATEGORIES = [
  {
    name: 'Signature Grills',
    items: [
      { id: 'sajji-deal', name: 'Sajji Deal', desc: 'Whole slow-roasted Sajji with fragrant rice. Feeds the entire family.', price: 2800, rating: 4.9, image: '/images/imgi_89_SajjiDeal.png', isSignature: true, popularityLabel: 'Cult favorite' },
      { id: 'tikka-kabab', name: 'Tikka Kabab', desc: 'Tender pieces of chicken marinated in our secret spice blend, char-grilled to perfection.', price: 850, rating: 4.9, image: '/images/imgi_43_TikkahKabab.jpg' },
      { id: 'mutton-champ', name: 'Mutton Champ', desc: 'Juicy mutton chops marinated overnight and grilled over live charcoal.', price: 1800, rating: 4.8, image: '/images/imgi_15_MuttonChanpHalf.jpg' },
      { id: 'tikkah-boti', name: 'Tikka Boti Masala', desc: 'Boneless tender chicken chunks char-grilled with a smoky aroma.', price: 950, rating: 4.7, image: '/images/imgi_67_TikkahBotiMasala.jpg' }
    ]
  },
  {
    name: 'Karahi & Handi',
    items: [
      { id: 'chicken-karahi', name: 'Chicken White Karahi', desc: 'Slow-cooked in a rich white gravy with ginger, garlic, and hand-ground spices.', price: 1450, rating: 4.8, image: '/images/imgi_33_ChickenWhiteKarahi.jpg', isLimitedAvailability: true },
      { id: 'desi-murgh', name: 'Desi Murgh Karahi', desc: 'Traditional free-range chicken karahi cooked in pure ghee.', price: 2100, rating: 4.7, image: '/images/imgi_81_DesiMurghKarahi.jpg' },
      { id: 'chicken-handi', name: 'Chicken Handi', desc: 'Creamy boneless chicken cooked in a traditional clay pot.', price: 1550, rating: 4.9, image: '/images/imgi_36_ChickenHandi.jpg', popularityLabel: 'Highly requested' },
      { id: 'mutton-peshawari', name: 'Mutton Peshawari Karahi', desc: 'Authentic Peshawari style mutton with minimal tomato-base.', price: 2400, rating: 4.8, image: '/images/imgi_77_MuttonPeshawari.jpg' }
    ]
  },
  {
    name: 'Chinese & Seafood',
    items: [
      { id: 'dynamite-prawn', name: 'Dynamite Prawn', desc: 'Crispy fried prawns tossed in our signature spicy mayo sauce.', price: 1650, rating: 4.9, image: '/images/imgi_104_DynamitePrawn.jpg' },
      { id: 'wasabi-chicken', name: 'Wasabi Chicken', desc: 'Crispy chicken cooked in a bold, nose-tingling wasabi glaze.', price: 1200, rating: 4.6, image: '/images/imgi_106_WasabiChicken.jpg' },
      { id: 'chicken-chowmein', name: 'Chicken Chowmein', desc: 'Classic stir-fried noodles with chicken chunks and fresh vegetables.', price: 850, rating: 4.7, image: '/images/imgi_65_ChickenChowmein.jpg' },
      { id: 'finger-fish', name: 'Finger Fish & Fries', desc: 'Crispy deep-fried premium fish strips served with french fries.', price: 1350, rating: 4.8, image: '/images/imgi_71_FingerFishWithFries.jpg' }
    ]
  },
  {
    name: 'Tandoor & Sides',
    items: [
      { id: 'garlic-naan', name: 'Garlic Naan', desc: 'Fresh tandoori naan brushed with rich garlic butter and herbs.', price: 120, rating: 4.9, image: '/images/imgi_19_GarlicNaan.jpg' },
      { id: 'roghni-naan', name: 'Special Roghni Naan', desc: 'Soft and fluffy traditional sesame seed naan.', price: 150, rating: 4.8, image: '/images/imgi_17_SpecialRoghniNaan.jpg' },
      { id: 'egg-fried-rice', name: 'Egg Fried Rice', desc: 'Wok-tossed rice with fluffy eggs and chopped scallions.', price: 550, rating: 4.7, image: '/images/imgi_61_EggFriedRice.jpg' },
      { id: 'french-fries', name: 'Crispy French Fries', desc: 'Classic golden potato fries lightly salted.', price: 350, rating: 4.6, image: '/images/imgi_74_Fries.jpg' }
    ]
  }
];

export default function MenuPage() {
  const isMobile = useIsMobile();
  const [activeCategory, setActiveCategory] = useState<string>('All');
  
  const filteredCategories = activeCategory === 'All' 
    ? MENU_CATEGORIES 
    : MENU_CATEGORIES.filter(c => c.name === activeCategory);
 
  // PERFORMANCE: Reduced stagger and Y lift for mobile
  const containerProps = ANIMATIONS_ENABLED
    ? {
        variants: isMobile ? mobileStaggerContainer : staggerContainer,
        initial: 'hidden',
        animate: 'visible',
      }
    : {};

  const childProps = ANIMATIONS_ENABLED 
    ? { variants: isMobile ? mobileScrollEntrance : scrollEntrance } 
    : {};

  return (
    <main id="menu" className="min-h-[100svh] bg-brand-bg-primary pb-24 pt-28 transition-colors duration-300 dark:bg-brand-bg-primary-dark">
      <NavBar />
      
      <motion.div {...containerProps} className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <motion.div {...childProps} className="mb-14 text-center">
          <p className="mb-3 font-body text-[10px] font-semibold uppercase tracking-[0.3em] text-brand-accent-gold dark:text-brand-accent-gold-dark">
            The Complete Experience
          </p>
          <div className="relative inline-block">
            <h1 className="font-heading text-4xl font-bold text-brand-text-primary dark:text-brand-text-primary-dark lg:text-5xl">
              Full Menu
            </h1>
            <span className="absolute -bottom-3 left-1/2 h-[2px] w-12 -translate-x-1/2 rounded-full bg-brand-accent-gold dark:bg-brand-accent-gold-dark" />
          </div>
          <p className="mx-auto mt-6 max-w-xl font-body text-base text-brand-text-secondary dark:text-brand-text-secondary-dark">
            Explore our vast array of culinary masterpieces, from smoky charcoal BBQ to rich traditional curries.
          </p>
        </motion.div>

        {/* ⚠️ TAGS NOW INTERACTIVE — Interactive Filter Pill System */}
        {/* PERFORMANCE: Replaced motion.div with pure CSS for scroll container to avoid compositor conflicts */}
        <div className="scrollbar-hide sticky top-[88px] z-30 -mx-4 mb-4 flex items-center gap-2 overflow-x-auto bg-brand-bg-primary/95 px-4 py-4 backdrop-blur-md transition-opacity duration-300 dark:bg-brand-bg-primary-dark/95 sm:mx-0 sm:justify-center sm:gap-3 sm:px-0">
          <button
            onClick={() => setActiveCategory('All')}
            className={[
              'shrink-0 whitespace-nowrap rounded-full px-3 py-1 font-body text-xs transition-all duration-200 sm:px-4 sm:py-1.5 sm:text-sm',
              activeCategory === 'All'
                ? 'bg-brand-accent-gold font-medium text-brand-bg-primary border border-brand-accent-gold shadow-[0_0_15px_rgba(200,150,62,0.3)] dark:bg-brand-accent-gold-dark dark:border-brand-accent-gold-dark dark:text-brand-text-primary-dark'
                : 'border border-brand-accent-gold/40 bg-transparent text-brand-accent-gold/70 hover:border-brand-accent-gold hover:text-brand-text-primary dark:border-brand-accent-gold-dark/40 dark:text-brand-accent-gold-dark/70 dark:hover:border-brand-accent-gold-dark dark:hover:text-brand-text-primary-dark'
            ].join(' ')}
          >
            All Menu
          </button>
          
          {MENU_CATEGORIES.map((category) => {
            const isActive = activeCategory === category.name;
            return (
              <button
                key={category.name}
                onClick={() => {
                  setActiveCategory(category.name);
                  window.scrollTo({ top: 400, behavior: 'smooth' });
                }}
                className={[
                  'shrink-0 whitespace-nowrap rounded-full px-3 py-1 font-body text-xs transition-all duration-200 sm:px-4 sm:py-1.5 sm:text-sm',
                  isActive
                    ? 'bg-brand-accent-gold font-medium text-brand-bg-primary border border-brand-accent-gold shadow-[0_0_15px_rgba(200,150,62,0.3)] dark:bg-brand-accent-gold-dark dark:border-brand-accent-gold-dark dark:text-brand-text-primary-dark'
                    : 'border border-brand-accent-gold/40 bg-transparent text-brand-accent-gold/70 hover:border-brand-accent-gold hover:text-brand-text-primary dark:border-brand-accent-gold-dark/40 dark:text-brand-accent-gold-dark/70 dark:hover:border-brand-accent-gold-dark dark:hover:text-brand-text-primary-dark'
                ].join(' ')}
              >
                {category.name}
              </button>
            );
          })}
        </div>

        {/* Menu Categories Grid with Fluid AnimatePresence masking */}
        <div className="space-y-16 sm:space-y-24 mt-8">
          <AnimatePresence mode="popLayout">
            {filteredCategories.map((category) => {
              const sectionId = category.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
              return (
              <motion.section 
                id={sectionId}
                key={category.name}
                initial={ANIMATIONS_ENABLED ? { opacity: 0, y: isMobile ? 12 : 20 } : undefined}
                animate={ANIMATIONS_ENABLED ? { opacity: 1, y: 0 } : undefined}
                exit={ANIMATIONS_ENABLED ? { opacity: 0 } : undefined} // PERFORMANCE: No blur or scale on exit
                transition={{ duration: 0.25 }}
                className="relative"
              >
                {/* Category Header */}
                <div className="mb-6 flex items-center justify-between sm:mb-8">
                  <h2 className="font-heading text-2xl font-bold text-brand-text-primary dark:text-brand-text-primary-dark sm:text-3xl">
                    {category.name}
                  </h2>
                  <div className="ml-4 h-[1px] flex-1 bg-brand-border dark:bg-brand-border-dark sm:ml-6" />
                </div>

                {/* Dish Grid: 2-col app-like density on mobile! */}
                <div className="grid grid-cols-2 gap-3 sm:gap-6 lg:grid-cols-4 lg:gap-8">
                  {category.items.map((item) => (
                    <article
                      key={item.id}
                      className="flex w-full"
                    >
                      <DishCard dish={item as DishData} />
                    </article>
                  ))}
                </div>
              </motion.section>
              );
            })}
          </AnimatePresence>
        </div>

      </motion.div>
    </main>
  );
}
