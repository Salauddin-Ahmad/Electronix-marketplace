import { ArrowRight, BadgeDollarSign, Building2 } from 'lucide-react'
import Link from 'next/link'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { Showcase } from '@/components/showcase'
import { navigationCategories, priorityProducts, products, trendingProducts } from '@/lib/data'
import { Hero } from '@/components/home/hero'
import { TrustStrip } from '@/components/home/trust-strip'
import { ElectricButton } from '@/components/ui/electric-button'

export default function HomePage() {
  const popularProducts = priorityProducts.slice(0, 8)
  const popularIds = new Set(popularProducts.map((product) => product.id))
  const secondaryIds = new Set<string>()
  const trendingSelection = [...trendingProducts, ...products]
    .filter((product) => {
      if (popularIds.has(product.id) || secondaryIds.has(product.id)) return false
      secondaryIds.add(product.id)
      return true
    })
    .slice(0, 8)

  return (
    <div className="min-h-screen bg-[#f8f8f6]">
      <SiteHeader />
      <main id="main-content">
        <Hero />
        <TrustStrip />
        <section className="container-shell py-12">
          <h2 className="text-center font-display text-4xl font-bold text-slate-950 sm:text-[2.75rem]">
            Shop by Category
          </h2>
          <div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {navigationCategories.slice(0, 9).map((category) => (
              <Link key={category.slug} href={`/category/${category.slug}`} className="group flex items-center justify-between border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-800 transition hover:border-brand-500 hover:text-brand-600 hover:shadow-sm">
                {category.name}<ArrowRight size={15} className="text-slate-300 transition group-hover:translate-x-0.5 group-hover:text-brand-500" aria-hidden="true" />
              </Link>
            ))}
          </div>
          <Showcase title="Most Popular" items={popularProducts} />
          <Showcase title="Trending Now" items={trendingSelection} />
          <section className="mt-12 grid gap-4 border-t border-slate-200 pt-8 lg:grid-cols-2" aria-label="Project and pricing support">
            <article className="flex flex-col justify-between gap-5 border border-slate-200 bg-white p-6 sm:flex-row sm:items-center">
              <div className="flex gap-4">
                <div className="grid size-11 shrink-0 place-items-center bg-blue-50 text-brand-600"><BadgeDollarSign size={22} aria-hidden="true" /></div>
                <div><h2 className="font-display text-2xl font-bold text-slate-950">Found a better price?</h2><p className="mt-1 max-w-md text-sm leading-6 text-slate-600">Send the product and advertised price for a straightforward review.</p></div>
              </div>
              <ElectricButton href="/price-challenge" className="inline-flex shrink-0 items-center gap-2 px-1 py-1 text-sm font-bold text-brand-600 hover:underline">Challenge our price <ArrowRight size={16} aria-hidden="true" /></ElectricButton>
            </article>
            <article className="flex flex-col justify-between gap-5 border border-[#263241] bg-[#11161d] p-6 text-white sm:flex-row sm:items-center">
              <div className="flex gap-4">
                <div className="grid size-11 shrink-0 place-items-center bg-blue-500/15 text-blue-300"><Building2 size={22} aria-hidden="true" /></div>
                <div><h2 className="font-display text-2xl font-bold">Planning a home or building project?</h2><p className="mt-1 max-w-md text-sm leading-6 text-slate-300">Share your BOQ, BOM or requirements and request sourcing support.</p></div>
              </div>
              <ElectricButton href="/solutions" className="inline-flex shrink-0 items-center gap-2 px-1 py-1 text-sm font-bold text-blue-300 hover:text-blue-200 hover:underline">Explore solutions <ArrowRight size={16} aria-hidden="true" /></ElectricButton>
            </article>
          </section>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}
