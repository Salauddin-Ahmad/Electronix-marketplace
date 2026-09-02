'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, LockKeyhole, Minus, Plus, Trash2 } from 'lucide-react'
import { useCart } from '@/components/cart-provider'
import { SiteFooter } from '@/components/site-footer'
import { formatBDT } from '@/lib/currency'

export default function CartPage() {
  const { items, subtotal, setQty, remove } = useCart()
  const pricedLineCount = items.filter(({ product }) => product.pricing.sellingPrice !== null).length
  const quoteLineCount = items.length - pricedLineCount

  return (
    <div>
      <header className="border-b border-line bg-white">
        <div className="container-shell flex h-20 items-center justify-between">
          <Link href="/" className="font-display text-3xl font-extrabold text-brand-500">VOLTRONIX</Link>
          <div className="inline-flex items-center gap-2 text-sm font-semibold"><LockKeyhole size={16} /> Frontend order preview</div>
        </div>
      </header>
      <main className="container-shell py-10">
        <div className="grid gap-8 lg:grid-cols-[1.15fr_.65fr]">
          <section>
            <h1 className="font-display text-4xl font-bold">Your Cart</h1>
            {!items.length ? (
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
                    <div key={product.id} className="grid grid-cols-[92px_1fr_auto] items-center gap-4 border border-line bg-white p-4">
                      <div className="relative h-20 overflow-hidden border border-line bg-panel">
                        <Image src={product.images.primary ?? '/placeholder.svg'} alt={product.name} fill sizes="92px" className="object-contain p-2" />
                      </div>
                      <div>
                        {product.brand && <div className="technical-label text-brand-500">{product.brand}</div>}
                        <Link href={`/product/${product.slug}`} className="font-display text-lg font-bold hover:text-brand-600">{product.name}</Link>
                        <div className="mt-1 text-xs text-[#666b65]">SKU: {product.sku}</div>
                        <div className="mt-3 flex items-center gap-2">
                          <button type="button" onClick={() => setQty(product.id, qty - 1)} className="grid h-8 w-8 place-items-center border border-line" aria-label={`Decrease ${product.name} quantity`}><Minus size={14} /></button>
                          <span className="w-8 text-center">{qty}</span>
                          <button type="button" onClick={() => setQty(product.id, qty + 1)} className="grid h-8 w-8 place-items-center border border-line" aria-label={`Increase ${product.name} quantity`}><Plus size={14} /></button>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold">{lineTotal === null ? 'Request price' : formatBDT(lineTotal)}</div>
                        <button type="button" onClick={() => remove(product.id)} className="mt-3 inline-flex items-center gap-1 text-xs text-[#686d67]"><Trash2 size={14} /> Remove</button>
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
              <div className="flex justify-between"><span>Priced items subtotal</span><span>{pricedLineCount ? formatBDT(subtotal) : 'Request price'}</span></div>
              <div className="flex justify-between"><span>Quote-required lines</span><span>{quoteLineCount}</span></div>
              <div className="flex justify-between"><span>Delivery</span><span>To be confirmed</span></div>
            </div>
            <div className="my-5 border-t border-line" />
            <div className="flex justify-between font-display text-xl font-bold"><span>Current subtotal</span><span>{pricedLineCount ? formatBDT(subtotal) : 'Quote required'}</span></div>
            <Link href="/checkout" className={`mt-5 inline-flex w-full items-center justify-center gap-2 bg-brand-500 py-3.5 font-bold text-white transition hover:bg-brand-600 ${!items.length ? 'pointer-events-none opacity-50' : ''}`}>{quoteLineCount && !pricedLineCount ? 'Review Quote Request' : 'Review Checkout'} <ArrowRight size={18} /></Link>
            <div className="mt-5 border border-line bg-panel p-4 text-xs leading-5"><b>Frontend preview only.</b><br />No order or payment is submitted. Missing prices and delivery costs require confirmation.</div>
          </aside>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
