import { cn } from '@/lib/cn'

type BadgeVariant = 'available' | 'under-offer' | 'sold' | 'new' | 'featured' | 'off-market'

const variantStyles: Record<BadgeVariant, string> = {
  available:   'text-[var(--status-available-text)] bg-[var(--status-available-bg)]',
  'under-offer': 'text-[var(--status-offer-text)] bg-[var(--status-offer-bg)]',
  sold:        'text-[var(--status-sold-text)] bg-[var(--status-sold-bg)]',
  new:         'text-[var(--status-new-text)] bg-[var(--status-new-bg)]',
  featured:    'text-[var(--status-new-text)] bg-[var(--status-new-bg)]',
  'off-market': 'text-[var(--status-sold-text)] bg-[var(--status-sold-bg)]',
}

const labels: Record<BadgeVariant, string> = {
  available:   'Available',
  'under-offer': 'Under Offer',
  sold:        'Sold',
  new:         'New',
  featured:    'Featured',
  'off-market': 'Off Market',
}

interface BadgeProps {
  variant: BadgeVariant
  className?: string
  label?: string
}

export default function Badge({ variant, className, label }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-block rounded-[6px] px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.08em]',
        variantStyles[variant],
        className
      )}
    >
      {label ?? labels[variant]}
    </span>
  )
}

export function statusToBadgeVariant(status: string): BadgeVariant {
  const map: Record<string, BadgeVariant> = {
    available: 'available',
    'under-offer': 'under-offer',
    sold: 'sold',
    'off-market': 'off-market',
  }
  return map[status] ?? 'available'
}
