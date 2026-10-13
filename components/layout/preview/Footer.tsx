// Redesigned footer. Links go through route() so they stay inside /preview
// while the new pages are reviewed.
import Image from 'next/image'
import Link from 'next/link'
import WhatsAppIcon from '@/components/ui/WhatsAppIcon'
import {
  COMPANY_NUMBER,
  EMAIL,
  PHONE_DISPLAY,
  PHONE_TEL,
  WHATSAPP_URL,
} from '@/lib/constants'
import { route } from '@/lib/routes'

const sourceLinks = [
  { href: route('/what-we-do#buy-to-let'), label: 'Buy-to-Let' },
  { href: route('/what-we-do#hmo'), label: 'HMOs' },
  { href: route('/what-we-do#value-add'), label: 'Refurb and flips' },
  { href: route('/deal-sourcing'), label: 'Deal Sourcing' },
]

const companyLinks = [
  { href: route('/about'), label: 'About' },
  { href: route('/portfolio'), label: 'Portfolio' },
  { href: route('/contact'), label: 'Contact' },
]

const legalLinks = [
  { href: route('/privacy'), label: 'Privacy' },
  { href: route('/terms'), label: 'Terms' },
  { href: route('/cookies'), label: 'Cookies' },
]

const linkClass =
  'text-sm text-[var(--text-on-dark-2)] transition-colors hover:text-white'

function SocialLink({
  href,
  label,
  children,
}: {
  href: string
  label: string
  children: React.ReactNode
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="flex h-10 w-10 items-center justify-center rounded-full bg-white/[0.06] text-white transition-colors hover:bg-white hover:text-[var(--ink)]"
    >
      {children}
    </a>
  )
}

export default function Footer() {
  return (
    <footer className="on-dark bg-[var(--ink)] text-[var(--text-on-dark)]">
      <div
        className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8 pt-16 md:pt-20 pb-10"
        style={{ paddingBottom: 'calc(2.5rem + env(safe-area-inset-bottom, 0px))' }}
      >
        <div className="grid grid-cols-2 gap-x-6 gap-y-12 lg:grid-cols-[1.4fr_1fr_1fr_1.3fr] lg:gap-12">
          {/* Brand */}
          <div className="col-span-2 lg:col-span-1">
            <Link href={route('/')} aria-label="Chiben Properties home" className="inline-block">
              <Image
                src="/images/logo/logo-stacked-light.png"
                alt="Chiben Properties — Building wealth through property"
                width={170}
                height={153}
                sizes="170px"
                className="h-auto w-[150px] md:w-[170px]"
              />
            </Link>
            <p className="mt-6 max-w-xs text-sm leading-relaxed text-[var(--text-on-dark-2)]">
              UK property deal sourcing for investors at home and abroad, across
              Northern England and the Midlands.
            </p>
            <div className="mt-6 flex gap-2.5">
              <SocialLink href={WHATSAPP_URL} label="WhatsApp">
                <WhatsAppIcon size={17} />
              </SocialLink>
              <SocialLink href="https://www.instagram.com/chiben_properties" label="Instagram">
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
                </svg>
              </SocialLink>
              <SocialLink href="https://www.linkedin.com/company/chibenproperties" label="LinkedIn">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                  <rect x="2" y="9" width="4" height="12" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
              </SocialLink>
            </div>
          </div>

          {/* What we source */}
          <div>
            <p className="mb-5 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--brand-blue-light)]">
              What we source
            </p>
            <ul className="flex flex-col gap-3">
              {sourceLinks.map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className={linkClass}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <p className="mb-5 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--brand-blue-light)]">
              Company
            </p>
            <ul className="flex flex-col gap-3">
              {companyLinks.map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className={linkClass}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="col-span-2 lg:col-span-1">
            <p className="mb-5 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--brand-blue-light)]">
              Get in touch
            </p>
            <ul className="flex flex-col gap-3 text-sm text-[var(--text-on-dark-2)]">
              <li>
                Bartle House, Oxford Court
                <br />
                Manchester, M2 3WQ
              </li>
              <li>
                <a href={`tel:${PHONE_TEL}`} className={linkClass}>
                  {PHONE_DISPLAY}
                </a>
              </li>
              <li>
                <a href={`mailto:${EMAIL}`} className={`${linkClass} break-all`}>
                  {EMAIL}
                </a>
              </li>
              <li>
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${linkClass} inline-flex items-center gap-2`}
                >
                  <WhatsAppIcon size={15} className="text-[var(--whatsapp)]" />
                  Message us on WhatsApp
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Compliance */}
        <div className="mt-14 border-t border-[var(--line-on-dark)] pt-8 space-y-3 text-xs leading-relaxed text-[var(--text-on-dark-2)] max-w-4xl">
          <p>
            Chiben Properties Ltd is registered in England and Wales, company number{' '}
            {COMPANY_NUMBER}.
          </p>
          <p>
            Chiben Properties Ltd does not provide financial, legal or tax advice.
            Property values and rental income can fall as well as rise. Seek independent
            advice before you buy.
          </p>
        </div>

        <div className="mt-8 flex flex-col gap-4 border-t border-[var(--line-on-dark)] pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-[var(--text-on-dark-2)]">
            © {new Date().getFullYear()} Chiben Properties Ltd. All rights reserved.
          </p>
          <nav aria-label="Legal" className="flex flex-wrap gap-5">
            {legalLinks.map((l) => (
              <Link
                key={l.label}
                href={l.href}
                className="text-xs text-[var(--text-on-dark-2)] transition-colors hover:text-white"
              >
                {l.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  )
}
