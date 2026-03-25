// Button component — Server Component by default (no interactivity needed at scaffold level).
// If you add onClick handlers in Phase 2, add 'use client' at the top.
// TODO: Expand with loading state, disabled styles, and icon slots in Phase 2.

import { type ButtonHTMLAttributes } from 'react';

type Variant = 'primary' | 'secondary' | 'ghost';
type Size = 'sm' | 'md' | 'lg';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
}

const variantClasses: Record<Variant, string> = {
  primary:
    'bg-brand-gold text-white hover:bg-brand-gold-dark active:scale-[0.98]',
  secondary:
    'border border-brand-charcoal/20 text-brand-charcoal hover:bg-brand-charcoal hover:text-brand-cream',
  ghost:
    'text-brand-charcoal/70 hover:text-brand-charcoal hover:bg-brand-charcoal/5',
};

const sizeClasses: Record<Size, string> = {
  sm: 'px-4 py-1.5 text-sm',
  md: 'px-6 py-2.5 text-sm',
  lg: 'px-8 py-3 text-base',
};

export function Button({
  variant = 'primary',
  size = 'md',
  className = '',
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={[
        'inline-flex items-center justify-center rounded-full font-body font-medium',
        'transition-all duration-150 focus-visible:outline-none focus-visible:ring-2',
        'focus-visible:ring-brand-gold focus-visible:ring-offset-2',
        variantClasses[variant],
        sizeClasses[size],
        className,
      ].join(' ')}
      {...props}
    >
      {children}
    </button>
  );
}
