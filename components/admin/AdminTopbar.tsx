'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Plus, Bell, User } from 'lucide-react'
import Button from '@/components/ui/Button'

const pageTitles: { path: string; title: string }[] = [
  { path: '/admin/dashboard', title: 'Dashboard' },
  { path: '/admin/properties/new', title: 'Add Property' },
  { path: '/admin/properties', title: 'Properties' },
  { path: '/admin/enquiries', title: 'Enquiries' },
]

function getTitle(pathname: string): string {
  if (pathname.includes('/edit')) return 'Edit Property'
  const match = pageTitles.find(({ path }) => pathname === path || pathname.startsWith(path + '/'))
  return match?.title ?? 'Admin'
}

export default function AdminTopbar() {
  const pathname = usePathname()
  const title = getTitle(pathname)
  const showAddButton =
    pathname === '/admin/properties' || pathname.startsWith('/admin/properties?')

  return (
    <header
      className="fixed top-0 right-0 h-16 flex items-center justify-between px-6"
      style={{
        left: '240px',
        background: '#1A1D27',
        borderBottom: '1px solid rgba(255,255,255,0.08)',
        zIndex: 40,
      }}
    >
      <h1 className="text-base font-semibold" style={{ color: '#F1F0EC' }}>
        {title}
      </h1>

      <div className="flex items-center gap-2">
        {showAddButton && (
          <Link href="/admin/properties/new">
            <Button variant="primary" size="sm">
              <Plus className="h-4 w-4" />
              Add Property
            </Button>
          </Link>
        )}

        <button
          className="flex h-9 w-9 items-center justify-center rounded-[8px] transition-all"
          style={{ color: '#9B9CA6' }}
          aria-label="Notifications"
          onMouseOver={e => {
            e.currentTarget.style.color = '#F1F0EC'
            e.currentTarget.style.background = 'rgba(255,255,255,0.06)'
          }}
          onMouseOut={e => {
            e.currentTarget.style.color = '#9B9CA6'
            e.currentTarget.style.background = 'transparent'
          }}
        >
          <Bell className="h-4 w-4" />
        </button>

        <button
          className="flex h-9 w-9 items-center justify-center rounded-[8px] transition-all"
          style={{ color: '#9B9CA6' }}
          aria-label="Account"
          onMouseOver={e => {
            e.currentTarget.style.color = '#F1F0EC'
            e.currentTarget.style.background = 'rgba(255,255,255,0.06)'
          }}
          onMouseOut={e => {
            e.currentTarget.style.color = '#9B9CA6'
            e.currentTarget.style.background = 'transparent'
          }}
        >
          <User className="h-4 w-4" />
        </button>
      </div>
    </header>
  )
}
