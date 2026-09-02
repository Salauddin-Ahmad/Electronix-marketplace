'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, CreditCard, LockKeyhole, Package, Truck } from 'lucide-react'
import { useState } from 'react'
import { useCart } from '@/components/cart-provider'
import { formatBDT } from '@/lib/currency'

export default function CheckoutPage() {
  const { items, subtotal } = useCart()
  const [step, setStep] = useState(1)
  const pricedLineCount = items.filter(({ product }) => product.pricing.sellingPrice !== null).length
  const quoteLineCount = items.length - pricedLineCount

  return (
    <div>
      <header className="border-b border-line bg-white">
        <div className="container-shell flex h-20 items-center justify-between">
          <Link href="/" className="font-display text-3xl font-extrabold text-brand-500">VOLTRONIX</Link>
          <div className="inline-flex items-center gap-2 text-sm font-semibold"><LockKeyhole size={16} /> Frontend checkout preview</div>
        </div>
      </header>
      <main className="container-shell py-10">
        <div className="mb-7 border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-950">
          This is a frontend-only order preview. No payment, reservation or order submission is connected.
        </div>
        <div className="grid gap-8 lg:grid-cols-[1.1fr_.7fr]">
          <section>
            <h1 className="font-display text-4xl font-bold">Review Your Request</h1>
            <CheckoutBlock n={1} icon={<Truck />} title="Contact & Delivery Address" active={step >= 1}>
              <div className="grid gap-4 sm:grid-cols-2"><Field label="First Name" /><Field label="Last Name" /><Field label="Company Name (Optional)" full /><Field label="Street Address" full /><Field label="City" /><Field label="Postal Code" /></div>
              <button type="button" disabled={!items.length} onClick={() => setStep(2)} className="mt-5 bg-brand-500 px-5 py-3 font-bold text-white transition hover:bg-brand-600 disabled:cursor-not-allowed disabled:opacity-50">Continue</button>
            </CheckoutBlock>
            <CheckoutBlock n={2} icon={<Package />} title="Delivery Review" active={step >= 2}>
              <div className="flex justify-between border border-brand-500 p-4"><span><b>Delivery quote required</b><small className="block text-sm text-[#6a6f69]">Timing and cost will be confirmed before ordering.</small></span><span className="font-semibold">Pending</span></div>
              <button type="button" disabled={!items.length} onClick={() => setStep(3)} className="mt-3 w-full bg-brand-500 py-3 font-bold text-white transition hover:bg-brand-600 disabled:cursor-not-allowed disabled:opacity-50">Continue to Final Review</button>
            </CheckoutBlock>
            <CheckoutBlock n={3} icon={<CreditCard />} title="Payment" active={step >= 3}>
              <p className="text-sm leading-6 text-[#6c716b]">Online payment is not connected in this frontend prototype. Products without confirmed prices must be quoted first.</p>
              <button type="button" disabled className="mt-5 inline-flex w-full cursor-not-allowed items-center justify-center gap-2 bg-dark py-3.5 font-bold text-white opacity-60">Order submission unavailable <ArrowRight size={17} /></button>
            </CheckoutBlock>
          </section>
          <aside className="h-fit border border-line bg-white p-6">
            <h2 className="font-display text-2xl font-bold">Request Summary</h2>
            <div className="my-5 border-t border-line" />
            {items.length ? items.map(({ product, qty }) => {
              const price = product.pricing.sellingPrice
              const lineTotal = price === null ? null : price * qty
              return (
                <div className="flex gap-3 border-b border-dashed border-line py-3" key={product.id}>
                  <div className="relative h-16 w-16 shrink-0 overflow-hidden bg-panel"><Image src={product.images.primary ?? '/placeholder.svg'} alt={product.name} fill sizes="64px" className="object-contain p-2" /></div>
                  <div className="flex-1 text-sm"><div className="font-semibold">{product.name}</div><div className="text-xs text-[#6d716b]">Qty: {qty}</div></div>
                  <div className="text-sm font-semibold">{lineTotal === null ? 'Request price' : formatBDT(lineTotal)}</div>
                </div>
              )
            }) : <div className="text-sm text-[#666b65]">Your cart is empty.</div>}
            <div className="mt-5 space-y-2 text-sm">
              <div className="flex justify-between"><span>Priced items subtotal</span><span>{pricedLineCount ? formatBDT(subtotal) : 'Request price'}</span></div>
              <div className="flex justify-between"><span>Quote-required lines</span><span>{quoteLineCount}</span></div>
              <div className="flex justify-between"><span>Delivery</span><span>To be confirmed</span></div>
            </div>
            <div className="my-5 border-t border-line" />
            <div className="flex justify-between font-display text-xl font-bold"><span>Current subtotal</span><span>{pricedLineCount ? formatBDT(subtotal) : 'Quote required'}</span></div>
          </aside>
        </div>
      </main>
    </div>
  )
}

function Field({ label, full = false }: { label: string; full?: boolean }) {
  return <label className={full ? 'text-sm font-semibold sm:col-span-2' : 'text-sm font-semibold'}>{label}<input className="mt-1 w-full border border-line px-3 py-3" /></label>
}

function CheckoutBlock({ n, icon, title, children, active }: { n: number; icon: React.ReactNode; title: string; children: React.ReactNode; active: boolean }) {
  return <section className={`mt-7 border border-line bg-white p-6 ${active ? '' : 'opacity-60'}`}><div className="flex items-center gap-3 border-b border-line pb-4"><span className="text-brand-500">{icon}</span><h2 className="font-display text-xl font-bold">{n}. {title}</h2></div><div className="pt-5">{children}</div></section>
}
