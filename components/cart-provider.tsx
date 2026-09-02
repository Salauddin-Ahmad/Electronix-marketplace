'use client';

import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { getProduct, type Product } from '@/lib/data';

const CART_STORAGE_KEY = 'voltronix-cart';
const CART_STORAGE_VERSION = 1;
const MAX_CART_QUANTITY = 99;

export type CartLine = { product: Product; qty: number };
type StoredCart = {
  version: typeof CART_STORAGE_VERSION;
  items: Array<{ productId: string; qty: number }>;
};
type CartContextType = {
  items: CartLine[];
  add: (product: Product, qty?: number) => void;
  setQty: (id: string, qty: number) => void;
  remove: (id: string) => void;
  count: number;
  subtotal: number;
  clear: () => void;
  isHydrated: boolean;
};

const CartContext = createContext<CartContextType | null>(null);

function safeQuantity(value: unknown) {
  if (typeof value !== 'number' || !Number.isFinite(value)) return 1;
  return Math.min(MAX_CART_QUANTITY, Math.max(1, Math.floor(value)));
}

function restoreCart(): CartLine[] {
  try {
    const raw = window.localStorage.getItem(CART_STORAGE_KEY);
    if (!raw) return [];
    const stored: unknown = JSON.parse(raw);
    if (!stored || typeof stored !== 'object' || !('version' in stored) || !('items' in stored)) return [];
    if (stored.version !== CART_STORAGE_VERSION || !Array.isArray(stored.items)) return [];

    const quantities = new Map<string, number>();
    for (const line of stored.items) {
      if (!line || typeof line !== 'object' || !('productId' in line) || typeof line.productId !== 'string') continue;
      const qty = 'qty' in line ? safeQuantity(line.qty) : 1;
      quantities.set(line.productId, safeQuantity((quantities.get(line.productId) ?? 0) + qty));
    }

    return [...quantities.entries()].flatMap(([productId, qty]) => {
      const product = getProduct(productId);
      return product ? [{ product, qty }] : [];
    });
  } catch {
    return [];
  }
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartLine[]>([]);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setItems(restoreCart());
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (!isHydrated) return;
    const stored: StoredCart = {
      version: CART_STORAGE_VERSION,
      items: items.map(({ product, qty }) => ({ productId: product.id, qty })),
    };
    try {
      window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(stored));
    } catch {
      // The in-memory cart remains usable when storage is unavailable or full.
    }
  }, [isHydrated, items]);

  const add = (product: Product, qty = 1) => setItems((current) => {
    const quantityToAdd = safeQuantity(qty);
    const found = current.find((item) => item.product.id === product.id);
    if (found) return current.map((item) => item.product.id === product.id ? { ...item, qty: safeQuantity(item.qty + quantityToAdd) } : item);
    return [...current, { product, qty: quantityToAdd }];
  });

  const setQty = (id: string, qty: number) => setItems((current) => current.map((item) => item.product.id === id ? { ...item, qty: safeQuantity(qty) } : item));
  const remove = (id: string) => setItems((current) => current.filter((item) => item.product.id !== id));
  const clear = () => setItems([]);

  const value = useMemo(() => ({
    items,
    add,
    setQty,
    remove,
    clear,
    isHydrated,
    count: items.reduce((sum, item) => sum + item.qty, 0),
    subtotal: items.reduce((sum, item) => {
      const price = item.product.pricing.sellingPrice;
      return sum + (price === null ? 0 : price * item.qty);
    }, 0),
  }), [isHydrated, items]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used inside CartProvider');
  return context;
}
