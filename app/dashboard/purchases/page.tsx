import { Truck } from 'lucide-react'
import { OperationUnavailable } from '@/components/dashboard/operation-unavailable'

export default function DashboardPurchasesPage() {
  return (
    <OperationUnavailable
      description="Purchase orders, goods receipts, and supplier costs are not present in the frontend catalog."
      detail="Introduce a backend purchase workflow before recording supplier commitments, receiving stock, or changing costs."
      emptyDescription="This page provides the future route and layout boundary without displaying invented procurement activity."
      emptyTitle="Purchase data is not connected"
      eyebrow="Procurement preview"
      icon={Truck}
      title="Purchases"
    />
  )
}
