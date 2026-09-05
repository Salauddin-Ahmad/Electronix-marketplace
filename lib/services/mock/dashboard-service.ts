import { legacyProductToCatalogProduct } from '@/lib/adapters/legacy-product-adapter'
import type { PageRequest } from '@/lib/contracts/common'
import type { DashboardOverview, ProductReadiness, ProductReadinessPage } from '@/lib/contracts/dashboard'
import type { DashboardService } from '@/lib/services/dashboard-service'
import { products } from '@/lib/data'

const DEFAULT_PAGE_SIZE = 20
const MAX_PAGE_SIZE = 100

function safePositiveInteger(value: number | undefined, fallback: number): number {
  if (!Number.isFinite(value) || value === undefined) return fallback
  return Math.max(1, Math.floor(value))
}

function readinessForAllProducts(): ProductReadiness[] {
  return products.map((legacyProduct) => {
    const product = legacyProductToCatalogProduct(legacyProduct)
    const sku = product.skus[0]

    return {
      productId: product.id,
      skuId: sku.id,
      sku: sku.code,
      name: product.name,
      category: product.category,
      hasImage: product.images.length > 0,
      hasPrice: sku.price !== null,
      hasBrand: product.brand !== null,
      hasSpecifications: Object.keys(product.attributes).length > 0,
      stockState: sku.stock.state,
    }
  })
}

function toReadinessPage(items: ProductReadiness[], input: PageRequest = {}): ProductReadinessPage {
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

export class MockDashboardService implements DashboardService {
  async getOverview(): Promise<DashboardOverview> {
    const readiness = readinessForAllProducts()

    return {
      source: 'mock',
      operationsConnected: false,
      catalog: {
        totalProducts: readiness.length,
        productsWithPrice: readiness.filter((product) => product.hasPrice).length,
        quoteRequiredProducts: readiness.filter((product) => !product.hasPrice).length,
        productsWithImage: readiness.filter((product) => product.hasImage).length,
        productsWithBrand: readiness.filter((product) => product.hasBrand).length,
        productsWithSpecifications: readiness.filter((product) => product.hasSpecifications).length,
      },
    }
  }

  async listProductReadiness(input: PageRequest = {}): Promise<ProductReadinessPage> {
    return toReadinessPage(readinessForAllProducts(), input)
  }
}

export const mockDashboardService = new MockDashboardService()
