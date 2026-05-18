'use client'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'
import Button from '@/components/ui/Button'

const links = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/what-we-do', label: 'What We Do' },
  { href: '/portfolio', label: 'Portfolio' },
  { href: '/invest', label: 'Invest' },
  { href: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 8)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
  }, [pathname])

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 h-[64px] md:h-[72px] bg-[var(--bg-surface)] border-b border-[var(--border-soft)] transition-shadow duration-300 ${
          scrolled ? 'shadow-sm' : ''
        }`}
      >
        <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-4 md:px-6 lg:px-8">
          <Link href="/" className="flex-shrink-0">
            <Image
              src="/images/logo/logo-navy.svg"
              alt="Chiben Properties"
              width={144}
              height={44}
              priority
            />
          </Link>

          <nav className="hidden lg:flex items-center gap-7">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-[14px] font-medium transition-colors duration-150 ${
                  pathname === link.href
                    ? 'text-[var(--accent)]'
                    : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <Link href="/invest" className="hidden lg:block">
              <Button size="sm">Invest With Us</Button>
            </Link>
            <button
              className="flex lg:hidden h-10 w-10 items-center justify-center rounded-btn border border-[var(--border)] bg-[var(--bg-elevated)] text-[var(--text-primary)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
            >
              <Menu size={20} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile overlay menu */}
      <div
        className={`fixed inset-0 z-[60] flex flex-col bg-[var(--bg-surface)] transition-transform duration-300 ease-in-out lg:hidden ${
          menuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex h-[64px] items-center justify-between border-b border-[var(--border-soft)] px-4">
          <Link href="/">
            <Image
              src="/images/logo/logo-navy.svg"
              alt="Chiben Properties"
              width={130}
              height={40}
              priority
            />
          </Link>
          <button
            onClick={() => setMenuOpen(false)}
            aria-label="Close menu"
            className="flex h-10 w-10 items-center justify-center rounded-btn border border-[var(--border)] bg-[var(--bg-elevated)] text-[var(--text-primary)]"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="flex flex-1 flex-col gap-1 px-4 pt-6">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`rounded-btn px-4 py-4 text-xl font-medium transition-colors ${
                pathname === link.href
                  ? 'text-[var(--accent)] bg-[var(--accent-bg)]'
                  : 'text-[var(--text-primary)] hover:bg-[var(--bg-elevated)]'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="border-t border-[var(--border-soft)] p-4">
          <Link href="/invest">
            <Button size="lg" className="w-full">
              Invest With Us
            </Button>
          </Link>
        </div>
      </div>
    </>
  )
}
