import { Warehouse } from 'lucide-react'
import { OperationUnavailable } from '@/components/dashboard/operation-unavailable'

export default function DashboardInventoryPage() {
  return (
    <OperationUnavailable
      description="The current catalog has no verified stock quantities, warehouses, reservations, or inventory ledger."
      detail="Connect a protected inventory service before publishing available quantities, low-stock alerts, or fulfillment promises."
      emptyDescription="This frontend preview intentionally does not infer stock counts from product names or browsing labels."
      emptyTitle="Inventory data is not connected"
      eyebrow="Inventory preview"
      icon={Warehouse}
      title="Inventory"
    />
  )
}
