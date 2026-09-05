'use client'

import Image from 'next/image'
import Link from 'next/link'
import { LockKeyhole, MessageCircle, Truck } from 'lucide-react'
import { useState } from 'react'
import { useCart } from '@/components/cart-provider'
import { SiteFooter } from '@/components/site-footer'
import { formatBDT } from '@/lib/currency'
import { buildQuoteReviewWhatsAppUrl } from '@/lib/whatsapp'

type QuoteRequestDetails = {
  name: string
  phone: string
  location: string
  notes: string
}

const initialDetails: QuoteRequestDetails = {
  name: '',
  phone: '',
  location: '',
  notes: '',
}

export default function CheckoutPage() {
  const { items, subtotal, isHydrated } = useCart()
  const [details, setDetails] = useState<QuoteRequestDetails>(initialDetails)
  const [isOpeningWhatsApp, setIsOpeningWhatsApp] = useState(false)
  const pricedLineCount = items.filter(({ product }) => product.pricing.sellingPrice !== null).length
  const quoteLineCount = items.length - pricedLineCount

  function updateDetail(field: keyof QuoteRequestDetails, value: string) {
    setDetails((current) => ({ ...current, [field]: value }))
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const formElement = event.currentTarget
    if (!formElement.reportValidity() || !items.length) return

    setIsOpeningWhatsApp(true)
    window.open(buildQuoteReviewWhatsAppUrl(items, details), '_blank', 'noopener,noreferrer')
    window.setTimeout(() => setIsOpeningWhatsApp(false), 700)
  }

  return (
    <div>
      <header className="border-b border-line bg-white">
        <div className="container-shell flex h-20 items-center justify-between">
          <Link href="/" className="font-display text-3xl font-extrabold text-brand-500">VOLTRONIX</Link>
          <div className="inline-flex items-center gap-2 text-xs font-semibold sm:text-sm"><LockKeyhole size={16} /> Quote review · no payment</div>
        </div>
      </header>
      <main className="container-shell py-10">
        <div className="mb-7 border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-950">
          This is a quote review. No payment, stock reservation or order submission is connected; WhatsApp opens a draft that you review and send yourself.
        </div>
        <div className="grid gap-8 lg:grid-cols-[1.1fr_.7fr]">
          <section>
            <h1 className="font-display text-4xl font-bold">Prepare Your Quote Request</h1>
            <form onSubmit={handleSubmit} className="mt-7 border border-line bg-white p-6">
              <div className="flex items-center gap-3 border-b border-line pb-4">
                <span className="text-brand-500"><Truck aria-hidden="true" /></span>
                <h2 className="font-display text-xl font-bold">Contact details for this request</h2>
              </div>
              <p className="pt-5 text-sm leading-6 text-[#626862]">These details are only added to the WhatsApp draft. They are not stored on this website.</p>
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <Field label="Your name" value={details.name} onChange={(value) => updateDetail('name', value)} autoComplete="name" required />
                <Field label="Phone number" value={details.phone} onChange={(value) => updateDetail('phone', value)} type="tel" inputMode="tel" autoComplete="tel" required />
                <Field label="Delivery area / district" value={details.location} onChange={(value) => updateDetail('location', value)} autoComplete="address-level2" full required />
                <label className="text-sm font-semibold sm:col-span-2">
                  Additional notes (optional)
                  <textarea value={details.notes} onChange={(event) => updateDetail('notes', event.target.value)} className="mt-1 min-h-24 w-full border border-line px-3 py-3" placeholder="Preferred delivery timing, company name or other request details." />
                </label>
              </div>
              <button type="submit" disabled={!isHydrated || !items.length || isOpeningWhatsApp} className="mt-5 inline-flex w-full items-center justify-center gap-2 bg-[#25D366] py-3.5 font-bold text-[#0b2e18] transition hover:bg-[#20bd5a] disabled:cursor-not-allowed disabled:opacity-50">
                <MessageCircle size={18} aria-hidden="true" />
                {isOpeningWhatsApp ? 'Opening WhatsApp…' : 'Send quote request on WhatsApp'}
              </button>
              <p className="mt-3 text-center text-xs leading-5 text-[#666b65]" aria-live="polite">A quote request is sent only after you review and send the WhatsApp draft.</p>
            </form>
          </section>
          <aside className="h-fit border border-line bg-white p-6">
            <h2 className="font-display text-2xl font-bold">Request Summary</h2>
            <div className="my-5 border-t border-line" />
            {!isHydrated ? <div className="text-sm text-[#666b65]" role="status">Restoring your quote list…</div> : items.length ? items.map(({ product, qty }) => {
              const price = product.pricing.sellingPrice
              const lineTotal = price === null ? null : price * qty
              return (
                <div className="flex gap-3 border-b border-dashed border-line py-3" key={product.id}>
                  <div className="relative h-16 w-16 shrink-0 overflow-hidden bg-panel"><Image src={product.images.primary ?? '/placeholder.svg'} alt={product.name} fill sizes="64px" className="object-contain p-2" /></div>
                  <div className="flex-1 text-sm"><div className="font-semibold">{product.name}</div><div className="text-xs text-[#6d716b]">Qty: {qty}</div></div>
                  <div className="text-sm font-semibold">{lineTotal === null ? 'Request price' : formatBDT(lineTotal)}</div>
                </div>
              )
            }) : <div className="text-sm text-[#666b65]">Your quote list is empty. <Link href="/search" className="font-semibold text-brand-600 hover:text-brand-700">Browse products</Link>.</div>}
            <div className="mt-5 space-y-2 text-sm">
              <div className="flex justify-between"><span>Priced items subtotal</span><span>{!isHydrated ? 'Loading…' : pricedLineCount ? formatBDT(subtotal) : 'Request price'}</span></div>
              <div className="flex justify-between"><span>Quote-required lines</span><span>{isHydrated ? quoteLineCount : '—'}</span></div>
              <div className="flex justify-between"><span>Delivery</span><span>To be confirmed</span></div>
            </div>
            <div className="my-5 border-t border-line" />
            <div className="flex justify-between font-display text-xl font-bold"><span>Shown subtotal</span><span>{!isHydrated ? 'Loading…' : pricedLineCount ? formatBDT(subtotal) : 'Quote required'}</span></div>
          </aside>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}

function Field({ label, value, onChange, full = false, type = 'text', required = false, autoComplete, inputMode }: {
  label: string
  value: string
  onChange: (value: string) => void
  full?: boolean
  type?: React.HTMLInputTypeAttribute
  required?: boolean
  autoComplete?: string
  inputMode?: React.HTMLAttributes<HTMLInputElement>['inputMode']
}) {
  return (
    <label className={full ? 'text-sm font-semibold sm:col-span-2' : 'text-sm font-semibold'}>
      {label}
      <input type={type} value={value} onChange={(event) => onChange(event.target.value)} autoComplete={autoComplete} inputMode={inputMode} required={required} className="mt-1 w-full border border-line px-3 py-3" />
    </label>
  )
}
