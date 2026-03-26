import type { Metadata, Viewport } from 'next';
import { headingFont, bodyFont } from '@/lib/fonts';
import { Footer } from '@/components/sections/Footer';
import { LayoutWrapper } from '@/components/LayoutWrapper';
import { FloatingCartBar } from '@/components/FloatingCartBar';
import './globals.css';

// ─── SEO Metadata ─────────────────────────────────────────────────────────────
// TODO: Fill in `description` with your restaurant's actual tagline / meta copy.
// TODO: Replace `og:image` placeholder before launch (add /app/opengraph-image.tsx).
// TODO: Update `metadataBase` to your production domain.
export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000',
  ),
  title: {
    default: 'Baba Tikkah',
    template: '%s | Baba Tikkah',
  },
  // TODO: Write a compelling 155-character description of the restaurant
  description: 'TODO: Add restaurant description here.',
  openGraph: {
    siteName: 'Baba Tikkah',
    locale: 'en_US',
    type: 'website',
    // TODO: Add og:image — create app/opengraph-image.tsx using next/og
    // See next-best-practices/metadata.md for the OG image generation pattern.
  },
  twitter: {
    card: 'summary_large_image',
    // TODO: Add twitter:site handle once account is set up, e.g. '@BabaTikkah'
  },
  robots: {
    index: true,
    follow: true,
  },
};

// Viewport is separate from metadata for streaming support (metadata.md)
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  // TODO: Update themeColor to match final brand.charcoal hex once confirmed
  themeColor: '#1C1C1C',
};

// ─── Root Layout ──────────────────────────────────────────────────────────────
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // TODO: Change lang to 'ur' or 'en-PK' if serving Urdu content as primary
    <html
      lang="en"
      className={`${headingFont.variable} ${bodyFont.variable}`}
    >
      <body className="flex min-h-[100svh] flex-col bg-brand-bg-primary font-body text-brand-text-primary antialiased">
        <LayoutWrapper>
          {children}
          <Footer />
        </LayoutWrapper>
        <FloatingCartBar />
      </body>
    </html>
  );
}
