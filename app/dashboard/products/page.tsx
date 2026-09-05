import { Info } from 'lucide-react'
import { DataTable, type DataTableColumn } from '@/components/dashboard/data-table'
import { DashboardPagination } from '@/components/dashboard/dashboard-pagination'
import { FilterBar } from '@/components/dashboard/filter-bar'
import { PageHeader } from '@/components/dashboard/page-header'
import { StatusBadge } from '@/components/dashboard/status-badge'
import {
  dashboardProducts,
  dashboardProductsUrl,
  filterDashboardProducts,
  paginateDashboardProducts,
  parseDashboardProductSearchParams,
  type DashboardProductRow,
  type RawDashboardProductSearchParams,
} from '@/lib/dashboard/catalog-data'

type ProductsPageProps = {
  searchParams: Promise<RawDashboardProductSearchParams>
}

const readinessOptions = [
  { label: 'All records', value: 'all' },
  { label: 'Needs data review', value: 'needs-review' },
  { label: 'Data ready', value: 'data-ready' },
]

const productColumns: DataTableColumn<DashboardProductRow>[] = [
  {
    key: 'product',
    header: 'Product',
    className: 'min-w-64',
    cell: (row) => (
      <div>
        <p className="font-semibold text-slate-950">{row.name}</p>
        <p className="mt-1 text-xs text-slate-500">{row.subcategory}</p>
      </div>
    ),
  },
  {
    key: 'sku',
    header: 'SKU',
    className: 'whitespace-nowrap font-mono text-xs',
    cell: (row) => row.sku,
  },
  {
    key: 'category',
    header: 'Source category',
    className: 'min-w-48',
    cell: (row) => row.category,
  },
  {
    key: 'commercial',
    header: 'Price',
    cell: (row) => (
      <StatusBadge tone={row.hasConfirmedPrice ? 'success' : 'warning'}>
        {row.hasConfirmedPrice ? 'Price configured' : 'Quote required'}
      </StatusBadge>
    ),
  },
  {
    key: 'availability',
    header: 'Availability',
    cell: (row) => (
      <StatusBadge tone={row.hasConfirmedAvailability ? 'success' : 'warning'}>
        {row.hasConfirmedAvailability ? 'Data configured' : 'Review pending'}
      </StatusBadge>
    ),
  },
  {
    key: 'image',
    header: 'Visual',
    cell: (row) => {
      const imageLabel =
        row.imageState === 'illustrative'
          ? 'Illustrative image'
          : row.imageState === 'assigned'
            ? 'Image assigned'
            : 'No image'

      return <StatusBadge tone={row.imageState === 'none' ? 'warning' : 'info'}>{imageLabel}</StatusBadge>
    },
  },
]

export default async function DashboardProductsPage({ searchParams }: ProductsPageProps) {
  const query = parseDashboardProductSearchParams(await searchParams)
  const matchingProducts = filterDashboardProducts(query)
  const pagination = paginateDashboardProducts(matchingProducts, query.page)
  const hasActiveFilters = Boolean(query.q) || query.readiness !== 'all'

  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Catalog preview"
        title="Products"
        description="Read-only rows from the current mock catalog. Product edits, imports, and price changes are intentionally not available without a protected backend."
      />

      <FilterBar
        action="/dashboard/products"
        clearHref={dashboardProductsUrl()}
        query={query.q}
        searchPlaceholder="Search name, SKU, category, or subcategory"
        selectLabel="Readiness"
        selectName="readiness"
        selectOptions={readinessOptions}
        selectValue={query.readiness}
      />

      <section className="border border-blue-200 bg-blue-50 p-4 text-sm leading-6 text-blue-950">
        <div className="flex gap-3">
          <Info aria-hidden="true" className="mt-0.5 shrink-0 text-blue-700" size={18} />
          <p>
            {pagination.total
              ? `Showing ${pagination.from}–${pagination.to} of ${pagination.total} ${
                  hasActiveFilters ? 'matching' : 'mock catalog'
                } items.`
              : 'No mock catalog items match this search and readiness filter.'}{' '}
            The visual state distinguishes category-level illustrative assets from missing images; it does not certify
            product-photo accuracy.
          </p>
        </div>
      </section>

      <DataTable
        columns={productColumns}
        emptyMessage="No mock catalog items match the current search and readiness filter."
        getRowId={(row) => row.id}
        rows={pagination.items}
      />

      <DashboardPagination
        ariaLabel="Product catalog pagination"
        hrefForPage={(page) =>
          dashboardProductsUrl({ q: query.q, readiness: query.readiness, page })
        }
        page={pagination.page}
        pageCount={pagination.pageCount}
      />
    </div>
  )
}
