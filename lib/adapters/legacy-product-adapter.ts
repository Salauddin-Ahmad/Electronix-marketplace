import type { Product, ProductImage, SKU } from '@/lib/contracts/catalog'
import type { Money, StockSnapshot } from '@/lib/contracts/common'
import { getProduct, getProductBySku } from '@/lib/data'

export type LegacyProduct = import('@/lib/catalog/types').Product

/**
 * Legacy SKU codes are already unique and stable in the generated catalogue,
 * so they are used as the compatibility SKU identifier as well.
 */
export function legacyProductToSkuId(product: Pick<LegacyProduct, 'sku'>): string {
  return product.sku
}

function legacyPriceToMoney(product: LegacyProduct): Money | null {
  const amount = product.pricing.sellingPrice
  return amount === null ? null : { amount, currency: product.pricing.currency }
}

function legacyStockToSnapshot(product: LegacyProduct): StockSnapshot {
  const { availability } = product
  const isVerified = availability.inStock !== null || availability.quantity !== null

  if (availability.inStock === true) {
    return {
      state: 'in_stock',
      quantity: availability.quantity,
      unit: availability.unit,
      isVerified,
    }
  }

  if (availability.inStock === false) {
    return {
      state: 'out_of_stock',
      quantity: availability.quantity,
      unit: availability.unit,
      isVerified,
    }
  }

  return {
    state: product.stockMode === 'order' ? 'on_request' : 'unknown',
    quantity: availability.quantity,
    unit: availability.unit,
    isVerified,
  }
}

function legacyImagesToCatalogImages(product: LegacyProduct): ProductImage[] {
  return product.images.primary
    ? [{ src: product.images.primary, alt: product.name }]
    : []
}

/**
 * Converts the current flat product record into the future product/SKU model.
 * Every legacy product receives exactly one default SKU; no source data is
 * mutated and no price or stock value is invented.
 */
export function legacyProductToCatalogProduct(legacyProduct: LegacyProduct): Product {
  const skuId = legacyProductToSkuId(legacyProduct)
  const images = legacyImagesToCatalogImages(legacyProduct)
  const sku: SKU = {
    id: skuId,
    code: legacyProduct.sku,
    productId: legacyProduct.id,
    title: null,
    isDefault: true,
    variants: [],
    price: legacyPriceToMoney(legacyProduct),
    stock: legacyStockToSnapshot(legacyProduct),
    image: images[0] ?? null,
  }

  return {
    id: legacyProduct.id,
    slug: legacyProduct.slug,
    name: legacyProduct.name,
    category: legacyProduct.category,
    subcategory: legacyProduct.subcategory,
    shortDescription: legacyProduct.shortDescription,
    description: legacyProduct.description,
    brand: legacyProduct.brand,
    status: legacyProduct.status,
    tags: [...legacyProduct.tags],
    attributes: { ...(legacyProduct.attributes ?? {}) },
    applications: [...legacyProduct.applications],
    images,
    defaultSkuId: skuId,
    skus: [sku],
  }
}

/**
 * Temporary bridge for components that still render the legacy Product shape.
 * It can disappear once storefront components consume catalogue contracts.
 */
export function getLegacyProductForSkuId(skuId: string): LegacyProduct | undefined {
  return getProductBySku(skuId)
}

export function getLegacySkuIdForProductId(productId: string): string | undefined {
  const product = getProduct(productId)
  return product ? legacyProductToSkuId(product) : undefined
}
