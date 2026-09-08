'use client'

import { CircuitAnimator } from './circuit-animator'
import { HeroCopy } from './hero-copy'

export function Hero() {
  return (
    <section className="border-t border-[#d9e1e8] bg-[#f7f8f7] pt-5 sm:pt-6 lg:pt-5">
      <div className="container-shell">
        <div className="grid overflow-hidden rounded-[22px] border border-[#d9e1e8] bg-white md:grid-cols-[.94fr_1.06fr]">
          <HeroCopy />

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
