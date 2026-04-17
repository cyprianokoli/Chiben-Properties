'use client'

import { useState } from 'react'
import { X, Mail, Phone, ExternalLink } from 'lucide-react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import type { Enquiry } from '@/lib/supabase/types'

interface Props {
  enquiries: Enquiry[]
}

function typeLabel(type: string) {
  const map: Record<string, string> = {
    general: 'General',
    viewing: 'Viewing Request',
    valuation: 'Valuation',
    offer: 'Offer Enquiry',
  }
  return map[type] ?? type
}

export default function EnquiriesTable({ enquiries }: Props) {
  const router = useRouter()
  const [selected, setSelected] = useState<Enquiry | null>(null)
  const [filter, setFilter] = useState('')
  const [search, setSearch] = useState('')

  const filtered = enquiries.filter(e => {
    if (filter && e.inquiry_type !== filter) return false
    if (search) {
      const q = search.toLowerCase()
      return (
        e.name.toLowerCase().includes(q) ||
        e.email.toLowerCase().includes(q) ||
        (e.property_slug ?? '').toLowerCase().includes(q)
      )
    }
    return true
  })

  async function markRead(enq: Enquiry) {
    if (enq.is_read) return
    const supabase = createClient()
    await supabase.from('enquiries').update({ is_read: true }).eq('id', enq.id)
    router.refresh()
  }

  function open(enq: Enquiry) {
    setSelected(enq)
    markRead(enq)
  }

  return (
    <>
      {/* Filters */}
      <div className="mb-6 flex flex-wrap gap-3">
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search by name, email, property…"
          className="h-9 rounded-btn border bg-[var(--bg-surface)] px-3 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:border-[var(--accent)] focus:outline-none transition-colors"
          style={{ borderColor: 'var(--border)', minWidth: '220px' }}
        />
        <select
          value={filter}
          onChange={e => setFilter(e.target.value)}
          className="h-9 rounded-btn border bg-[var(--bg-surface)] px-3 text-sm text-[var(--text-primary)] focus:border-[var(--accent)] focus:outline-none"
          style={{ borderColor: 'var(--border)' }}
        >
          <option value="">All Types</option>
          <option value="general">General</option>
          <option value="viewing">Viewing Request</option>
          <option value="valuation">Valuation</option>
          <option value="offer">Offer Enquiry</option>
        </select>
      </div>

      {/* Table */}
      <div
        className="rounded-card overflow-hidden"
        style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)' }}
      >
        {filtered.length === 0 ? (
          <div className="py-20 text-center text-sm" style={{ color: 'var(--text-muted)' }}>
            No enquiries found.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border)' }}>
                  {['Name', 'Email', 'Property', 'Type', 'Date', 'Status'].map(h => (
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
                {filtered.map(enq => (
                  <tr
                    key={enq.id}
                    onClick={() => open(enq)}
                    className="cursor-pointer transition-colors hover:bg-[var(--bg-elevated)]"
                    style={{ borderBottom: '1px solid var(--border)' }}
                  >
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div
                          className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full text-xs font-bold uppercase"
                          style={{ background: 'var(--accent-bg)', color: 'var(--accent)' }}
                        >
                          {enq.name.slice(0, 2)}
                        </div>
                        <span
                          className="font-medium"
                          style={{ color: enq.is_read ? 'var(--text-secondary)' : 'var(--text-primary)' }}
                        >
                          {enq.name}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-3" style={{ color: 'var(--text-secondary)' }}>
                      {enq.email}
                    </td>
                    <td className="px-4 py-3" style={{ color: 'var(--text-secondary)' }}>
                      {enq.property_slug ? (
                        <span className="truncate max-w-[140px] block">{enq.property_slug}</span>
                      ) : (
                        <span style={{ color: 'var(--text-muted)' }}>—</span>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className="inline-block rounded-[6px] px-2 py-0.5 text-xs font-semibold uppercase tracking-[0.06em]"
                        style={{ background: 'var(--bg-elevated)', color: 'var(--text-secondary)' }}
                      >
                        {typeLabel(enq.inquiry_type)}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-xs" style={{ color: 'var(--text-muted)' }}>
                      {new Date(enq.created_at).toLocaleDateString('en-GB', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                      })}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className="inline-block rounded-[6px] px-2.5 py-1 text-xs font-semibold uppercase tracking-[0.06em]"
                        style={{
                          color: enq.is_read ? 'var(--text-muted)' : 'var(--status-available-text)',
                          background: enq.is_read ? 'var(--bg-elevated)' : 'var(--status-available-bg)',
                        }}
                      >
                        {enq.is_read ? 'Read' : 'New'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Slide-over detail panel */}
      {selected && (
        <>
          <div
            className="fixed inset-0 bg-black/40 z-40"
            onClick={() => setSelected(null)}
          />
          <aside
            className="fixed right-0 top-0 h-full w-full max-w-[440px] overflow-y-auto z-50 flex flex-col"
            style={{ background: 'var(--bg-surface)', borderLeft: '1px solid var(--border)' }}
          >
            <div
              className="flex items-center justify-between px-6 py-4 flex-shrink-0"
              style={{ borderBottom: '1px solid var(--border)' }}
            >
              <h3 className="font-semibold text-base" style={{ color: 'var(--text-primary)' }}>
                Enquiry Details
              </h3>
              <button
                onClick={() => setSelected(null)}
                className="flex h-8 w-8 items-center justify-center rounded-[6px] transition-all"
                style={{ color: 'var(--text-muted)', border: '1px solid var(--border)' }}
                aria-label="Close panel"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="flex-1 px-6 py-6 space-y-6">
              {/* Sender */}
              <div className="flex items-center gap-4">
                <div
                  className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full text-base font-bold uppercase"
                  style={{ background: 'var(--accent-bg)', color: 'var(--accent)' }}
                >
                  {selected.name.slice(0, 2)}
                </div>
                <div>
                  <p className="font-semibold text-base" style={{ color: 'var(--text-primary)' }}>
                    {selected.name}
                  </p>
                  <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
                    {new Date(selected.created_at).toLocaleString('en-GB', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </p>
                </div>
              </div>

              {/* Contact info */}
              <div
                className="rounded-card p-4 space-y-3"
                style={{ background: 'var(--bg-elevated)' }}
              >
                <div className="flex items-center gap-3 text-sm">
                  <Mail className="h-4 w-4 flex-shrink-0" style={{ color: 'var(--accent)' }} />
                  <a
                    href={`mailto:${selected.email}`}
                    className="transition-colors hover:underline"
                    style={{ color: 'var(--text-primary)' }}
                  >
                    {selected.email}
                  </a>
                </div>
                {selected.phone && (
                  <div className="flex items-center gap-3 text-sm">
                    <Phone className="h-4 w-4 flex-shrink-0" style={{ color: 'var(--accent)' }} />
                    <a
                      href={`tel:${selected.phone}`}
                      className="transition-colors hover:underline"
                      style={{ color: 'var(--text-primary)' }}
                    >
                      {selected.phone}
                    </a>
                  </div>
                )}
              </div>

              {/* Enquiry type badge */}
              <div className="flex items-center gap-2">
                <span
                  className="inline-block rounded-[6px] px-2.5 py-1 text-xs font-semibold uppercase tracking-[0.06em]"
                  style={{ background: 'var(--accent-bg)', color: 'var(--accent)' }}
                >
                  {typeLabel(selected.inquiry_type)}
                </span>
                <span
                  className="inline-block rounded-[6px] px-2.5 py-1 text-xs font-semibold uppercase tracking-[0.06em]"
                  style={{
                    color: selected.is_read ? 'var(--text-muted)' : 'var(--status-available-text)',
                    background: selected.is_read ? 'var(--bg-elevated)' : 'var(--status-available-bg)',
                  }}
                >
                  {selected.is_read ? 'Read' : 'New'}
                </span>
              </div>

              {/* Message */}
              {selected.message && (
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.08em] mb-2" style={{ color: 'var(--text-muted)' }}>
                    Message
                  </p>
                  <p className="text-sm leading-relaxed whitespace-pre-wrap" style={{ color: 'var(--text-primary)' }}>
                    {selected.message}
                  </p>
                </div>
              )}

              {/* Linked property */}
              {selected.property_slug && (
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.08em] mb-2" style={{ color: 'var(--text-muted)' }}>
                    Linked Property
                  </p>
                  <Link
                    href={`/properties/${selected.property_slug}`}
                    target="_blank"
                    className="flex items-center gap-2 text-sm transition-colors"
                    style={{ color: 'var(--accent)' }}
                  >
                    <ExternalLink className="h-3.5 w-3.5" />
                    {selected.property_slug}
                  </Link>
                </div>
              )}
            </div>

            {/* Actions */}
            <div
              className="flex gap-3 px-6 py-4 flex-shrink-0"
              style={{ borderTop: '1px solid var(--border)' }}
            >
              <a
                href={`mailto:${selected.email}`}
                className="flex-1 flex items-center justify-center gap-2 h-10 rounded-btn text-sm font-semibold transition-all"
                style={{ background: 'var(--btn-primary-bg)', color: 'var(--btn-primary-text)' }}
              >
                <Mail className="h-4 w-4" />
                Reply by Email
              </a>
            </div>
          </aside>
        </>
      )}
    </>
  )
}
