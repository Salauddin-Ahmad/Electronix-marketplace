import type { Product, SKU } from '@/lib/contracts/catalog'
import type { Money } from '@/lib/contracts/common'

/**
 * The only persisted cart identity: a product can gain additional SKUs later
 * without invalidating an existing cart line.
 */
export type CartItemInput = {
  skuId: string
  quantity: number
}

export type CartLine = {
  product: Product
  sku: SKU
  quantity: number
  lineSubtotal: Money | null
}

export type CartSummary = {
  itemCount: number
  totalQuantity: number
  pricedSubtotal: Money | null
  quoteRequiredLineCount: number
  hasQuoteRequiredItems: boolean
}
