'use client'

import Link from 'next/link'
import { Menu, Store } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { dashboardNavigationItem } from '@/lib/dashboard/navigation'

export function DashboardTopbar({
  navigationOpen,
  onMenuClick,
}: {
  navigationOpen: boolean
  onMenuClick: () => void
}) {
  const pathname = usePathname()
  const currentItem = dashboardNavigationItem(pathname)

  return (
    <header className="sticky top-0 z-30 flex min-h-16 items-center justify-between border-b border-slate-200 bg-white/95 px-4 backdrop-blur sm:px-6 lg:px-8">
      <div className="flex min-w-0 items-center gap-3">
        <button
          aria-controls="dashboard-navigation"
          aria-expanded={navigationOpen}
          aria-label="Open dashboard navigation"
          className="icon-btn rounded-sm border border-slate-200 bg-white lg:hidden"
          onClick={onMenuClick}
          type="button"
        >
          <Menu aria-hidden="true" size={19} />
        </button>
        <div className="min-w-0">
          <p className="truncate text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">Dashboard</p>
          <p className="truncate font-display text-xl font-bold text-slate-950">{currentItem?.label ?? 'Operations'}</p>
        </div>
      </div>
      <Link
        className="focus-ring inline-flex shrink-0 items-center gap-2 rounded-sm border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-700 transition-colors hover:border-blue-200 hover:bg-blue-50 hover:text-blue-800"
        href="/"
      >
        <Store aria-hidden="true" size={15} />
        <span className="hidden sm:inline">View storefront</span>
      </Link>
    </header>
  )
}
