import Image from 'next/image'
import Link from 'next/link'
import { BedDouble, Bath, Maximize2, MapPin, ArrowRight } from 'lucide-react'
import Badge, { statusToBadgeVariant } from '@/components/ui/Badge'
import { formatPrice } from '@/lib/utils'
import type { Property } from '@/lib/supabase/types'

interface PropertyCardProps {
  property: Property
}

export default function PropertyCard({ property }: PropertyCardProps) {
  const badge = statusToBadgeVariant(property.status)
  const isNew = property.listed_at
    ? Date.now() - new Date(property.listed_at).getTime() < 7 * 24 * 60 * 60 * 1000
    : false

  const address = [property.town, property.county].filter(Boolean).join(', ')

  return (
    <Link
      href={`/properties/${property.slug}`}
      className="group flex flex-col rounded-card border border-[var(--border)] bg-[var(--bg-surface)] overflow-hidden hover:border-[var(--border-gold)] hover:-translate-y-1 transition-all duration-200"
    >
      {/* Image */}
      <div className="relative aspect-video w-full overflow-hidden bg-[var(--bg-elevated)]">
        {property.cover_image ? (
          <Image
            src={property.cover_image}
            alt={property.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-[var(--bg-elevated)]">
            <span className="text-xs text-[var(--text-muted)]">No image</span>
          </div>
        )}
        <div className="absolute top-3 left-3 flex gap-2">
          <Badge variant={badge} />
          {isNew && badge !== 'new' && <Badge variant="new" />}
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col p-4 gap-3">
        {address && (
          <div className="flex items-center gap-1 text-xs text-[var(--text-muted)]">
            <MapPin size={12} />
            <span>{address}</span>
          </div>
        )}

        <h3 className="text-base font-semibold text-[var(--text-primary)] leading-snug line-clamp-2">
          {property.title}
        </h3>

        {/* Specs */}
        <div className="flex flex-wrap gap-3 text-sm text-[var(--text-secondary)]">
          {property.bedrooms != null && (
            <span className="flex items-center gap-1">
              <BedDouble size={14} />
              {property.bedrooms} bed{property.bedrooms !== 1 ? 's' : ''}
            </span>
          )}
          {property.bathrooms != null && (
            <span className="flex items-center gap-1">
              <Bath size={14} />
              {property.bathrooms} bath{property.bathrooms !== 1 ? 's' : ''}
            </span>
          )}
          {property.square_footage != null && (
            <span className="flex items-center gap-1">
              <Maximize2 size={14} />
              {property.square_footage.toLocaleString()} sq ft
            </span>
          )}
        </div>

        <div className="mt-auto flex items-center justify-between pt-3 border-t border-[var(--border)]">
          <div>
            {property.price_qualifier && (
              <p className="text-[11px] text-[var(--text-muted)] uppercase tracking-wide">
                {property.price_qualifier}
              </p>
            )}
            <p className="text-lg font-bold text-[var(--accent)]">
              {property.price ? formatPrice(property.price) : 'POA'}
            </p>
          </div>
          <span className="flex items-center gap-1 text-xs font-semibold text-[var(--accent)] group-hover:gap-2 transition-all duration-200">
            VIEW PROPERTY <ArrowRight size={13} />
          </span>
        </div>
      </div>
    </Link>
  )
}
