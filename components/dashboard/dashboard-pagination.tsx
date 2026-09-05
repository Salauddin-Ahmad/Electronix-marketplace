import Link from 'next/link'

const pageNumbers = (page: number, pageCount: number) => {
  if (pageCount <= 5) return Array.from({ length: pageCount }, (_, index) => index + 1)

  const nearby = new Set([1, pageCount, page - 1, page, page + 1])

  return [...nearby]
    .filter((candidate) => candidate >= 1 && candidate <= pageCount)
    .sort((left, right) => left - right)
}

export function DashboardPagination({
  ariaLabel = 'Dashboard pagination',
  page,
  pageCount,
  hrefForPage,
}: {
  ariaLabel?: string
  page: number
  pageCount: number
  hrefForPage: (page: number) => string
}) {
  if (pageCount <= 1) return null

  const pages = pageNumbers(page, pageCount)

  return (
    <nav aria-label={ariaLabel} className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-200 pt-5">
      <Link
        aria-disabled={page === 1}
        className={`focus-ring inline-flex min-h-10 items-center rounded-sm border px-3 text-sm font-semibold ${
          page === 1
            ? 'pointer-events-none border-slate-200 text-slate-400'
            : 'border-slate-300 text-slate-700 hover:border-blue-200 hover:bg-blue-50 hover:text-blue-800'
        }`}
        href={hrefForPage(Math.max(1, page - 1))}
      >
        Previous
      </Link>

      <div className="flex items-center gap-1" aria-label={`Page ${page} of ${pageCount}`}>
        {pages.map((candidate, index) => {
          const previous = pages[index - 1]
          const needsGap = previous !== undefined && candidate - previous > 1

          return (
            <span key={candidate} className="flex items-center gap-1">
              {needsGap ? <span aria-hidden="true" className="px-1 text-sm text-slate-400">…</span> : null}
              <Link
                aria-current={candidate === page ? 'page' : undefined}
                className={`focus-ring grid h-10 min-w-10 place-items-center rounded-sm border text-sm font-semibold ${
                  candidate === page
                    ? 'border-slate-950 bg-slate-950 text-white'
                    : 'border-slate-300 text-slate-700 hover:border-blue-200 hover:bg-blue-50 hover:text-blue-800'
                }`}
                href={hrefForPage(candidate)}
              >
                {candidate}
              </Link>
            </span>
          )
        })}
      </div>

      <Link
        aria-disabled={page === pageCount}
        className={`focus-ring inline-flex min-h-10 items-center rounded-sm border px-3 text-sm font-semibold ${
          page === pageCount
            ? 'pointer-events-none border-slate-200 text-slate-400'
            : 'border-slate-300 text-slate-700 hover:border-blue-200 hover:bg-blue-50 hover:text-blue-800'
        }`}
        href={hrefForPage(Math.min(pageCount, page + 1))}
      >
        Next
      </Link>
    </nav>
  )
}
