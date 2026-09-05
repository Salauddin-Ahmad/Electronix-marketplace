import { BarChart3, ClipboardCheck } from 'lucide-react'
import { DataTable, type DataTableColumn } from '@/components/dashboard/data-table'
import { MetricCard } from '@/components/dashboard/metric-card'
import { PageHeader } from '@/components/dashboard/page-header'
import { StatusBadge } from '@/components/dashboard/status-badge'
import {
  dashboardCategoryReports,
  dashboardDataReadiness,
  type DashboardCategoryReport,
} from '@/lib/dashboard/catalog-data'

const reportColumns: DataTableColumn<DashboardCategoryReport>[] = [
  {
    key: 'category',
    header: 'Customer category',
    className: 'min-w-48',
    cell: (row) => <span className="font-semibold text-slate-950">{row.name}</span>,
  },
  {
    key: 'products',
    header: 'Mock items',
    className: 'text-right',
    cell: (row) => row.productCount,
  },
  {
    key: 'prices',
    header: 'Prices pending',
    className: 'text-right',
    cell: (row) => row.pricePendingCount,
  },
  {
    key: 'brands',
    header: 'Brands pending',
    className: 'text-right',
    cell: (row) => row.brandPendingCount,
  },
  {
    key: 'availability',
    header: 'Availability pending',
    className: 'text-right',
    cell: (row) => row.availabilityPendingCount,
  },
  {
    key: 'specifications',
    header: 'Specifications',
    cell: (row) => (
      <StatusBadge tone={row.specificationPendingCount ? 'warning' : 'success'}>
        {row.specificationPendingCount ? `${row.specificationPendingCount} reviews pending` : 'Reviewed'}
      </StatusBadge>
    ),
  },
]

export default function DashboardReportsPage() {
  const readiness = dashboardDataReadiness()
  const categoryReports = dashboardCategoryReports()

  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Catalog quality preview"
        title="Reports"
        description="These are deterministic completeness checks calculated from the current mock catalog. They are not sales, financial, supplier, or inventory reports."
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        <MetricCard
          description="Products currently available in the frontend catalog."
          label="Mock catalog items"
          value={readiness.totalProducts}
        />
        <MetricCard
          description="Selling prices have not been confirmed."
          label="Price reviews pending"
          tone="attention"
          value={readiness.pricePendingCount}
        />
        <MetricCard
          description="Brands have not been supplied."
          label="Brand reviews pending"
          tone="attention"
          value={readiness.brandPendingCount}
        />
        <MetricCard
          description="No verified quantities or stock state."
          label="Availability reviews pending"
          tone="attention"
          value={readiness.availabilityPendingCount}
        />
        <MetricCard
          description="Technical specifications need verification."
          label="Specification reviews pending"
          tone="attention"
          value={readiness.specificationPendingCount}
        />
      </div>

      <section className="border border-slate-200 bg-white p-5 sm:p-6">
        <div className="flex items-start gap-3">
          <ClipboardCheck aria-hidden="true" className="mt-1 shrink-0 text-blue-700" size={20} />
          <div>
            <p className="eyebrow">Pre-launch data review</p>
            <h2 className="mt-2 font-display text-3xl font-bold text-slate-950">Category completeness</h2>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">
              Use this as a catalog cleanup checklist before connecting data to a real commerce service. It deliberately
              does not invent stock, sales, or supplier performance.
            </p>
          </div>
        </div>
        <div className="mt-5">
          <DataTable columns={reportColumns} getRowId={(row) => row.slug} rows={categoryReports} />
        </div>
      </section>

      <section className="flex items-start gap-3 border border-slate-200 bg-white p-5 sm:p-6">
        <BarChart3 aria-hidden="true" className="mt-0.5 shrink-0 text-slate-600" size={20} />
        <p className="text-sm leading-6 text-slate-600">
          Financial, operational, and inventory reporting remains unavailable until server-side records and verified
          integrations exist.
        </p>
      </section>
    </div>
  )
}
