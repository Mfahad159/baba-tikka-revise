'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Star, ShoppingCart, Check, Minus, Plus, Flame, TrendingUp } from 'lucide-react';
import { useCart } from '@/hooks/useCart';
import { formatPKR } from '@/lib/utils';

export interface DishData {
  id: string;
  name: string;
  desc: string;
  rating: number;
  image: string;
  price: number;
  isSignature?: boolean;
  popularityLabel?: string;
  isLimitedAvailability?: boolean;
  isFeatured?: boolean;
}

interface DishCardProps {
  dish: DishData;
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      <Star className="fill-brand-accent-gold text-brand-accent-gold" size={12} />
      <span className="ml-[3px] font-body text-xs font-medium text-brand-text-secondary">{rating.toFixed(1)}</span>
    </div>
  );
}

export function DishCard({ dish }: DishCardProps) {
  const { cartItems, addToCart, updateQuantity } = useCart();
  const [justAdded, setJustAdded] = useState(false);
  
  const existing = cartItems.find((i) => i.id === dish.id);
  const qty = existing?.quantity || 0;

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart({
      id: dish.id,
      name: dish.name,
      price: dish.price,
      image: dish.image,
    });
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 2000);
  };

  // Featured heights: 256px -> 384px (old). New: Mobile 160px, Desktop 256px.
  // Standard heights: 176px -> 208px (old). New: Mobile 120px, Desktop 176px.
  const imgHeight = dish.isFeatured ? 'h-40 sm:h-56 lg:h-64' : 'h-[120px] sm:h-40 lg:h-44';

  return (
    // Card Wrapper
    <div className="group relative flex w-full flex-1 flex-col overflow-hidden rounded-2xl border border-brand-border bg-brand-bg-elevated transition-all duration-300 hover:-translate-y-[2px] hover:border-brand-accent-gold/40 hover:shadow-xl hover:shadow-brand-accent-gold/5">
      
      {/* Signature Anchor Badge / Overlay Tags */}
      {dish.isSignature && (
        <div className="absolute left-2 top-2 z-10 flex items-center rounded-full bg-brand-bg-primary/80 px-2 py-1 backdrop-blur-md border border-brand-accent-gold/30 shadow-sm sm:left-3 sm:top-3">
          <span className="font-heading text-[9px] font-bold uppercase tracking-widest text-brand-accent-gold sm:text-[10px]">Signature</span>
        </div>
      )}

      {/* Dish Image */}
      <div className={`relative w-full flex-none overflow-hidden bg-brand-bg-primary ${imgHeight}`}>
        <Image
          src={dish.image}
          alt={dish.name}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
        />
        <div className="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-brand-bg-elevated to-transparent opacity-60 sm:h-16 opacity-100" />
      </div>

      {/* Card Content */}
      <div className="flex flex-1 flex-col p-2.5 sm:p-4 lg:p-5">
        
        {/* Scarcity Banner */}
        {dish.isLimitedAvailability && (
          <div className="mb-1.5 flex items-center gap-1 font-body text-[9px] font-bold uppercase tracking-wider text-brand-accent-gold/80 sm:mb-2 sm:text-[10px]">
            <TrendingUp size={10} strokeWidth={2.5} className="sm:h-3 sm:w-3" />
            Selling fast
          </div>
        )}

        <div className="mb-1 flex items-start justify-between gap-2 sm:mb-2 sm:gap-4">
          <div className="flex-1">
            <h3 className={`line-clamp-2 font-heading ${dish.isFeatured ? 'text-base sm:text-2xl lg:text-3xl' : 'text-sm sm:text-base lg:text-lg'} font-semibold tracking-wide text-brand-text-primary transition-colors group-hover:text-brand-accent-gold`}>
              {dish.name}
            </h3>
            
            {/* Social Proof */}
            {dish.popularityLabel && (
              <div className="mt-1 flex items-center gap-1 font-body text-[9px] text-brand-text-secondary sm:gap-1.5 sm:text-xs">
                <Flame size={10} className="text-brand-accent-gold sm:h-3 sm:w-3" />
                <span className="truncate">{dish.popularityLabel}</span>
              </div>
            )}
          </div>
        </div>
        
        <p className={`mb-3 mt-1 flex-1 font-body leading-relaxed text-brand-text-secondary ${dish.isFeatured ? 'line-clamp-2 text-xs sm:text-sm lg:text-base' : 'line-clamp-1 text-[10px] sm:line-clamp-2 sm:text-xs lg:text-sm'} sm:mb-5`}>
          {dish.desc}
        </p>

        {/* Action Row - Mobile tight/fullwidth, Desktop spatial */}
        <div className="mt-auto flex flex-col gap-2 border-t border-brand-border/40 pt-2 sm:flex-row sm:items-center sm:justify-between sm:gap-0 sm:pt-3 lg:pt-4">
          
          <div className="flex items-center justify-between sm:flex-col sm:items-start sm:gap-1">
            <span className={`font-body font-bold text-brand-accent-gold ${dish.isFeatured ? 'text-base sm:text-lg lg:text-xl' : 'text-sm sm:text-base'}`}>
              {dish.price > 0 ? formatPKR(dish.price) : '—'}
            </span>
            <div className="sm:hidden lg:block">
              <StarRating rating={dish.rating} />
            </div>
          </div>
          
          {/* Frictionless Cart Controls (Full width on Mobile) */}
          <div className="h-8 w-full sm:h-9 sm:w-auto">
            {justAdded ? (
              <div className="flex h-full w-full items-center justify-center gap-1.5 rounded-full bg-brand-accent-gold px-3 font-body text-[11px] font-bold text-brand-bg-primary shadow-lg shadow-brand-accent-gold/20 animate-in zoom-in duration-200 sm:px-4 sm:text-xs">
                <Check size={14} strokeWidth={3} />
                Added
              </div>
            ) : qty > 0 ? (
              <div className="flex h-full w-full items-center justify-between overflow-hidden rounded-full border border-brand-accent-gold/40 bg-brand-accent-gold/10 px-1 animate-in fade-in zoom-in-95 duration-200 sm:justify-center sm:gap-3 sm:px-2">
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    updateQuantity(dish.id, qty - 1);
                  }}
                  className="flex h-full flex-1 items-center justify-center p-1 text-brand-accent-gold transition-colors hover:bg-brand-accent-gold/10 hover:text-brand-text-primary sm:flex-none sm:rounded-full"
                  aria-label="Decrease quantity"
                >
                  <Minus size={14} strokeWidth={2.5} />
                </button>
                <span className="min-w-[16px] text-center font-body text-sm font-bold text-brand-text-primary sm:text-xs">
                  {qty}
                </span>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    updateQuantity(dish.id, qty + 1);
                  }}
                  className="flex h-full flex-1 items-center justify-center p-1 text-brand-accent-gold transition-colors hover:bg-brand-accent-gold/10 hover:text-brand-text-primary sm:flex-none sm:rounded-full"
                  aria-label="Increase quantity"
                >
                  <Plus size={14} strokeWidth={2.5} />
                </button>
              </div>
            ) : (
              <button
                onClick={handleAdd}
                className="flex h-full w-full items-center justify-center gap-1.5 rounded-full border border-brand-accent-gold/50 bg-transparent px-3 font-body text-[11px] font-medium text-brand-accent-gold transition-colors hover:bg-brand-accent-gold/10 active:scale-95 sm:w-auto sm:border-brand-border sm:bg-brand-text-primary/5 sm:pl-3 sm:pr-4 sm:text-xs sm:text-brand-text-primary sm:hover:border-brand-accent-gold/50 sm:hover:text-brand-accent-gold"
              >
                <ShoppingCart size={13} className="sm:h-3.5 sm:w-3.5" />
                Add to Cart
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
