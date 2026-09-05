import type { LucideIcon } from 'lucide-react'
import {
  BarChart3,
  ClipboardList,
  LayoutDashboard,
  Package,
  Settings,
  ShoppingBag,
  Truck,
  Users,
  Warehouse,
} from 'lucide-react'

export type DashboardPermission =
  | 'catalog:read'
  | 'inventory:read'
  | 'orders:read'
  | 'purchases:read'
  | 'suppliers:read'
  | 'customers:read'
  | 'quotes:read'
  | 'reports:read'
  | 'settings:read'

export type DashboardNavigationItem = {
  label: string
  href: string
  icon: LucideIcon
  permission: DashboardPermission
}

export type DashboardNavigationGroup = {
  label: string
  items: DashboardNavigationItem[]
}

export const dashboardNavigation: DashboardNavigationGroup[] = [
  {
    label: 'Workspace',
    items: [
      {
        label: 'Overview',
        href: '/dashboard',
        icon: LayoutDashboard,
        permission: 'reports:read',
      },
    ],
  },
  {
    label: 'Catalog',
    items: [
      {
        label: 'Products',
        href: '/dashboard/products',
        icon: Package,
        permission: 'catalog:read',
      },
      {
        label: 'Inventory',
        href: '/dashboard/inventory',
        icon: Warehouse,
        permission: 'inventory:read',
      },
    ],
  },
  {
    label: 'Operations',
    items: [
      {
        label: 'Orders',
        href: '/dashboard/orders',
        icon: ShoppingBag,
        permission: 'orders:read',
      },
      {
        label: 'Purchases',
        href: '/dashboard/purchases',
        icon: Truck,
        permission: 'purchases:read',
      },
      {
        label: 'Suppliers',
        href: '/dashboard/suppliers',
        icon: Users,
        permission: 'suppliers:read',
      },
      {
        label: 'Customers',
        href: '/dashboard/customers',
        icon: Users,
        permission: 'customers:read',
      },
      {
        label: 'Quotes',
        href: '/dashboard/quotes',
        icon: ClipboardList,
        permission: 'quotes:read',
      },
    ],
  },
  {
    label: 'System',
    items: [
      {
        label: 'Reports',
        href: '/dashboard/reports',
        icon: BarChart3,
        permission: 'reports:read',
      },
      {
        label: 'Settings',
        href: '/dashboard/settings',
        icon: Settings,
        permission: 'settings:read',
      },
    ],
  },
]

export const dashboardNavigationItem = (pathname: string) => {
  const items = dashboardNavigation.flatMap((group) => group.items)

  return items.find((item) => item.href === pathname)
}
