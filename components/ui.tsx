import { type ReactNode } from 'react';

export function SectionHeading({ eyebrow, title, description, action }: { eyebrow?: string; title: string; description?: string; action?: ReactNode }) {
  return <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
    <div>
      {eyebrow && <div className="eyebrow">{eyebrow}</div>}
      <h2 className="font-display mt-1 text-3xl font-bold tracking-tight text-slate-950 sm:text-[34px]">{title}</h2>
      {description && <p className="mt-1 max-w-2xl text-sm leading-6 text-slate-500">{description}</p>}
    </div>
    {action}
  </div>;
}
