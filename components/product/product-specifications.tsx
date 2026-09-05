import type { Product } from '@/lib/catalog/types'
import { getProductFacts } from '@/lib/catalog/product-display'

export function ProductSpecifications({ product }: { product: Product }) {
  const rows = getProductFacts(product)

  return (
    <section className="mt-12 border-t border-slate-200 pt-9" aria-labelledby="product-information-heading">
      <div className="grid gap-6 lg:grid-cols-[.7fr_1.3fr] lg:gap-12">
        <div>
          <div className="eyebrow">Known catalogue details</div>
          <h2 id="product-information-heading" className="font-display mt-1 text-3xl font-bold text-slate-950">
            Product information
          </h2>
          <p className="mt-3 max-w-md text-sm leading-6 text-slate-600">
            Only known catalogue details are shown. Confirm final compatibility and brand before ordering.
          </p>
        </div>
        <dl className="border-x border-t border-slate-200 bg-white">
          {rows.map((row) => (
            <div key={`${row.label}-${row.value}`} className="grid border-b border-slate-200 sm:grid-cols-[.78fr_1.22fr]">
              <dt className="bg-slate-50 px-4 py-3 text-xs font-bold uppercase tracking-wide text-slate-500 sm:px-5">{row.label}</dt>
              <dd className="px-4 py-3 text-sm font-semibold text-slate-900 sm:px-5">{row.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
