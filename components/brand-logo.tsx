'use client'

import Link from 'next/link'
import type { PointerEvent } from 'react'
import { useRef } from 'react'

export function BrandLogo() {
  const previousPointer = useRef<{ x: number; y: number } | null>(null)

  function followPointer(event: PointerEvent<HTMLAnchorElement>) {
    const bounds = event.currentTarget.getBoundingClientRect()
    const x = Math.min(Math.max(event.clientX - bounds.left, 0), bounds.width)
    const y = Math.min(Math.max(event.clientY - bounds.top, 0), bounds.height)
    const previous = previousPointer.current
    const deltaX = previous ? x - previous.x : 1
    const deltaY = previous ? y - previous.y : 0
    const angle = Math.atan2(deltaY, deltaX) * (180 / Math.PI)
    const velocity = Math.min(Math.hypot(deltaX, deltaY), 18)
    const scale = 0.92 + velocity / 90

    event.currentTarget.style.setProperty('--brand-spark-x', `${x}px`)
    event.currentTarget.style.setProperty('--brand-spark-y', `${y}px`)
    event.currentTarget.style.setProperty('--brand-spark-angle', `${angle}deg`)
    event.currentTarget.style.setProperty('--brand-spark-scale', scale.toFixed(3))
    previousPointer.current = { x, y }
  }

  return (
    <Link
      href="/"
      onPointerMove={followPointer}
      onPointerLeave={() => { previousPointer.current = null }}
      className="brand-logo group relative isolate shrink-0 font-display text-[27px] font-extrabold tracking-tight text-[#1b2026] focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-4"
      aria-label="VOLTRONIX home"
    >
      <span className="brand-word relative z-10">VOLTRONIX</span>
      <span className="relative z-10 text-brand-500">.</span>
      <span className="brand-spark-tracker" aria-hidden="true">
        <span className="brand-spark-reflection" />
        <span className="brand-spark-shell"><span className="brand-spark-core" /></span>
        <svg viewBox="0 0 52 34" role="presentation">
          <defs>
            <path id="voltronix-bolt-a" d="M2 17 9 14 13 7 18 23 23 13 28 19 34 8 39 21 44 15 50 17" />
            <path id="voltronix-branch-a" d="M13 14 8 24 3 27 M34 14 41 5 48 3" />
            <path id="voltronix-bolt-b" d="M1 16 8 19 14 10 19 21 24 6 29 20 36 12 41 23 46 14 51 17" />
            <path id="voltronix-branch-b" d="M18 17 13 28 8 31 M37 15 43 8 50 7" />
            <path id="voltronix-bolt-c" d="M2 18 8 12 15 20 20 5 25 23 31 11 36 19 42 9 46 20 51 16" />
            <path id="voltronix-branch-c" d="M15 17 9 5 4 3 M37 16 43 27 49 30" />
          </defs>
          <g className="brand-spark-frame brand-spark-frame-a">
            <use href="#voltronix-bolt-a" className="brand-spark-arc brand-arc-depth" />
            <use href="#voltronix-bolt-a" className="brand-spark-arc brand-arc-energy" />
            <use href="#voltronix-bolt-a" className="brand-spark-arc brand-arc-core" />
            <use href="#voltronix-branch-a" className="brand-spark-arc brand-branch-depth" />
            <use href="#voltronix-branch-a" className="brand-spark-arc brand-branch-energy" />
            <use href="#voltronix-branch-a" className="brand-spark-arc brand-branch-core" />
          </g>
          <g className="brand-spark-frame brand-spark-frame-b">
            <use href="#voltronix-bolt-b" className="brand-spark-arc brand-arc-depth" />
            <use href="#voltronix-bolt-b" className="brand-spark-arc brand-arc-energy" />
            <use href="#voltronix-bolt-b" className="brand-spark-arc brand-arc-core" />
            <use href="#voltronix-branch-b" className="brand-spark-arc brand-branch-depth" />
            <use href="#voltronix-branch-b" className="brand-spark-arc brand-branch-energy" />
            <use href="#voltronix-branch-b" className="brand-spark-arc brand-branch-core" />
          </g>
          <g className="brand-spark-frame brand-spark-frame-c">
            <use href="#voltronix-bolt-c" className="brand-spark-arc brand-arc-depth" />
            <use href="#voltronix-bolt-c" className="brand-spark-arc brand-arc-energy" />
            <use href="#voltronix-bolt-c" className="brand-spark-arc brand-arc-core" />
            <use href="#voltronix-branch-c" className="brand-spark-arc brand-branch-depth" />
            <use href="#voltronix-branch-c" className="brand-spark-arc brand-branch-energy" />
            <use href="#voltronix-branch-c" className="brand-spark-arc brand-branch-core" />
          </g>
        </svg>
        <span className="brand-spark-particle brand-spark-particle-one" />
        <span className="brand-spark-particle brand-spark-particle-two" />
        <span className="brand-spark-particle brand-spark-particle-three" />
        <span className="brand-spark-particle brand-spark-particle-four" />
      </span>
    </Link>
  )
}
