// Badge — minimal label/status chip.
// Server Component (no interactivity). Expand with icons or dot indicators in Phase 2.
// TODO: Add 'sold-out', 'spicy', 'vegetarian' variants when building the menu in Phase 2.

type Variant = 'default' | 'gold' | 'muted';

interface BadgeProps {
  children: React.ReactNode;
  variant?: Variant;
  className?: string;
}

const variantClasses: Record<Variant, string> = {
  default: 'bg-brand-charcoal text-brand-cream',
  gold: 'bg-brand-gold/10 text-brand-gold-dark border border-brand-gold/30',
  muted: 'bg-brand-charcoal/5 text-brand-charcoal/60',
};

export function Badge({ variant = 'default', className = '', children }: BadgeProps) {
  return (
    <span
      className={[
        'inline-flex items-center rounded-full px-2.5 py-0.5 font-body text-xs font-medium',
        variantClasses[variant],
        className,
      ].join(' ')}
    >
      {children}
    </span>
  );
}
