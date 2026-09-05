'use client';

import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import type { LegacyProduct } from '@/lib/adapters/legacy-product-adapter';
import { getLegacyProductForSkuId, getLegacySkuIdForProductId, legacyProductToSkuId } from '@/lib/adapters/legacy-product-adapter';
import { cartService } from '@/lib/services';

const CART_STORAGE_KEY = 'voltronix-cart';
const CART_STORAGE_VERSION = 2;
const MAX_CART_QUANTITY = 99;

export type CartLine = { product: LegacyProduct; qty: number; skuId: string };
type StoredCartV1 = {
  version: 1;
  items: Array<{ productId: string; qty?: number }>;
};
type StoredCartV2 = {
  version: typeof CART_STORAGE_VERSION;
  items: Array<{ skuId: string; quantity: number }>;
};
type CartContextType = {
  items: CartLine[];
  add: (product: LegacyProduct, qty?: number) => void;
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

function readStoredCartItems(stored: unknown): Array<{ skuId: string; quantity: number }> {
  if (!stored || typeof stored !== 'object' || !('version' in stored) || !('items' in stored) || !Array.isArray(stored.items)) return [];

  const quantities = new Map<string, number>();
  const add = (skuId: string, quantity: unknown) => {
    const normalizedSkuId = skuId.trim();
    if (!normalizedSkuId) return;
    quantities.set(normalizedSkuId, safeQuantity((quantities.get(normalizedSkuId) ?? 0) + safeQuantity(quantity)));
  };

  if (stored.version === CART_STORAGE_VERSION) {
    for (const line of (stored as StoredCartV2).items) {
      if (!line || typeof line.skuId !== 'string') continue;
      add(line.skuId, line.quantity);
    }
  } else if (stored.version === 1) {
    for (const line of (stored as StoredCartV1).items) {
      if (!line || typeof line.productId !== 'string') continue;
      const skuId = getLegacySkuIdForProductId(line.productId);
      if (skuId) add(skuId, line.qty);
    }
  }

  return [...quantities.entries()].map(([skuId, quantity]) => ({ skuId, quantity }));
}

async function restoreCart(): Promise<CartLine[]> {
  try {
    const raw = window.localStorage.getItem(CART_STORAGE_KEY);
    if (!raw) return [];
    const stored: unknown = JSON.parse(raw);
    const resolvedLines = await cartService.resolveLines(readStoredCartItems(stored));

    return resolvedLines.flatMap(({ sku, quantity }) => {
      const product = getLegacyProductForSkuId(sku.id);
      return product ? [{ product, qty: quantity, skuId: sku.id }] : [];
    });
  } catch {
    return [];
  }
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartLine[]>([]);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    let isCurrent = true;
    void restoreCart().then((restoredItems) => {
      if (!isCurrent) return;
      setItems(restoredItems);
      setIsHydrated(true);
    });

    return () => {
      isCurrent = false;
    };
  }, []);

  useEffect(() => {
    if (!isHydrated) return;
    const stored: StoredCartV2 = {
      version: CART_STORAGE_VERSION,
      items: items.map(({ skuId, qty }) => ({ skuId, quantity: qty })),
    };
    try {
      window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(stored));
    } catch {
      // The in-memory cart remains usable when storage is unavailable or full.
    }
  }, [isHydrated, items]);

  const add = (product: LegacyProduct, qty = 1) => setItems((current) => {
    const quantityToAdd = safeQuantity(qty);
    const skuId = legacyProductToSkuId(product);
    const found = current.find((item) => item.skuId === skuId);
    if (found) return current.map((item) => item.skuId === skuId ? { ...item, qty: safeQuantity(item.qty + quantityToAdd) } : item);
    return [...current, { product, qty: quantityToAdd, skuId }];
  });

  const lineMatches = (item: CartLine, id: string) => item.skuId === id || item.product.id === id;
  const setQty = (id: string, qty: number) => setItems((current) => current.map((item) => lineMatches(item, id) ? { ...item, qty: safeQuantity(qty) } : item));
  const remove = (id: string) => setItems((current) => current.filter((item) => !lineMatches(item, id)));
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
