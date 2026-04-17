import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import Image from 'next/image'
import { Pencil, Plus } from 'lucide-react'
import Badge, { statusToBadgeVariant } from '@/components/ui/Badge'
import { formatPrice } from '@/lib/utils'
import DeletePropertyButton from '@/components/admin/DeletePropertyButton'

export const metadata = { title: 'Properties | Admin' }

interface Props {
  searchParams: { status?: string; type?: string; q?: string }
}

export default async function AdminPropertiesPage({ searchParams }: Props) {
  const supabase = createClient()

  let query = supabase
    .from('properties')
    .select('id, slug, title, town, county, price, status, type, bedrooms, cover_image, listed_at')
    .order('listed_at', { ascending: false })

  if (searchParams.status) query = query.eq('status', searchParams.status)
  if (searchParams.type) query = query.eq('type', searchParams.type)
  if (searchParams.q) query = query.ilike('title', `%${searchParams.q}%`)

  const { data: properties } = await query

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
        <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
          {properties?.length ?? 0} properties
        </p>
        <div className="flex flex-wrap gap-3 sm:ml-auto">
          <form className="flex gap-2 flex-wrap">
            <input
              name="q"
              defaultValue={searchParams.q}
              placeholder="Search properties…"
              className="h-9 rounded-btn border bg-[var(--bg-surface)] px-3 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:border-[var(--accent)] focus:outline-none"
              style={{ borderColor: 'var(--border)', minWidth: '200px' }}
            />
            <select
              name="status"
              defaultValue={searchParams.status ?? ''}
              className="h-9 rounded-btn border bg-[var(--bg-surface)] px-3 text-sm text-[var(--text-primary)] focus:border-[var(--accent)] focus:outline-none"
              style={{ borderColor: 'var(--border)' }}
            >
              <option value="">All Statuses</option>
              <option value="available">Available</option>
              <option value="under-offer">Under Offer</option>
              <option value="sold">Sold</option>
              <option value="off-market">Off Market</option>
            </select>
            <select
              name="type"
              defaultValue={searchParams.type ?? ''}
              className="h-9 rounded-btn border bg-[var(--bg-surface)] px-3 text-sm text-[var(--text-primary)] focus:border-[var(--accent)] focus:outline-none"
              style={{ borderColor: 'var(--border)' }}
            >
              <option value="">All Types</option>
              <option value="Detached">Detached</option>
              <option value="Semi-Detached">Semi-Detached</option>
              <option value="Terraced">Terraced</option>
              <option value="Flat">Flat</option>
              <option value="Bungalow">Bungalow</option>
              <option value="Commercial">Commercial</option>
            </select>
            <button
              type="submit"
              className="h-9 rounded-btn px-4 text-sm font-semibold transition-all"
              style={{ background: 'var(--bg-elevated)', color: 'var(--text-primary)', border: '1px solid var(--border)' }}
            >
              Filter
            </button>
            {(searchParams.status || searchParams.type || searchParams.q) && (
              <Link
                href="/admin/properties"
                className="h-9 flex items-center rounded-btn px-4 text-sm transition-colors"
                style={{ color: 'var(--text-muted)' }}
              >
                Clear
              </Link>
            )}
          </form>
        </div>
      </div>

      <div
        className="rounded-card overflow-hidden"
        style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)' }}
      >
        {!properties || properties.length === 0 ? (
          <div className="flex flex-col items-center gap-4 py-20 text-center">
            <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
              No properties found.
            </p>
            <Link href="/admin/properties/new">
              <button
                className="flex items-center gap-2 h-9 rounded-btn px-4 text-sm font-semibold transition-all"
                style={{ background: 'var(--btn-primary-bg)', color: 'var(--btn-primary-text)' }}
              >
                <Plus className="h-4 w-4" />
                Add First Property
              </button>
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border)' }}>
                  {['Property', 'Location', 'Price', 'Beds', 'Status', 'Listed', 'Actions'].map(h => (
                    <th
                      key={h}
                      className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-[0.08em]"
                      style={{ color: 'var(--text-muted)' }}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {properties.map(p => (
                  <tr
                    key={p.id}
                    className="transition-colors"
                    style={{ borderBottom: '1px solid var(--border)' }}
                    onMouseOver={() => {}}
                  >
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-14 flex-shrink-0 overflow-hidden rounded-[6px] bg-[var(--bg-elevated)]">
                          {p.cover_image ? (
                            <Image
                              src={p.cover_image}
                              alt={p.title}
                              width={56}
                              height={40}
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            <div className="h-full w-full" />
                          )}
                        </div>
                        <span className="font-medium max-w-[180px] truncate" style={{ color: 'var(--text-primary)' }}>
                          {p.title}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-3" style={{ color: 'var(--text-secondary)' }}>
                      {[p.town, p.county].filter(Boolean).join(', ') || '—'}
                    </td>
                    <td className="px-4 py-3 font-semibold" style={{ color: 'var(--accent)' }}>
                      {p.price ? formatPrice(p.price) : '—'}
                    </td>
                    <td className="px-4 py-3" style={{ color: 'var(--text-secondary)' }}>
                      {p.bedrooms ?? '—'}
                    </td>
                    <td className="px-4 py-3">
                      <Badge variant={statusToBadgeVariant(p.status)} />
                    </td>
                    <td className="px-4 py-3 text-xs" style={{ color: 'var(--text-muted)' }}>
                      {new Date(p.listed_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <Link
                          href={`/admin/properties/${p.id}/edit`}
                          className="flex h-8 w-8 items-center justify-center rounded-[6px] transition-all"
                          style={{ color: 'var(--text-muted)', border: '1px solid var(--border)' }}
                          aria-label="Edit property"
                        >
                          <Pencil className="h-3.5 w-3.5" />
                        </Link>
                        <DeletePropertyButton id={p.id} title={p.title} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
