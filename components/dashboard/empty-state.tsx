import type { LucideIcon } from 'lucide-react'

export function EmptyState({
  icon: Icon,
  title,
  description,
  detail,
}: {
  icon: LucideIcon
  title: string
  description: string
  detail?: string
}) {
  return (
    <section className="border border-dashed border-slate-300 bg-white px-6 py-14 text-center sm:px-12">
      <div className="mx-auto grid h-11 w-11 place-items-center rounded-full bg-slate-100 text-slate-600">
        <Icon aria-hidden="true" size={20} />
      </div>
      <h2 className="mt-4 font-display text-2xl font-bold text-slate-950">{title}</h2>
      <p className="mx-auto mt-2 max-w-xl text-sm leading-6 text-slate-600">{description}</p>
      {detail ? <p className="mx-auto mt-4 max-w-xl text-xs leading-5 text-slate-500">{detail}</p> : null}
    </section>
  )
}
