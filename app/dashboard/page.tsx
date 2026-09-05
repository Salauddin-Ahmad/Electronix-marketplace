import { ArrowRight, Database, FileWarning, PackageSearch } from 'lucide-react'
import Link from 'next/link'
import { DataTable, type DataTableColumn } from '@/components/dashboard/data-table'
import { MetricCard } from '@/components/dashboard/metric-card'
import { PageHeader } from '@/components/dashboard/page-header'
import { StatusBadge } from '@/components/dashboard/status-badge'
import {
  dashboardCatalogMetrics,
  dashboardCategoryReports,
  type DashboardCategoryReport,
} from '@/lib/dashboard/catalog-data'

const categoryColumns: DataTableColumn<DashboardCategoryReport>[] = [
  {
    key: 'category',
    header: 'Customer category',
    cell: (row) => <span className="font-semibold text-slate-950">{row.name}</span>,
  },
  {
    key: 'products',
    header: 'Mock items',
    className: 'text-right',
    cell: (row) => row.productCount,
  },
  {
    key: 'commercial-data',
    header: 'Commercial data',
    cell: (row) => (
      <StatusBadge tone={row.pricePendingCount ? 'warning' : 'success'}>
        {row.pricePendingCount ? `${row.pricePendingCount} price reviews pending` : 'Price data present'}
      </StatusBadge>
    ),
  },
]

export default function DashboardOverviewPage() {
  const metrics = dashboardCatalogMetrics()
  const categoryReports = dashboardCategoryReports()

  return (
    <div className="space-y-8">
      <PageHeader
        title="Operations overview"
        description="A read-only frontend preview built from the current mock catalog. It does not contain live orders, revenue, stock quantities, customer records, or saved operations."
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        {metrics.map((metric) => (
          <MetricCard
            key={metric.label}
            description={metric.description}
            label={metric.label}
            tone={metric.tone}
            value={metric.value}
          />
        ))}
      </div>

      <section className="grid gap-5 xl:grid-cols-[1.35fr_.65fr]">
        <div className="border border-slate-200 bg-white p-5 sm:p-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="eyebrow">Catalog coverage</p>
              <h2 className="mt-2 font-display text-3xl font-bold text-slate-950">Customer category readiness</h2>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Counts are calculated from the mock catalog and central category mapping.
              </p>
            </div>
            <Link
              className="focus-ring inline-flex w-fit items-center gap-1.5 text-sm font-semibold text-blue-700 hover:text-blue-900"
              href="/dashboard/reports"
            >
              View full report <ArrowRight aria-hidden="true" size={16} />
            </Link>
          </div>
          <div className="mt-5">
            <DataTable columns={categoryColumns} getRowId={(row) => row.slug} rows={categoryReports} />
          </div>
        </div>

        <aside className="border border-blue-200 bg-blue-50 p-5 sm:p-6">
          <Database aria-hidden="true" className="text-blue-700" size={22} />
          <p className="eyebrow mt-4">Current boundary</p>
          <h2 className="mt-2 font-display text-3xl font-bold text-slate-950">Frontend only</h2>
          <p className="mt-3 text-sm leading-6 text-slate-700">
            This shell is ready for a future service layer, but no API, authentication, persistence, pricing
            authority, or inventory integration has been connected.
          </p>
          <div className="mt-5 border-t border-blue-200 pt-5">
            <Link
              className="focus-ring inline-flex items-center gap-1.5 text-sm font-semibold text-blue-800 hover:text-blue-950"
              href="/dashboard/products"
            >
              Inspect catalog preview <PackageSearch aria-hidden="true" size={16} />
            </Link>
          </div>
        </aside>
      </section>

      <section className="border border-slate-200 bg-white p-5 sm:p-6">
        <div className="flex items-start gap-3">
          <FileWarning aria-hidden="true" className="mt-0.5 shrink-0 text-amber-700" size={20} />
          <div>
            <h2 className="font-display text-2xl font-bold text-slate-950">Before operational use</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Add a protected backend, verified catalog data, audited stock records, order workflow, and role-based
              access before treating this dashboard as an operations system.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
