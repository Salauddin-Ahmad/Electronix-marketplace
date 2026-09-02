'use client';

import React, { createContext, useContext, useMemo, useState } from 'react';
import { Product } from '@/lib/data';

type CartLine = { product: Product; qty: number };
type CartContextType = {
  items: CartLine[];
  add: (product: Product, qty?: number) => void;
  setQty: (id: string, qty: number) => void;
  remove: (id: string) => void;
  count: number;
  subtotal: number;
  clear: () => void;
};

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartLine[]>([]);

  const add = (product: Product, qty = 1) => setItems((current) => {
    const found = current.find((item) => item.product.id === product.id);
    if (found) return current.map((item) => item.product.id === product.id ? { ...item, qty: item.qty + qty } : item);
    return [...current, { product, qty }];
  });

  const setQty = (id: string, qty: number) => setItems((current) => current.map((item) => item.product.id === id ? { ...item, qty: Math.max(1, qty) } : item));
  const remove = (id: string) => setItems((current) => current.filter((item) => item.product.id !== id));
  const clear = () => setItems([]);

  const value = useMemo(() => ({
    items,
    add,
    setQty,
    remove,
    clear,
    count: items.reduce((sum, item) => sum + item.qty, 0),
    subtotal: items.reduce((sum, item) => {
      const price = item.product.pricing.sellingPrice;
      return sum + (price === null ? 0 : price * item.qty);
    }, 0),
  }), [items]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used inside CartProvider');
  return context;
}
