import Link from 'next/link'
import { X } from 'lucide-react'
import { catalogUrl, type AvailableFacet, type CatalogParams } from '@/lib/catalog-filter'
import type { FacetKey } from '@/lib/facet-config'

export function ActiveFilters({ facets, params, basePath, extras = {} }: { facets: AvailableFacet[]; params: CatalogParams; basePath: string; extras?: Record<string, string> }) {
  const chips = (Object.entries(params.filters) as Array<[FacetKey, string[]]>).flatMap(([key, values]) => {
    const facet = facets.find((item) => item.key === key)
    if (!facet) return []
    return values.map((value) => ({ key, value, label: `${facet.label}: ${facet.options.find((option) => option.value === value)?.label ?? value}${facet.unit ? ` ${facet.unit}` : ''}` }))
  })
  if (!chips.length) return null

  return (
    <div className="mt-3 flex flex-wrap items-center gap-2" aria-label="Active filters">
      <span className="mr-1 text-xs font-semibold text-slate-500">Active:</span>
      {chips.map((chip) => {
        const nextFilters = { ...params.filters }
        const remaining = (nextFilters[chip.key] ?? []).filter((value) => value !== chip.value)
        if (remaining.length) nextFilters[chip.key] = remaining
        else delete nextFilters[chip.key]
        const href = catalogUrl(basePath, { ...params, page: 1, filters: nextFilters }, extras)
        return <Link key={`${chip.key}-${chip.value}`} href={href} className="inline-flex items-center gap-1.5 border border-blue-200 bg-blue-50 px-2.5 py-1.5 text-xs font-semibold text-blue-800 hover:border-blue-300"><span>{chip.label}</span><X size={13} aria-hidden="true" /></Link>
      })}
    </div>
  )
}
