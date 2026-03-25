// DECISION: fonts are exported from a single shared file (lib/fonts.ts) and
// consumed in app/layout.tsx via CSS variables. Never import fonts per-component.
// See next-best-practices/font.md for rationale.

// TODO: Review font pairing. Currently uses Option A (Cormorant Garamond + DM Sans).
// Option B: Playfair Display + Inter
// Option C: Tenor Sans + Lora
// Change the imports below and update tailwind.config.ts fontFamily tokens to match.

import { Cormorant_Garamond, DM_Sans } from 'next/font/google';

// Display / heading font — used for restaurant name, section titles, hero text
export const headingFont = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-heading',
  display: 'swap',
});

// Body / UI font — used for paragraphs, nav, buttons, labels
export const bodyFont = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-body',
  display: 'swap',
});
