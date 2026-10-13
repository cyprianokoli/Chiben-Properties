import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight, BedDouble, Bath, Maximize2, MapPin } from 'lucide-react'
import type { Property } from '@/lib/supabase/types'
import { getStatusMeta } from '@/lib/propertyStatus'
import { formatPrice } from '@/lib/utils'
import { cn } from '@/lib/cn'

interface ShowcaseCardProps {
  property: Property
  /** Larger type + taller image when the card is shown on its own */
  featured?: boolean
  sizes: string
  className?: string
  priority?: boolean
}

export function propertyHref(p: Property) {
  return `/portfolio#property-${p.id}`
}

export function propertyLocation(p: Property) {
  // Dedupe so town === county doesn't read "Hull, Hull"
  return Array.from(new Set([p.town, p.county].filter(Boolean))).join(', ')
}

export default function ShowcaseCard({
  property: p,
  featured = false,
  sizes,
  className,
  priority = false,
}: ShowcaseCardProps) {
  const status = getStatusMeta(p.status)
  const location = propertyLocation(p)

  return (
    <Link
      href={propertyHref(p)}
      className={cn(
        'group relative block overflow-hidden rounded-xl2 bg-[var(--n-100)] isolate',
        'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--brand-blue)]',
        featured ? 'aspect-[4/5] sm:aspect-[4/3] lg:aspect-auto lg:h-full lg:min-h-[480px]' : 'aspect-[4/5] sm:aspect-[4/3]',
        className
      )}
    >
      {p.cover_image ? (
        <Image
          src={p.cover_image}
          alt={`${p.title}${location ? `, ${location}` : ''}`}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
        />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-sm text-[var(--text-3)]">Photos coming soon</span>
        </div>
      )}

      {/* Legibility gradient */}
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent"
      />

      {/* Status pill */}
      <span className="absolute right-4 top-4 rounded-full bg-white px-3.5 py-1.5 text-xs font-semibold text-[var(--text-1)]">
        {status.label}
      </span>

      {/* Body */}
      <div className={cn('absolute inset-x-0 bottom-0 text-white', featured ? 'p-6 md:p-8' : 'p-5 md:p-6')}>
        {location && (
          <p className="mb-2 inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-xs font-medium backdrop-blur-sm">
            <MapPin size={12} aria-hidden />
            {location}
          </p>
        )}
        <div className="flex items-end justify-between gap-4">
          <div className="min-w-0">
            <h3
              className={cn(
                'font-serif leading-tight',
                featured ? 'text-3xl md:text-[40px]' : 'text-2xl md:text-[28px]'
              )}
            >
              {p.title}
            </h3>
            <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-[13px] text-white/85">
              {p.bedrooms != null && (
                <span className="inline-flex items-center gap-1.5">
                  <BedDouble size={14} aria-hidden /> {p.bedrooms} Beds
                </span>
              )}
              {p.bathrooms != null && (
                <span className="inline-flex items-center gap-1.5">
                  <Bath size={14} aria-hidden /> {p.bathrooms} Baths
                </span>
              )}
              {p.square_footage != null && (
                <span className="inline-flex items-center gap-1.5">
                  <Maximize2 size={13} aria-hidden /> {p.square_footage.toLocaleString('en-GB')} sq ft
                </span>
              )}
            </div>
          </div>

          <div className="flex flex-shrink-0 items-center gap-3">
            {p.price != null && !featured && (
              <p className="hidden font-serif text-2xl leading-none sm:block">
                {formatPrice(p.price)}
              </p>
            )}
            <span
              aria-hidden
              className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-[var(--ink)] transition-transform duration-200 group-hover:rotate-45"
            >
              <ArrowUpRight size={18} strokeWidth={2.25} />
            </span>
          </div>
        </div>
        {p.price != null && !featured && (
          <p className="mt-3 font-serif text-xl leading-none sm:hidden">{formatPrice(p.price)}</p>
        )}
      </div>
      <span className="sr-only">View {p.title} in our portfolio</span>
    </Link>
  )
}
