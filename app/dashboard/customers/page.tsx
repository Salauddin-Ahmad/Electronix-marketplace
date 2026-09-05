import { ContactRound } from 'lucide-react'
import { OperationUnavailable } from '@/components/dashboard/operation-unavailable'

export default function DashboardCustomersPage() {
  return (
    <OperationUnavailable
      description="The storefront does not create customer accounts or persist contact records in this frontend-only phase."
      detail="Customer data requires authenticated, privacy-aware backend storage before it can be managed here."
      emptyDescription="No customer records are displayed because no customer service is connected."
      emptyTitle="Customer data is not connected"
      eyebrow="Customer preview"
      icon={ContactRound}
      title="Customers"
    />
  )
}
