'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'

type RecentProduct = {
  id: string
  slug: string
  name: string
  subcategory: string
  image: string
}

type StoredRecentProducts = {
  version: 1
  items: RecentProduct[]
}

const STORAGE_KEY = 'voltronix-recent-products'
const MAX_STORED = 6
const MAX_VISIBLE = 4

function readStoredProducts() {
  try {
    const rawValue = window.localStorage.getItem(STORAGE_KEY)
    if (!rawValue) return []
    const parsed = JSON.parse(rawValue) as Partial<StoredRecentProducts>
    if (parsed.version !== 1 || !Array.isArray(parsed.items)) return []

    return parsed.items.filter((item): item is RecentProduct => (
      typeof item?.id === 'string'
      && typeof item.slug === 'string'
      && typeof item.name === 'string'
      && typeof item.subcategory === 'string'
      && typeof item.image === 'string'
    )).slice(0, MAX_STORED)
  } catch {
    return []
  }
}

export function RecentlyViewedProducts({ current }: { current: RecentProduct }) {
  const [recentProducts, setRecentProducts] = useState<RecentProduct[]>([])
  const { id, slug, name, subcategory, image } = current

  useEffect(() => {
    const storedProducts = readStoredProducts()
    setRecentProducts(storedProducts.filter((item) => item.id !== id).slice(0, MAX_VISIBLE))

    const nextProducts = [
      { id, slug, name, subcategory, image },
      ...storedProducts.filter((item) => item.id !== id),
    ].slice(0, MAX_STORED)

    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ version: 1, items: nextProducts }))
    } catch {
      // Browsing still works when storage is unavailable.
    }
  }, [id, image, name, slug, subcategory])

  if (!recentProducts.length) return null

  return (
    <section className="mt-14" aria-labelledby="recently-viewed-heading">
      <div className="flex items-end justify-between gap-4">
        <div>
          <div className="eyebrow">Continue browsing</div>
          <h2 id="recently-viewed-heading" className="font-display mt-1 text-3xl font-bold">Recently viewed</h2>
        </div>
        <Link href="/search" className="text-sm font-bold text-brand-600 hover:underline">View catalogue</Link>
      </div>
      <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {recentProducts.map((product) => (
          <Link key={product.id} href={`/product/${product.slug}`} className="group flex items-center gap-3 border border-slate-200 bg-white p-3 transition hover:border-brand-500 hover:shadow-sm">
            <span className="relative size-20 shrink-0 overflow-hidden bg-[#f1f2ef]">
              <Image src={product.image} alt="" fill sizes="80px" className="object-contain p-2" />
            </span>
            <span className="min-w-0">
              <span className="block text-[10px] font-bold uppercase tracking-wide text-brand-600">{product.subcategory}</span>
              <span className="mt-1 block line-clamp-2 text-sm font-bold text-slate-900 group-hover:text-brand-600">{product.name}</span>
            </span>
          </Link>
        ))}
      </div>
    </section>
  )
}
