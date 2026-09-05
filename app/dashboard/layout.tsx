import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import { DashboardLayout } from '@/components/dashboard/dashboard-layout'

export const metadata: Metadata = {
  title: 'Operations dashboard preview',
  description: 'A frontend-only operations dashboard preview for the VOLTRONIX catalog.',
  robots: {
    index: false,
    follow: false,
  },
}

export default function DashboardRouteLayout({ children }: { children: ReactNode }) {
  return <DashboardLayout>{children}</DashboardLayout>
}
