import { Settings2 } from 'lucide-react'
import { DataTable, type DataTableColumn } from '@/components/dashboard/data-table'
import { PageHeader } from '@/components/dashboard/page-header'
import { StatusBadge } from '@/components/dashboard/status-badge'

type IntegrationRow = {
  name: string
  purpose: string
  state: string
}

const integrations: IntegrationRow[] = [
  { name: 'Commerce API', purpose: 'Catalog, quotes, and order records', state: 'Not connected' },
  { name: 'Inventory source', purpose: 'Verified quantities and reservations', state: 'Not connected' },
  { name: 'Payment provider', purpose: 'Payment authorization and settlement', state: 'Not connected' },
  { name: 'Courier provider', purpose: 'Delivery booking and tracking', state: 'Not connected' },
  { name: 'Notifications', purpose: 'Transactional email or SMS', state: 'Not connected' },
]

const integrationColumns: DataTableColumn<IntegrationRow>[] = [
  {
    key: 'integration',
    header: 'Future integration',
    cell: (row) => <span className="font-semibold text-slate-950">{row.name}</span>,
  },
  {
    key: 'purpose',
    header: 'Purpose',
    className: 'min-w-64',
    cell: (row) => row.purpose,
  },
  {
    key: 'state',
    header: 'Current state',
    cell: (row) => <StatusBadge tone="neutral">{row.state}</StatusBadge>,
  },
]

export default function DashboardSettingsPage() {
  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Configuration preview"
        title="Settings"
        description="Configuration controls are intentionally read-only. This frontend has no authenticated settings store and does not save operational changes."
      />

      <section className="border border-slate-200 bg-white p-5 sm:p-6">
        <div className="flex items-start gap-3">
          <Settings2 aria-hidden="true" className="mt-1 shrink-0 text-blue-700" size={20} />
          <div>
            <h2 className="font-display text-2xl font-bold text-slate-950">Integration boundaries</h2>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">
              These markers show where future services belong. No credentials, payment setup, delivery rules, or
              operational settings are stored in this browser-only preview.
            </p>
          </div>
        </div>
        <div className="mt-5">
          <DataTable columns={integrationColumns} getRowId={(row) => row.name} rows={integrations} />
        </div>
      </section>
    </div>
  )
}
