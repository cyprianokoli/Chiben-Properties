'use client'

import Image from 'next/image'
import { Eye } from 'lucide-react'
import { formatPrice } from '@/lib/utils'

interface Props {
  title?: string
  description?: string
  status?: string
  type?: string
  tenure?: string
  town?: string
  county?: string
  bedrooms?: string | number | null
  bathrooms?: string | number | null
  square_footage?: string | number | null
  price?: string | number | null
  price_qualifier?: string
  key_features?: string[]
  images?: string[]
}

const statusMeta: Record<string, { label: string; bg: string; text: string }> = {
  available: {
    label: 'Live',
    bg: 'var(--status-live-bg, #DCFCE7)',
    text: 'var(--status-live-text, #14532D)',
  },
  'under-offer': {
    label: 'Under Offer',
    bg: 'var(--status-active-bg, #FEF3C7)',
    text: 'var(--status-active-text, #92400E)',
  },
  sold: {
    label: 'Completed',
    bg: 'var(--status-progress-bg, #DBEAFE)',
    text: 'var(--status-progress-text, #1E3A8A)',
  },
  'off-market': {
    label: 'Off-Market',
    bg: 'rgba(15, 30, 71, 0.08)',
    text: '#14224F',
  },
}

function toNumber(v: string | number | null | undefined): number | null {
  if (v === null || v === undefined || v === '') return null
  const n = typeof v === 'number' ? v : Number(v)
  return Number.isFinite(n) ? n : null
}

export default function PortfolioCardPreview(props: Props) {
  const {
    title,
    description,
    status = 'available',
    type,
    tenure,
    town,
    county,
    bedrooms,
    bathrooms,
    square_footage,
    price,
    key_features = [],
    images = [],
  } = props

  const sm = statusMeta[status] ?? statusMeta.available
  const location = [town, county].filter(Boolean).join(', ') || null
  const cover = images[0]
  const features = key_features.filter(Boolean).slice(0, 4)

  const meta: { label: string; value: string }[] = []
  if (type) meta.push({ label: 'Type', value: type })
  if (tenure) meta.push({ label: 'Tenure', value: tenure })
  const bedsNum = toNumber(bedrooms ?? null)
  if (bedsNum !== null) meta.push({ label: 'Bedrooms', value: String(bedsNum) })
  const bathsNum = toNumber(bathrooms ?? null)
  if (bathsNum !== null) meta.push({ label: 'Bathrooms', value: String(bathsNum) })
  const sqftNum = toNumber(square_footage ?? null)
  if (sqftNum !== null)
    meta.push({ label: 'Sq Ft', value: sqftNum.toLocaleString('en-GB') })
  const priceNum = toNumber(price ?? null)
  if (priceNum !== null)
    meta.push({
      label: 'Purchase price',
      value: formatPrice(priceNum),
    })

  return (
    <section
      className="rounded-card overflow-hidden"
      style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)' }}
    >
      {/* Preview header */}
      <div
        className="flex items-center gap-2 px-5 py-3 border-b"
        style={{ borderColor: 'var(--border)', background: 'var(--bg-elevated)' }}
      >
        <Eye size={14} style={{ color: 'var(--accent)' }} />
        <p
          className="text-[11px] font-semibold uppercase tracking-[0.18em]"
          style={{ color: 'var(--accent)' }}
        >
          Portfolio card preview
        </p>
        <span
          className="ml-auto text-[10px] font-medium"
          style={{ color: 'var(--text-muted)' }}
        >
          As it will appear on /portfolio
        </span>
      </div>

      {/* The actual card preview — cream surface to match the site */}
      <div style={{ background: '#F5F1E8' }} className="p-5 md:p-8">
        <article
          className="rounded-card overflow-hidden"
          style={{
            background: '#FFFFFF',
            border: '1px solid rgba(15, 30, 71, 0.12)',
          }}
        >
          {/* Header band */}
          <div
            className="grid grid-cols-[80px_1fr] md:grid-cols-[140px_1fr]"
            style={{ borderBottom: '1px solid rgba(15, 30, 71, 0.12)' }}
          >
            <div
              className="flex items-center justify-center py-5 md:py-8"
              style={{ backgroundColor: '#14224F' }}
            >
              <p
                style={{
                  fontFamily: 'var(--font-serif), Georgia, serif',
                  color: 'rgba(91, 155, 255, 0.7)',
                  fontSize: 'clamp(40px, 5vw, 64px)',
                  lineHeight: 1,
                }}
              >
                01
              </p>
            </div>
            <div className="p-5 md:p-7 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div className="min-w-0">
                {location && (
                  <p
                    className="text-[10px] font-semibold uppercase tracking-[0.18em] mb-1.5"
                    style={{ color: '#7E8398' }}
                  >
                    {location}
                  </p>
                )}
                <h3
                  style={{
                    fontFamily: 'var(--font-serif), Georgia, serif',
                    color: '#0F1E47',
                    fontSize: 'clamp(20px, 2.2vw, 28px)',
                    lineHeight: 1.15,
                  }}
                  className="truncate"
                >
                  {title || 'Untitled deal'}
                </h3>
              </div>
              <span
                className="self-start inline-flex items-center text-[10px] font-semibold uppercase tracking-[0.15em] rounded-full px-3 py-1.5 whitespace-nowrap"
                style={{ backgroundColor: sm.bg, color: sm.text }}
              >
                {sm.label}
              </span>
            </div>
          </div>

          {/* Body */}
          <div className="grid grid-cols-1 md:grid-cols-[1fr_220px]">
            <div
              className="p-5 md:p-7 space-y-5 border-b md:border-b-0 md:border-r"
              style={{ borderColor: 'rgba(15, 30, 71, 0.12)' }}
            >
              {cover ? (
                <div
                  className="relative w-full overflow-hidden rounded-card"
                  style={{
                    aspectRatio: '16 / 9',
                    backgroundColor: 'rgba(15, 30, 71, 0.04)',
                  }}
                >
                  <Image
                    src={cover}
                    alt={title || 'Property cover'}
                    fill
                    sizes="(max-width: 768px) 100vw, 500px"
                    className="object-cover"
                  />
                </div>
              ) : (
                <div
                  className="relative w-full overflow-hidden rounded-card flex items-center justify-center"
                  style={{
                    aspectRatio: '16 / 9',
                    backgroundColor: 'rgba(15, 30, 71, 0.04)',
                    border: '1px dashed rgba(15, 30, 71, 0.12)',
                  }}
                >
                  <p className="text-xs" style={{ color: '#7E8398' }}>
                    Upload an image to set the cover
                  </p>
                </div>
              )}

              <div>
                <p
                  className="text-[10px] font-semibold uppercase tracking-[0.18em] mb-2"
                  style={{ color: '#7E8398' }}
                >
                  Notes
                </p>
                <p
                  className="text-sm leading-relaxed whitespace-pre-line"
                  style={{ color: description ? '#4A5170' : '#7E8398' }}
                >
                  {description ||
                    'Add a description and it’ll show here as the deal notes.'}
                </p>
              </div>

              {features.length > 0 && (
                <div>
                  <p
                    className="text-[10px] font-semibold uppercase tracking-[0.18em] mb-2"
                    style={{ color: '#7E8398' }}
                  >
                    Key features
                  </p>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-1.5 gap-x-5">
                    {features.map((f) => (
                      <li
                        key={f}
                        className="text-sm flex items-start gap-2"
                        style={{ color: '#4A5170' }}
                      >
                        <span
                          className="mt-2 inline-block h-1 w-1 flex-shrink-0 rounded-full"
                          style={{ backgroundColor: '#5B9BFF' }}
                        />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <div
              className="p-5 md:p-7"
              style={{ backgroundColor: 'rgba(239, 233, 218, 0.4)' }}
            >
              {meta.length > 0 ? (
                <dl className="space-y-3">
                  {meta.map((m) => (
                    <div key={m.label}>
                      <dt
                        className="text-[10px] font-semibold uppercase tracking-[0.18em] mb-0.5"
                        style={{ color: '#7E8398' }}
                      >
                        {m.label}
                      </dt>
                      <dd
                        className="text-sm font-medium"
                        style={{ color: '#0F1E47' }}
                      >
                        {m.value}
                      </dd>
                    </div>
                  ))}
                </dl>
              ) : (
                <p className="text-xs italic" style={{ color: '#7E8398' }}>
                  Sidebar fields (type, beds, price, etc.) appear here as you fill them in.
                </p>
              )}
            </div>
          </div>
        </article>
      </div>
    </section>
  )
}
