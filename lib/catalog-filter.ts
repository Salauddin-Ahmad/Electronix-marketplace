import type { Product, StockMode } from '@/lib/data'
import { facetKeys, facetsForCategory, sortKeys, type CatalogSort, type FacetKey } from '@/lib/facet-config'

export type RawCatalogSearchParams = Record<string, string | string[] | undefined>
export type CatalogParams = {
  page: number
  sort: CatalogSort
  filters: Partial<Record<FacetKey, string[]>>
}
export type AvailableFacet = {
  key: FacetKey
  label: string
  unit?: string
  options: Array<{ value: string; label: string; count: number }>
}

const firstValue = (value: string | string[] | undefined) => Array.isArray(value) ? value[0] : value
const valuesOf = (value: string | string[] | undefined) => (Array.isArray(value) ? value : value ? [value] : []).map((item) => item.trim()).filter(Boolean)

export function parseCatalogSearchParams(searchParams: RawCatalogSearchParams): CatalogParams {
  const rawPage = Number.parseInt(firstValue(searchParams.page) ?? '1', 10)
  const rawSort = firstValue(searchParams.sort) ?? 'relevance'
  const filters: CatalogParams['filters'] = {}

  for (const [key, value] of Object.entries(searchParams)) {
    if (!facetKeys.has(key)) continue
    const values = [...new Set(valuesOf(value))]
    if (values.length) filters[key as FacetKey] = values
  }

  return {
    page: Number.isFinite(rawPage) && rawPage > 0 ? rawPage : 1,
    sort: sortKeys.has(rawSort) ? rawSort as CatalogSort : 'relevance',
    filters,
  }
}

function productValues(product: Product, key: FacetKey): string[] {
  if (key === 'brand') return product.brand ? [product.brand] : []
  if (key === 'stock_status') return [product.stockMode]
  if (key === 'price') return product.pricing.sellingPrice === null ? [] : [String(product.pricing.sellingPrice)]
  const value = product.attributes?.[key]
  if (value === undefined || value === null || value === '') return []
  return (Array.isArray(value) ? value : [value]).map(String)
}

export function applyProductFilters(products: Product[], params: CatalogParams) {
  const activeFilters = Object.entries(params.filters) as Array<[FacetKey, string[]]>
  if (!activeFilters.length) return [...products]
  return products.filter((product) => activeFilters.every(([key, selected]) => {
    const values = productValues(product, key)
    return selected.some((selectedValue) => values.includes(selectedValue))
  }))
}

const stockOrder: Record<StockMode, number> = { high: 0, medium: 1, low: 2, order: 3 }
const priorityOrder = { P1: 0, P2: 1, P3: 2, P4: 3 }
const itemNumber = (product: Product) => Number.parseInt(product.id.replace(/\D/g, ''), 10) || 0

export function sortProducts(products: Product[], sort: CatalogSort) {
  const sorted = [...products]
  const priceCompare = (a: Product, b: Product, direction: 1 | -1) => {
    const aPrice = a.pricing.sellingPrice
    const bPrice = b.pricing.sellingPrice
    if (aPrice === null && bPrice === null) return 0
    if (aPrice === null) return 1
    if (bPrice === null) return -1
    return (aPrice - bPrice) * direction
  }
  if (sort === 'price_asc') return sorted.sort((a, b) => priceCompare(a, b, 1))
  if (sort === 'price_desc') return sorted.sort((a, b) => priceCompare(a, b, -1))
  if (sort === 'newest') return sorted.sort((a, b) => itemNumber(b) - itemNumber(a))
  if (sort === 'trending') return sorted.sort((a, b) => Number(b.trending) - Number(a.trending) || priorityOrder[a.priority] - priorityOrder[b.priority])
  if (sort === 'stock_first') return sorted.sort((a, b) => stockOrder[a.stockMode] - stockOrder[b.stockMode])
  if (sort === 'priority') return sorted.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority])
  return sorted
}

export function paginateProducts(products: Product[], requestedPage: number, pageSize = 12) {
  const safePageSize = Number.isFinite(pageSize) && pageSize > 0 ? Math.floor(pageSize) : 12
  const pageCount = Math.max(1, Math.ceil(products.length / safePageSize))
  const page = Math.min(Math.max(1, Math.floor(requestedPage || 1)), pageCount)
  return {
    items: products.slice((page - 1) * safePageSize, page * safePageSize),
    page,
    pageCount,
    total: products.length,
  }
}

export function buildAvailableFacets(products: Product[], categorySlug?: string): AvailableFacet[] {
  return facetsForCategory(categorySlug).flatMap((definition) => {
    const maxOptions = 'maxOptions' in definition ? definition.maxOptions : undefined
    const unit = 'unit' in definition ? definition.unit : undefined
    const counts = new Map<string, number>()
    for (const product of products) {
      for (const value of productValues(product, definition.key)) counts.set(value, (counts.get(value) ?? 0) + 1)
    }
    if (counts.size < 2) return []
    const options = [...counts.entries()]
      .sort(([a], [b]) => definition.type === 'number' ? Number(a) - Number(b) : a.localeCompare(b))
      .slice(0, maxOptions ?? 12)
      .map(([value, count]) => ({ value, label: facetOptionLabel(definition.key, value), count }))
    return [{ key: definition.key, label: definition.label, unit, options }]
  })
}

function facetOptionLabel(key: FacetKey, value: string) {
  if (key === 'stock_status') return value === 'high' ? 'High stock' : value === 'medium' ? 'Medium stock' : value === 'low' ? 'Low stock' : 'Order on request'
  if (key === 'app_support') return value === 'true' ? 'Supported' : 'Not specified'
  return value
}

export function serializeFilterParams(params: CatalogParams, extras: Record<string, string> = {}) {
  const search = new URLSearchParams()
  for (const [key, value] of Object.entries(extras)) if (value) search.set(key, value)
  for (const [key, values] of Object.entries(params.filters)) for (const value of values ?? []) search.append(key, value)
  if (params.sort !== 'relevance') search.set('sort', params.sort)
  if (params.page > 1) search.set('page', String(params.page))
  return search.toString()
}

export function catalogUrl(basePath: string, params: CatalogParams, extras: Record<string, string> = {}) {
  const query = serializeFilterParams(params, extras)
  return query ? `${basePath}?${query}` : basePath
}
