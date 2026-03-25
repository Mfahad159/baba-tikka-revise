// Not-found page — rendered by notFound() calls or unmatched routes.
// Server Component — no interactivity needed.
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-brand-cream px-4 text-center">
      <span className="font-heading text-8xl font-bold text-brand-gold/30">404</span>
      <h2 className="mt-2 font-heading text-3xl font-semibold text-brand-charcoal">
        Page not found
      </h2>
      <p className="mt-2 font-body text-brand-charcoal/60">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <Link
        href="/"
        className="mt-6 rounded-full bg-brand-gold px-6 py-2.5 font-body text-sm font-medium text-white transition-opacity hover:opacity-90"
      >
        Back to Home
      </Link>
    </div>
  );
}
