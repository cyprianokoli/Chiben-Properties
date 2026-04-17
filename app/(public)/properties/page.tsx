import { Suspense } from 'react'
import Link from 'next/link'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import type { Metadata } from 'next'

export const dynamic = 'force-dynamic'
import PropertyGrid from '@/components/properties/PropertyGrid'
import SearchBar from '@/components/properties/SearchBar'
import { createClient } from '@/lib/supabase/server'
import type { Property } from '@/lib/supabase/types'

export const metadata: Metadata = {
  title: 'Properties',
  description: 'Browse our full portfolio of premium properties across the United Kingdom.',
}

const PAGE_SIZE = 9

interface SearchParams {
  location?: string
  type?: string
  maxPrice?: string
  beds?: string
  status?: string
  featured?: string
  page?: string
}

async function getProperties(params: SearchParams): Promise<{ properties: Property[]; count: number }> {
  try {
    const supabase = createClient()
    const page = Number(params.page ?? 1)
    const from = (page - 1) * PAGE_SIZE
    const to = from + PAGE_SIZE - 1

    let query = supabase
      .from('properties')
      .select('*', { count: 'exact' })
      .range(from, to)
      .order('listed_at', { ascending: false })

    if (params.status) query = query.eq('status', params.status)
    else query = query.neq('status', 'sold')

    if (params.type) query = query.eq('type', params.type)
    if (params.maxPrice) query = query.lte('price', Number(params.maxPrice))
    if (params.beds) query = query.gte('bedrooms', Number(params.beds))
    if (params.featured === 'true') query = query.eq('is_featured', true)
    if (params.location) {
      query = query.or(
        `town.ilike.%${params.location}%,county.ilike.%${params.location}%,postcode.ilike.%${params.location}%`
      )
    }

    const { data, count } = await query
    return { properties: data ?? [], count: count ?? 0 }
  } catch {
    return { properties: [], count: 0 }
  }
}

export default async function PropertiesPage({
  searchParams,
}: {
  searchParams: SearchParams
}) {
  const page = Number(searchParams.page ?? 1)
  const { properties, count } = await getProperties(searchParams)
  const totalPages = Math.ceil(count / PAGE_SIZE)

  const buildPageUrl = (p: number) => {
    const params = new URLSearchParams()
    if (searchParams.location) params.set('location', searchParams.location)
    if (searchParams.type) params.set('type', searchParams.type)
    if (searchParams.maxPrice) params.set('maxPrice', searchParams.maxPrice)
    if (searchParams.beds) params.set('beds', searchParams.beds)
    if (p > 1) params.set('page', String(p))
    return `/properties${params.toString() ? `?${params}` : ''}`
  }

  return (
    <>
      {/* Hero */}
      <section className="bg-[var(--bg-surface)] border-b border-[var(--border)]">
        <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8 py-10 md:py-14">
          <div className="mb-2 flex items-center gap-1.5 text-xs text-[var(--text-muted)]">
            <Link href="/" className="hover:text-[var(--accent)] transition-colors">Home</Link>
            <span>/</span>
            <span className="text-[var(--text-primary)]">Properties</span>
          </div>
          <div className="mb-8">
            <p className="eyebrow mb-2">Our Portfolio</p>
            <h1 className="h2 text-[var(--text-primary)]">
              Properties for <em>Sale</em>
            </h1>
            {count > 0 && (
              <p className="mt-2 text-sm text-[var(--text-muted)]">
                {count} {count === 1 ? 'property' : 'properties'} found
              </p>
            )}
          </div>

          <Suspense>
            <SearchBar />
          </Suspense>
        </div>
      </section>

      {/* Listings */}
      <section className="bg-[var(--bg-page)]">
        <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8 py-10 md:py-14">
          <PropertyGrid properties={properties} />

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-10 flex items-center justify-center gap-2">
              {page > 1 && (
                <Link href={buildPageUrl(page - 1)}>
                  <button className="flex h-9 w-9 items-center justify-center rounded-btn border border-[var(--border)] bg-[var(--bg-surface)] text-[var(--text-secondary)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors">
                    <ChevronLeft size={16} />
                  </button>
                </Link>
              )}
              {Array.from({ length: Math.min(totalPages, 7) }, (_, i) => {
                const p = i + 1
                return (
                  <Link key={p} href={buildPageUrl(p)}>
                    <button
                      className={`flex h-9 w-9 items-center justify-center rounded-btn border text-sm font-medium transition-colors ${
                        p === page
                          ? 'border-[var(--accent)] bg-[var(--accent)] text-white'
                          : 'border-[var(--border)] bg-[var(--bg-surface)] text-[var(--text-secondary)] hover:border-[var(--accent)] hover:text-[var(--accent)]'
                      }`}
                    >
                      {p}
                    </button>
                  </Link>
                )
              })}
              {totalPages > 7 && page < totalPages - 3 && (
                <>
                  <span className="text-[var(--text-muted)]">…</span>
                  <Link href={buildPageUrl(totalPages)}>
                    <button className="flex h-9 w-9 items-center justify-center rounded-btn border border-[var(--border)] bg-[var(--bg-surface)] text-sm font-medium text-[var(--text-secondary)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors">
                      {totalPages}
                    </button>
                  </Link>
                </>
              )}
              {page < totalPages && (
                <Link href={buildPageUrl(page + 1)}>
                  <button className="flex h-9 w-9 items-center justify-center rounded-btn border border-[var(--border)] bg-[var(--bg-surface)] text-[var(--text-secondary)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors">
                    <ChevronRight size={16} />
                  </button>
                </Link>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Valuation CTA */}
      <section style={{ backgroundColor: '#0F1117' }} className="py-14 md:py-20">
        <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="eyebrow mb-2" style={{ color: '#C9A96E' }}>Know Your Worth</p>
              <h2
                className="font-bold mb-2"
                style={{ fontSize: 'clamp(24px, 3vw, 40px)', color: '#F1F0EC' }}
              >
                Thinking of Selling?
              </h2>
              <p style={{ color: 'rgba(241,240,236,0.65)' }} className="max-w-md text-sm leading-relaxed">
                Get an expert valuation from our senior team. Free, no-obligation, and based on real market data.
              </p>
            </div>
            <Link href="/contact">
              <button
                className="inline-flex h-[52px] items-center justify-center gap-2 whitespace-nowrap rounded-btn px-8 font-semibold text-base transition-all hover:opacity-90"
                style={{ backgroundColor: '#C9A96E', color: '#0F1117' }}
              >
                Book a Free Valuation
              </button>
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
