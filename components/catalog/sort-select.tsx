import { sortOptions } from '@/lib/facet-config'
import type { CatalogParams } from '@/lib/catalog-filter'

export function SortSelect({ params, basePath, extras = {}, resultCount, hasPricedProducts }: { params: CatalogParams; basePath: string; extras?: Record<string, string>; resultCount: number; hasPricedProducts: boolean }) {
  const availableSortOptions = sortOptions.filter((option) => hasPricedProducts || (option.value !== 'price_asc' && option.value !== 'price_desc'))
  return (
    <div className="flex flex-col gap-3 border border-slate-200 bg-white p-3 sm:flex-row sm:items-center sm:justify-between">
      <p className="text-sm text-slate-600"><strong className="text-slate-950">{resultCount}</strong> {resultCount === 1 ? 'product' : 'products'} found</p>
      <form action={basePath} method="get" className="flex items-center gap-2">
        {Object.entries(extras).map(([key, value]) => value && <input key={key} type="hidden" name={key} value={value} />)}
        {Object.entries(params.filters).flatMap(([key, values]) => (values ?? []).map((value) => <input key={`${key}-${value}`} type="hidden" name={key} value={value} />))}
        <label htmlFor="catalog-sort" className="sr-only">Sort products</label>
        <select id="catalog-sort" name="sort" defaultValue={params.sort} className="min-h-10 min-w-0 flex-1 border border-slate-300 bg-white px-3 text-sm font-semibold text-slate-800 outline-none focus:border-brand-500 focus:ring-2 focus:ring-blue-100 sm:min-w-52">
          {availableSortOptions.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
        </select>
        <button type="submit" className="min-h-10 border border-slate-300 px-3 text-sm font-bold text-slate-700 transition hover:border-brand-500 hover:text-brand-600">Sort</button>
      </form>
    </div>
  )
}
