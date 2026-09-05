import Link from 'next/link'

export default function NotFound() {
  return (
    <main className="container-shell grid min-h-[60vh] place-items-center py-16 text-center">
      <div className="max-w-md">
        <p className="eyebrow">404</p>
        <h1 className="font-display mt-2 text-4xl font-bold text-slate-950">This page is not available.</h1>
        <p className="mt-3 text-sm leading-6 text-slate-600">
          The product, category or page may have moved. Browse the catalogue to continue.
        </p>
        <Link
          href="/search"
          className="mt-6 inline-flex min-h-11 items-center bg-brand-500 px-5 text-sm font-bold text-white transition hover:bg-brand-600 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2"
        >
          Browse all products
        </Link>
      </div>
    </main>
  )
}
