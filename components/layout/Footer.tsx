import Image from 'next/image'
import Link from 'next/link'

const propertyLinks = [
  { href: '/properties?type=detached', label: 'Detached Houses' },
  { href: '/properties?type=apartment', label: 'Apartments' },
  { href: '/properties?type=townhouse', label: 'Town Houses' },
  { href: '/properties?status=new', label: 'New Listings' },
  { href: '/properties?featured=true', label: 'Featured Properties' },
]

const companyLinks = [
  { href: '/about', label: 'About Us' },
  { href: '/contact', label: 'Contact' },
  { href: '/contact', label: 'Book a Valuation' },
]

const legalLinks = [
  { href: '#', label: 'Privacy Policy' },
  { href: '#', label: 'Terms of Service' },
  { href: '#', label: 'Cookie Settings' },
  { href: '#', label: 'Accessibility' },
]

export default function Footer() {
  return (
    <footer style={{ backgroundColor: '#0A0C13' }} className="text-white">
      <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8 pt-14 pb-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4 mb-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Image
              src="/images/logo/logo-white.svg"
              alt="Chiben Properties"
              width={150}
              height={48}
              className="mb-5"
            />
            <p className="text-sm leading-relaxed" style={{ color: 'rgba(241,240,236,0.55)' }}>
              Defining the standard for premium property across the United Kingdom. Built on trust, driven by expertise.
            </p>
            <div className="mt-6 flex gap-3">
              <a
                href="https://www.instagram.com/chibenproperties"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="flex h-9 w-9 items-center justify-center rounded-full transition-colors hover:text-[#C9A96E]"
                style={{ border: '1px solid rgba(255,255,255,0.12)', color: 'rgba(241,240,236,0.55)' }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                  <circle cx="12" cy="12" r="4"/>
                  <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
                </svg>
              </a>
              <a
                href="https://www.facebook.com/chibenproperties"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="flex h-9 w-9 items-center justify-center rounded-full transition-colors hover:text-[#C9A96E]"
                style={{ border: '1px solid rgba(255,255,255,0.12)', color: 'rgba(241,240,236,0.55)' }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                </svg>
              </a>
              <a
                href="https://www.linkedin.com/company/chibenproperties"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="flex h-9 w-9 items-center justify-center rounded-full transition-colors hover:text-[#C9A96E]"
                style={{ border: '1px solid rgba(255,255,255,0.12)', color: 'rgba(241,240,236,0.55)' }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                  <rect x="2" y="9" width="4" height="12"/>
                  <circle cx="4" cy="4" r="2"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Properties */}
          <div>
            <p className="mb-5 text-xs font-semibold uppercase tracking-[0.18em] text-[#C9A96E]">
              Properties
            </p>
            <ul className="flex flex-col gap-3">
              {propertyLinks.map((l) => (
                <li key={l.label}>
                  <Link
                    href={l.href}
                    className="text-sm transition-colors hover:text-[#C9A96E]"
                    style={{ color: 'rgba(241,240,236,0.55)' }}
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <p className="mb-5 text-xs font-semibold uppercase tracking-[0.18em] text-[#C9A96E]">
              Company
            </p>
            <ul className="flex flex-col gap-3">
              {companyLinks.map((l) => (
                <li key={l.label}>
                  <Link
                    href={l.href}
                    className="text-sm transition-colors hover:text-[#C9A96E]"
                    style={{ color: 'rgba(241,240,236,0.55)' }}
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="mb-5 text-xs font-semibold uppercase tracking-[0.18em] text-[#C9A96E]">
              Get in Touch
            </p>
            <ul className="flex flex-col gap-3">
              <li className="text-sm" style={{ color: 'rgba(241,240,236,0.55)' }}>
                12 Mayfair Court<br />London W1K 2AL
              </li>
              <li>
                <a
                  href="tel:+442079460123"
                  className="text-sm transition-colors hover:text-[#C9A96E]"
                  style={{ color: 'rgba(241,240,236,0.55)' }}
                >
                  +44 20 7946 0123
                </a>
              </li>
              <li>
                <a
                  href="mailto:hello@chibenproperties.co.uk"
                  className="text-sm transition-colors hover:text-[#C9A96E]"
                  style={{ color: 'rgba(241,240,236,0.55)' }}
                >
                  hello@chibenproperties.co.uk
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="flex flex-col gap-4 pt-8 sm:flex-row sm:items-center sm:justify-between"
          style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}
        >
          <p className="text-xs" style={{ color: 'rgba(241,240,236,0.35)' }}>
            © {new Date().getFullYear()} Chiben Properties. All rights reserved. Built by{' '}
            <a href="https://cycomedia.com" className="hover:text-[#C9A96E] transition-colors">
              Cyco Media
            </a>
          </p>
          <div className="flex flex-wrap gap-4">
            {legalLinks.map((l) => (
              <Link
                key={l.label}
                href={l.href}
                className="text-xs transition-colors hover:text-[#C9A96E]"
                style={{ color: 'rgba(241,240,236,0.35)' }}
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
