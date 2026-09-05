import { navigationCategories, products } from '@/lib/data'
import type { Product } from '@/lib/catalog/types'

export type DashboardCatalogMetric = {
  label: string
  value: number
  description: string
  tone: 'neutral' | 'attention' | 'ready'
}

export type DashboardCategoryReport = {
  name: string
  slug: string
  productCount: number
  pricePendingCount: number
  brandPendingCount: number
  availabilityPendingCount: number
  specificationPendingCount: number
}

export type DashboardProductRow = {
  id: string
  sku: string
  name: string
  category: string
  subcategory: string
  brand: string | null
  hasImage: boolean
  imageState: 'none' | 'illustrative' | 'assigned'
  hasConfirmedPrice: boolean
  hasConfirmedAvailability: boolean
  hasSpecifications: boolean
}

export const dashboardProductPageSize = 12

export type DashboardReadinessFilter = 'all' | 'needs-review' | 'data-ready'

export type RawDashboardProductSearchParams = {
  q?: string | string[]
  readiness?: string | string[]
  page?: string | string[]
}

export type DashboardProductQuery = {
  q: string
  readiness: DashboardReadinessFilter
  page: number
}

export type DashboardProductPage = {
  items: DashboardProductRow[]
  total: number
  page: number
  pageCount: number
  from: number
  to: number
}

const hasSpecifications = (product: Product) =>
  Object.values(product.specifications).some((value) => value !== null && value !== '')

const isConfirmedAvailability = (product: Product) =>
  product.availability.inStock !== null || product.availability.quantity !== null

export const dashboardProducts: DashboardProductRow[] = products.map((product) => ({
  id: product.id,
  sku: product.sku,
  name: product.name,
  category: product.category,
  subcategory: product.subcategory,
  brand: product.brand,
  hasImage: Boolean(product.images.primary),
  imageState: product.images.primary
    ? product.images.primary.includes('/products/generated/')
      ? 'illustrative'
      : 'assigned'
    : 'none',
  hasConfirmedPrice: product.pricing.sellingPrice !== null,
  hasConfirmedAvailability: isConfirmedAvailability(product),
  hasSpecifications: hasSpecifications(product),
}))

const firstValue = (value: string | string[] | undefined) =>
  Array.isArray(value) ? value[0] : value

const parseSafePage = (value: string | undefined) => {
  const parsed = Number.parseInt(value ?? '', 10)

  return Number.isFinite(parsed) && parsed > 0 ? parsed : 1
}

export const parseDashboardProductSearchParams = (
  rawParams: RawDashboardProductSearchParams,
): DashboardProductQuery => {
  const q = (firstValue(rawParams.q) ?? '').trim().slice(0, 120)
  const rawReadiness = firstValue(rawParams.readiness)
  const readiness: DashboardReadinessFilter =
    rawReadiness === 'needs-review' || rawReadiness === 'data-ready' ? rawReadiness : 'all'

  return {
    q,
    readiness,
    page: parseSafePage(firstValue(rawParams.page)),
  }
}

const hasCompleteReviewData = (product: DashboardProductRow) =>
  product.hasConfirmedPrice &&
  product.hasConfirmedAvailability &&
  product.hasSpecifications &&
  product.brand !== null &&
  product.imageState !== 'none'

export const filterDashboardProducts = (
  query: DashboardProductQuery,
  sourceProducts = dashboardProducts,
) => {
  const normalizedQuery = query.q.toLowerCase()

  return sourceProducts.filter((product) => {
    const matchesSearch =
      !normalizedQuery ||
      [product.name, product.sku, product.category, product.subcategory]
        .join(' ')
        .toLowerCase()
        .includes(normalizedQuery)
    const matchesReadiness =
      query.readiness === 'all' ||
      (query.readiness === 'data-ready' && hasCompleteReviewData(product)) ||
      (query.readiness === 'needs-review' && !hasCompleteReviewData(product))

    return matchesSearch && matchesReadiness
  })
}

export const paginateDashboardProducts = (
  sourceProducts: DashboardProductRow[],
  requestedPage: number,
): DashboardProductPage => {
  const total = sourceProducts.length
  const pageCount = Math.max(1, Math.ceil(total / dashboardProductPageSize))
  const page = Math.min(Math.max(requestedPage, 1), pageCount)
  const from = total ? (page - 1) * dashboardProductPageSize + 1 : 0
  const to = Math.min(page * dashboardProductPageSize, total)

  return {
    items: sourceProducts.slice(from - 1, to),
    total,
    page,
    pageCount,
    from,
    to,
  }
}

export const dashboardProductsUrl = ({
  q,
  readiness = 'all',
  page = 1,
}: Partial<DashboardProductQuery> = {}) => {
  const params = new URLSearchParams()

  if (q?.trim()) params.set('q', q.trim())
  if (readiness !== 'all') params.set('readiness', readiness)
  if (page > 1) params.set('page', String(page))

  const search = params.toString()

  return search ? `/dashboard/products?${search}` : '/dashboard/products'
}

export const dashboardCatalogMetrics = (): DashboardCatalogMetric[] => {
  const pricePendingCount = dashboardProducts.filter((product) => !product.hasConfirmedPrice).length
  const brandPendingCount = dashboardProducts.filter((product) => !product.brand).length
  const availabilityPendingCount = dashboardProducts.filter(
    (product) => !product.hasConfirmedAvailability,
  ).length
  const categoryCoverage = navigationCategories.filter((category) =>
    products.some((product) => category.sourceCategories.includes(product.category as never)),
  ).length

  return [
    {
      label: 'Mock catalog items',
      value: dashboardProducts.length,
      description: 'Derived from the current frontend catalog.',
      tone: 'neutral',
    },
    {
      label: 'Public categories covered',
      value: categoryCoverage,
      description: `Of ${navigationCategories.length} mapped customer categories.`,
      tone: 'ready',
    },
    {
      label: 'Prices pending review',
      value: pricePendingCount,
      description: 'No selling price is confirmed in mock data.',
      tone: 'attention',
    },
    {
      label: 'Availability pending review',
      value: availabilityPendingCount,
      description: 'Inventory quantities are not connected.',
      tone: 'attention',
    },
    {
      label: 'Brands pending review',
      value: brandPendingCount,
      description: 'Brand data has not been supplied.',
      tone: 'attention',
    },
  ]
}

export const dashboardCategoryReports = (): DashboardCategoryReport[] =>
  navigationCategories.map((category) => {
    const categoryProducts = products.filter((product) =>
      category.sourceCategories.includes(product.category as never),
    )

    return {
      name: category.name,
      slug: category.slug,
      productCount: categoryProducts.length,
      pricePendingCount: categoryProducts.filter((product) => product.pricing.sellingPrice === null)
        .length,
      brandPendingCount: categoryProducts.filter((product) => product.brand === null).length,
      availabilityPendingCount: categoryProducts.filter(
        (product) => !isConfirmedAvailability(product),
      ).length,
      specificationPendingCount: categoryProducts.filter((product) => !hasSpecifications(product))
        .length,
    }
  })

export const dashboardDataReadiness = () => {
  const metrics = dashboardCatalogMetrics()

  return {
    totalProducts: dashboardProducts.length,
    pricePendingCount: metrics.find((metric) => metric.label === 'Prices pending review')?.value ?? 0,
    brandPendingCount: metrics.find((metric) => metric.label === 'Brands pending review')?.value ?? 0,
    availabilityPendingCount:
      metrics.find((metric) => metric.label === 'Availability pending review')?.value ?? 0,
    specificationPendingCount: dashboardProducts.filter((product) => !product.hasSpecifications).length,
  }
}
