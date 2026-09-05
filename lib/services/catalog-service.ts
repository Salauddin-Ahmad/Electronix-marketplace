import type { Product, SKU } from '@/lib/contracts/catalog'
import type { PaginatedResult, PageRequest } from '@/lib/contracts/common'

export type CatalogListInput = PageRequest & {
  query?: string
  categorySlug?: string
}

/**
 * Storefront catalogue boundary. A future HTTP implementation should satisfy
 * this interface rather than being called directly from page components.
 */
export interface CatalogService {
  listProducts(input?: CatalogListInput): Promise<PaginatedResult<Product>>
  getProductById(id: string): Promise<Product | null>
  getProductBySlug(slug: string): Promise<Product | null>
  getProductBySkuId(skuId: string): Promise<Product | null>
  getSkuById(skuId: string): Promise<SKU | null>
}
