'use client'

import Link from 'next/link'
import { X } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { dashboardNavigation } from '@/lib/dashboard/navigation'

export function DashboardSidebar({ open, onClose }: { open: boolean; onClose: () => void }) {
  const pathname = usePathname()

  return (
    <>
      <button
        aria-label="Close dashboard navigation"
        className={`fixed inset-0 z-40 bg-slate-950/40 transition-opacity lg:hidden ${
          open ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
        onClick={onClose}
        tabIndex={open ? 0 : -1}
        type="button"
      />
      <aside
        aria-label="Dashboard navigation"
        id="dashboard-navigation"
        className={`fixed inset-y-0 left-0 z-50 flex w-72 flex-col border-r border-slate-800 bg-[#101926] text-slate-100 shadow-2xl transition-transform duration-200 lg:translate-x-0 lg:shadow-none ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex min-h-16 items-center justify-between border-b border-white/10 px-5">
          <Link href="/dashboard" className="focus-ring group" onClick={onClose}>
            <span className="font-display text-2xl font-bold tracking-[0.08em] text-white">VOLTRONIX</span>
            <span className="mt-0.5 block text-[10px] font-semibold uppercase tracking-[0.16em] text-blue-200">
              Operations preview
            </span>
          </Link>
          <button
            aria-label="Close dashboard navigation"
            className="icon-btn rounded-sm text-slate-300 hover:bg-white/10 hover:text-white lg:hidden"
            onClick={onClose}
            type="button"
          >
            <X aria-hidden="true" size={18} />
          </button>
        </div>

        <nav className="scrollbar-none flex-1 overflow-y-auto px-3 py-5">
          {dashboardNavigation.map((group) => (
            <div key={group.label} className="mb-6 last:mb-0">
              <p className="px-3 text-[10px] font-bold uppercase tracking-[0.16em] text-slate-500">
                {group.label}
              </p>
              <div className="mt-2 space-y-1">
                {group.items.map((item) => {
                  const Icon = item.icon
                  const active = pathname === item.href

                  return (
                    <Link
                      key={item.href}
                      aria-current={active ? 'page' : undefined}
                      className={`focus-ring flex items-center gap-3 rounded-sm px-3 py-2.5 text-sm font-medium transition-colors ${
                        active
                          ? 'bg-blue-500/15 text-white ring-1 ring-inset ring-blue-300/20'
                          : 'text-slate-300 hover:bg-white/5 hover:text-white'
                      }`}
                      href={item.href}
                      onClick={onClose}
                    >
                      <Icon aria-hidden="true" size={17} className={active ? 'text-blue-300' : 'text-slate-400'} />
                      <span>{item.label}</span>
                    </Link>
                  )
                })}
              </div>
            </div>
          ))}
        </nav>

        <div className="border-t border-white/10 p-4 text-xs leading-5 text-slate-400">
          No authentication, operational storage, or live integrations are connected in this frontend preview.
        </div>
      </aside>
    </>
  )
}
