import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import type { Product } from '@/lib/catalog/types'
import { ProductGrid } from '@/components/product-card'

type ShowcaseProps = {
  title: string
  items: Product[]
  href?: string
  hrefLabel?: string
}

export function Showcase({ title, items, href, hrefLabel = 'View all' }: ShowcaseProps) {
  const headingId = `showcase-${title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`

  return (
    <section className="mx-auto mt-10 max-w-[1320px] sm:mt-12" aria-labelledby={headingId}>
      <div className="mb-4 flex flex-wrap items-center justify-between gap-x-4 gap-y-2 sm:mb-5">
        <h2 id={headingId} className="font-display text-2xl font-bold text-slate-900 sm:text-3xl">
          {title}
        </h2>
        {href ? (
          <Link href={href} className="inline-flex min-h-10 shrink-0 items-center gap-1.5 rounded text-xs font-semibold text-brand-600 underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 sm:text-sm">
            {hrefLabel} <ArrowRight size={16} aria-hidden="true" />
          </Link>
        ) : null}
      </div>
      {items.length > 0 ? (
        <ProductGrid products={items} />
      ) : (
        <p className="border border-dashed border-slate-300 bg-slate-50 px-4 py-8 text-center text-sm text-slate-500">
          No products listed.
        </p>
      )}
    </section>
  )
}
