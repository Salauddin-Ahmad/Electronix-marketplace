import Link from 'next/link'
import { SlidersHorizontal } from 'lucide-react'
import { catalogUrl, type AvailableFacet, type CatalogParams } from '@/lib/catalog-filter'

export function FilterSidebar({
  facets,
  params,
  basePath,
  extras = {},
}: {
  facets: AvailableFacet[]
  params: CatalogParams
  basePath: string
  extras?: Record<string, string>
}) {
  if (!facets.length) return null
  const clearUrl = catalogUrl(basePath, { page: 1, sort: 'relevance', filters: {} }, extras)
  const activeSelectionCount = Object.values(params.filters).reduce((total, values) => total + (values?.length ?? 0), 0)

  return (
    <>
      <details className="group border border-slate-200 bg-white lg:hidden">
        <summary className="flex cursor-pointer list-none items-center justify-between px-4 py-3 text-sm font-bold text-slate-900">
          <span className="inline-flex items-center gap-2">
            <SlidersHorizontal size={17} />
            Filter products
            {activeSelectionCount > 0 && <span className="grid min-w-5 place-items-center rounded-full bg-blue-50 px-1.5 py-0.5 text-[10px] text-brand-600">{activeSelectionCount}</span>}
          </span>
          <span className="text-xs font-semibold text-brand-600">
            <span className="group-open:hidden">Open</span>
            <span className="hidden group-open:inline">Close</span>
          </span>
        </summary>
        <div className="border-t border-slate-200 p-4"><FilterForm idPrefix="mobile" facets={facets} params={params} basePath={basePath} extras={extras} clearUrl={clearUrl} /></div>
      </details>

      <aside className="hidden self-start border border-slate-200 bg-white lg:block" aria-label="Product filters">
        <div className="border-b border-slate-200 px-5 py-4">
          <div className="flex items-center justify-between gap-3">
            <h2 className="font-display text-xl font-bold text-slate-950">Filter products</h2>
            <Link href={clearUrl} className="text-xs font-semibold text-brand-600 hover:underline">Clear</Link>
          </div>
          <p className="mt-1 text-xs leading-5 text-slate-500">Only useful filters for this catalogue are shown.</p>
        </div>
        <div className="p-5"><FilterForm idPrefix="desktop" facets={facets} params={params} basePath={basePath} extras={extras} clearUrl={clearUrl} /></div>
      </aside>
    </>
  )
}

function FilterForm({ idPrefix, facets, params, basePath, extras, clearUrl }: { idPrefix: string; facets: AvailableFacet[]; params: CatalogParams; basePath: string; extras: Record<string, string>; clearUrl: string }) {
  return (
    <form action={basePath} method="get">
      {Object.entries(extras).map(([key, value]) => value && <input key={key} type="hidden" name={key} value={value} />)}
      {params.sort !== 'relevance' && <input type="hidden" name="sort" value={params.sort} />}
      <div className="space-y-5">
        {facets.map((facet) => (
          <fieldset key={facet.key} className="border-b border-slate-100 pb-5 last:border-0 last:pb-0">
            <legend className="mb-2 text-xs font-bold uppercase tracking-wide text-slate-800">{facet.label}</legend>
            <div className="space-y-2.5">
              {facet.options.map((option) => {
                const id = `${idPrefix}-${facet.key}-${option.value.replace(/[^a-z0-9]+/gi, '-')}`
                return (
                  <label key={option.value} htmlFor={id} className="flex cursor-pointer items-center gap-2.5 text-sm text-slate-700">
                    <input id={id} type="checkbox" name={facet.key} value={option.value} defaultChecked={params.filters[facet.key]?.includes(option.value)} className="size-4 border-slate-300 accent-blue-600" />
                    <span className="min-w-0 flex-1">{option.label}{facet.unit ? ` ${facet.unit}` : ''}</span>
                    <span className="text-xs tabular-nums text-slate-400">{option.count}</span>
                  </label>
                )
              })}
            </div>
          </fieldset>
        ))}
      </div>
      <div className="mt-5 grid grid-cols-2 gap-2">
        <button type="submit" className="min-h-10 bg-brand-500 px-3 text-sm font-bold text-white transition hover:bg-brand-600 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2">Apply</button>
        <Link href={clearUrl} className="inline-flex min-h-10 items-center justify-center border border-slate-300 px-3 text-sm font-semibold text-slate-700 hover:border-brand-500 hover:text-brand-600">Reset</Link>
      </div>
    </form>
  )
}
