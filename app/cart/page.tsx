'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, LockKeyhole, MessageCircle, Minus, Plus, Trash2 } from 'lucide-react'
import { useCart } from '@/components/cart-provider'
import { SiteFooter } from '@/components/site-footer'
import { formatBDT } from '@/lib/currency'
import { buildCartWhatsAppUrl } from '@/lib/whatsapp'

export default function CartPage() {
  const { items, subtotal, setQty, remove, isHydrated } = useCart()
  const pricedLineCount = items.filter(({ product }) => product.pricing.sellingPrice !== null).length
  const quoteLineCount = items.length - pricedLineCount
  const whatsAppUrl = isHydrated && items.length ? buildCartWhatsAppUrl(items) : undefined

  return (
    <div>
      <header className="border-b border-line bg-white">
        <div className="container-shell flex h-20 items-center justify-between">
          <Link href="/" className="font-display text-3xl font-extrabold text-brand-500">VOLTRONIX</Link>
          <div className="inline-flex items-center gap-2 text-xs font-semibold sm:text-sm"><LockKeyhole size={16} /> Frontend quote cart</div>
        </div>
      </header>
      <main className="container-shell py-10">
        <div className="grid gap-8 lg:grid-cols-[1.15fr_.65fr]">
          <section>
            <h1 className="font-display text-4xl font-bold">Your Cart</h1>
            {!isHydrated ? (
              <div className="mt-8 border border-line bg-white p-10 text-center" role="status">
                <p className="text-sm font-semibold text-slate-600">Restoring your cart…</p>
              </div>
            ) : !items.length ? (
              <div className="mt-8 border border-line bg-white p-10 text-center">
                <h2 className="font-display text-2xl font-bold">Your cart is empty</h2>
                <p className="mt-2 text-sm text-[#666b65]">Browse products and add what you need.</p>
                <Link href="/search" className="mt-5 inline-flex bg-brand-500 px-5 py-3 font-bold text-white transition hover:bg-brand-600">Continue shopping</Link>
              </div>
            ) : (
              <div className="mt-7 space-y-3">
                {items.map(({ product, qty }) => {
                  const price = product.pricing.sellingPrice
                  const lineTotal = price === null ? null : price * qty
                  return (
                    <div key={product.id} className="grid grid-cols-[76px_minmax(0,1fr)] gap-3 border border-line bg-white p-4 sm:grid-cols-[92px_minmax(0,1fr)_auto] sm:items-center sm:gap-4">
                      <div className="relative h-20 overflow-hidden border border-line bg-panel">
                        <Image src={product.images.primary ?? '/placeholder.svg'} alt={product.name} fill sizes="92px" className="object-contain p-2" />
                      </div>
                      <div className="min-w-0">
                        {product.brand && <div className="technical-label text-brand-500">{product.brand}</div>}
                        <Link href={`/product/${product.slug}`} className="font-display block text-lg font-bold leading-5 hover:text-brand-600">{product.name}</Link>
                        <div className="mt-1 text-xs text-[#666b65]">SKU: {product.sku}</div>
                        <div className="mt-3 flex items-center gap-2">
                          <button type="button" onClick={() => setQty(product.id, qty - 1)} disabled={qty === 1} className="grid h-8 w-8 place-items-center border border-line transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:text-slate-300" aria-label={`Decrease ${product.name} quantity`}><Minus size={14} /></button>
                          <span className="w-8 text-center font-semibold tabular-nums">{qty}</span>
                          <button type="button" onClick={() => setQty(product.id, qty + 1)} disabled={qty === 99} className="grid h-8 w-8 place-items-center border border-line transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:text-slate-300" aria-label={`Increase ${product.name} quantity`}><Plus size={14} /></button>
                        </div>
                      </div>
                      <div className="col-span-2 flex items-center justify-between gap-4 border-t border-line pt-3 text-left sm:col-span-1 sm:block sm:border-0 sm:pt-0 sm:text-right">
                        <div className="text-lg font-bold">{lineTotal === null ? 'Request price' : formatBDT(lineTotal)}</div>
                        <button type="button" onClick={() => remove(product.id)} className="inline-flex items-center gap-1 text-xs text-[#686d67] transition hover:text-red-700 sm:mt-3"><Trash2 size={14} /> Remove</button>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </section>
          <aside className="h-fit border border-line bg-white p-6">
            <h2 className="font-display text-2xl font-bold">Cart Summary</h2>
            <div className="my-5 border-t border-line" />
            <div className="space-y-3 text-sm">
              <div className="flex justify-between gap-3"><span>Priced items subtotal</span><span>{!isHydrated ? 'Loading…' : pricedLineCount ? formatBDT(subtotal) : 'Request price'}</span></div>
              <div className="flex justify-between gap-3"><span>Quote-required lines</span><span>{isHydrated ? quoteLineCount : '—'}</span></div>
              <div className="flex justify-between"><span>Delivery</span><span>To be confirmed</span></div>
            </div>
            <div className="my-5 border-t border-line" />
            <div className="flex justify-between gap-3 font-display text-xl font-bold"><span>Current subtotal</span><span>{!isHydrated ? 'Loading…' : pricedLineCount ? formatBDT(subtotal) : 'Quote required'}</span></div>
            <a
              href={whatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-disabled={!whatsAppUrl}
              className={`mt-5 inline-flex w-full items-center justify-center gap-2 bg-[#25D366] px-4 py-3.5 text-center font-bold text-[#0b2e18] transition hover:bg-[#20bd5a] focus:outline-none focus:ring-2 focus:ring-[#128c4a] focus:ring-offset-2 ${!whatsAppUrl ? 'pointer-events-none opacity-50' : ''}`}
            >
              <MessageCircle size={18} aria-hidden="true" /> Send quote request on WhatsApp
            </a>
            <Link href="/checkout" className={`mt-3 inline-flex w-full items-center justify-center gap-2 border border-slate-300 px-4 py-3 text-center font-bold text-slate-700 transition hover:border-brand-500 hover:text-brand-600 ${!isHydrated || !items.length ? 'pointer-events-none opacity-50' : ''}`}>Review frontend checkout <ArrowRight size={18} /></Link>
            <div className="mt-5 border border-line bg-panel p-4 text-xs leading-5"><b>Quotation preview only.</b><br />WhatsApp opens a pre-filled request. It does not place an order, reserve stock or submit payment.</div>
          </aside>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
