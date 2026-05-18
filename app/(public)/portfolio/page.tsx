import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import type { Metadata } from 'next'
import { createClient } from '@/lib/supabase/server'
import type { Property } from '@/lib/supabase/types'
import { formatPrice } from '@/lib/utils'
import CTABanner from '@/components/ui/CTABanner'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Portfolio',
  description:
    'The Chiben Properties live portfolio. Real deals across Northern England — owned, refurbishing, or under offer.',
}

const PAGE_SIZE = 10

async function getPortfolio(page: number): Promise<{
  properties: Property[]
  total: number
}> {
  try {
    const supabase = createClient()
    const from = (page - 1) * PAGE_SIZE
    const to = from + PAGE_SIZE - 1
    const { data, count } = await supabase
      .from('properties')
      .select('*', { count: 'exact' })
      .order('listed_at', { ascending: false })
      .range(from, to)
    return { properties: data ?? [], total: count ?? 0 }
  } catch {
    return { properties: [], total: 0 }
  }
}

const statusMeta: Record<
  string,
  { label: string; bg: string; text: string }
> = {
  available: {
    label: 'Live',
    bg: 'var(--status-live-bg)',
    text: 'var(--status-live-text)',
  },
  'under-offer': {
    label: 'Under Offer',
    bg: 'var(--status-active-bg)',
    text: 'var(--status-active-text)',
  },
  sold: {
    label: 'Completed',
    bg: 'var(--status-progress-bg)',
    text: 'var(--status-progress-text)',
  },
  'off-market': {
    label: 'Off-Market',
    bg: 'rgba(15, 30, 71, 0.08)',
    text: 'var(--navy)',
  },
}

function pad(n: number) {
  return String(n).padStart(2, '0')
}

function parsePage(raw: string | string[] | undefined): number {
  const n = Number(Array.isArray(raw) ? raw[0] : raw)
  if (!Number.isFinite(n) || n < 1) return 1
  return Math.floor(n)
}

interface PaginationProps {
  page: number
  totalPages: number
}

function Pagination({ page, totalPages }: PaginationProps) {
  if (totalPages <= 1) return null

  const pages: (number | 'ellipsis')[] = []
  const push = (v: number | 'ellipsis') => pages.push(v)

  // Always show first page
  push(1)

  // Window around the current page
  const windowStart = Math.max(2, page - 1)
  const windowEnd = Math.min(totalPages - 1, page + 1)

  if (windowStart > 2) push('ellipsis')
  for (let i = windowStart; i <= windowEnd; i++) push(i)
  if (windowEnd < totalPages - 1) push('ellipsis')

  // Always show last page (if more than one)
  if (totalPages > 1) push(totalPages)

  const prevHref = page > 1 ? `/portfolio?page=${page - 1}` : null
  const nextHref = page < totalPages ? `/portfolio?page=${page + 1}` : null

  const linkBase =
    'inline-flex items-center justify-center min-w-[40px] h-10 px-3 rounded-btn text-sm font-medium transition-all'

  return (
    <nav
      aria-label="Portfolio pagination"
      className="mt-12 md:mt-16 flex flex-col gap-5 items-center"
    >
      <div className="flex flex-wrap items-center justify-center gap-2">
        {prevHref ? (
          <Link
            href={prevHref}
            className={`${linkBase} border border-[var(--border)] bg-[var(--bg-surface)] text-[var(--text-primary)] hover:border-[var(--border-gold)] hover:text-[var(--accent)]`}
            aria-label="Previous page"
          >
            <ArrowLeft size={16} />
            <span className="ml-2 hidden sm:inline">Previous</span>
          </Link>
        ) : (
          <span
            className={`${linkBase} border border-[var(--border)] text-[var(--text-muted)] cursor-not-allowed`}
            aria-disabled
          >
            <ArrowLeft size={16} />
            <span className="ml-2 hidden sm:inline">Previous</span>
          </span>
        )}

        {pages.map((p, i) =>
          p === 'ellipsis' ? (
            <span
              key={`e-${i}`}
              className="inline-flex items-center justify-center min-w-[40px] h-10 px-1 text-sm text-[var(--text-muted)]"
            >
              …
            </span>
          ) : p === page ? (
            <span
              key={p}
              aria-current="page"
              className={`${linkBase} border`}
              style={{
                background: 'var(--accent)',
                color: 'var(--navy-deep)',
                borderColor: 'var(--accent)',
              }}
            >
              {p}
            </span>
          ) : (
            <Link
              key={p}
              href={`/portfolio?page=${p}`}
              className={`${linkBase} border border-[var(--border)] bg-[var(--bg-surface)] text-[var(--text-primary)] hover:border-[var(--border-gold)] hover:text-[var(--accent)]`}
            >
              {p}
            </Link>
          )
        )}

        {nextHref ? (
          <Link
            href={nextHref}
            className={`${linkBase} border border-[var(--border)] bg-[var(--bg-surface)] text-[var(--text-primary)] hover:border-[var(--border-gold)] hover:text-[var(--accent)]`}
            aria-label="Next page"
          >
            <span className="mr-2 hidden sm:inline">Next</span>
            <ArrowRight size={16} />
          </Link>
        ) : (
          <span
            className={`${linkBase} border border-[var(--border)] text-[var(--text-muted)] cursor-not-allowed`}
            aria-disabled
          >
            <span className="mr-2 hidden sm:inline">Next</span>
            <ArrowRight size={16} />
          </span>
        )}
      </div>

      <p className="text-xs text-[var(--text-muted)]">
        Page {page} of {totalPages}
      </p>
    </nav>
  )
}

interface Props {
  searchParams: { page?: string | string[] }
}

export default async function PortfolioPage({ searchParams }: Props) {
  const requested = parsePage(searchParams.page)
  const { properties, total } = await getPortfolio(requested)
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE))
  const page = Math.min(requested, totalPages)

  const startIndex = (page - 1) * PAGE_SIZE

  return (
    <>
      {/* Hero — navy */}
      <section className="navy-grid relative overflow-hidden">
        <div className="absolute top-8 right-6 md:top-12 md:right-12 text-[120px] md:text-[200px] leading-none font-serif text-white/[0.04] select-none pointer-events-none">
          04
        </div>
        <div className="relative mx-auto max-w-7xl px-4 md:px-6 lg:px-8 py-24 md:py-32">
          <div className="mb-4 flex items-center gap-1.5 text-xs text-[var(--text-on-navy-muted)]">
            <Link href="/" className="hover:text-[var(--gold)] transition-colors">
              Home
            </Link>
            <span>/</span>
            <span className="text-[var(--text-on-navy)]">Portfolio</span>
          </div>

          <div className="max-w-3xl mt-10">
            <p className="eyebrow-light mb-6">Live portfolio</p>
            <h1 className="h1 text-[var(--text-on-navy)] mb-7">
              The deals. <em>All real.</em> All current.
            </h1>
            <p className="text-lg md:text-xl text-[var(--text-on-navy-muted)] leading-relaxed max-w-2xl">
              A snapshot of what Chiben currently owns, refurbishes, or has under
              offer. We update this page as deals close, complete or refinance.
            </p>
          </div>
        </div>
      </section>

      {/* Deals */}
      <section className="bg-[var(--bg-page)]">
        <div className="mx-auto max-w-6xl px-4 md:px-6 lg:px-8 py-20 md:py-28">
          {total === 0 ? (
            <div className="rounded-card border border-[var(--border)] bg-[var(--bg-surface)] p-12 md:p-16 text-center">
              <p className="eyebrow mb-4">Pipeline updating</p>
              <h2 className="font-serif text-3xl md:text-4xl text-[var(--text-primary)] mb-4">
                Deals coming online.
              </h2>
              <p className="text-[var(--text-secondary)] leading-relaxed max-w-lg mx-auto mb-8">
                We&apos;ll list each deal here as it goes live. To see the
                current pipeline, request the investor pack.
              </p>
              <Link
                href="/invest"
                className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--accent)] hover:gap-3 transition-all"
              >
                Request investor pack →
              </Link>
            </div>
          ) : (
            <>
              <div className="mb-10 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                <p className="text-sm text-[var(--text-muted)]">
                  Showing{' '}
                  <span className="font-medium text-[var(--text-primary)]">
                    {startIndex + 1}–{Math.min(startIndex + properties.length, total)}
                  </span>{' '}
                  of{' '}
                  <span className="font-medium text-[var(--text-primary)]">
                    {total}
                  </span>{' '}
                  {total === 1 ? 'deal' : 'deals'}
                </p>
              </div>

              <div className="space-y-12 md:space-y-16">
                {properties.map((p, i) => {
                  const sm = statusMeta[p.status] ?? statusMeta['available']
                  const location =
                    [p.town, p.county].filter(Boolean).join(', ') || null
                  const features = (p.key_features ?? []).slice(0, 4)

                  const meta: { label: string; value: string }[] = []
                  if (p.type) meta.push({ label: 'Type', value: p.type })
                  if (p.tenure) meta.push({ label: 'Tenure', value: p.tenure })
                  if (p.bedrooms != null)
                    meta.push({
                      label: 'Bedrooms',
                      value: String(p.bedrooms),
                    })
                  if (p.bathrooms != null)
                    meta.push({
                      label: 'Bathrooms',
                      value: String(p.bathrooms),
                    })
                  if (p.square_footage != null)
                    meta.push({
                      label: 'Sq Ft',
                      value: p.square_footage.toLocaleString('en-GB'),
                    })
                  if (p.price != null)
                    meta.push({
                      label: p.price_qualifier ?? 'Price',
                      value: formatPrice(p.price),
                    })

                  const dealNumber = startIndex + i + 1

                  return (
                    <article
                      key={p.id}
                      className="rounded-card border border-[var(--border)] bg-[var(--bg-surface)] overflow-hidden"
                    >
                      {/* Header band */}
                      <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] border-b border-[var(--border)]">
                        <div
                          className="flex items-center justify-center py-8 md:py-12 px-6"
                          style={{ backgroundColor: 'var(--navy)' }}
                        >
                          <p className="font-serif text-6xl md:text-7xl text-[var(--gold)]/70 leading-none">
                            {pad(dealNumber)}
                          </p>
                        </div>
                        <div className="p-8 md:p-10 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                          <div>
                            {location && (
                              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--text-muted)] mb-2">
                                {location}
                              </p>
                            )}
                            <h2 className="font-serif text-3xl md:text-4xl text-[var(--text-primary)]">
                              {p.title}
                            </h2>
                          </div>
                          <span
                            className="self-start inline-flex items-center text-[11px] font-semibold uppercase tracking-[0.15em] rounded-full px-4 py-2"
                            style={{ backgroundColor: sm.bg, color: sm.text }}
                          >
                            {sm.label}
                          </span>
                        </div>
                      </div>

                      {/* Body */}
                      <div className="grid grid-cols-1 md:grid-cols-[1fr_320px]">
                        <div className="p-8 md:p-10 border-b md:border-b-0 md:border-r border-[var(--border)] space-y-6">
                          {p.cover_image && (
                            <div className="relative aspect-[16/9] rounded-card overflow-hidden bg-[var(--bg-elevated)]">
                              <Image
                                src={p.cover_image}
                                alt={p.title}
                                fill
                                sizes="(max-width: 768px) 100vw, 60vw"
                                className="object-cover"
                              />
                            </div>
                          )}

                          {p.description && (
                            <div>
                              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--text-muted)] mb-3">
                                Notes
                              </p>
                              <p className="text-[var(--text-secondary)] leading-relaxed text-base md:text-lg whitespace-pre-line">
                                {p.description}
                              </p>
                            </div>
                          )}

                          {features.length > 0 && (
                            <div>
                              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--text-muted)] mb-3">
                                Key features
                              </p>
                              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-6">
                                {features.map((f) => (
                                  <li
                                    key={f}
                                    className="text-sm text-[var(--text-secondary)] flex items-start gap-2"
                                  >
                                    <span className="mt-2 inline-block h-1 w-1 flex-shrink-0 rounded-full bg-[var(--accent)]" />
                                    {f}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>

                        <div className="p-8 md:p-10 bg-[var(--bg-elevated)]/40">
                          {meta.length > 0 ? (
                            <dl className="space-y-4">
                              {meta.map((m) => (
                                <div key={m.label}>
                                  <dt className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--text-muted)] mb-1">
                                    {m.label}
                                  </dt>
                                  <dd className="text-sm font-medium text-[var(--text-primary)]">
                                    {m.value}
                                  </dd>
                                </div>
                              ))}
                            </dl>
                          ) : (
                            <p className="text-sm text-[var(--text-muted)] italic">
                              Full underwriting available on request.
                            </p>
                          )}
                        </div>
                      </div>
                    </article>
                  )
                })}
              </div>

              <Pagination page={page} totalPages={totalPages} />
            </>
          )}
        </div>
      </section>

      <CTABanner
        eyebrow="Investor pack"
        headline={
          <>
            Looking for the full <em>deal-by-deal breakdown?</em>
          </>
        }
        body="Investors on our list receive full underwriting on every deal — assumptions, comparables, projected returns and downside scenarios."
        primary={{ label: 'Request investor pack', href: '/invest' }}
        secondary={{ label: 'Book a Call', href: '/contact' }}
      />
    </>
  )
}
