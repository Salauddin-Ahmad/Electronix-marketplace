import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ActiveFilters } from '@/components/catalog/active-filters'
import { CategoryCardGrid } from '@/components/catalog/category-card-grid'
import { FilterSidebar } from '@/components/catalog/filter-sidebar'
import { SortSelect } from '@/components/catalog/sort-select'
import { ProductGrid } from '@/components/product-card'
import { SiteFooter } from '@/components/site-footer'
import { SiteHeader } from '@/components/site-header'
import { applyProductFilters, buildAvailableFacets, catalogUrl, paginateProducts, parseCatalogSearchParams, sortProducts, type RawCatalogSearchParams } from '@/lib/catalog-filter'
import { getCategory, navigationCategories, productsByNavigationCategory } from '@/lib/data'
import { gadgetCategories } from '@/lib/catalog/navigation'
import { absoluteUrl, canonicalMetadata } from '@/lib/seo'

type Props = { params: Promise<{ slug: string }>; searchParams: Promise<RawCatalogSearchParams> }

export function generateStaticParams() {
  return navigationCategories.map((category) => ({ slug: category.slug }))
}

export async function generateMetadata({ params }: Pick<Props, 'params'>): Promise<Metadata> {
  const { slug } = await params
  const category = getCategory(slug)

  return category
    ? {
      title: category.name,
      description: category.desc,
      ...canonicalMetadata(`/category/${category.slug}`),
      openGraph: {
        title: `${category.name} | VOLTRONIX`,
        description: category.desc,
        url: absoluteUrl(`/category/${category.slug}`),
      },
    }
    : { title: 'Category not found' }
}

export default async function CategoryPage({ params, searchParams }: Props) {
  const { slug } = await params
  const rawParams = await searchParams
  const category = getCategory(slug)
  if (!category) notFound()

  const basePath = `/category/${slug}`
  const isGadgetHub = 'isHub' in category && category.isHub
  const gadgetCards = isGadgetHub
    ? gadgetCategories.map((gadgetCategory) => ({
      name: gadgetCategory.name,
      href: `/category/${gadgetCategory.slug}`,
      count: productsByNavigationCategory(gadgetCategory.slug).length,
    }))
    : []
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
      <main id="main-content" className="container-shell py-10">
        {isGadgetHub ? (
          <nav aria-label="Breadcrumb" className="text-xs text-slate-500">
            <Link href="/" className="hover:text-brand-600">Home</Link>
            <span aria-hidden="true"> / </span>
            <span aria-current="page">Gadgets</span>
          </nav>
        ) : <Link href="/" className="text-xs text-slate-500">Home / Categories</Link>}
        {isGadgetHub ? (
          <div className="mt-5 border-b border-slate-200 pb-5">
            <h1 className="font-display text-4xl font-bold">Gadgets</h1>
            <p className="mt-1.5 text-sm text-slate-600">Everyday tech essentials and accessories.</p>
          </div>
        ) : (
          <div className="mt-6 border-b border-slate-200 pb-6">
            <div className="eyebrow">Category</div>
            <h1 className="font-display mt-1 text-4xl font-bold">{category.name}</h1>
            <p className="mt-2 text-sm text-slate-600">{category.desc}</p>
          </div>
        )}

        {isGadgetHub ? (
          <section className="mt-5">
            <CategoryCardGrid cards={gadgetCards} label="Gadget categories" />
          </section>
        ) : null}

        <div className={`mt-7 grid gap-6 ${facets.length ? 'lg:grid-cols-[260px_minmax(0,1fr)]' : ''}`}>
          <FilterSidebar facets={facets} params={catalogParams} basePath={basePath} />
          <section className="min-w-0" aria-label={`${category.name} products`}>
            {isGadgetHub ? (
              <div className="mb-4 border-b border-slate-200 pb-3">
                <h2 className="font-display text-3xl font-bold text-slate-950">All Gadgets</h2>
              </div>
            ) : null}
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
