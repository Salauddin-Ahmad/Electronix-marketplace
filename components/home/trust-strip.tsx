import { Building2, MessageCircle, PackageSearch, Tags } from 'lucide-react'

const supportItems = [
  {
    icon: MessageCircle,
    title: 'WhatsApp help',
    copy: 'Ask about an item.',
  },
  {
    icon: Tags,
    title: 'Request a quote',
    copy: 'Confirm product pricing.',
  },
  {
    icon: PackageSearch,
    title: 'Delivery support',
    copy: 'Check timing and cost.',
  },
  {
    icon: Building2,
    title: 'Project sourcing',
    copy: 'Share your requirements.',
  },
] as const

export function TrustStrip() {
  return (
    <section className="container-shell" aria-label="How VOLTRONIX helps">
      <div className="grid grid-cols-2 gap-x-3 gap-y-5 rounded-xl border border-slate-200/80 bg-[#eef2f6] px-4 py-5 sm:gap-5 sm:px-6 lg:grid-cols-4 lg:py-5">
        {supportItems.map(({ icon: Icon, title, copy }) => (
          <article key={title} className="flex items-center gap-2.5 sm:gap-3">
            <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-white text-brand-600 sm:size-10">
              <Icon size={19} strokeWidth={1.7} aria-hidden="true" />
            </span>
            <div className="min-w-0">
              <h2 className="text-xs font-bold leading-5 text-slate-900 sm:text-[13px]">{title}</h2>
              <p className="mt-0.5 text-[11px] leading-4 text-slate-600 sm:text-xs">{copy}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
