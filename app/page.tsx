import { ArrowRight, BadgeDollarSign, Building2 } from 'lucide-react'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { Showcase } from '@/components/showcase'
import { navigationCategories, priorityProducts, trendingProducts } from '@/lib/data'
import { Hero } from '@/components/home/hero'
import { ElectricButton } from '@/components/ui/electric-button'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#f8f8f6]">
      <SiteHeader />
      <main>
        <Hero />
        <section className="container-shell py-12">
          <div className="eyebrow">Practical starting stock</div>
          <h1 className="font-display mt-2 text-4xl font-bold">
            Electrical essentials, clearly organized.
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600">
            Browse the complete catalogue from everyday wiring and lighting to repair parts, power modules and smart home products.
          </p>
          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {navigationCategories.slice(0, 9).map((category) => (
              <a key={category.slug} href={`/category/${category.slug}`} className="group flex items-center justify-between border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-800 transition hover:border-brand-500 hover:text-brand-600 hover:shadow-sm">
                {category.name}<ArrowRight size={15} className="text-slate-300 transition group-hover:translate-x-0.5 group-hover:text-brand-500" aria-hidden="true" />
              </a>
            ))}
          </div>
          <Showcase title="Most Popular / P1" items={priorityProducts.slice(0, 8)} />
          <Showcase title="Trending" items={trendingProducts.slice(0, 8)} />
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
