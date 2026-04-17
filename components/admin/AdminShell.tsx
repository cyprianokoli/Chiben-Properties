'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import {
  LayoutDashboard, Building2, MessageSquare,
  LogOut, Menu, X, Plus, Bell, User,
} from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import Button from '@/components/ui/Button'

const navItems = [
  { href: '/admin/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { href: '/admin/properties', icon: Building2, label: 'Properties' },
  { href: '/admin/enquiries', icon: MessageSquare, label: 'Enquiries' },
]

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

export default function AdminShell() {
  const pathname = usePathname()
  const router = useRouter()
  const [menuOpen, setMenuOpen] = useState(false)

  const title = getTitle(pathname)
  const showAddButton = pathname === '/admin/properties' || pathname.startsWith('/admin/properties?')

  useEffect(() => { setMenuOpen(false) }, [pathname])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  async function handleSignOut() {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/admin/login')
    router.refresh()
  }

  const sidebarContent = (
    <>
      <nav className="flex-1 py-5 px-3 flex flex-col gap-1 overflow-y-auto">
        {navItems.map(({ href, icon: Icon, label }) => {
          const isActive =
            pathname === href ||
            (href !== '/admin/dashboard' && pathname.startsWith(href))
          return (
            <Link
              key={href}
              href={href}
              className="flex items-center gap-3 px-3 py-3 md:py-2.5 rounded-[8px] text-sm font-medium transition-all duration-150"
              style={{
                color: isActive ? '#C9A96E' : '#9B9CA6',
                background: isActive ? 'rgba(201,169,110,0.08)' : 'transparent',
                borderLeft: isActive ? '3px solid #C9A96E' : '3px solid transparent',
              }}
            >
              <Icon className="h-5 w-5 md:h-4 md:w-4 flex-shrink-0" />
              {label}
            </Link>
          )
        })}
      </nav>

      <div className="px-3 pb-5 pt-4" style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
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
    </>
  )

  return (
    <>
      {/* ── Desktop sidebar ─────────────────────────────── */}
      <aside
        className="hidden md:flex fixed left-0 top-0 h-screen w-[240px] flex-col"
        style={{ background: '#1A1D27', borderRight: '1px solid rgba(255,255,255,0.08)', zIndex: 50 }}
      >
        <div className="flex items-center px-6 h-16 flex-shrink-0" style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
          <Image src="/images/logo/logo-white.svg" alt="Chiben Properties" width={130} height={40} priority />
        </div>
        {sidebarContent}
      </aside>

      {/* ── Desktop topbar ───────────────────────────────── */}
      <header
        className="hidden md:flex fixed top-0 right-0 h-16 items-center justify-between px-6"
        style={{ left: '240px', background: '#1A1D27', borderBottom: '1px solid rgba(255,255,255,0.08)', zIndex: 40 }}
      >
        <h1 className="text-base font-semibold" style={{ color: '#F1F0EC' }}>{title}</h1>
        <div className="flex items-center gap-2">
          {showAddButton && (
            <Link href="/admin/properties/new">
              <Button variant="primary" size="sm"><Plus className="h-4 w-4" />Add Property</Button>
            </Link>
          )}
          <button className="flex h-9 w-9 items-center justify-center rounded-[8px] transition-all" style={{ color: '#9B9CA6' }} aria-label="Notifications"
            onMouseOver={e => { e.currentTarget.style.color = '#F1F0EC'; e.currentTarget.style.background = 'rgba(255,255,255,0.06)' }}
            onMouseOut={e => { e.currentTarget.style.color = '#9B9CA6'; e.currentTarget.style.background = 'transparent' }}>
            <Bell className="h-4 w-4" />
          </button>
          <button className="flex h-9 w-9 items-center justify-center rounded-[8px] transition-all" style={{ color: '#9B9CA6' }} aria-label="Account"
            onMouseOver={e => { e.currentTarget.style.color = '#F1F0EC'; e.currentTarget.style.background = 'rgba(255,255,255,0.06)' }}
            onMouseOut={e => { e.currentTarget.style.color = '#9B9CA6'; e.currentTarget.style.background = 'transparent' }}>
            <User className="h-4 w-4" />
          </button>
        </div>
      </header>

      {/* ── Mobile topbar ────────────────────────────────── */}
      <header
        className="md:hidden fixed top-0 left-0 right-0 h-14 flex items-center justify-between px-4"
        style={{ background: '#1A1D27', borderBottom: '1px solid rgba(255,255,255,0.08)', zIndex: 40 }}
      >
        <button
          onClick={() => setMenuOpen(true)}
          className="flex h-9 w-9 items-center justify-center rounded-[8px]"
          style={{ color: '#9B9CA6', border: '1px solid rgba(255,255,255,0.08)' }}
          aria-label="Open menu"
        >
          <Menu className="h-5 w-5" />
        </button>

        <Image src="/images/logo/logo-white.svg" alt="Chiben Properties" width={110} height={34} priority />

        <div className="flex items-center gap-1">
          {showAddButton && (
            <Link href="/admin/properties/new">
              <button
                className="flex h-9 w-9 items-center justify-center rounded-[8px]"
                style={{ background: '#C9A96E', color: '#0F1117' }}
                aria-label="Add property"
              >
                <Plus className="h-4 w-4" />
              </button>
            </Link>
          )}
          <button className="flex h-9 w-9 items-center justify-center rounded-[8px]" style={{ color: '#9B9CA6' }} aria-label="Account">
            <User className="h-4 w-4" />
          </button>
        </div>
      </header>

      {/* ── Mobile backdrop ──────────────────────────────── */}
      <div
        className={`md:hidden fixed inset-0 bg-black/50 transition-opacity duration-300 ${menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        style={{ zIndex: 60 }}
        onClick={() => setMenuOpen(false)}
      />

      {/* ── Mobile drawer ────────────────────────────────── */}
      <aside
        className={`md:hidden fixed top-0 left-0 h-full w-[280px] flex flex-col transition-transform duration-300 ease-in-out ${menuOpen ? 'translate-x-0' : '-translate-x-full'}`}
        style={{ background: '#1A1D27', borderRight: '1px solid rgba(255,255,255,0.08)', zIndex: 70 }}
      >
        <div className="flex items-center justify-between px-5 h-14 flex-shrink-0" style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
          <Image src="/images/logo/logo-white.svg" alt="Chiben Properties" width={120} height={38} priority />
          <button
            onClick={() => setMenuOpen(false)}
            className="flex h-9 w-9 items-center justify-center rounded-[8px]"
            style={{ color: '#9B9CA6', border: '1px solid rgba(255,255,255,0.08)' }}
            aria-label="Close menu"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        {sidebarContent}
      </aside>
    </>
  )
}
