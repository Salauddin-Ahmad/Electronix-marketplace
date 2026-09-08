'use client'

import Link from 'next/link'
import { ArrowRight, MessageCircle } from 'lucide-react'
import { motion, useMotionValue, useReducedMotion, useSpring } from 'framer-motion'
import type { PointerEvent } from 'react'
import { ElectricButton } from '@/components/ui/electric-button'
import { buildGeneralWhatsAppUrl } from '@/lib/whatsapp'
import styles from './hero-copy.module.css'

export function HeroCopy() {
  const reduceMotion = useReducedMotion()
  const glowX = useMotionValue(0)
  const glowY = useMotionValue(0)
  const x = useSpring(glowX, { stiffness: 75, damping: 24 })
  const y = useSpring(glowY, { stiffness: 75, damping: 24 })

  const followPointer = (event: PointerEvent<HTMLDivElement>) => {
    if (reduceMotion || event.pointerType !== 'mouse') return
    const bounds = event.currentTarget.getBoundingClientRect()
    glowX.set(((event.clientX - bounds.left) / bounds.width - 0.5) * 72)
    glowY.set(((event.clientY - bounds.top) / bounds.height - 0.5) * 48)
  }

  const resetGlow = () => {
    glowX.set(0)
    glowY.set(0)
  }

  return (
    <div
      onPointerMove={followPointer}
      onPointerLeave={resetGlow}
      className="relative isolate flex min-h-[390px] flex-col justify-center overflow-hidden px-6 py-7 text-[#07101d] sm:min-h-[420px] sm:px-10 sm:py-8 md:min-h-[390px] md:px-6 lg:min-h-[470px] lg:px-12 lg:py-8 xl:px-16"
    >
      <motion.div
        aria-hidden="true"
        className={styles.glow}
        style={{ x, y }}
      />
      <div className="relative z-10">
        <p className={`${styles.reveal} mb-4 flex flex-wrap items-center gap-x-2 gap-y-1 text-[9px] font-bold uppercase tracking-[0.16em] text-slate-500 sm:mb-5 sm:text-[10px]`}>
          <span className="text-brand-600">Electrical</span><span aria-hidden="true">·</span>
          <span>Gadgets</span><span aria-hidden="true">·</span><span>Project supply</span>
        </p>
        <h1 className={`${styles.reveal} ${styles.headline} max-w-[590px] text-balance font-sans text-[1.875rem] font-extrabold leading-[1.06] tracking-[-0.05em] sm:text-[3.25rem] md:text-[2rem] lg:text-[3rem] xl:text-[3.25rem]`}>
          <span className="block">Power your projects.</span>
          <span className="mt-1 block">Upgrade your <span className="text-brand-600">everyday.</span></span>
        </h1>
        <p className={`${styles.reveal} ${styles.description} mt-4 max-w-[400px] text-pretty text-sm leading-6 text-[#53677e] sm:mt-5 sm:text-[15px]`}>
          Electrical supplies, practical gadgets and project sourcing—all in one place.
        </p>
        <div className={`${styles.reveal} ${styles.actions} mt-5 flex flex-wrap gap-2 sm:mt-6 sm:gap-3`}>
          <ElectricButton href="/search" className="inline-flex min-h-11 items-center gap-2 rounded-full bg-brand-500 px-3 py-2 text-xs font-semibold text-white shadow-sm transition-colors hover:bg-brand-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 sm:px-5 sm:py-2.5 sm:text-sm">
            Explore products <ArrowRight className="size-4" aria-hidden="true" />
          </ElectricButton>
          <Link href="/solutions" className="inline-flex min-h-11 items-center rounded-full border border-slate-300 bg-white/80 px-3 py-2 text-xs font-semibold text-[#07101d] transition-colors hover:border-slate-400 hover:bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 sm:px-5 sm:py-2.5 sm:text-sm">
            Request a quote
          </Link>
        </div>
        <a
          href={buildGeneralWhatsAppUrl()}
          target="_blank"
          rel="noopener noreferrer"
          className={`${styles.reveal} ${styles.help} mt-3 inline-flex min-h-8 items-center gap-2 text-xs font-medium text-slate-500 transition-colors hover:text-slate-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 sm:mt-4 sm:min-h-9`}
        >
          <MessageCircle size={14} aria-hidden="true" className="text-emerald-700" />
          Product enquiries on WhatsApp
        </a>
      </div>
    </div>
  )
}
