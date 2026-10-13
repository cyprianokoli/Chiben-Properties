'use client'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'
import PillLink from '@/components/ui/PillLink'
import WhatsAppIcon from '@/components/ui/WhatsAppIcon'
import { WHATSAPP_URL } from '@/lib/constants'

// Temporary copy of the redesigned navbar, used only by /preview for client sign-off.
// "Home" points at /preview so the owner stays on the new design.
const HOME_HREF = '/preview'

const links = [
  { href: HOME_HREF, label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/what-we-do', label: 'What We Do' },
  { href: '/portfolio', label: 'Portfolio' },
  { href: '/contact', label: 'Contact' },
]

const CTA_HREF = '/contact'

function Logo({ mobile = false }: { mobile?: boolean }) {
  return (
    <Image
      src="/images/logo/logo-horizontal.png"
      alt="Chiben Properties"
      width={mobile ? 136 : 166}
      height={mobile ? 36 : 44}
      sizes={mobile ? '136px' : '166px'}
      priority
      className={mobile ? 'h-9 w-auto' : 'h-9 w-auto md:h-11'}
    />
  )
}

export default function Navbar() {
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 8)
    handler()
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
  }, [pathname])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 h-[64px] md:h-[76px] bg-white/95 backdrop-blur border-b transition-[box-shadow,border-color] duration-300 ${
          scrolled ? 'border-[var(--line)] shadow-[0_1px_12px_rgba(14,17,22,0.06)]' : 'border-transparent'
        }`}
      >
        <div className="mx-auto flex h-full max-w-7xl items-center justify-between gap-6 px-4 md:px-6 lg:px-8">
          <Link href={HOME_HREF} className="flex-shrink-0" aria-label="Chiben Properties home">
            <Logo />
          </Link>

          <nav aria-label="Main" className="hidden lg:flex items-center gap-8">
            {links.map((link) => {
              const active = pathname === link.href
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={active ? 'page' : undefined}
                  className={`inline-flex items-center gap-2 text-[14px] font-medium transition-colors duration-150 ${
                    active
                      ? 'text-[var(--text-1)]'
                      : 'text-[var(--text-2)] hover:text-[var(--text-1)]'
                  }`}
                >
                  {active && (
                    <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-[var(--brand-blue)]" />
                  )}
                  {link.label}
                </Link>
              )
            })}
          </nav>

          <div className="flex items-center gap-3">
            <PillLink href={CTA_HREF} size="sm" className="hidden lg:inline-flex">
              Find Me a Deal
            </PillLink>
            <button
              className="flex lg:hidden h-11 w-11 items-center justify-center rounded-full border border-[var(--line)] bg-white text-[var(--text-1)] transition-colors hover:border-[var(--ink)]"
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
              aria-expanded={menuOpen}
            >
              <Menu size={20} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile overlay menu */}
      <div
        className={`fixed inset-0 z-[60] flex flex-col bg-white transition-transform duration-300 ease-in-out lg:hidden ${
          menuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        aria-hidden={!menuOpen}
      >
        <div className="flex h-[64px] items-center justify-between border-b border-[var(--line)] px-4">
          <Link href={HOME_HREF} aria-label="Chiben Properties home" tabIndex={menuOpen ? 0 : -1}>
            <Logo mobile />
          </Link>
          <button
            onClick={() => setMenuOpen(false)}
            aria-label="Close menu"
            tabIndex={menuOpen ? 0 : -1}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-[var(--line)] text-[var(--text-1)]"
          >
            <X size={20} />
          </button>
        </div>

        <nav aria-label="Mobile" className="flex flex-1 flex-col px-4 pt-4 overflow-y-auto">
          {links.map((link) => {
            const active = pathname === link.href
            return (
              <Link
                key={link.href}
                href={link.href}
                tabIndex={menuOpen ? 0 : -1}
                aria-current={active ? 'page' : undefined}
                className="flex items-center justify-between border-b border-[var(--line)] px-1 py-5 font-serif text-[28px] leading-none text-[var(--text-1)]"
              >
                {link.label}
                {active && (
                  <span aria-hidden className="h-2 w-2 rounded-full bg-[var(--brand-blue)]" />
                )}
              </Link>
            )
          })}
        </nav>

        <div
          className="flex flex-col gap-3 border-t border-[var(--line)] p-4"
          style={{ paddingBottom: 'calc(1rem + env(safe-area-inset-bottom, 0px))' }}
        >
          <PillLink href={CTA_HREF} size="lg" className="w-full">
            Find Me a Deal
          </PillLink>
          <PillLink
            href={WHATSAPP_URL}
            external
            variant="outline"
            size="lg"
            arrow={false}
            className="w-full justify-center"
            icon={<WhatsAppIcon size={18} className="text-[var(--whatsapp)]" />}
          >
            Message us on WhatsApp
          </PillLink>
        </div>
      </div>
    </>
  )
}
