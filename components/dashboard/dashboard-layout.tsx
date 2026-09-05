'use client'

import { useState, type ReactNode } from 'react'
import { DashboardSidebar } from './dashboard-sidebar'
import { DashboardTopbar } from './dashboard-topbar'

export function DashboardLayout({ children }: { children: ReactNode }) {
  const [navigationOpen, setNavigationOpen] = useState(false)

  return (
    <div className="min-h-screen bg-slate-100 text-slate-950">
      <DashboardSidebar open={navigationOpen} onClose={() => setNavigationOpen(false)} />
      <div className="min-h-screen lg:pl-72">
        <DashboardTopbar
          navigationOpen={navigationOpen}
          onMenuClick={() => setNavigationOpen(true)}
        />
        <main className="mx-auto w-full max-w-[1600px] px-4 py-6 sm:px-6 lg:px-8 lg:py-8">{children}</main>
      </div>
    </div>
  )
}
