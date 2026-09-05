export type { CatalogListInput, CatalogService } from '@/lib/services/catalog-service'
export type { CartService } from '@/lib/services/cart-service'
export type { CheckoutService } from '@/lib/services/checkout-service'
export type { DashboardService } from '@/lib/services/dashboard-service'

export { mockCatalogService as catalogService } from '@/lib/services/mock/catalog-service'
export { mockCartService as cartService } from '@/lib/services/mock/cart-service'
export { mockCheckoutService as checkoutService } from '@/lib/services/mock/checkout-service'
export { mockDashboardService as dashboardService } from '@/lib/services/mock/dashboard-service'
