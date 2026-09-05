import { Building2 } from 'lucide-react'
import { OperationUnavailable } from '@/components/dashboard/operation-unavailable'

export default function DashboardSuppliersPage() {
  return (
    <OperationUnavailable
      description="Supplier names and supplier records have not been supplied for the mock product catalog."
      detail="Supplier contacts, pricing, and procurement history should live behind a protected backend rather than in browser state."
      emptyDescription="No supplier records are rendered until an approved source of truth is connected."
      emptyTitle="Supplier management is not connected"
      eyebrow="Supplier preview"
      icon={Building2}
      title="Suppliers"
    />
  )
}
