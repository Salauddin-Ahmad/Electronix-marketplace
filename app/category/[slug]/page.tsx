import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ActiveFilters } from '@/components/catalog/active-filters'
import { FilterSidebar } from '@/components/catalog/filter-sidebar'
import { SortSelect } from '@/components/catalog/sort-select'
import { ProductGrid } from '@/components/product-card'
import { SiteFooter } from '@/components/site-footer'
import { SiteHeader } from '@/components/site-header'
import { applyProductFilters, buildAvailableFacets, catalogUrl, paginateProducts, parseCatalogSearchParams, sortProducts, type RawCatalogSearchParams } from '@/lib/catalog-filter'
import { getCategory, navigationCategories, productsByNavigationCategory } from '@/lib/data'

type Props = { params: Promise<{ slug: string }>; searchParams: Promise<RawCatalogSearchParams> }

export function generateStaticParams() {
  return navigationCategories.map((category) => ({ slug: category.slug }))
}

export async function generateMetadata({ params }: Pick<Props, 'params'>): Promise<Metadata> {
  const { slug } = await params
  const category = getCategory(slug)

  return category
    ? { title: category.name, description: category.desc }
    : { title: 'Category not found' }
}

export default async function CategoryPage({ params, searchParams }: Props) {
  const { slug } = await params
  const rawParams = await searchParams
  const category = getCategory(slug)
  if (!category) notFound()

  const basePath = `/category/${slug}`
  const categoryProducts = productsByNavigationCategory(slug)
  const parsedParams = parseCatalogSearchParams(rawParams)
  const hasPricedProducts = categoryProducts.some((product) => product.pricing.sellingPrice !== null)
  const catalogParams = !hasPricedProducts && (parsedParams.sort === 'price_asc' || parsedParams.sort === 'price_desc') ? { ...parsedParams, sort: 'relevance' as const } : parsedParams
  const facets = buildAvailableFacets(categoryProducts, slug)
  const filteredProducts = applyProductFilters(categoryProducts, catalogParams)
  const sortedProducts = sortProducts(filteredProducts, catalogParams.sort)
  const pagination = paginateProducts(sortedProducts, catalogParams.page)

  return (
    <div>
      <SiteHeader />
      <main className="container-shell py-10">
        <Link href="/" className="text-xs text-slate-500">Home / Categories</Link>
        <div className="mt-6 border-b border-slate-200 pb-6">
          <div className="eyebrow">Category</div>
          <h1 className="font-display mt-1 text-4xl font-bold">{category.name}</h1>
          <p className="mt-2 text-sm text-slate-600">{category.desc}</p>
        </div>

        <div className={`mt-7 grid gap-6 ${facets.length ? 'lg:grid-cols-[260px_minmax(0,1fr)]' : ''}`}>
          <FilterSidebar facets={facets} params={catalogParams} basePath={basePath} />
          <section className="min-w-0" aria-label={`${category.name} products`}>
            <SortSelect params={catalogParams} basePath={basePath} resultCount={pagination.total} hasPricedProducts={hasPricedProducts} />
            <ActiveFilters facets={facets} params={catalogParams} basePath={basePath} />
            <div className="mt-5">
              {pagination.items.length ? <ProductGrid products={pagination.items} /> : (
                <div className="border border-dashed border-slate-300 bg-white p-8 text-center">
                  <p className="text-sm text-slate-600">No products match these filters.</p>
                  <Link href={basePath} className="mt-3 inline-flex text-sm font-bold text-brand-600 hover:underline">Clear all filters</Link>
                </div>
              )}
            </div>

            {pagination.pageCount > 1 && (
              <nav aria-label="Category pagination" className="mt-8 flex items-center justify-center gap-4 text-sm">
                <Link href={catalogUrl(basePath, { ...catalogParams, page: Math.max(1, pagination.page - 1) })} aria-disabled={pagination.page === 1} className={pagination.page === 1 ? 'pointer-events-none text-slate-300' : 'font-semibold text-brand-600'}>Previous</Link>
                <span className="text-slate-500">Page {pagination.page} of {pagination.pageCount}</span>
                <Link href={catalogUrl(basePath, { ...catalogParams, page: Math.min(pagination.pageCount, pagination.page + 1) })} aria-disabled={pagination.page === pagination.pageCount} className={pagination.page === pagination.pageCount ? 'pointer-events-none text-slate-300' : 'font-semibold text-brand-600'}>Next</Link>
              </nav>
            )}
          </section>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
