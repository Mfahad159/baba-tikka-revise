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

  // Featured heights: 256px -> 384px. Standard: 176px.
  const imgHeight = dish.isFeatured ? 'h-64 sm:h-96' : 'h-44 sm:h-52';

  return (
    // Card Wrapper
    <div className="group relative flex w-full flex-1 flex-col overflow-hidden rounded-2xl border border-brand-border bg-brand-bg-elevated transition-all duration-300 hover:-translate-y-[2px] hover:border-brand-accent-gold/40 hover:shadow-xl hover:shadow-brand-accent-gold/5">
      
      {/* Signature Anchor Badge */}
      {dish.isSignature && (
        <div className="absolute left-3 top-3 z-10 flex items-center rounded-sm bg-brand-bg-primary/80 px-2 py-1 backdrop-blur-md border border-brand-accent-gold/30 shadow-sm">
          <span className="font-heading text-[10px] font-bold uppercase tracking-widest text-brand-accent-gold">Signature</span>
        </div>
      )}

      {/* Dish Image */}
      <div className={`relative w-full flex-none overflow-hidden bg-brand-bg-primary ${imgHeight}`}>
        <Image
          src={dish.image}
          alt={dish.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
        />
        <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-brand-bg-elevated to-transparent" />
      </div>

      {/* Card Content */}
      <div className="flex flex-1 flex-col p-5">
        
        {/* Scarcity Banner */}
        {dish.isLimitedAvailability && (
          <div className="mb-2 flex items-center gap-1 font-body text-[10px] font-bold uppercase tracking-wider text-brand-accent-gold/60">
            <TrendingUp size={12} strokeWidth={2.5} />
            Selling fast
          </div>
        )}

        <div className="mb-2 flex items-start justify-between gap-4">
          <div className="flex-1">
            <h3 className={`font-heading ${dish.isFeatured ? 'text-2xl sm:text-3xl' : 'text-lg'} font-semibold tracking-wide text-brand-text-primary transition-colors group-hover:text-brand-accent-gold`}>
              {dish.name}
            </h3>
            
            {/* Social Proof */}
            {dish.popularityLabel && (
              <div className="mt-1 flex items-center gap-1.5 font-body text-xs text-brand-text-secondary">
                <Flame size={12} className="text-brand-accent-gold" />
                <span>{dish.popularityLabel}</span>
              </div>
            )}
          </div>
          <div className="flex-none pt-1">
            <StarRating rating={dish.rating} />
          </div>
        </div>
        
        <p className={`mb-6 flex-1 font-body leading-relaxed text-brand-text-secondary ${dish.isFeatured ? 'text-sm sm:text-base' : 'text-xs sm:text-sm'}`}>
          {dish.desc}
        </p>

        {/* Action Row */}
        <div className="mt-auto flex items-center justify-between border-t border-brand-border/40 pt-4">
          <span className={`font-body font-semibold text-brand-text-primary ${dish.isFeatured ? 'text-xl' : 'text-base'}`}>
            {dish.price > 0 ? formatPKR(dish.price) : '—'}
          </span>
          
          {/* Frictionless Cart Controls */}
          <div className="h-9">
            {justAdded ? (
              <div className="flex h-full items-center gap-2 rounded-full bg-brand-accent-gold px-4 font-body text-xs font-bold text-brand-bg-primary shadow-lg shadow-brand-accent-gold/20 animate-in zoom-in duration-200">
                <Check size={14} strokeWidth={3} />
                Added
              </div>
            ) : qty > 0 ? (
              <div className="flex h-full items-center gap-3 rounded-full border border-brand-accent-gold/40 bg-brand-accent-gold/10 px-3 animate-in fade-in zoom-in-95 duration-200">
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    updateQuantity(dish.id, qty - 1);
                  }}
                  className="flex h-full items-center justify-center p-1 text-brand-accent-gold transition-colors hover:text-brand-text-primary"
                  aria-label="Decrease quantity"
                >
                  <Minus size={15} strokeWidth={2.5} />
                </button>
                <span className="min-w-[14px] text-center font-body text-xs font-bold text-brand-text-primary">
                  {qty}
                </span>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    updateQuantity(dish.id, qty + 1);
                  }}
                  className="flex h-full items-center justify-center p-1 text-brand-accent-gold transition-colors hover:text-brand-text-primary"
                  aria-label="Increase quantity"
                >
                  <Plus size={15} strokeWidth={2.5} />
                </button>
              </div>
            ) : (
              <button
                onClick={handleAdd}
                className="flex h-full items-center gap-2 rounded-full border border-brand-border bg-brand-text-primary/5 pl-3 pr-4 font-body text-xs font-medium text-brand-text-primary transition-colors hover:border-brand-accent-gold/50 hover:bg-brand-accent-gold/10 hover:text-brand-accent-gold active:scale-95"
              >
                <ShoppingCart size={14} />
                Add to Cart
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
