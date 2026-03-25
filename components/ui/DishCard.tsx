'use client';

import Image from 'next/image';
import { Star, ShoppingCart, Check, Minus, Plus } from 'lucide-react';
import { useCart } from '@/hooks/useCart';
import { formatPKR } from '@/lib/utils';

export interface DishData {
  id: string;
  name: string;
  desc: string;
  rating: number;
  image: string;
  price: number;
}

interface DishCardProps {
  dish: DishData;
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      <Star className="fill-brand-gold text-brand-gold" size={12} />
      <span className="ml-[3px] font-body text-xs font-medium text-white/50">{rating.toFixed(1)}</span>
    </div>
  );
}

export function DishCard({ dish }: DishCardProps) {
  const { cartItems, addToCart, updateQuantity } = useCart();
  
  const existing = cartItems.find((i) => i.id === dish.id);
  const qty = existing?.quantity || 0;

  return (
    // Visual Choice: transition-transform group-hover lift effect
    <div className="group flex flex-1 flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#141414] transition-all duration-300 hover:-translate-y-[2px] hover:border-brand-gold/40 hover:shadow-xl hover:shadow-brand-gold/5">
      {/* Dish Image */}
      <div className="relative h-44 w-full flex-none overflow-hidden bg-[#0a0a0a]">
        <Image
          src={dish.image}
          alt={dish.name}
          fill
          sizes="(max-width: 640px) 100vw, 33vw"
          className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
        />
        {/* Subtle overlay gradient to ensure text/icons could be readable if placed on top */}
        <div className="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-[#141414] to-transparent" />
      </div>

      {/* Card Content */}
      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <div className="mb-1 flex items-start justify-between gap-3">
          <h3 className="font-heading text-[17px] font-semibold tracking-wide text-white transition-colors group-hover:text-brand-gold">
            {dish.name}
          </h3>
          <StarRating rating={dish.rating} />
        </div>
        
        <p className="mb-4 flex-1 font-body text-xs leading-relaxed text-white/45">
          {dish.desc}
        </p>

        <div className="mt-auto flex items-center justify-between">
          <span className="font-body text-base font-semibold text-brand-cream">
            {dish.price > 0 ? formatPKR(dish.price) : '—'}
          </span>
          
          {/* Cart Controls */}
          <div className="h-9">
            {qty > 0 ? (
              <div className="flex h-full items-center gap-3 rounded-full border border-brand-gold/40 bg-brand-gold/10 px-3">
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    updateQuantity(dish.id, qty - 1);
                  }}
                  className="flex items-center justify-center text-brand-gold transition-colors hover:text-white"
                  aria-label="Decrease quantity"
                >
                  <Minus size={15} strokeWidth={2.5} />
                </button>
                <span className="min-w-[12px] text-center font-body text-xs font-bold text-white">
                  {qty}
                </span>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    updateQuantity(dish.id, qty + 1);
                  }}
                  className="flex items-center justify-center text-brand-gold transition-colors hover:text-white"
                  aria-label="Increase quantity"
                >
                  <Plus size={15} strokeWidth={2.5} />
                </button>
              </div>
            ) : (
              <button
                onClick={(e) => {
                  e.preventDefault();
                  // Strip rating & desc from the cart item payload
                  addToCart({
                    id: dish.id,
                    name: dish.name,
                    price: dish.price,
                    image: dish.image,
                  });
                }}
                className="flex h-full items-center gap-2 rounded-full border border-white/10 bg-white/5 pl-3 pr-4 font-body text-xs font-medium text-white transition-colors hover:border-brand-gold/50 hover:bg-brand-gold/10 hover:text-brand-gold active:scale-95"
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
