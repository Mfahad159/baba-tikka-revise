import Link from 'next/link';

// Minimal home page placeholder — replace with real content in Phase 2.
// This is a Server Component (no 'use client' needed — no interactivity here).
export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-brand-cream px-4 text-center">
      <h1 className="font-heading text-5xl font-semibold tracking-tight text-brand-charcoal sm:text-7xl">
        Baba Tikkah
      </h1>
      <p className="mt-4 font-body text-lg text-brand-charcoal/70">
        {/* TODO: Replace with restaurant tagline */}
        Authentic flavours, coming soon.
      </p>
      <div className="mt-8 flex gap-4">
        <Link
          href="/menu"
          className="rounded-full bg-brand-gold px-6 py-2.5 font-body text-sm font-medium text-white transition-opacity hover:opacity-90"
        >
          View Menu
        </Link>
        <Link
          href="/reservations"
          className="rounded-full border border-brand-charcoal/20 px-6 py-2.5 font-body text-sm font-medium text-brand-charcoal transition-colors hover:bg-brand-charcoal hover:text-brand-cream"
        >
          Book a Table
        </Link>
      </div>
    </main>
  );
}
