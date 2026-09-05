import type { ReactNode } from 'react'

type StatusBadgeTone = 'neutral' | 'info' | 'success' | 'warning'

const toneClasses: Record<StatusBadgeTone, string> = {
  neutral: 'border-slate-200 bg-slate-100 text-slate-700',
  info: 'border-blue-200 bg-blue-50 text-blue-800',
  success: 'border-emerald-200 bg-emerald-50 text-emerald-800',
  warning: 'border-amber-200 bg-amber-50 text-amber-900',
}

export function StatusBadge({
  children,
  tone = 'neutral',
}: {
  children: ReactNode
  tone?: StatusBadgeTone
}) {
  return (
    <span
      className={`inline-flex items-center rounded-sm border px-2 py-1 text-[11px] font-semibold leading-none ${toneClasses[tone]}`}
    >
      {children}
    </span>
  )
}
