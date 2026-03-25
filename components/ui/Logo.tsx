// Logo placeholder — replace this entire component with your real SVG or next/image logo.
// Keep the className prop so layout sizing still works after the swap.
// TODO: Replace with <Image src="/logo.svg" ... /> or inline SVG in Phase 3.

interface LogoProps {
  className?: string;
  // TODO: Add `variant?: 'light' | 'dark'` once you have light + dark versions of the logo
}

export function Logo({ className = '' }: LogoProps) {
  return (
    <span
      className={`font-heading text-2xl font-semibold tracking-tight ${className}`}
    >
      Baba Tikkah
    </span>
  );
}
