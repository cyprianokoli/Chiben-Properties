import { createClient } from '@/lib/supabase/server'
import { Building2, ListChecks, MessageSquare, TrendingUp } from 'lucide-react'
import Link from 'next/link'

export const metadata = { title: 'Dashboard | Admin' }

export default async function DashboardPage() {
  const supabase = createClient()

  const [
    { count: totalProperties },
    { count: availableListings },
    { count: unreadEnquiries },
    { count: featuredProperties },
    { data: recentEnquiries },
  ] = await Promise.all([
    supabase.from('properties').select('*', { count: 'exact', head: true }),
    supabase.from('properties').select('*', { count: 'exact', head: true }).eq('status', 'available'),
    supabase.from('enquiries').select('*', { count: 'exact', head: true }).eq('is_read', false),
    supabase.from('properties').select('*', { count: 'exact', head: true }).eq('is_featured', true),
    supabase
      .from('enquiries')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(5),
  ])

  const stats = [
    {
      label: 'Total Properties',
      value: totalProperties ?? 0,
      icon: Building2,
      href: '/admin/properties',
    },
    {
      label: 'Available Listings',
      value: availableListings ?? 0,
      icon: ListChecks,
      href: '/admin/properties',
    },
    {
      label: 'Unread Enquiries',
      value: unreadEnquiries ?? 0,
      icon: MessageSquare,
      href: '/admin/enquiries',
      highlight: (unreadEnquiries ?? 0) > 0,
    },
    {
      label: 'Featured Properties',
      value: featuredProperties ?? 0,
      icon: TrendingUp,
      href: '/admin/properties',
    },
  ]

  return (
    <div className="space-y-8">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.18em] mb-1" style={{ color: 'var(--accent)' }}>
          Overview
        </p>
        <h2 className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>
          Welcome back, Administrator
        </h2>
        <p className="mt-1 text-sm" style={{ color: 'var(--text-muted)' }}>
          {new Date().toLocaleDateString('en-GB', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
        </p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {stats.map(({ label, value, icon: Icon, href, highlight }) => (
          <Link
            key={label}
            href={href}
            className="rounded-card p-5 flex items-start gap-4 transition-all duration-200 hover:-translate-y-1"
            style={{
              background: 'var(--bg-surface)',
              border: `1px solid ${highlight ? 'var(--border-gold)' : 'var(--border)'}`,
            }}
          >
            <div
              className="flex h-10 w-10 items-center justify-center rounded-[8px] flex-shrink-0"
              style={{ background: 'var(--accent-bg)' }}
            >
              <Icon className="h-5 w-5" style={{ color: 'var(--accent)' }} />
            </div>
            <div>
              <p className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>
                {value}
              </p>
              <p className="text-sm mt-0.5" style={{ color: 'var(--text-muted)' }}>
                {label}
              </p>
            </div>
          </Link>
        ))}
      </div>

      {/* Quick actions */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { label: 'Add New Property', href: '/admin/properties/new', desc: 'List a property on the site' },
          { label: 'View Enquiries', href: '/admin/enquiries', desc: 'Manage incoming enquiries' },
          { label: 'All Properties', href: '/admin/properties', desc: 'Browse and edit listings' },
        ].map(({ label, href, desc }) => (
          <Link
            key={href}
            href={href}
            className="rounded-card p-5 transition-all duration-200 hover:border-[var(--border-gold)] hover:-translate-y-1"
            style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)' }}
          >
            <p className="font-semibold text-sm" style={{ color: 'var(--accent)' }}>
              {label} →
            </p>
            <p className="mt-1 text-sm" style={{ color: 'var(--text-muted)' }}>
              {desc}
            </p>
          </Link>
        ))}
      </div>

      {/* Recent enquiries */}
      <div
        className="rounded-card overflow-hidden"
        style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)' }}
      >
        <div
          className="flex items-center justify-between px-6 py-4"
          style={{ borderBottom: '1px solid var(--border)' }}
        >
          <h3 className="font-semibold text-base" style={{ color: 'var(--text-primary)' }}>
            Recent Enquiries
          </h3>
          <Link href="/admin/enquiries" className="text-sm font-medium transition-colors" style={{ color: 'var(--accent)' }}>
            View all →
          </Link>
        </div>

        {!recentEnquiries || recentEnquiries.length === 0 ? (
          <div className="px-6 py-10 text-center text-sm" style={{ color: 'var(--text-muted)' }}>
            No enquiries yet.
          </div>
        ) : (
          <div className="divide-y" style={{ borderColor: 'var(--border)' }}>
            {recentEnquiries.map(enq => (
              <div key={enq.id} className="flex items-center justify-between px-6 py-4 gap-4">
                <div className="flex items-center gap-3 min-w-0">
                  <div
                    className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full text-xs font-bold uppercase"
                    style={{ background: 'var(--accent-bg)', color: 'var(--accent)' }}
                  >
                    {enq.name.slice(0, 2)}
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-medium truncate" style={{ color: 'var(--text-primary)' }}>
                      {enq.name}
                    </p>
                    <p className="text-xs truncate" style={{ color: 'var(--text-muted)' }}>
                      {enq.email}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3 flex-shrink-0">
                  <span
                    className="hidden sm:inline-block text-xs font-semibold uppercase tracking-[0.06em] rounded-[6px] px-2.5 py-1"
                    style={{
                      color: enq.is_read ? 'var(--text-muted)' : 'var(--status-available-text)',
                      background: enq.is_read ? 'var(--bg-elevated)' : 'var(--status-available-bg)',
                    }}
                  >
                    {enq.is_read ? 'Read' : 'New'}
                  </span>
                  <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
                    {new Date(enq.created_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
