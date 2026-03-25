'use client';

import { useState, useEffect } from 'react';

export type CartItem = {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
};

// Vanilla Pub/Sub store to sync state across hooks and avoid React Context.
const CART_STORAGE_KEY = 'baba-tikkah-cart';

let memoryCart: CartItem[] = [];
let listeners: Set<() => void> = new Set();

// Load initially from local storage if running in browser
if (typeof window !== 'undefined') {
  try {
    const raw = localStorage.getItem(CART_STORAGE_KEY);
    if (raw) memoryCart = JSON.parse(raw);
  } catch (err) {
    console.error('Failed to load cart from localStorage', err);
  }
}

function notifyListeners() {
  listeners.forEach((l) => l());
}

function persistCart() {
  if (typeof window !== 'undefined') {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(memoryCart));
    notifyListeners();
  }
}

export const cartStore = {
  getItems: () => memoryCart,
  subscribe: (listener: () => void) => {
    listeners.add(listener);
    return () => { listeners.delete(listener); };
  },
  addToCart: (item: Omit<CartItem, 'quantity'>) => {
    const existing = memoryCart.find((i) => i.id === item.id);
    if (existing) {
      existing.quantity += 1;
    } else {
      memoryCart = [...memoryCart, { ...item, quantity: 1 }];
    }
    persistCart();
  },
  removeFromCart: (id: string) => {
    memoryCart = memoryCart.filter((i) => i.id !== id);
    persistCart();
  },
  updateQuantity: (id: string, quantity: number) => {
    if (quantity < 1) {
      cartStore.removeFromCart(id);
      return;
    }
    memoryCart = memoryCart.map((i) => (i.id === id ? { ...i, quantity } : i));
    persistCart();
  },
  clearCart: () => {
    memoryCart = [];
    persistCart();
  },
};

// Ensure updates from other tabs are caught
if (typeof window !== 'undefined') {
  window.addEventListener('storage', (e) => {
    if (e.key === CART_STORAGE_KEY && e.newValue) {
      memoryCart = JSON.parse(e.newValue);
      notifyListeners();
    }
  });
}

// Global hook
export function useCart() {
  // SSR hydration safety flag
  const [mounted, setMounted] = useState(false);
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    setMounted(true);
    setItems(cartStore.getItems());
    
    return cartStore.subscribe(() => {
      setItems(cartStore.getItems());
    });
  }, []);

  const totalItems = mounted ? items.reduce((acc, item) => acc + item.quantity, 0) : 0;
  const totalPrice = mounted ? items.reduce((acc, item) => acc + item.price * item.quantity, 0) : 0;

  return {
    cartItems: mounted ? items : [],
    totalItems,
    totalPrice,
    addToCart: cartStore.addToCart,
    removeFromCart: cartStore.removeFromCart,
    updateQuantity: cartStore.updateQuantity,
    clearCart: cartStore.clearCart,
  };
}
