import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import {
  BedDouble, Bath, Maximize2, MapPin, ArrowRight,
  CheckCircle, Phone, Mail
} from 'lucide-react'
import type { Metadata } from 'next'

export const dynamic = 'force-dynamic'

import Badge, { statusToBadgeVariant } from '@/components/ui/Badge'
import PropertyGrid from '@/components/properties/PropertyGrid'
import ViewingForm from './ViewingForm'
import { createClient } from '@/lib/supabase/server'
import { formatPrice } from '@/lib/utils'
import type { Property } from '@/lib/supabase/types'

interface Props {
  params: { slug: string }
}

async function getProperty(slug: string): Promise<Property | null> {
  try {
    const supabase = createClient()
    const { data } = await supabase
      .from('properties')
      .select('*')
      .eq('slug', slug)
      .single()
    return data
  } catch {
    return null
  }
}

async function getSimilarProperties(property: Property): Promise<Property[]> {
  try {
    const supabase = createClient()
    const { data } = await supabase
      .from('properties')
      .select('*')
      .neq('id', property.id)
      .neq('status', 'sold')
      .eq('type', property.type ?? '')
      .order('listed_at', { ascending: false })
      .limit(3)
    return data ?? []
  } catch {
    return []
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const property = await getProperty(params.slug)
  if (!property) return { title: 'Property Not Found' }
  return {
    title: property.title,
    description: property.description?.slice(0, 160) ?? undefined,
    openGraph: {
      images: property.cover_image ? [property.cover_image] : [],
    },
  }
}

export default async function PropertyPage({ params }: Props) {
  const property = await getProperty(params.slug)
  if (!property) notFound()

  const similar = await getSimilarProperties(property)
  const allImages = property.images ?? (property.cover_image ? [property.cover_image] : [])
  const badge = statusToBadgeVariant(property.status)
  const address = [
    property.address_line1,
    property.address_line2,
    property.town,
    property.county,
    property.postcode,
  ].filter(Boolean).join(', ')

  return (
    <>
      {/* Breadcrumb */}
      <section className="bg-[var(--bg-surface)] border-b border-[var(--border)]">
        <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-1.5 text-xs text-[var(--text-muted)]">
            <Link href="/" className="hover:text-[var(--accent)] transition-colors">Home</Link>
            <span>/</span>
            <Link href="/properties" className="hover:text-[var(--accent)] transition-colors">Properties</Link>
            <span>/</span>
            <span className="text-[var(--text-primary)] truncate">{property.title}</span>
          </div>
        </div>
      </section>

      {/* Hero gallery */}
      <section className="bg-[var(--bg-page)]">
        <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8 py-6 md:py-10">
          {/* Mobile: single image with counter */}
          <div className="md:hidden relative aspect-video rounded-card overflow-hidden bg-[var(--bg-elevated)]">
            {allImages[0] ? (
              <Image
                src={allImages[0]}
                alt={property.title}
                fill
                sizes="100vw"
                className="object-cover"
                priority
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-sm text-[var(--text-muted)]">No photos available</span>
              </div>
            )}
            <div className="absolute top-3 left-3">
              <Badge variant={badge} />
            </div>
            {allImages.length > 1 && (
              <div className="absolute bottom-3 right-3 rounded-full bg-black/60 px-3 py-1 text-xs text-white">
                1 / {allImages.length}
              </div>
            )}
          </div>

          {/* Desktop: gallery grid */}
          <div className="hidden md:grid grid-cols-4 grid-rows-2 gap-3 h-[480px]">
            <div className="col-span-2 row-span-2 relative rounded-card overflow-hidden bg-[var(--bg-elevated)]">
              {allImages[0] ? (
                <Image
                  src={allImages[0]}
                  alt={property.title}
                  fill
                  sizes="50vw"
                  className="object-cover"
                  priority
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-sm text-[var(--text-muted)]">No photos available</span>
                </div>
              )}
              <div className="absolute top-4 left-4">
                <Badge variant={badge} />
              </div>
            </div>
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="relative rounded-card overflow-hidden bg-[var(--bg-elevated)]">
                {allImages[i] ? (
                  <Image
                    src={allImages[i]}
                    alt={`${property.title} — photo ${i + 1}`}
                    fill
                    sizes="25vw"
                    className="object-cover"
                  />
                ) : (
                  <div className="absolute inset-0 bg-[var(--bg-elevated)]" />
                )}
              </div>
            ))}
          </div>

          {allImages.length > 5 && (
            <p className="mt-2 text-right text-xs text-[var(--text-muted)]">
              +{allImages.length - 5} more photos
            </p>
          )}
        </div>
      </section>

      {/* Main content */}
      <section className="bg-[var(--bg-page)]">
        <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8 pb-16 md:pb-24">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_380px]">
            {/* Left column */}
            <div>
              {/* Title block */}
              <div className="mb-8">
                {property.type && (
                  <p className="eyebrow mb-2">{property.type}</p>
                )}
                <h1 className="h2 text-[var(--text-primary)] mb-3">{property.title}</h1>
                {address && (
                  <div className="flex items-center gap-1.5 text-sm text-[var(--text-secondary)] mb-4">
                    <MapPin size={15} className="text-[var(--accent)] flex-shrink-0" />
                    {address}
                  </div>
                )}
                <div className="flex items-end gap-3">
                  <p className="text-3xl font-bold text-[var(--accent)]">
                    {property.price ? formatPrice(property.price) : 'POA'}
                  </p>
                  {property.price_qualifier && (
                    <p className="text-sm text-[var(--text-muted)] mb-1">{property.price_qualifier}</p>
                  )}
                </div>
              </div>

              {/* Specs */}
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 mb-8">
                {property.bedrooms != null && (
                  <div className="rounded-card border border-[var(--border)] bg-[var(--bg-surface)] p-4 flex flex-col items-center gap-1.5">
                    <BedDouble size={20} className="text-[var(--accent)]" />
                    <p className="text-xl font-bold text-[var(--text-primary)]">{property.bedrooms}</p>
                    <p className="text-xs text-[var(--text-muted)]">Bedrooms</p>
                  </div>
                )}
                {property.bathrooms != null && (
                  <div className="rounded-card border border-[var(--border)] bg-[var(--bg-surface)] p-4 flex flex-col items-center gap-1.5">
                    <Bath size={20} className="text-[var(--accent)]" />
                    <p className="text-xl font-bold text-[var(--text-primary)]">{property.bathrooms}</p>
                    <p className="text-xs text-[var(--text-muted)]">Bathrooms</p>
                  </div>
                )}
                {property.reception_rooms != null && (
                  <div className="rounded-card border border-[var(--border)] bg-[var(--bg-surface)] p-4 flex flex-col items-center gap-1.5">
                    <Maximize2 size={20} className="text-[var(--accent)]" />
                    <p className="text-xl font-bold text-[var(--text-primary)]">{property.reception_rooms}</p>
                    <p className="text-xs text-[var(--text-muted)]">Receptions</p>
                  </div>
                )}
                {property.square_footage != null && (
                  <div className="rounded-card border border-[var(--border)] bg-[var(--bg-surface)] p-4 flex flex-col items-center gap-1.5">
                    <Maximize2 size={20} className="text-[var(--accent)]" />
                    <p className="text-xl font-bold text-[var(--text-primary)]">
                      {property.square_footage.toLocaleString()}
                    </p>
                    <p className="text-xs text-[var(--text-muted)]">Sq Ft</p>
                  </div>
                )}
              </div>

              {/* Description */}
              {property.description && (
                <div className="mb-10">
                  <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-4">About this property</h2>
                  <div className="prose prose-sm max-w-none text-[var(--text-secondary)] leading-relaxed whitespace-pre-line">
                    {property.description}
                  </div>
                </div>
              )}

              {/* Key features */}
              {property.key_features && property.key_features.length > 0 && (
                <div className="mb-10">
                  <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-5">Key Features</h2>
                  <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    {property.key_features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2.5 text-sm text-[var(--text-secondary)]">
                        <CheckCircle size={16} className="text-[var(--accent)] flex-shrink-0 mt-0.5" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Property details */}
              <div className="mb-10">
                <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-5">Property Details</h2>
                <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                  {[
                    { label: 'Property Type', value: property.type },
                    { label: 'Tenure', value: property.tenure },
                    { label: 'EPC Rating', value: property.epc_rating },
                    { label: 'Council Tax Band', value: property.council_tax_band },
                    { label: 'Local Authority', value: property.local_authority },
                  ]
                    .filter((r) => r.value)
                    .map((row) => (
                      <div
                        key={row.label}
                        className="flex items-center justify-between rounded-btn border border-[var(--border)] bg-[var(--bg-surface)] px-4 py-3"
                      >
                        <span className="text-sm text-[var(--text-muted)]">{row.label}</span>
                        <span className="text-sm font-medium text-[var(--text-primary)]">{row.value}</span>
                      </div>
                    ))}
                </div>
              </div>

              {/* Mobile viewing form */}
              <div className="lg:hidden">
                <ViewingForm propertySlug={property.slug} propertyTitle={property.title} />
              </div>
            </div>

            {/* Right column — sticky sidebar */}
            <div className="hidden lg:block">
              <div className="sticky top-24 flex flex-col gap-5">
                <ViewingForm propertySlug={property.slug} propertyTitle={property.title} />

                {/* Agent contact */}
                <div className="rounded-card border border-[var(--border)] bg-[var(--bg-surface)] p-5">
                  <p className="eyebrow mb-3">Speak to an Agent</p>
                  <a
                    href="tel:+442079460123"
                    className="flex items-center gap-3 rounded-btn border border-[var(--border)] bg-[var(--bg-page)] px-4 py-3 text-sm font-medium text-[var(--text-primary)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors mb-3"
                  >
                    <Phone size={16} className="text-[var(--accent)]" />
                    +44 20 7946 0123
                  </a>
                  <a
                    href="mailto:hello@chibenproperties.co.uk"
                    className="flex items-center gap-3 rounded-btn border border-[var(--border)] bg-[var(--bg-page)] px-4 py-3 text-sm font-medium text-[var(--text-primary)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors"
                  >
                    <Mail size={16} className="text-[var(--accent)]" />
                    Send Email
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Similar properties */}
      {similar.length > 0 && (
        <section className="bg-[var(--bg-surface)]">
          <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8 py-14 md:py-20">
            <div className="flex items-end justify-between mb-8">
              <div>
                <p className="eyebrow mb-2">You Might Also Like</p>
                <h2 className="text-2xl font-bold text-[var(--text-primary)]">
                  Similar <em>Properties</em>
                </h2>
              </div>
              <Link
                href="/properties"
                className="flex items-center gap-1 text-sm font-semibold text-[var(--accent)] hover:gap-2 transition-all"
              >
                View All <ArrowRight size={15} />
              </Link>
            </div>
            <PropertyGrid properties={similar} />
          </div>
        </section>
      )}
    </>
  )
}
