import { legacyProductToCatalogProduct } from '@/lib/adapters/legacy-product-adapter'
import type { Product, SKU } from '@/lib/contracts/catalog'
import type { PaginatedResult } from '@/lib/contracts/common'
import type { CatalogListInput, CatalogService } from '@/lib/services/catalog-service'
import { getProduct, getProductBySku, products, productsByNavigationCategory, searchProducts } from '@/lib/data'

const DEFAULT_PAGE_SIZE = 12
const MAX_PAGE_SIZE = 100

function safePositiveInteger(value: number | undefined, fallback: number): number {
  if (!Number.isFinite(value) || value === undefined) return fallback
  return Math.max(1, Math.floor(value))
}

function toPagedResult(items: Product[], input: CatalogListInput = {}): PaginatedResult<Product> {
  const pageSize = Math.min(safePositiveInteger(input.pageSize, DEFAULT_PAGE_SIZE), MAX_PAGE_SIZE)
  const totalItems = items.length
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize))
  const page = Math.min(safePositiveInteger(input.page, 1), totalPages)
  const offset = (page - 1) * pageSize

  return {
    items: items.slice(offset, offset + pageSize),
    page,
    pageSize,
    totalItems,
    totalPages,
  }
}

function legacyProductsFor(input: CatalogListInput): typeof products {
  let matches = input.categorySlug
    ? productsByNavigationCategory(input.categorySlug)
    : products

  if (input.query?.trim()) {
    const searchIds = new Set(searchProducts(input.query).map((product) => product.id))
    matches = matches.filter((product) => searchIds.has(product.id))
  }

  return matches
}

export class MockCatalogService implements CatalogService {
  async listProducts(input: CatalogListInput = {}): Promise<PaginatedResult<Product>> {
    return toPagedResult(legacyProductsFor(input).map(legacyProductToCatalogProduct), input)
  }

  async getProductById(id: string): Promise<Product | null> {
    const legacyProduct = getProduct(id)
    return legacyProduct ? legacyProductToCatalogProduct(legacyProduct) : null
  }

  async getProductBySlug(slug: string): Promise<Product | null> {
    const legacyProduct = getProduct(slug)
    return legacyProduct ? legacyProductToCatalogProduct(legacyProduct) : null
  }

  async getProductBySkuId(skuId: string): Promise<Product | null> {
    const legacyProduct = getProductBySku(skuId)
    return legacyProduct ? legacyProductToCatalogProduct(legacyProduct) : null
  }

  async getSkuById(skuId: string): Promise<SKU | null> {
    const product = await this.getProductBySkuId(skuId)
    return product?.skus.find((sku) => sku.id === skuId) ?? null
  }
}

export const mockCatalogService = new MockCatalogService()
