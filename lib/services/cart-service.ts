import type { CartItemInput, CartLine, CartSummary } from '@/lib/contracts/cart'

/**
 * Cart calculations stay client-safe today, while SKU resolution is isolated
 * behind this service for a later commerce API.
 */
export interface CartService {
  resolveLines(items: CartItemInput[]): Promise<CartLine[]>
  getSummary(items: CartItemInput[]): Promise<CartSummary>
}
