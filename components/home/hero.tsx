'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { ElectricButton } from '@/components/ui/electric-button'
import { CircuitAnimator } from './circuit-animator'

export function Hero() {
  return (
    <section className="border-y border-[#d9e1e8] bg-[#f7f8f7] py-5 sm:py-6 lg:py-5">
      <div className="container-shell">
        <div className="grid overflow-hidden rounded-[22px] border border-[#d9e1e8] bg-white md:grid-cols-[.94fr_1.06fr]">
          <div className="flex min-h-[390px] flex-col justify-center px-6 py-8 text-[#07101d] sm:min-h-[420px] sm:px-10 md:min-h-[390px] md:px-9 lg:min-h-[470px] lg:px-12 lg:py-8 xl:px-16">
            <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.2em] text-brand-600">
              Electrical supply &amp; project sourcing
            </p>
            <h1 className="max-w-[590px] text-balance font-sans text-[2.75rem] font-extrabold leading-[0.98] tracking-[-0.05em] sm:text-[3.5rem] lg:text-[4rem] xl:text-[4.25rem]">
              Power the work
              <br />
              behind the work.
            </h1>
            <p className="mt-5 max-w-[430px] text-pretty text-sm leading-6 text-[#53677e] sm:text-[15px]">
              Source electrical, automation and repair essentials for everyday jobs, maintenance and project requirements.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <ElectricButton href="/search" className="inline-flex items-center gap-2 rounded-full bg-brand-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-brand-600 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2">
                Explore catalog
                <ArrowRight className="size-4" aria-hidden="true" />
              </ElectricButton>
              <Link href="/solutions" className="inline-flex items-center rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-[#07101d] transition hover:border-brand-500 hover:text-brand-600">
                Request a quote
              </Link>
            </div>
          </div>

          <div className="relative min-h-[280px] p-0 sm:min-h-[360px] md:min-h-[390px] lg:min-h-[470px] lg:p-0">
            <div className="absolute inset-0 overflow-hidden rounded-[22px] bg-[#020817] lg:rounded-l-[22px] lg:rounded-r-[22px]">
              <CircuitAnimator />
            </div>
            <div className="pointer-events-none absolute bottom-5 left-5 z-10 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#aebbd0] sm:bottom-6 sm:left-6">
              <span className="size-2 rounded-full bg-[#168cff] shadow-[0_0_10px_#168cff]" />
              Live circuit flow
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
