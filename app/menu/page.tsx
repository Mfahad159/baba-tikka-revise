'use client';

import { NavBar } from '@/components/sections/NavBar';
import { DishCard, DishData } from '@/components/ui/DishCard';
import { motion } from 'framer-motion';
import { ANIMATIONS_ENABLED, staggerContainer, scrollEntrance } from '@/lib/animations';

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
  const containerProps = ANIMATIONS_ENABLED
    ? {
        variants: staggerContainer,
        initial: 'hidden',
        animate: 'visible',
      }
    : {};

  const childProps = ANIMATIONS_ENABLED ? { variants: scrollEntrance } : {};

  return (
    <main id="menu" className="min-h-[100svh] bg-brand-bg-primary pb-24 pt-28">
      <NavBar />
      
      <motion.div {...containerProps} className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <motion.div {...childProps} className="mb-14 text-center">
          <p className="mb-3 font-body text-[10px] font-semibold uppercase tracking-[0.3em] text-brand-accent-gold">
            The Complete Experience
          </p>
          <div className="relative inline-block">
            <h1 className="font-heading text-4xl font-bold text-brand-text-primary lg:text-5xl">
              Full Menu
            </h1>
            <span className="absolute -bottom-3 left-1/2 h-[2px] w-12 -translate-x-1/2 rounded-full bg-brand-accent-gold" />
          </div>
          <p className="mx-auto mt-6 max-w-xl font-body text-base text-brand-text-secondary">
            Explore our vast array of culinary masterpieces, from smoky charcoal BBQ to rich traditional curries.
          </p>
        </motion.div>

        {/* Menu Categories */}
        <div className="space-y-24">
          {MENU_CATEGORIES.map((category) => (
            <motion.section 
              key={category.name}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-50px' }}
              variants={staggerContainer}
              className="relative"
            >
              {/* Category Header */}
              <motion.div variants={scrollEntrance} className="mb-8 flex items-center justify-between">
                <h2 className="font-heading text-3xl font-bold text-brand-text-primary">
                  {category.name}
                </h2>
                <div className="ml-6 h-[1px] flex-1 bg-brand-border" />
              </motion.div>

              {/* Dish Grid */}
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
                {category.items.map((item) => (
                  <motion.article
                    variants={scrollEntrance}
                    key={item.id}
                    className="flex w-full"
                  >
                    {/* Reusing our highly-optimized DishCard! */}
                    <DishCard dish={item as DishData} />
                  </motion.article>
                ))}
              </div>
            </motion.section>
          ))}
        </div>

      </motion.div>
    </main>
  );
}
