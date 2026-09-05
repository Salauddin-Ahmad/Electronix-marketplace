import type { PaginatedResult, StockState } from '@/lib/contracts/common'

export type DashboardCatalogSummary = {
  totalProducts: number
  productsWithPrice: number
  quoteRequiredProducts: number
  productsWithImage: number
  productsWithBrand: number
  productsWithSpecifications: number
}

export type ProductReadiness = {
  productId: string
  skuId: string
  sku: string
  name: string
  category: string
  hasImage: boolean
  hasPrice: boolean
  hasBrand: boolean
  hasSpecifications: boolean
  stockState: StockState
}

export type DashboardOverview = {
  source: 'mock'
  operationsConnected: false
  catalog: DashboardCatalogSummary
}

export type ProductReadinessPage = PaginatedResult<ProductReadiness>
