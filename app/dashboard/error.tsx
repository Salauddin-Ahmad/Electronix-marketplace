'use client'

export default function DashboardError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <section className="border border-amber-200 bg-amber-50 p-6">
      <p className="eyebrow text-amber-700">Dashboard preview</p>
      <h1 className="mt-2 font-display text-3xl font-bold text-slate-950">Unable to load this dashboard view</h1>
      <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-700">
        This preview has no operational data connection. You can retry the page or return to the storefront.
      </p>
      <button
        className="focus-ring mt-5 rounded-sm bg-slate-950 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-slate-800"
        onClick={reset}
        type="button"
      >
        Retry view
      </button>
    </section>
  )
}
