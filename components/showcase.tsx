import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import type { Product } from '@/lib/data'
import { ProductGrid } from '@/components/product-card'

type ShowcaseProps = {
  title: string
  items: Product[]
  href?: string
}

export function Showcase({ title, items, href }: ShowcaseProps) {
  const headingId = `showcase-${title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`

  return (
    <section className="mt-12 border-t border-slate-200 pt-8" aria-labelledby={headingId}>
      <div className="mb-5 flex items-end justify-between gap-4">
        <div>
          <div className="eyebrow">Catalogue</div>
          <h2 id={headingId} className="font-display mt-1 text-3xl font-bold text-slate-900">
            {title}
          </h2>
        </div>
        {href ? (
          <Link href={href} className="inline-flex shrink-0 items-center gap-1 text-sm font-bold text-brand-600 underline-offset-4 hover:underline focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2">
            View all <ArrowRight size={16} aria-hidden="true" />
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
