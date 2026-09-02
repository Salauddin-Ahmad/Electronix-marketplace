import type { Metadata } from 'next'
import Link from 'next/link'
import { ActiveFilters } from '@/components/catalog/active-filters'
import { FilterSidebar } from '@/components/catalog/filter-sidebar'
import { SortSelect } from '@/components/catalog/sort-select'
import { ProductGrid } from '@/components/product-card'
import { SiteFooter } from '@/components/site-footer'
import { SiteHeader } from '@/components/site-header'
import { applyProductFilters, buildAvailableFacets, catalogUrl, paginateProducts, parseCatalogSearchParams, sortProducts, type RawCatalogSearchParams } from '@/lib/catalog-filter'
import { searchProducts } from '@/lib/data'

type Props = { searchParams: Promise<RawCatalogSearchParams> }

export const metadata: Metadata = {
  title: 'Product Catalogue',
  description: 'Search and filter the VOLTRONIX electrical product catalogue.',
}

export default async function SearchPage({ searchParams }: Props) {
  const rawParams = await searchParams
  const rawQuery = rawParams.q
  const q = (Array.isArray(rawQuery) ? rawQuery[0] : rawQuery) ?? ''
  const normalizedQuery = q.trim().toLowerCase()
  const showAll = !normalizedQuery || normalizedQuery === 'all'
  const showPriority = normalizedQuery === 'best'
  const extras: Record<string, string> = q ? { q } : {}
  const basePath = '/search'
  const searchResults = searchProducts(q)
  const parsedParams = parseCatalogSearchParams(rawParams)
  const hasPricedProducts = searchResults.some((product) => product.pricing.sellingPrice !== null)
  const catalogParams = !hasPricedProducts && (parsedParams.sort === 'price_asc' || parsedParams.sort === 'price_desc') ? { ...parsedParams, sort: 'relevance' as const } : parsedParams
  const facets = buildAvailableFacets(searchResults)
  const filteredProducts = applyProductFilters(searchResults, catalogParams)
  const sortedProducts = sortProducts(filteredProducts, catalogParams.sort)
  const pagination = paginateProducts(sortedProducts, catalogParams.page)

  return (
    <div>
      <SiteHeader />
      <main className="container-shell py-10">
        <div className="eyebrow">Complete catalogue</div>
        <h1 className="font-display mt-2 text-4xl font-bold">{showAll ? 'All Products' : showPriority ? 'Priority Products' : `Search results for “${q}”`}</h1>

        <div className={`mt-7 grid gap-6 ${facets.length ? 'lg:grid-cols-[260px_minmax(0,1fr)]' : ''}`}>
          <FilterSidebar facets={facets} params={catalogParams} basePath={basePath} extras={extras} />
          <section className="min-w-0" aria-label="Search results">
            <SortSelect params={catalogParams} basePath={basePath} extras={extras} resultCount={pagination.total} hasPricedProducts={hasPricedProducts} />
            <ActiveFilters facets={facets} params={catalogParams} basePath={basePath} extras={extras} />
            <div className="mt-5">
              {pagination.items.length ? <ProductGrid products={pagination.items} /> : (
                <div className="border border-dashed border-slate-300 bg-white p-8 text-center">
                  <p className="text-sm text-slate-600">No products match this search and filter combination.</p>
                  <Link href={catalogUrl(basePath, { page: 1, sort: 'relevance', filters: {} }, extras)} className="mt-3 inline-flex text-sm font-bold text-brand-600 hover:underline">Clear filters</Link>
                </div>
              )}
            </div>

            {pagination.pageCount > 1 && (
              <nav aria-label="Search pagination" className="mt-8 flex items-center justify-center gap-4 text-sm">
                <Link href={catalogUrl(basePath, { ...catalogParams, page: Math.max(1, pagination.page - 1) }, extras)} aria-disabled={pagination.page === 1} className={pagination.page === 1 ? 'pointer-events-none text-slate-300' : 'font-semibold text-brand-600'}>Previous</Link>
                <span className="text-slate-500">Page {pagination.page} of {pagination.pageCount}</span>
                <Link href={catalogUrl(basePath, { ...catalogParams, page: Math.min(pagination.pageCount, pagination.page + 1) }, extras)} aria-disabled={pagination.page === pagination.pageCount} className={pagination.page === pagination.pageCount ? 'pointer-events-none text-slate-300' : 'font-semibold text-brand-600'}>Next</Link>
              </nav>
            )}
          </section>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
