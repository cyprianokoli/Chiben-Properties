import { createClient } from '@/lib/supabase/server'
import type { Property } from '@/lib/supabase/types'
import { formatPrice, slugify } from '@/lib/utils'
import { route } from '@/lib/routes'

// Public pages read listings straight from Supabase on every request, so any
// change made in the admin dashboard shows up immediately.

export function propertySlug(p: Pick<Property, 'slug' | 'id'>): string {
  return slugify(p.slug ?? '') || p.id
}

export function propertyHref(p: Pick<Property, 'slug' | 'id'>): string {
  return route(`/portfolio/${propertySlug(p)}`)
}

export function propertyLocation(p: Pick<Property, 'town' | 'county'>): string {
  // Dedupe so town === county doesn't read "Hull, Hull"
  return Array.from(new Set([p.town, p.county].filter(Boolean))).join(', ')
}

export async function getProperties(opts: { limit: number; offset?: number }): Promise<{
  properties: Property[]
  total: number
}> {
  try {
    const supabase = createClient()
    const from = opts.offset ?? 0
    const { data, count, error } = await supabase
      .from('properties')
      .select('*', { count: 'exact' })
      .order('is_featured', { ascending: false })
      .order('listed_at', { ascending: false })
      .range(from, from + opts.limit - 1)
    if (error) throw error
    return { properties: (data as Property[] | null) ?? [], total: count ?? 0 }
  } catch (err) {
    console.error('getProperties failed:', err instanceof Error ? err.message : err)
    return { properties: [], total: 0 }
  }
}

export async function getPropertyBySlug(slug: string): Promise<Property | null> {
  try {
    const supabase = createClient()
    const { data, error } = await supabase.from('properties').select('*')
    if (error) throw error
    const wanted = slugify(decodeURIComponent(slug))
    return ((data as Property[] | null) ?? []).find((p) => propertySlug(p) === wanted || p.id === slug) ?? null
  } catch (err) {
    console.error('getPropertyBySlug failed:', err instanceof Error ? err.message : err)
    return null
  }
}

export interface DealFigure {
  label: string
  value: string
}

// Only figures that have been filled in on the dashboard are shown
export function dealFigures(p: Property): DealFigure[] {
  const figures: DealFigure[] = []
  if (p.price != null) figures.push({ label: 'Purchase price', value: formatPrice(p.price) })
  if (p.refurb_cost != null) figures.push({ label: 'Refurb cost', value: formatPrice(p.refurb_cost) })
  if (p.monthly_rent != null) figures.push({ label: 'Monthly rent', value: formatPrice(p.monthly_rent) })
  if (p.gross_yield != null)
    figures.push({
      label: 'Gross yield',
      value: `${Number(p.gross_yield).toLocaleString('en-GB', { maximumFractionDigits: 2 })}%`,
    })
  return figures
}
