export default function Loading() {
  return (
    <main className="container-shell py-10" aria-busy="true" aria-live="polite">
      <span className="sr-only">Loading page</span>
      <div className="h-4 w-24 animate-pulse bg-slate-200" />
      <div className="mt-4 h-10 max-w-xl animate-pulse bg-slate-200" />
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 8 }, (_, index) => (
          <div key={index} className="h-72 animate-pulse border border-slate-200 bg-white" />
        ))}
      </div>
    </main>
  )
}
