export function LoadingState({ rows = 4 }: { rows?: number }) {
  return (
    <div aria-busy="true" aria-label="Loading dashboard content" className="space-y-3">
      <div className="h-8 w-44 animate-pulse bg-slate-200" />
      <div className="h-4 w-80 max-w-full animate-pulse bg-slate-100" />
      <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: rows }).map((_, index) => (
          <div key={index} className="h-32 animate-pulse border border-slate-200 bg-white" />
        ))}
      </div>
    </div>
  )
}
