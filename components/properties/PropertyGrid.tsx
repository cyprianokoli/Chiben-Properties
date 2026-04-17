import PropertyCard from './PropertyCard'
import type { Property } from '@/lib/supabase/types'

interface PropertyGridProps {
  properties: Property[]
  className?: string
}

export default function PropertyGrid({ properties, className }: PropertyGridProps) {
  if (properties.length === 0) {
    return (
      <div className="flex min-h-[300px] items-center justify-center rounded-card border border-[var(--border)] bg-[var(--bg-surface)]">
        <p className="text-[var(--text-muted)]">No properties found.</p>
      </div>
    )
  }

  return (
    <div className={`grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 ${className ?? ''}`}>
      {properties.map((p) => (
        <PropertyCard key={p.id} property={p} />
      ))}
    </div>
  )
}
