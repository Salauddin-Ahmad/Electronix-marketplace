import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ProductCard } from '@/components/product-card'
import { ProductGallery } from '@/components/product/product-gallery'
import { ProductSpecifications } from '@/components/product/product-specifications'
import { ProductPurchaseActions } from '@/components/product-purchase-actions'
import { RecentlyViewedProducts } from '@/components/recently-viewed-products'
import { SiteFooter } from '@/components/site-footer'
import { SiteHeader } from '@/components/site-header'
import { getNavigationCategoryForSource } from '@/lib/catalog/navigation'
import { getAvailabilityText, getProductSummary, getTechnicalFacts } from '@/lib/catalog/product-display'
import { formatBDT } from '@/lib/currency'
import { getProduct, products, relatedProducts } from '@/lib/data'

type Props = { params: Promise<{ id: string }> }

export function generateStaticParams() {
  return products.map((product) => ({ id: product.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params
  const product = getProduct(id)

  if (!product) return { title: 'Product not found' }

  return {
    title: product.name,
    description: `${product.shortDescription} Ask VOLTRONIX to confirm current pricing, availability and delivery.`,
  }
}

export default async function ProductPage({ params }: Props) {
  const { id } = await params
  const product = getProduct(id)
  if (!product) notFound()

  const related = relatedProducts(product)
  const publicCategory = getNavigationCategoryForSource(product.category)
  const technicalHighlights = getTechnicalFacts(product).slice(0, 4)
  const availabilityText = getAvailabilityText(product)
  const productSummary = getProductSummary(product)

  return (
    <div className="min-h-screen bg-[#f8f8f6]">
      <SiteHeader />
      <main className="container-shell py-8 sm:py-10">
        <nav aria-label="Breadcrumb" className="text-xs text-slate-500">
          <ol className="flex flex-wrap items-center gap-2">
            <li><Link href="/" className="hover:text-brand-600">Home</Link></li>
            <li aria-hidden="true">/</li>
            {publicCategory ? (
              <>
                <li><Link href={`/category/${publicCategory.slug}`} className="hover:text-brand-600">{publicCategory.name}</Link></li>
                <li aria-hidden="true">/</li>
              </>
            ) : null}
            <li className="max-w-full truncate font-semibold text-slate-700" aria-current="page">{product.name}</li>
          </ol>
        </nav>

        <div className="mt-6 grid items-start gap-8 lg:grid-cols-[minmax(0,.92fr)_minmax(0,1.08fr)] lg:gap-12 xl:gap-14">
          <ProductGallery product={product} />

          <article>
            <div className="eyebrow">{product.subcategory}</div>
            <h1 className="font-display mt-2 max-w-3xl text-4xl font-bold leading-[1.02] text-slate-950 sm:text-5xl">
              {product.name}
            </h1>

            <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-xs font-semibold text-slate-600">
              <span>SKU: <strong className="text-slate-950">{product.sku}</strong></span>
              {product.brand ? <span>Brand: <strong className="text-slate-950">{product.brand}</strong></span> : null}
              <span>Category: <strong className="text-slate-950">{publicCategory?.name ?? product.category}</strong></span>
            </div>

            <p className="mt-5 max-w-2xl text-[15px] leading-7 text-slate-600">{productSummary}</p>

            {technicalHighlights.length > 0 ? (
              <dl className="mt-6 grid border-l border-t border-slate-200 bg-white sm:grid-cols-2" aria-label="Key product details">
                {technicalHighlights.map((fact) => (
                  <div key={`${fact.label}-${fact.value}`} className="border-b border-r border-slate-200 px-4 py-3">
                    <dt className="text-[10px] font-bold uppercase tracking-wide text-slate-500">{fact.label}</dt>
                    <dd className="mt-1 text-sm font-bold text-slate-950">{fact.value}</dd>
                  </div>
                ))}
              </dl>
            ) : (
              <p className="mt-6 border-l-2 border-brand-500 bg-blue-50 px-4 py-3 text-sm leading-6 text-slate-700">
                Detailed technical attributes are awaiting confirmation. Use the SKU above when asking about compatibility.
              </p>
            )}

            <section className="mt-7 border-y border-slate-200 py-6" aria-label="Price, availability and quote actions">
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <div className="text-xs font-bold uppercase tracking-wide text-slate-500">Current price</div>
                  <div className="font-display mt-1 text-4xl font-bold text-slate-950">
                    {product.pricing.sellingPrice === null ? 'Request price' : formatBDT(product.pricing.sellingPrice)}
                  </div>
                  <p className="mt-1 text-xs leading-5 text-slate-500">Final unit price and any quantity rate are confirmed before ordering.</p>
                </div>
                <div className="sm:border-l sm:border-slate-200 sm:pl-5">
                  <div className="text-xs font-bold uppercase tracking-wide text-slate-500">Availability</div>
                  <div className="mt-2 text-sm font-bold text-slate-950">{availabilityText}</div>
                  <p className="mt-1 text-xs leading-5 text-slate-500">Delivery time and charge depend on the item and delivery area.</p>
                </div>
              </div>

              <div className="mt-6">
                <ProductPurchaseActions product={product} />
                <p className="mt-3 text-xs leading-5 text-slate-500">
                  Adding this item creates a frontend quote cart only. No payment or confirmed order is placed online.
                </p>
              </div>
            </section>
          </article>
        </div>

        <ProductSpecifications product={product} />

        {related.length > 0 ? (
          <section className="mt-14 border-t border-slate-200 pt-9" aria-labelledby="related-products-heading">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <div className="eyebrow">More in {product.subcategory}</div>
                <h2 id="related-products-heading" className="font-display mt-1 text-3xl font-bold text-slate-950">Related products</h2>
              </div>
              {publicCategory ? (
                <Link href={`/category/${publicCategory.slug}`} className="text-sm font-bold text-brand-600 underline-offset-4 hover:underline">
                  View {publicCategory.name}
                </Link>
              ) : null}
            </div>
            <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {related.map((item) => <ProductCard key={item.id} product={item} />)}
            </div>
          </section>
        ) : null}

        <RecentlyViewedProducts current={{
          id: product.id,
          slug: product.slug,
          name: product.name,
          subcategory: product.subcategory,
          image: product.images.primary ?? '/placeholder.svg',
        }} />
      </main>
      <SiteFooter />
    </div>
  )
}
