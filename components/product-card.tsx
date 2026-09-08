import Image from 'next/image'
import Link from 'next/link'
import { AddToCartButton } from '@/components/add-to-cart-button'
import { stockLabel } from '@/lib/catalog/product-display'
import type { Product } from '@/lib/catalog/types'
import { formatBDT } from '@/lib/currency'

export function ProductCard({ product }: { product: Product }) {
  const image = product.images.primary ?? '/placeholder.svg'

  return (
    <article className="group flex h-full min-w-0 flex-col rounded-lg border border-slate-200 bg-white p-2.5 transition duration-200 hover:border-slate-300 hover:shadow-md sm:p-3">
      <Link href={`/product/${product.slug}`} className="focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2">
        <div className="relative h-32 overflow-hidden rounded-md bg-[#f1f2ef] sm:h-36 xl:h-[156px]">
          <Image
            src={image}
            alt={product.name}
            fill
            sizes="(max-width: 767px) 50vw, (max-width: 1279px) 33vw, (max-width: 1439px) 25vw, 304px"
            className="object-contain p-3 sm:p-4"
          />
          <span className="absolute bottom-1.5 left-1.5 bg-white/85 px-1.5 py-0.5 text-[8px] font-semibold uppercase tracking-wide text-slate-500 backdrop-blur-sm sm:text-[9px]">
            Illustrative image
          </span>
        </div>

        <div className="pt-2.5 sm:pt-3">
          <div className="truncate text-[9px] font-bold uppercase tracking-wide text-brand-600 sm:text-[10px]" title={product.subcategory}>{product.subcategory}</div>
          <h3 className="font-display mt-1 min-h-10 line-clamp-2 text-base font-bold leading-5 text-slate-900 transition group-hover:text-brand-600 sm:min-h-11 sm:text-lg sm:leading-[22px]">
            {product.name}
          </h3>
          {product.brand ? <p className="mt-1 text-xs font-semibold text-slate-600">{product.brand}</p> : null}
          <p className="mt-1.5 hidden text-xs leading-5 text-slate-500 sm:line-clamp-1">
            {product.shortDescription}
          </p>
        </div>
      </Link>

      <div className="mt-auto flex flex-col items-stretch justify-between gap-2 pt-3 sm:flex-row sm:items-end sm:pt-4">
        <div className="min-w-0">
          <div className="text-[10px] font-semibold text-slate-600 sm:text-[11px]">{stockLabel(product.stockMode)}</div>
          <div className="font-display mt-0.5 text-sm font-bold text-slate-950 sm:text-base">
            {product.pricing.sellingPrice === null ? 'Request price' : formatBDT(product.pricing.sellingPrice)}
          </div>
        </div>
        <AddToCartButton product={product} compact className="shrink-0" />
      </div>
    </article>
  )
}

export function ProductGrid({ products }: { products: Product[] }) {
  return (
    <div className="mx-auto grid w-full max-w-[1320px] grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 xl:grid-cols-4">
      {products.map((product) => <ProductCard key={product.id} product={product} />)}
    </div>
  )
}
