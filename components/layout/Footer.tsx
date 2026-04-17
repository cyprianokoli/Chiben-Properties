import Image from 'next/image'
import Link from 'next/link'
import { Globe, Link2, Share2 } from 'lucide-react'

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
                href="#"
                aria-label="Website"
                className="flex h-9 w-9 items-center justify-center rounded-full transition-colors hover:text-[#C9A96E]"
                style={{ border: '1px solid rgba(255,255,255,0.12)', color: 'rgba(241,240,236,0.55)' }}
              >
                <Globe size={16} />
              </a>
              <a
                href="#"
                aria-label="LinkedIn"
                className="flex h-9 w-9 items-center justify-center rounded-full transition-colors hover:text-[#C9A96E]"
                style={{ border: '1px solid rgba(255,255,255,0.12)', color: 'rgba(241,240,236,0.55)' }}
              >
                <Link2 size={16} />
              </a>
              <a
                href="#"
                aria-label="Share"
                className="flex h-9 w-9 items-center justify-center rounded-full transition-colors hover:text-[#C9A96E]"
                style={{ border: '1px solid rgba(255,255,255,0.12)', color: 'rgba(241,240,236,0.55)' }}
              >
                <Share2 size={16} />
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
