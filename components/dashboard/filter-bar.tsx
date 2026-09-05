import Link from 'next/link'
import { Search } from 'lucide-react'

export type DashboardFilterOption = {
  label: string
  value: string
}

export function FilterBar({
  action,
  clearHref,
  query,
  selectLabel,
  selectName,
  selectValue,
  selectOptions,
  searchPlaceholder = 'Search records',
}: {
  action: string
  clearHref: string
  query: string
  selectLabel: string
  selectName: string
  selectValue: string
  selectOptions: DashboardFilterOption[]
  searchPlaceholder?: string
}) {
  return (
    <form action={action} className="border border-slate-200 bg-white p-4 sm:p-5" method="get">
      <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_220px_auto] lg:items-end">
        <div>
          <label className="block text-sm font-semibold text-slate-800" htmlFor="dashboard-filter-query">
            Search products
          </label>
          <div className="relative mt-2">
            <Search aria-hidden="true" className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={17} />
            <input
              className="h-10 w-full rounded-sm border border-slate-300 bg-white pl-9 pr-3 text-sm text-slate-950 outline-none transition-colors placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              defaultValue={query}
              id="dashboard-filter-query"
              name="q"
              placeholder={searchPlaceholder}
              type="search"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-semibold text-slate-800" htmlFor={`dashboard-filter-${selectName}`}>
            {selectLabel}
          </label>
          <select
            className="mt-2 h-10 w-full rounded-sm border border-slate-300 bg-white px-3 text-sm text-slate-950 outline-none transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            defaultValue={selectValue}
            id={`dashboard-filter-${selectName}`}
            name={selectName}
          >
            {selectOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        <div className="flex gap-2">
          <button
            className="focus-ring h-10 rounded-sm bg-slate-950 px-4 text-sm font-semibold text-white transition-colors hover:bg-slate-800"
            type="submit"
          >
            Apply
          </button>
          <Link
            className="focus-ring inline-flex h-10 items-center rounded-sm border border-slate-300 px-4 text-sm font-semibold text-slate-700 transition-colors hover:border-blue-200 hover:bg-blue-50 hover:text-blue-800"
            href={clearHref}
          >
            Reset
          </Link>
        </div>
      </div>
    </form>
  )
}
