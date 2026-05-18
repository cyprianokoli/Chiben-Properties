import Link from 'next/link'
import { Check, X, Handshake, LineChart, Layers } from 'lucide-react'
import type { Metadata } from 'next'
import CTABanner from '@/components/ui/CTABanner'

export const metadata: Metadata = {
  title: 'Invest With Us',
  description:
    'Put capital into UK residential. Backed by an operator, not a fund. JV, fixed-return loan, or strategic partnership — deal-by-deal underwriting on every opportunity.',
}

const formats = [
  {
    icon: Handshake,
    name: 'Joint Venture (JV)',
    body: 'Co-invest into a single property. Shared equity, shared upside, shared downside. Typical hold: 12 months (flip) to 5+ years (BTL/HMO). Returns vary by deal.',
  },
  {
    icon: LineChart,
    name: 'Fixed-return loan',
    body: 'Lend to Chiben at an agreed rate, secured against the underlying property where structurable. Predictable, debt-style returns. Typical term: 6–24 months.',
  },
  {
    icon: Layers,
    name: 'Strategic partnership',
    body: 'For investors looking to deploy larger amounts across multiple deals. We’ll talk through what makes sense.',
  },
]

const benefits = [
  { title: 'Full underwriting', body: 'on every deal we present.' },
  { title: 'Quarterly updates', body: 'on every deal you’re in.' },
  { title: 'Direct line', body: 'to the founder — no investor-relations layer.' },
  {
    title: 'Skin-in-the-game',
    body: 'Chiben capital sits alongside yours in every deal.',
  },
  {
    title: 'Exit clarity',
    body: 'every deal underwritten with a defined Plan A and Plan B.',
  },
]

const fits = [
  'A private investor looking for UK property exposure without buying and running it yourself.',
  'An existing landlord looking to redeploy capital into higher-yield assets.',
  'A diaspora investor wanting a UK operator on the ground.',
  'An equity partner with capital but no time to source and run deals.',
]

const notFits = [
  'Daily liquidity (this is illiquid asset-backed investment).',
  'Guaranteed returns (anyone offering them is lying).',
  'Zero downside (every deal has one — we just price for it).',
]

export default function InvestPage() {
  return (
    <>
      {/* Hero — navy */}
      <section className="navy-grid relative overflow-hidden">
        <div className="absolute top-8 right-6 md:top-12 md:right-12 text-[120px] md:text-[200px] leading-none font-serif text-white/[0.04] select-none pointer-events-none">
          05
        </div>
        <div className="relative mx-auto max-w-7xl px-4 md:px-6 lg:px-8 py-24 md:py-32">
          <div className="mb-4 flex items-center gap-1.5 text-xs text-[var(--text-on-navy-muted)]">
            <Link href="/" className="hover:text-[var(--gold)] transition-colors">Home</Link>
            <span>/</span>
            <span className="text-[var(--text-on-navy)]">Invest</span>
          </div>

          <div className="max-w-3xl mt-10">
            <p className="eyebrow-light mb-6">For investors and JV partners</p>
            <h1 className="h1 text-[var(--text-on-navy)] mb-7">
              Put capital into UK residential. Backed by an <em>operator</em>, not a <em>fund</em>.
            </h1>
            <p className="text-lg md:text-xl text-[var(--text-on-navy-muted)] leading-relaxed max-w-2xl">
              Chiben works with private investors and JV partners on a deal-by-deal basis. You see the underwriting before you commit, the structure is documented, and the returns come from the same property our own capital is sitting in.
            </p>
          </div>
        </div>
      </section>

      {/* Formats */}
      <section className="bg-[var(--bg-page)]">
        <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8 py-20 md:py-28">
          <div className="max-w-2xl mb-14">
            <p className="eyebrow mb-4">How we work with capital</p>
            <h2 className="h2 text-[var(--text-primary)] mb-5">
              Three formats. <em>Depending on how you want exposure.</em>
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            {formats.map((f, i) => (
              <div
                key={f.name}
                className="rounded-card border border-[var(--border)] bg-[var(--bg-surface)] p-8 hover:border-[var(--border-gold)] hover:-translate-y-1 transition-all duration-200"
              >
                <p className="font-serif text-3xl text-[var(--accent)]/40 leading-none mb-5">
                  0{i + 1}
                </p>
                <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-[10px] bg-[var(--accent-bg)]">
                  <f.icon size={22} className="text-[var(--accent)]" />
                </div>
                <h3 className="font-serif text-2xl text-[var(--text-primary)] mb-4">
                  {f.name}
                </h3>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                  {f.body}
                </p>
              </div>
            ))}
          </div>

          <p className="mt-10 text-sm text-[var(--text-muted)] italic max-w-3xl">
            All structures documented and supported by legal — never on a handshake.
          </p>
        </div>
      </section>

      {/* What you get */}
      <section className="bg-[var(--bg-surface)] border-y border-[var(--border-soft)]">
        <div className="mx-auto max-w-6xl px-4 md:px-6 lg:px-8 py-20 md:py-28">
          <div className="max-w-2xl mb-14">
            <p className="eyebrow mb-4">What you get</p>
            <h2 className="h2 text-[var(--text-primary)]">
              Built around <em>investor trust.</em>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-x-8 gap-y-10 border-t border-[var(--border)] pt-12">
            {benefits.map((b, i) => (
              <div key={b.title}>
                <p className="font-serif text-2xl text-[var(--accent)] mb-3 leading-none">
                  0{i + 1}
                </p>
                <h3 className="font-serif text-xl text-[var(--text-primary)] mb-2">
                  {b.title}
                </h3>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                  {b.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Fit / not fit */}
      <section className="bg-[var(--bg-page)]">
        <div className="mx-auto max-w-6xl px-4 md:px-6 lg:px-8 py-20 md:py-28">
          <div className="max-w-2xl mb-14">
            <p className="eyebrow mb-4">Who this is for</p>
            <h2 className="h2 text-[var(--text-primary)]">
              Honest about <em>fit.</em>
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="rounded-card border border-[var(--border)] bg-[var(--bg-surface)] p-8 md:p-10">
              <p className="eyebrow mb-5">A good fit if you’re</p>
              <ul className="space-y-4">
                {fits.map((f) => (
                  <li key={f} className="flex gap-3">
                    <Check
                      size={20}
                      className="flex-shrink-0 mt-0.5 text-[var(--accent)]"
                    />
                    <span className="text-[var(--text-secondary)] leading-relaxed">
                      {f}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-card border border-[var(--border)] bg-[var(--bg-surface)] p-8 md:p-10">
              <p className="eyebrow mb-5" style={{ color: 'var(--text-muted)' }}>
                Not a fit if you want
              </p>
              <ul className="space-y-4">
                {notFits.map((f) => (
                  <li key={f} className="flex gap-3">
                    <X
                      size={20}
                      className="flex-shrink-0 mt-0.5 text-[var(--text-muted)]"
                    />
                    <span className="text-[var(--text-secondary)] leading-relaxed">
                      {f}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <CTABanner
        eyebrow="Ready to see a deal?"
        headline={<>Book a <em>30-minute call.</em></>}
        body="We'll walk through the current pipeline, how we underwrite, and what a JV with Chiben actually looks like in writing."
        primary={{ label: 'Book a Call', href: '/contact' }}
        secondary={{ label: 'Email Us', href: 'mailto:info@chibenproperties.com' }}
      />
    </>
  )
}
