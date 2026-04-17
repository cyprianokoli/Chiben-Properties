'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import { LayoutDashboard, Building2, MessageSquare, LogOut } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'

const navItems = [
  { href: '/admin/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { href: '/admin/properties', icon: Building2, label: 'Properties' },
  { href: '/admin/enquiries', icon: MessageSquare, label: 'Enquiries' },
]

export default function AdminSidebar() {
  const pathname = usePathname()
  const router = useRouter()

  async function handleSignOut() {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/admin/login')
    router.refresh()
  }

  return (
    <aside
      className="fixed left-0 top-0 h-screen w-[240px] flex flex-col"
      style={{
        background: '#1A1D27',
        borderRight: '1px solid rgba(255,255,255,0.08)',
        zIndex: 50,
      }}
    >
      <div
        className="flex items-center px-6 h-16 flex-shrink-0"
        style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}
      >
        <Image
          src="/images/logo/logo-white.svg"
          alt="Chiben Properties"
          width={130}
          height={40}
          priority
        />
      </div>

      <nav className="flex-1 py-5 px-3 flex flex-col gap-1 overflow-y-auto">
        {navItems.map(({ href, icon: Icon, label }) => {
          const isActive =
            pathname === href ||
            (href !== '/admin/dashboard' && pathname.startsWith(href))
          return (
            <Link
              key={href}
              href={href}
              className="flex items-center gap-3 px-3 py-2.5 rounded-[8px] text-sm font-medium transition-all duration-150"
              style={{
                color: isActive ? '#C9A96E' : '#9B9CA6',
                background: isActive ? 'rgba(201,169,110,0.08)' : 'transparent',
                borderLeft: isActive ? '3px solid #C9A96E' : '3px solid transparent',
              }}
            >
              <Icon className="h-4 w-4 flex-shrink-0" />
              {label}
            </Link>
          )
        })}
      </nav>

      <div
        className="px-3 pb-5 pt-4"
        style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}
      >
        <button
          onClick={handleSignOut}
          className="flex w-full items-center gap-3 px-3 py-2.5 rounded-[8px] text-sm font-medium transition-all duration-150"
          style={{ color: '#9B9CA6' }}
          onMouseOver={e => {
            e.currentTarget.style.color = '#F1F0EC'
            e.currentTarget.style.background = 'rgba(255,255,255,0.06)'
          }}
          onMouseOut={e => {
            e.currentTarget.style.color = '#9B9CA6'
            e.currentTarget.style.background = 'transparent'
          }}
        >
          <LogOut className="h-4 w-4 flex-shrink-0" />
          Sign Out
        </button>
      </div>
    </aside>
  )
}
