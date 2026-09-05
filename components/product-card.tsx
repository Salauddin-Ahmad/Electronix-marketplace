import Image from 'next/image'
import Link from 'next/link'
import { AddToCartButton } from '@/components/add-to-cart-button'
import { stockLabel } from '@/lib/catalog/product-display'
import type { Product } from '@/lib/catalog/types'
import { formatBDT } from '@/lib/currency'

export function ProductCard({ product }: { product: Product }) {
  const image = product.images.primary ?? '/placeholder.svg'

  return (
    <article className="group flex h-full min-w-0 flex-col border border-slate-200 bg-white p-3 transition hover:border-brand-500 hover:shadow-lg sm:p-4">
      <Link href={`/product/${product.slug}`} className="focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2">
        <div className="relative h-36 overflow-hidden bg-[#f1f2ef] sm:h-44">
          <Image
            src={image}
            alt={product.name}
            fill
            sizes="(max-width: 639px) 50vw, (max-width: 1280px) 33vw, 25vw"
            className="object-contain p-3 sm:p-5"
          />
          <span className="absolute bottom-2 left-2 bg-white/85 px-1.5 py-1 text-[9px] font-semibold uppercase tracking-wide text-slate-500 backdrop-blur-sm">
            Illustrative image
          </span>
        </div>

        <div className="pt-3 sm:pt-4">
          <div className="text-[10px] font-bold uppercase tracking-widest text-brand-600">{product.subcategory}</div>
          <h3 className="font-display mt-1 line-clamp-2 text-lg font-bold leading-tight text-slate-900 transition group-hover:text-brand-600 sm:text-xl">
            {product.name}
          </h3>
          {product.brand ? <p className="mt-1 text-xs font-semibold text-slate-600">{product.brand}</p> : null}
          <p className="mt-2 line-clamp-2 text-xs leading-5 text-slate-500 sm:text-sm sm:leading-6">
            {product.shortDescription}
          </p>
        </div>
      </Link>

      <div className="mt-auto flex items-end justify-between gap-2 pt-4 sm:gap-3 sm:pt-5">
        <div className="min-w-0">
          <div className="text-[11px] font-semibold text-slate-600 sm:text-xs">{stockLabel(product.stockMode)}</div>
          <div className="font-display mt-1 text-base font-bold text-slate-950 sm:text-lg">
            {product.pricing.sellingPrice === null ? 'Request price' : formatBDT(product.pricing.sellingPrice)}
          </div>
        </div>
        <AddToCartButton product={product} compact />
      </div>
    </article>
  )
}

export function ProductGrid({ products }: { products: Product[] }) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3 xl:grid-cols-4">
      {products.map((product) => <ProductCard key={product.id} product={product} />)}
    </div>
  )
}
