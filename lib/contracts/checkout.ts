import type { CartItemInput, CartLine, CartSummary } from '@/lib/contracts/cart'

/**
 * A frontend-only preview. It deliberately contains no order-creation fields.
 */
export type CheckoutPreviewRequest = {
  items: CartItemInput[]
}

export type CheckoutPreview = {
  lines: CartLine[]
  summary: CartSummary
  canRequestQuote: boolean
  orderSubmissionAvailable: false
}
