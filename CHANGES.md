# Design Phase A: Coherence Audit & Overhaul

## Overview
This phase focused strictly on resolving the harsh visual mismatches between the moody "Ichiban-style" Hero section and the light cream body sections. The result is a unified, premium, and fully responsive dark theme spanning the entire application.

## 1. Global Token Standardization (Tailwind Config)
Extracted the raw hardcoded hexes from the Hero and mapped them into strict semantic tokens within `tailwind.config.ts`.
- **brand.bg.primary** (`#0C0C0C`): Core deep dark background (Hero, Editorial Gallery, Branch Locator).
- **brand.bg.secondary** (`#141414`): Slightly elevated alternating background (Menu Highlights, Testimonials, Cart).
- **brand.bg.elevated** (`#1C1C1C`): Card surfaces and hover states.
- **brand.accent.gold** (`#C8963E`): High-contrast golden accent.
- **brand.text.primary** (`#FFFFFF`): High-legibility headlines and body text.
- **brand.text.secondary** (`rgba(255, 255, 255, 0.6)`): Muted descriptions and structural metadata.
- **brand.border** (`rgba(255, 255, 255, 0.1)`): Standardized glowing glassy borders.

## 2. Resolving Section Whiplash
Previously, the Hero section cut sharply into a bright cream `MenuHighlights`. This has been completely eradicated.
- The **HeroSection** and **EditorialGallery** both use `bg-brand-bg-primary`, merging seamlessly.
- **EditorialGallery** now features a smooth `bg-gradient-to-t` from its `primary` background into the `secondary` background of the `MenuHighlights` block below it, removing all hard horizontal cuts.
- The page now perfectly alternates:
  - Hero (Primary)
  - EditorialGallery (Primary -> Fade)
  - MenuHighlights (Secondary)
  - Testimonials (Secondary)
  - BranchLocator (Primary)

## 3. Structural Typography and Dividers
- Centralized the `font-heading` (`Playfair Display`) across all section headers.
- Implemented a unified **gold underline divider pattern** directly beneath every section headline:
  ```html
  <span className="absolute -bottom-3 left-1/2 h-[2px] w-12 -translate-x-1/2 bg-brand-accent-gold rounded-full" />
  ```
- Stripped all stray charcoal fonts to `brand-text-primary`.

## 4. Universal Micro-Interactions
- Added `lib/animations.ts` containing the global Framer Motion variants.
- Enforced a single universal scroll-entrance animation across all sections: `hidden: { opacity: 0, y: 24 }` to `visible` staggered.
- All cards now follow a strict `hover:-translate-y-[2px]` grouped lift effect with a glassy border glow.

## 5. Mobile Audit Notes (Prepared for Phase B)
- Re-assigned padding to cards ensuring they horizontally scroll cleanly via `snap-x snap-mandatory` on mobile without layout breaking.
- Touched up padding constraints (`h-9`) inside `DishCard.tsx`'s counter mechanism to prevent jumping when clicking + / -.

# Design Phase B: Psychological Conversion Tactics

## 1. Anchoring & Social Proof
- Introduced `isSignature` flag to `DishCard` which renders a refined gold badge acting as an anchor.
- Introduced `popularityLabel` flag (e.g. "Ordered 200+ times today") combined with a `<Flame />` icon to build inherent trust.

## 2. Scarcity & Friction Reduction
- Introduced `isLimitedAvailability` flag which renders a subdued "Selling fast" tag using `<TrendingUp />`.
- **Frictionless Cart Controls**: The "Add to Cart" button now features a frictionless 3-state cycle:
  - `Idle`: Standard add to cart text + icon.
  - `Added`: A brief 2000ms success state with a gold background and `<Check />` icon.
  - `In Cart`: Converts into seamless `[ - ] Qty [ + ]` controls.
- Bound the `totalItems` state to the NavBar Cart pulse animation key, enforcing a visual tactile response globally when items are added.

## 3. Decision Fatigue & Featured Layout
- Drastically reduced `MenuHighlights` cognitive load by enforcing a maximum count of 3 items.
- Introduced the `isFeatured` flag. On Desktop/Tablet, the featured item breaks out of the standard grid and occupies 2 columns, establishing a clear visual hierarchy. On Mobile, it takes full width at the top, directing the user's eye immediately.
