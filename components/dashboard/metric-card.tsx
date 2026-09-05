import type { ReactNode } from 'react'

type MetricTone = 'neutral' | 'attention' | 'ready'

const toneClasses: Record<MetricTone, string> = {
  neutral: 'border-slate-200 bg-white',
  attention: 'border-amber-200 bg-amber-50/60',
  ready: 'border-blue-200 bg-blue-50/60',
}

export function MetricCard({
  label,
  value,
  description,
  tone = 'neutral',
}: {
  label: string
  value: ReactNode
  description: string
  tone?: MetricTone
}) {
  return (
    <article className={`border p-5 shadow-[0_1px_1px_rgba(15,23,42,0.03)] ${toneClasses[tone]}`}>
      <p className="text-sm font-medium text-slate-600">{label}</p>
      <p className="mt-2 font-display text-4xl font-bold leading-none text-slate-950">{value}</p>
      <p className="mt-3 text-xs leading-5 text-slate-600">{description}</p>
    </article>
  )
}
