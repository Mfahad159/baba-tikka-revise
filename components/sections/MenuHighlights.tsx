// MenuHighlights — Layout: Option 1 (horizontal scroll on mobile, 3-col grid on desktop)
//
// Uses real menu images from /public/images/.
// TODO: Replace placeholder prices + descriptions with actual menu data.
// TODO: When Supabase menu_items table is ready, fetch from there and remove MENU_ITEMS constant.
//
// VISUAL CHOICE: Cards have rounded-2xl + subtle shadow. Adjust to rounded-xl for a sharper look.
// VISUAL CHOICE: Card image height is h-52 — increase to h-64 for more visual emphasis on food.

import Image from 'next/image';
import Link from 'next/link';
import { Badge } from '@/components/ui/Badge';

interface MenuItem {
  id: string;
  name: string;
  description: string; // TODO: replace with real descriptions
  price: string; // TODO: replace with real prices (e.g. from Supabase)
  image: string;
  badge?: string;
}

// ─── Static menu data — remove when wired to Supabase ─────────────────────────
// DECISION: image filenames kept as-is from the original site for traceability.
// TODO: Rename image files to slug-based names (e.g. tikka-kabab.jpg) in Phase 3.
const MENU_ITEMS: MenuItem[] = [
  {
    id: 'tikka-kabab',
    name: 'Tikka Kabab',
    description: 'Tender pieces of chicken marinated in our secret spice blend, char-grilled to perfection.',
    price: 'PKR 850', // TODO
    image: '/images/imgi_43_TikkahKabab.jpg',
    badge: 'Best Seller',
  },
  {
    id: 'chicken-karahi',
    name: 'Chicken White Karahi',
    description: 'Slow-cooked in a rich white gravy with ginger, garlic, and hand-ground spices.',
    price: 'PKR 1,450', // TODO
    image: '/images/imgi_33_ChickenWhiteKarahi.jpg',
  },
  {
    id: 'mutton-champ',
    name: 'Mutton Champ',
    description: 'Juicy mutton chops marinated overnight, grilled over live charcoal.',
    price: 'PKR 1,800', // TODO
    image: '/images/imgi_15_MuttonChanpHalf.jpg',
    badge: 'Chef\'s Pick',
  },
  {
    id: 'wasabi-chicken',
    name: 'Wasabi Chicken',
    description: 'Crispy chicken in a bold wasabi glaze — our fusion signature.',
    price: 'PKR 1,200', // TODO
    image: '/images/imgi_106_WasabiChicken.jpg',
    badge: 'New',
  },
  {
    id: 'sajji-deal',
    name: 'Sajji Deal',
    description: 'Whole slow-roasted Sajji with fragrant rice — feeds the whole family.',
    price: 'PKR 2,800', // TODO
    image: '/images/imgi_89_SajjiDeal.png',
  },
  {
    id: 'dynamite-prawn',
    name: 'Dynamite Prawn',
    description: 'Crispy prawns in a fiery dynamite sauce — not for the faint-hearted.',
    price: 'PKR 1,650', // TODO
    image: '/images/imgi_104_DynamitePrawn.jpg',
  },
];

export function MenuHighlights() {
  return (
    <section id="menu" className="bg-brand-cream py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Section header */}
        {/* VISUAL CHOICE: centered heading + left-aligned cards — asymmetry creates interest */}
        <div className="mb-10 text-center">
          <p className="mb-2 font-body text-xs font-semibold uppercase tracking-[0.25em] text-brand-gold">
            Our Specialties
          </p>
          <h2 className="font-heading text-4xl font-semibold text-brand-charcoal lg:text-5xl">
            Menu Highlights
          </h2>
          <p className="mx-auto mt-3 max-w-xl font-body text-base text-brand-charcoal/60">
            Handpicked favourites from our kitchen — each dish crafted with generations of flavour.
          </p>
        </div>

        {/* Card strip:
            Mobile  → horizontal scroll (snap-x) — user swipes through cards
            Desktop → 3-column grid
            VISUAL CHOICE: snap-center gives a satisfying snap-to feel on mobile */}
        <div className="flex gap-5 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory lg:grid lg:grid-cols-3 lg:overflow-visible lg:pb-0">
          {MENU_ITEMS.map((item) => (
            <article
              key={item.id}
              // VISUAL CHOICE: w-72 on mobile keeps 1.5 cards visible — signals swipeability
              className="relative flex w-72 flex-none snap-center flex-col rounded-2xl bg-white shadow-md transition-shadow hover:shadow-xl lg:w-auto"
            >
              {/* Dish image */}
              <div className="relative h-52 w-full overflow-hidden rounded-t-2xl">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  sizes="(max-width: 1024px) 288px, 33vw"
                  className="object-cover transition-transform duration-500 hover:scale-105"
                />
                {/* Badge overlay */}
                {item.badge && (
                  <div className="absolute left-3 top-3">
                    <Badge variant="gold">{item.badge}</Badge>
                  </div>
                )}
              </div>

              {/* Card body */}
              <div className="flex flex-1 flex-col p-5">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-heading text-xl font-semibold text-brand-charcoal">
                    {item.name}
                  </h3>
                  {/* VISUAL CHOICE: gold price — reinforces the brand accent on every card */}
                  <span className="font-body text-sm font-semibold text-brand-gold whitespace-nowrap">
                    {item.price}
                  </span>
                </div>
                <p className="mt-2 flex-1 font-body text-sm leading-relaxed text-brand-charcoal/60">
                  {item.description}
                </p>
              </div>
            </article>
          ))}
        </div>

        {/* View full menu CTA */}
        <div className="mt-10 text-center">
          <Link
            href="/menu"
            className="inline-flex items-center gap-2 rounded-full border border-brand-charcoal/20 px-7 py-3 font-body text-sm font-medium text-brand-charcoal transition-colors hover:border-brand-gold hover:text-brand-gold"
          >
            View Full Menu
            <span aria-hidden>→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
