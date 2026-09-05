import Link from 'next/link'
import { ArrowRight, MessageCircle, UserRound } from 'lucide-react'
import { SiteFooter } from '@/components/site-footer'
import { SiteHeader } from '@/components/site-header'
import { buildGeneralWhatsAppUrl } from '@/lib/whatsapp'

export default function AccountPage() {
  return (
    <div>
      <SiteHeader />
      <main className="container-shell py-12 sm:py-16">
        <div className="mx-auto max-w-2xl border border-line bg-white p-6 sm:p-8">
          <UserRound size={28} className="text-brand-500" aria-hidden="true" />
          <div className="mt-4 technical-label text-brand-500">Customer account</div>
          <h1 className="mt-2 font-display text-3xl font-bold sm:text-4xl">Account features are not connected yet.</h1>
          <p className="mt-4 max-w-xl leading-7 text-[#646963]">
            VOLTRONIX is currently a quote-first storefront. Orders, saved products and request history are not stored in a customer account at this stage.
          </p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <Link href="/search" className="inline-flex items-center justify-center gap-2 bg-brand-500 px-5 py-3 font-bold text-white transition hover:bg-brand-600">
              Browse products <ArrowRight size={17} aria-hidden="true" />
            </Link>
            <a href={buildGeneralWhatsAppUrl()} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 border border-line px-5 py-3 font-bold text-slate-800 transition hover:border-brand-500 hover:text-brand-600">
              <MessageCircle size={18} className="text-[#25D366]" aria-hidden="true" />
              Get help on WhatsApp
            </a>
          </div>
          <p className="mt-6 border-t border-line pt-5 text-sm leading-6 text-[#666b65]">
            For a product, project or bulk quotation, send a WhatsApp request. The team can confirm availability, current price and estimated delivery time before you decide.
          </p>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
