import type { CartItemInput, CartLine, CartSummary } from '@/lib/contracts/cart'
import type { Money } from '@/lib/contracts/common'
import type { CatalogService } from '@/lib/services/catalog-service'
import type { CartService } from '@/lib/services/cart-service'
import { mockCatalogService } from '@/lib/services/mock/catalog-service'

const MAX_CART_QUANTITY = 99

function safeQuantity(value: unknown): number {
  if (typeof value !== 'number' || !Number.isFinite(value)) return 1
  return Math.min(MAX_CART_QUANTITY, Math.max(1, Math.floor(value)))
}

function normalizeItems(items: CartItemInput[]): CartItemInput[] {
  const quantities = new Map<string, number>()

  for (const item of items) {
    if (!item || typeof item.skuId !== 'string' || !item.skuId.trim()) continue
    const skuId = item.skuId.trim()
    const quantity = safeQuantity(item.quantity)
    quantities.set(skuId, safeQuantity((quantities.get(skuId) ?? 0) + quantity))
  }

  return [...quantities.entries()].map(([skuId, quantity]) => ({ skuId, quantity }))
}

function lineSubtotal(price: Money | null, quantity: number): Money | null {
  return price ? { amount: price.amount * quantity, currency: price.currency } : null
}

function summaryFrom(lines: CartLine[]): CartSummary {
  const pricedLines = lines.filter((line) => line.lineSubtotal !== null)
  const currency = pricedLines[0]?.lineSubtotal?.currency ?? 'BDT'
  const pricedSubtotal = pricedLines.length
    ? {
        amount: pricedLines.reduce((total, line) => total + (line.lineSubtotal?.amount ?? 0), 0),
        currency,
      }
    : null
  const quoteRequiredLineCount = lines.length - pricedLines.length

  return {
    itemCount: lines.length,
    totalQuantity: lines.reduce((total, line) => total + line.quantity, 0),
    pricedSubtotal,
    quoteRequiredLineCount,
    hasQuoteRequiredItems: quoteRequiredLineCount > 0,
  }
}

export class MockCartService implements CartService {
  constructor(private readonly catalogService: CatalogService = mockCatalogService) {}

  async resolveLines(items: CartItemInput[]): Promise<CartLine[]> {
    const normalizedItems = normalizeItems(items)
    const lines = await Promise.all(normalizedItems.map(async ({ skuId, quantity }) => {
      const product = await this.catalogService.getProductBySkuId(skuId)
      const sku = product?.skus.find((candidate) => candidate.id === skuId)
      if (!product || !sku) return null

      return {
        product,
        sku,
        quantity,
        lineSubtotal: lineSubtotal(sku.price, quantity),
      }
    }))

    return lines.filter((line): line is CartLine => line !== null)
  }

  async getSummary(items: CartItemInput[]): Promise<CartSummary> {
    return summaryFrom(await this.resolveLines(items))
  }
}

export const mockCartService = new MockCartService()
