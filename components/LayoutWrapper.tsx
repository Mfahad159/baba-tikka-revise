'use client';

import { useCart } from '@/hooks/useCart';
import { usePathname } from 'next/navigation';

export function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const { totalItems } = useCart();
  const pathname = usePathname();
  const showPadding = totalItems > 0 && pathname !== '/cart';
  
  return (
    <div className={`flex min-h-[100svh] w-full flex-col transition-[padding] duration-300 ease-out ${showPadding ? 'pb-20 sm:pb-24' : ''}`}>
      {children}
    </div>
  );
}
