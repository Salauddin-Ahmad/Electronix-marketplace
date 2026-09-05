'use client'

import { useEffect } from 'react'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <main className="container-shell grid min-h-[60vh] place-items-center py-16 text-center">
      <div className="max-w-md">
        <p className="eyebrow">Something went wrong</p>
        <h1 className="font-display mt-2 text-4xl font-bold text-slate-950">Please try again.</h1>
        <p className="mt-3 text-sm leading-6 text-slate-600">
          The page could not load correctly. Your quote list remains saved in this browser.
        </p>
        <button
          type="button"
          onClick={reset}
          className="mt-6 min-h-11 bg-brand-500 px-5 text-sm font-bold text-white transition hover:bg-brand-600 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2"
        >
          Try again
        </button>
      </div>
    </main>
  )
}
