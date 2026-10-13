import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Check, MapPin } from 'lucide-react'
import Container from '@/components/site/Container'
import ClosingCta from '@/components/site/ClosingCta'
import PageHeader from '@/components/site/PageHeader'
import PropertyGallery from '@/components/properties/PropertyGallery'
import PillLink from '@/components/ui/PillLink'
import WhatsAppIcon from '@/components/ui/WhatsAppIcon'
import { dealFigures, getPropertyBySlug, propertyLocation, type DealFigure } from '@/lib/properties'
import { getStatusMeta } from '@/lib/propertyStatus'
import { WHATSAPP_URL } from '@/lib/constants'
import { route } from '@/lib/routes'

export const dynamic = 'force-dynamic'

interface Props {
  params: { slug: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const p = await getPropertyBySlug(params.slug)
  if (!p) return { title: 'Property not found' }
  const location = propertyLocation(p)
  return {
    title: location ? `${p.title}, ${location}` : p.title,
    description: p.description ? p.description.slice(0, 155) : undefined,
    openGraph: p.cover_image ? { images: [p.cover_image] } : undefined,
  }
}

function Numbers({ figures, className }: { figures: DealFigure[]; className?: string }) {
  if (figures.length === 0) return null
  return (
    <div className={`rounded-xl2 border border-[var(--line)] bg-white p-6 ${className ?? ''}`}>
      <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--text-3)]">The numbers</h2>
      <dl className="mt-4 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-[var(--line)] bg-[var(--line)]">
        {figures.map((f) => (
          <div key={f.label} className={`bg-[var(--n-50)] p-4 ${figures.length === 1 ? 'col-span-2' : ''}`}>
            <dt className="text-xs font-medium text-[var(--text-3)]">{f.label}</dt>
            <dd className="mt-1.5 font-serif text-2xl leading-none text-[var(--text-1)]">{f.value}</dd>
          </div>
        ))}
      </dl>
    </div>
  )
}

export default async function PropertyPage({ params }: Props) {
  const p = await getPropertyBySlug(params.slug)
  if (!p) notFound()

  const location = propertyLocation(p)
  const status = getStatusMeta(p.status)
  const figures = dealFigures(p)
  const images = (p.images?.length ? p.images : p.cover_image ? [p.cover_image] : []).filter(Boolean)
  const description = p.description || null
  const features = (p.key_features ?? []).filter((f) => f.trim())

  const facts: { label: string; value: string }[] = []
  if (p.type) facts.push({ label: 'Type', value: p.type })
  if (p.tenure) facts.push({ label: 'Tenure', value: p.tenure })
  if (p.bedrooms != null) facts.push({ label: 'Bedrooms', value: String(p.bedrooms) })
  if (p.bathrooms != null) facts.push({ label: 'Bathrooms', value: String(p.bathrooms) })
  if (p.reception_rooms != null) facts.push({ label: 'Reception rooms', value: String(p.reception_rooms) })
  if (p.square_footage != null) facts.push({ label: 'Size', value: `${p.square_footage.toLocaleString('en-GB')} sq ft` })
  if (p.epc_rating) facts.push({ label: 'EPC rating', value: p.epc_rating })
  if (p.council_tax_band) facts.push({ label: 'Council tax band', value: p.council_tax_band })

  return (
    <>
      <PageHeader
        kicker={location ? `Case study · ${location}` : 'Case study'}
        title={p.title}
        crumbs={[{ label: 'Portfolio', href: route('/portfolio') }, { label: p.title }]}
      >
        {location && (
          <p className="mt-4 inline-flex items-center gap-1.5 text-[15px] text-[var(--text-2)]">
            <MapPin size={15} aria-hidden /> {location}
          </p>
        )}
      </PageHeader>

      <section className="bg-white">
        <Container className="pb-16 md:pb-24">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1.6fr_1fr] lg:gap-10">
            <div className="min-w-0">
              <PropertyGallery images={images} title={p.title} status={status.label} />

              {/* Mobile: numbers straight after the photos */}
              <Numbers figures={figures} className="mt-6 lg:hidden" />

              {description && (
                <div className="mt-10">
                  <h2 className="font-serif text-3xl text-[var(--text-1)]">About this deal</h2>
                  <p className="mt-4 whitespace-pre-line text-base leading-relaxed text-[var(--text-2)] md:text-[17px]">
                    {description}
                  </p>
                </div>
              )}

              {features.length > 0 && (
                <div className="mt-10">
                  <h2 className="font-serif text-3xl text-[var(--text-1)]">Key features</h2>
                  <ul className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
                    {features.map((f) => (
                      <li key={f} className="flex items-center gap-3 rounded-xl border border-[var(--line)] bg-[var(--n-50)] px-4 py-3 text-[15px] text-[var(--text-1)]">
                        <span aria-hidden className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-[var(--brand-blue-bg)] text-[var(--brand-blue)]">
                          <Check size={14} strokeWidth={2.5} />
                        </span>
                        <span className="first-letter:uppercase">{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <aside className="flex flex-col gap-5 lg:sticky lg:top-28 lg:self-start">
              {/* Desktop: numbers sit at the top of the sidebar */}
              <Numbers figures={figures} className="hidden lg:block" />

              {facts.length > 0 && (
                <div className="rounded-xl2 border border-[var(--line)] bg-white p-6">
                  <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--text-3)]">Property details</h2>
                  <dl className="mt-3">
                    {facts.map((f) => (
                      <div key={f.label} className="flex items-baseline justify-between gap-4 border-b border-[var(--line)] py-3 last:border-b-0">
                        <dt className="text-[15px] text-[var(--text-2)]">{f.label}</dt>
                        <dd className="text-right text-[15px] font-semibold text-[var(--text-1)]">{f.value}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              )}

              <div className="on-dark rounded-xl2 bg-[var(--ink)] p-6 text-white">
                <p className="font-serif text-2xl leading-tight">Want a deal like this?</p>
                <p className="mt-2 text-[15px] leading-relaxed text-[var(--text-on-dark-2)]">
                  Tell us your budget and we&apos;ll send you deals that pass the same tests.
                </p>
                <div className="mt-5 flex flex-wrap gap-3">
                  <PillLink href={route('/deal-sourcing#enquire')} variant="light" size="sm">
                    Find Me a Deal
                  </PillLink>
                  <PillLink
                    href={WHATSAPP_URL}
                    external
                    variant="outline-on-dark"
                    size="sm"
                    arrow={false}
                    icon={<WhatsAppIcon size={16} className="text-[var(--whatsapp)]" />}
                  >
                    WhatsApp
                  </PillLink>
                </div>
              </div>
            </aside>
          </div>
        </Container>
      </section>

      <ClosingCta flushTop />
    </>
  )
}
