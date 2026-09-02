import * as React from 'react';
import { cn } from '@/lib/utils';

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'primary' | 'secondary' | 'ghost'; size?: 'sm' | 'md' | 'lg' };

export function Button({ className, variant = 'primary', size = 'md', ...props }: Props) {
  return <button className={cn('inline-flex items-center justify-center gap-2 font-semibold transition focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50', variant === 'primary' && 'bg-brand-500 text-white hover:bg-brand-600', variant === 'secondary' && 'border border-slate-300 bg-white text-slate-900 hover:border-brand-500 hover:text-brand-600', variant === 'ghost' && 'text-slate-700 hover:bg-slate-100', size === 'sm' && 'min-h-9 px-3 text-xs', size === 'md' && 'min-h-11 px-4 text-sm', size === 'lg' && 'min-h-12 px-5 text-base', className)} {...props} />;
}
