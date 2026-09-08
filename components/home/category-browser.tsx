'use client'

import { useRef, useState, type KeyboardEvent } from 'react'
import Link from 'next/link'
import {
  ArrowRight, BatteryCharging, Cable, CircuitBoard, Fan, House, Laptop,
  Lightbulb, Plug, ShieldCheck, Smartphone, Sparkles, Watch, Wrench, Zap,
  type LucideIcon,
} from 'lucide-react'
import {
  catalogueNavigationGroups,
  type CatalogueNavigationGroupId,
  type NavigationCategorySlug,
} from '@/lib/catalog/navigation'

// Presentation only: category membership, names and destinations come from navigation.ts.
const categoryIcons: Partial<Record<NavigationCategorySlug, LucideIcon>> = {
  'electrical-wiring': Cable,
  'switches-sockets': Plug,
  'lighting-fans': Lightbulb,
  'circuit-protection': ShieldCheck,
  'tools-testers': Wrench,
  'electronics-repair': CircuitBoard,
  'power-backup': BatteryCharging,
  'smart-electrical': Zap,
  'home-solutions': House,
  'mobile-accessories': Smartphone,
  'charging-power': BatteryCharging,
  'computer-desk': Laptop,
  'wearables-personal-care': Watch,
  'portable-fans-lights': Fan,
  'device-care-utility': Sparkles,
}

export function CategoryBrowser() {
  const [activeGroup, setActiveGroup] = useState<CatalogueNavigationGroupId>('electrical')
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([])

  function handleTabKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    let nextIndex: number
    if (event.key === 'ArrowRight') nextIndex = (index + 1) % catalogueNavigationGroups.length
    else if (event.key === 'ArrowLeft') nextIndex = (index - 1 + catalogueNavigationGroups.length) % catalogueNavigationGroups.length
    else if (event.key === 'Home') nextIndex = 0
    else if (event.key === 'End') nextIndex = catalogueNavigationGroups.length - 1
    else return

    event.preventDefault()
    setActiveGroup(catalogueNavigationGroups[nextIndex].id)
    tabRefs.current[nextIndex]?.focus()
  }

  return (
    <section aria-labelledby="category-browser-heading">
      <div className="mb-5 flex flex-wrap items-center justify-between gap-4">
        <h2 id="category-browser-heading" className="font-display text-2xl font-bold text-slate-950 sm:text-3xl">
          Shop by category
        </h2>
        <div role="tablist" aria-label="Product departments" className="inline-flex rounded-lg bg-slate-200/70 p-1">
          {catalogueNavigationGroups.map((candidate, index) => (
            <button
              key={candidate.id}
              ref={(element) => { tabRefs.current[index] = element }}
              type="button"
              role="tab"
              id={`home-category-tab-${candidate.id}`}
              aria-selected={activeGroup === candidate.id}
              aria-controls={`home-category-panel-${candidate.id}`}
              tabIndex={activeGroup === candidate.id ? 0 : -1}
              onClick={() => setActiveGroup(candidate.id)}
              onKeyDown={(event) => handleTabKeyDown(event, index)}
              className={`min-h-10 rounded-md px-5 text-sm font-semibold transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 motion-reduce:transition-none ${activeGroup === candidate.id ? 'bg-white text-slate-950 shadow-sm' : 'text-slate-600 hover:text-slate-950'}`}
            >
              {candidate.label}
            </button>
          ))}
        </div>
      </div>
      {catalogueNavigationGroups.map((candidate) => (
        <div
          key={candidate.id}
          id={`home-category-panel-${candidate.id}`}
          role="tabpanel"
          aria-labelledby={`home-category-tab-${candidate.id}`}
          hidden={candidate.id !== activeGroup}
        >
          <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 sm:gap-3">
            {candidate.categories.map((category) => {
              const Icon = categoryIcons[category.slug] ?? Zap
              return (
                <Link
                  key={category.slug}
                  href={`/category/${category.slug}`}
                  className="group flex min-h-[76px] items-center gap-2.5 rounded-lg border border-slate-200/80 bg-white p-3 transition-colors duration-150 hover:bg-blue-50/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 motion-reduce:transition-none sm:gap-3 sm:p-4"
                >
                  <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-slate-50 text-slate-600 transition-colors group-hover:bg-white group-hover:text-brand-600 motion-reduce:transition-none sm:size-10">
                    <Icon size={21} strokeWidth={1.6} aria-hidden="true" />
                  </span>
                  <span className="min-w-0 flex-1 text-xs font-semibold leading-5 text-slate-800 sm:text-sm">{category.name}</span>
                  <ArrowRight size={15} className="hidden shrink-0 text-slate-400 transition-transform duration-150 group-hover:translate-x-0.5 group-hover:text-brand-600 motion-reduce:transform-none motion-reduce:transition-none min-[400px]:block" aria-hidden="true" />
                </Link>
              )
            })}
          </div>
        </div>
      ))}
    </section>
  )
}
