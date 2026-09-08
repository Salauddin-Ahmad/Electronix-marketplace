import { ArrowRight, BadgeDollarSign, Building2 } from 'lucide-react'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { Showcase } from '@/components/showcase'
import { priorityProducts, products, trendingProducts } from '@/lib/data'
import { gadgetCategories } from '@/lib/catalog/navigation'
import { Hero } from '@/components/home/hero'
import { CategoryBrowser } from '@/components/home/category-browser'
import { TrustStrip } from '@/components/home/trust-strip'
import { ElectricButton } from '@/components/ui/electric-button'

export default function HomePage() {
  // One item from each central gadget category, plus two selected wearable items.
  const gadgetEssentials = [
    ...gadgetCategories.flatMap((category) => {
      const product = products.find((candidate) => category.sourceCategories.some(
        (sourceCategory) => sourceCategory === candidate.category,
      ))
      return product ? [product] : []
    }),
    ...['gadget-022', 'gadget-008'].flatMap((id) => {
      const product = products.find((candidate) => candidate.id === id)
      return product ? [product] : []
    }),
  ].filter((product, index, items) => items.findIndex((candidate) => candidate.id === product.id) === index)
    .slice(0, 8)
  const showcasedIds = new Set(gadgetEssentials.map((product) => product.id))
  const popularProducts = priorityProducts.filter((product) => !showcasedIds.has(product.id)).slice(0, 8)
  popularProducts.forEach((product) => showcasedIds.add(product.id))
  const trendingSelection = [...trendingProducts, ...products]
    .filter((product) => {
      if (showcasedIds.has(product.id)) return false
      showcasedIds.add(product.id)
      return true
    })
    .slice(0, 8)

  return (
    <div className="min-h-screen bg-[#f8f8f6]">
      <SiteHeader />
      <main id="main-content">
        <Hero />
        <div className="mt-6">
          <TrustStrip />
        </div>
        <div className="container-shell pb-10 pt-8 sm:pb-12 sm:pt-10">
          <CategoryBrowser />
          <Showcase title="Most Popular" items={popularProducts} />
          <Showcase title="Gadget Essentials" items={gadgetEssentials} href="/category/gadgets" hrefLabel="Explore Gadgets" />
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
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
