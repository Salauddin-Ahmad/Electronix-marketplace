import type { PageRequest } from '@/lib/contracts/common'
import type { DashboardOverview, ProductReadinessPage } from '@/lib/contracts/dashboard'

/**
 * Dashboard data boundary. Mock data exposes catalogue completeness only and
 * never fabricates revenue, orders, customers, or inventory quantities.
 */
export interface DashboardService {
  getOverview(): Promise<DashboardOverview>
  listProductReadiness(input?: PageRequest): Promise<ProductReadinessPage>
}
