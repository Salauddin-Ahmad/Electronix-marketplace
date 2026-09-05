import type { Money, StockSnapshot } from '@/lib/contracts/common'

export type Variant = {
  name: string
  value: string
}

export type ProductImage = {
  src: string
  alt: string
}

/**
 * A purchasable catalogue unit. A future backend can add more than one SKU to
 * a product without changing the storefront's product-level routes.
 */
export type SKU = {
  id: string
  code: string
  productId: string
  title: string | null
  isDefault: boolean
  variants: Variant[]
  price: Money | null
  stock: StockSnapshot
  image: ProductImage | null
}

export type ProductStatus = 'active' | 'draft' | 'archived'

/**
 * Product-level catalogue record. The current legacy catalogue maps each
 * product to one deterministic default SKU through the compatibility adapter.
 */
export type Product = {
  id: string
  slug: string
  name: string
  category: string
  subcategory: string
  shortDescription: string
  description: string
  brand: string | null
  status: ProductStatus
  tags: string[]
  attributes: Record<string, string | number | boolean | string[]>
  applications: string[]
  images: ProductImage[]
  defaultSkuId: string
  skus: SKU[]
}
