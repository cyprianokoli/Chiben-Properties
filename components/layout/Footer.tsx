import Image from 'next/image'
import Link from 'next/link'

const strategyLinks = [
  { href: '/what-we-do#buy-to-let', label: 'Buy-to-Let' },
  { href: '/what-we-do#hmo', label: 'HMO' },
  { href: '/what-we-do#value-add', label: 'Value-Add Flips' },
  { href: '/portfolio', label: 'Live Portfolio' },
]

const companyLinks = [
  { href: '/about', label: 'About' },
  { href: '/invest', label: 'Invest With Us' },
  { href: '/contact', label: 'Contact' },
]

const legalLinks = [
  { href: '/privacy', label: 'Privacy Policy' },
  { href: '/terms', label: 'Terms of Service' },
  { href: '/cookies', label: 'Cookie Policy' },
]

export default function Footer() {
  return (
    <footer
      style={{ backgroundColor: 'var(--navy-deep)' }}
      className="text-[var(--text-on-navy)]"
    >
      <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8 pt-16 pb-8">
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
            <p className="text-sm leading-relaxed text-[var(--text-on-navy-muted)] mb-6">
              Chiben Properties Ltd is a UK property investment company acquiring residential assets across Northern England. Income-first. Growth-focused.
            </p>
            <div className="flex gap-3">
              <a
                href="https://www.instagram.com/chibenproperties"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--border-on-navy)] text-[var(--text-on-navy-muted)] transition-colors hover:text-[var(--gold)] hover:border-[var(--gold)]"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
                </svg>
              </a>
              <a
                href="https://www.linkedin.com/company/chibenproperties"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--border-on-navy)] text-[var(--text-on-navy-muted)] transition-colors hover:text-[var(--gold)] hover:border-[var(--gold)]"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                  <rect x="2" y="9" width="4" height="12" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
              </a>
            </div>
          </div>

          {/* Strategies */}
          <div>
            <p className="mb-5 eyebrow-light">Strategies</p>
            <ul className="flex flex-col gap-3">
              {strategyLinks.map((l) => (
                <li key={l.label}>
                  <Link
                    href={l.href}
                    className="text-sm text-[var(--text-on-navy-muted)] transition-colors hover:text-[var(--gold)]"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <p className="mb-5 eyebrow-light">Company</p>
            <ul className="flex flex-col gap-3">
              {companyLinks.map((l) => (
                <li key={l.label}>
                  <Link
                    href={l.href}
                    className="text-sm text-[var(--text-on-navy-muted)] transition-colors hover:text-[var(--gold)]"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="mb-5 eyebrow-light">Get in Touch</p>
            <ul className="flex flex-col gap-3 text-sm text-[var(--text-on-navy-muted)]">
              <li>
                Bartle House, Oxford Court<br />
                Manchester, M2 3WQ
              </li>
              <li>
                <a
                  href="tel:+443300437697"
                  className="transition-colors hover:text-[var(--gold)]"
                >
                  0330 043 7697
                </a>
              </li>
              <li>
                <a
                  href="mailto:info@chibenproperties.com"
                  className="transition-colors hover:text-[var(--gold)]"
                >
                  info@chibenproperties.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div
          className="flex flex-col gap-4 pt-8 sm:flex-row sm:items-center sm:justify-between"
          style={{ borderTop: '1px solid var(--border-on-navy)' }}
        >
          <p className="text-xs" style={{ color: 'rgba(245,241,232,0.4)' }}>
            © {new Date().getFullYear()} Chiben Properties Ltd. UK property investment.
            Built for income, built for scale.
          </p>
          <div className="flex flex-wrap gap-4">
            {legalLinks.map((l) => (
              <Link
                key={l.label}
                href={l.href}
                className="text-xs transition-colors hover:text-[var(--gold)]"
                style={{ color: 'rgba(245,241,232,0.4)' }}
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
