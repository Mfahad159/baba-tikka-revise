// SectionWrapper — consistent layout container for page sections.
// Controls max-width, horizontal padding, and vertical rhythm.
// Server Component — purely layout, no interactivity.
//
// Usage:
//   <SectionWrapper>...</SectionWrapper>
//   <SectionWrapper as="section" className="bg-brand-charcoal text-brand-cream">...</SectionWrapper>
//
// TODO: Consider adding a `narrow` boolean prop for centered text-heavy sections in Phase 2.

import { type ElementType, type HTMLAttributes } from 'react';

interface SectionWrapperProps extends HTMLAttributes<HTMLElement> {
  // The HTML element to render — defaults to 'section' for semantic correctness
  as?: ElementType;
  children: React.ReactNode;
}

export function SectionWrapper({
  as: Tag = 'section',
  className = '',
  children,
  ...props
}: SectionWrapperProps) {
  return (
    <Tag
      className={['mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24', className].join(
        ' ',
      )}
      {...props}
    >
      {children}
    </Tag>
  );
}
