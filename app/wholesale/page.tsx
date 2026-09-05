import Link from 'next/link'
import { ArrowRight, FileText, MessageCircle } from 'lucide-react'
import { SiteFooter } from '@/components/site-footer'
import { SiteHeader } from '@/components/site-header'
import { buildWholesaleWhatsAppUrl } from '@/lib/whatsapp'

export default function WholesalePage() {
  return (
    <div>
      <SiteHeader />
      <main className="container-shell py-12 sm:py-16">
        <div className="max-w-3xl">
          <div className="technical-label text-brand-500">Wholesale & Bulk</div>
          <h1 className="mt-3 font-display text-4xl font-extrabold sm:text-5xl">Better buying for bigger orders.</h1>
          <p className="mt-4 text-lg text-[#646963]">
            Send your product list and required quantities for a tailored quotation. Quantity-based rates are confirmed after availability and item details are reviewed.
          </p>
        </div>

        <section className="mt-10 grid gap-5 lg:grid-cols-[1fr_.8fr]">
          <div className="border border-line bg-white p-6 sm:p-7">
            <h2 className="font-display text-2xl font-bold">Request a bulk quotation</h2>
            <p className="mt-3 max-w-xl text-sm leading-6 text-[#626862]">
              WhatsApp opens with a structured draft for products, quantities and delivery area. Review it, attach your list if needed, then send when ready.
            </p>
            <a href={buildWholesaleWhatsAppUrl()} target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex items-center gap-2 bg-[#25D366] px-5 py-3 font-bold text-[#0b2e18] transition hover:bg-[#20bd5a]">
              <MessageCircle size={18} aria-hidden="true" />
              Start WhatsApp quotation
              <ArrowRight size={17} aria-hidden="true" />
            </a>
            <p className="mt-4 text-xs leading-5 text-[#666b65]">This starts a quotation request only. It does not confirm pricing, reserve stock or place an order.</p>
          </div>

          <aside className="border border-line bg-panel p-6 sm:p-7">
            <FileText size={24} className="text-brand-500" aria-hidden="true" />
            <h2 className="mt-4 font-display text-xl font-bold">What to include</h2>
            <ul className="mt-4 space-y-3 text-sm leading-6 text-[#5d645d]">
              <li>Product names, SKUs or links</li>
              <li>Required quantity for each item</li>
              <li>Delivery district or project location</li>
              <li>BOQ, BOM or product list as a WhatsApp attachment</li>
            </ul>
          </aside>
        </section>

        <div className="mt-7 flex flex-wrap items-center gap-4 text-sm">
          <Link href="/search" className="inline-flex items-center gap-2 font-bold text-brand-600 transition hover:text-brand-700">Browse the catalogue <ArrowRight size={16} aria-hidden="true" /></Link>
          <Link href="/solutions" className="font-semibold text-slate-600 transition hover:text-brand-600">Need a project supply quotation instead?</Link>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
