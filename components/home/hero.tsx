'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { ElectricButton } from '@/components/ui/electric-button'
import { CircuitAnimator } from './circuit-animator'

export function Hero() {
  return (
    <section className="border-y border-[#d9e1e8] bg-[#f7f8f7] py-5 sm:py-6 lg:py-5">
      <div className="mx-auto w-[calc(100%-2rem)] max-w-[1240px] sm:w-[calc(100%-3rem)] lg:w-[calc(100%-4rem)]">
        <div className="grid overflow-hidden rounded-[22px] border border-[#d9e1e8] bg-white md:grid-cols-[1fr_1.06fr]">
          <div className="flex min-h-[390px] flex-col justify-center px-6 py-8 text-[#07101d] sm:min-h-[420px] sm:px-10 md:min-h-[390px] md:px-8 lg:min-h-[470px] lg:px-14 lg:py-8">
            <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.2em] text-brand-600">
              Industrial procurement / 01
            </p>
            <h1 className="max-w-[540px] text-balance font-sans text-[2.75rem] font-bold leading-[0.96] tracking-[-0.06em] sm:text-[3.5rem] lg:text-[3.8rem]">
              Power the work
              <br />
              behind the work.
            </h1>
            <p className="mt-5 max-w-[390px] text-pretty text-sm leading-6 text-[#53677e] sm:text-[15px]">
              A dependable source for automation, power distribution, and the components that keep critical systems running.
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
