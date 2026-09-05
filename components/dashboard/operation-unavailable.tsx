import type { LucideIcon } from 'lucide-react'
import { EmptyState } from './empty-state'
import { PageHeader } from './page-header'

export function OperationUnavailable({
  eyebrow,
  title,
  description,
  icon,
  emptyTitle,
  emptyDescription,
  detail,
}: {
  eyebrow: string
  title: string
  description: string
  icon: LucideIcon
  emptyTitle: string
  emptyDescription: string
  detail: string
}) {
  return (
    <div className="space-y-8">
      <PageHeader eyebrow={eyebrow} title={title} description={description} />
      <EmptyState icon={icon} title={emptyTitle} description={emptyDescription} detail={detail} />
    </div>
  )
}
