import Link from 'next/link'
import { getCatalogueNavigationGroup } from '@/lib/catalog/navigation'

export function CategorySelector({ slug }: { slug: string }) {
  const group = getCatalogueNavigationGroup(slug)
  if (!group) return null

  const items = [
    { name: `All ${group.label}`, href: group.href },
    ...group.categories.map((category) => ({
      name: category.name,
      href: `/category/${category.slug}`,
    })),
  ]

  return (
    <nav aria-label={`${group.label} categories`} className="mt-5 flex gap-2 overflow-x-auto overscroll-x-contain pb-3 md:flex-wrap md:overflow-visible">
      {items.map((item) => {
        const isCurrent = item.href === `/category/${slug}`

        return (
          <Link
            key={item.href}
            href={item.href}
            aria-current={isCurrent ? 'page' : undefined}
            className={`inline-flex min-h-10 shrink-0 items-center rounded-md px-3.5 text-xs font-semibold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 ${
              isCurrent ? 'bg-slate-900 text-white' : 'bg-white text-slate-600 ring-1 ring-inset ring-slate-200 hover:bg-slate-100 hover:text-slate-950'
            }`}
          >
            {item.name}
          </Link>
        )
      })}
    </nav>
  )
}
