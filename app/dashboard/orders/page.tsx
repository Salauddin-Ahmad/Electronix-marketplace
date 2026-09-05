import { ShoppingBag } from 'lucide-react'
import { OperationUnavailable } from '@/components/dashboard/operation-unavailable'

export default function DashboardOrdersPage() {
  return (
    <OperationUnavailable
      description="Orders are not created or stored by the current frontend-only quote and cart experience."
      detail="A real order workflow needs server-side price and stock validation, unique order records, and access control."
      emptyDescription="No order records are shown because no order service is connected."
      emptyTitle="Order operations are not connected"
      eyebrow="Order workflow preview"
      icon={ShoppingBag}
      title="Orders"
    />
  )
}
