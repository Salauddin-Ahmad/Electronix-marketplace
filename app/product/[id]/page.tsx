import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { AddToCartButton } from '@/components/add-to-cart-button'
import { ProductCard } from '@/components/product-card'
import { ProductWhatsAppButton } from '@/components/product-whatsapp-button'
import { SiteFooter } from '@/components/site-footer'
import { SiteHeader } from '@/components/site-header'
import { formatBDT } from '@/lib/currency'
import { getProduct, products, relatedProducts, stockLabel } from '@/lib/data'

type Props = { params: Promise<{ id: string }> }

export function generateStaticParams() {
  return products.map((product) => ({ id: product.slug }))
}

export default async function ProductPage({ params }: Props) {
  const { id } = await params
  const product = getProduct(id)
  if (!product) notFound()
  const related = relatedProducts(product)

  return (
    <div>
      <SiteHeader />
      <main className="container-shell py-10">
        <nav className="text-xs text-slate-500"><Link href="/">Home</Link> / {product.category} / {product.name}</nav>
        <div className="mt-7 grid gap-8 lg:grid-cols-[.8fr_1.2fr]">
          <div className="relative min-h-[360px] overflow-hidden bg-[#f1f2ef]">
            <Image
              src={product.images.primary ?? '/placeholder.svg'}
              alt={product.name}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 45vw"
              className="object-contain p-10"
            />
          </div>
          <div>
            <div className="text-xs font-bold uppercase tracking-widest text-brand-600">{product.priority} · {product.subcategory}</div>
            <h1 className="font-display mt-2 text-4xl font-bold text-slate-950">{product.name}</h1>
            <p className="mt-5 text-base leading-7 text-slate-600">{product.description}</p>
            <div className="mt-6 grid gap-3 border-y border-slate-200 py-5 text-sm sm:grid-cols-2">
              <div><b>SKU</b><br />{product.sku}</div>
              <div><b>Availability</b><br />{stockLabel(product.stockMode)}</div>
              <div><b>Brand</b><br />{product.brand ?? 'Not specified'}</div>
              <div><b>Category</b><br />{product.category} / {product.subcategory}</div>
            </div>
            {Object.keys(product.specifications).length > 0 && (
              <section className="mt-6">
                <h2 className="font-display text-2xl font-bold">Specifications</h2>
                <dl className="mt-3 space-y-2">
                  {Object.entries(product.specifications).map(([key, value]) => value !== null && (
                    <div key={key} className="flex justify-between border-b border-slate-100 py-2"><dt>{key}</dt><dd>{value}</dd></div>
                  ))}
                </dl>
              </section>
            )}
            <div className="mt-6 flex flex-wrap gap-2">{product.tags.map((tag) => <span key={tag} className="bg-slate-100 px-2 py-1 text-xs">{tag}</span>)}</div>
            <div className="mt-7 flex flex-wrap items-center justify-between gap-4 border border-slate-200 bg-white p-5">
              <div>
                <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">Price</div>
                <div className="font-display mt-1 text-3xl font-bold text-slate-950">{product.pricing.sellingPrice === null ? 'Request price' : formatBDT(product.pricing.sellingPrice)}</div>
              </div>
              <div className="flex flex-wrap gap-3">
                <AddToCartButton product={product} electric />
                <ProductWhatsAppButton product={product} />
              </div>
            </div>
          </div>
        </div>
        {related.length > 0 && (
          <section className="mt-14">
            <h2 className="font-display text-3xl font-bold">Related products</h2>
            <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{related.map((item) => <ProductCard key={item.id} product={item} />)}</div>
          </section>
        )}
      </main>
      <SiteFooter />
    </div>
  )
}
