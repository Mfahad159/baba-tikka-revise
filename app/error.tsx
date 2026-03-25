'use client';

// error.tsx must be a Client Component (error-handling.md).
// This catches runtime errors in any route segment below the root layout.
// For root layout errors, see app/global-error.tsx.

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // TODO: Send to your error tracking service (e.g., Sentry) in Phase 2
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-brand-cream px-4 text-center">
      <h2 className="font-heading text-3xl font-semibold text-brand-charcoal">
        Something went wrong
      </h2>
      <p className="mt-2 font-body text-brand-charcoal/60">
        {error.digest ? `Error ID: ${error.digest}` : 'An unexpected error occurred.'}
      </p>
      <button
        onClick={reset}
        className="mt-6 rounded-full bg-brand-gold px-6 py-2.5 font-body text-sm font-medium text-white transition-opacity hover:opacity-90"
      >
        Try again
      </button>
    </div>
  );
}
