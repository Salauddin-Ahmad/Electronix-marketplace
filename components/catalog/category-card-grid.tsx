import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export type CatalogCategoryCard = {
  count?: number
  href: string
  name: string
}

export function CategoryCardGrid({
  cards,
  label = 'Browse categories',
}: {
  cards: readonly CatalogCategoryCard[]
  label?: string
}) {
  if (!cards.length) return null

  return (
    <section aria-label={label}>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((card) => (
          <Link
            key={card.href}
            className="focus-ring group flex min-h-20 items-center justify-between gap-4 border border-slate-200 bg-white px-4 py-3.5 transition hover:border-brand-500 hover:bg-slate-50"
            href={card.href}
          >
            <span className="min-w-0">
              <span className="block font-display text-lg font-bold leading-tight text-slate-950 transition-colors group-hover:text-brand-600">
                {card.name}
              </span>
              {typeof card.count === 'number' ? (
                <span className="mt-1 block text-xs font-medium text-slate-500">
                  {card.count} {card.count === 1 ? 'item' : 'items'}
                </span>
              ) : null}
            </span>
            <ArrowRight
              aria-hidden="true"
              className="shrink-0 text-slate-300 transition group-hover:translate-x-0.5 group-hover:text-brand-500"
              size={18}
            />
          </Link>
        ))}
      </div>
    </section>
  )
}
