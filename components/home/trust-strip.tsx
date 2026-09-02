import { Building2, MessageCircle, PackageSearch, Tags } from 'lucide-react'

const supportItems = [
  {
    icon: MessageCircle,
    title: 'WhatsApp product help',
    copy: 'Ask about a specific item with its SKU already included.',
  },
  {
    icon: Tags,
    title: 'Quote-first pricing',
    copy: 'Unlisted prices are confirmed before any purchase decision.',
  },
  {
    icon: PackageSearch,
    title: 'Delivery coordination',
    copy: 'Timing and delivery cost are confirmed for your location.',
  },
  {
    icon: Building2,
    title: 'Project sourcing',
    copy: 'Share bulk, BOQ or building requirements for review.',
  },
] as const

export function TrustStrip() {
  return (
    <section className="border-b border-slate-200 bg-white" aria-label="How VOLTRONIX helps">
      <div className="container-shell grid divide-y divide-slate-200 sm:grid-cols-2 sm:divide-x sm:divide-y-0 lg:grid-cols-4">
        {supportItems.map(({ icon: Icon, title, copy }) => (
          <article key={title} className="flex gap-3 px-4 py-5 first:pl-0 last:pr-0 sm:px-5">
            <span className="grid size-9 shrink-0 place-items-center bg-blue-50 text-brand-600">
              <Icon size={18} aria-hidden="true" />
            </span>
            <div>
              <h2 className="text-sm font-bold text-slate-950">{title}</h2>
              <p className="mt-1 text-xs leading-5 text-slate-500">{copy}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
