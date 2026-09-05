import { ClipboardList } from 'lucide-react'
import { OperationUnavailable } from '@/components/dashboard/operation-unavailable'

export default function DashboardQuotesPage() {
  return (
    <OperationUnavailable
      description="Frontend quote, price challenge, and project inquiry screens do not create dashboard records yet."
      detail="When a backend is introduced, quote requests need a durable status history, ownership, and audit trail."
      emptyDescription="This preview does not pretend that browser-only inquiry forms have been saved as quote records."
      emptyTitle="Quote records are not connected"
      eyebrow="Quote workflow preview"
      icon={ClipboardList}
      title="Quotes"
    />
  )
}
