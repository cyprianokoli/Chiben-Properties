import Link from 'next/link'
import type { Metadata } from 'next'
import CTABanner from '@/components/ui/CTABanner'

export const metadata: Metadata = {
  title: 'About',
  description:
    'Chiben Properties Ltd is a UK property investment company incorporated October 2025. Income-first. Growth-focused.',
}

const pillars = [
  {
    title: 'Honest numbers.',
    body: 'We model deals on cautious rent, cautious refurb costs, and realistic exits. If a deal only works on the best-case spreadsheet, it doesn’t work.',
  },
  {
    title: 'Operator discipline.',
    body: 'We don’t outsource the thinking. We pick the area, walk the property, sign off the refurb scope, and stay on top of the tenancy. Every step.',
  },
  {
    title: 'Aligned interests.',
    body: 'When investors put money into a Chiben deal, our money is in alongside it. We make money the way you do — from the property, not from fees on top of it.',
  },
]

const snapshot = [
  { label: 'Strategy', value: 'Income-first. Growth-focused.' },
  { label: 'Structure', value: 'UK Limited Company' },
  { label: 'Open to', value: 'Joint Ventures · Investors' },
  { label: 'Founded', value: 'October 2025' },
]

export default function AboutPage() {
  return (
    <>
      {/* Hero — navy */}
      <section className="navy-grid relative overflow-hidden">
        <div className="absolute top-8 right-6 md:top-12 md:right-12 text-[120px] md:text-[200px] leading-none font-serif text-white/[0.04] select-none pointer-events-none">
          02
        </div>
        <div className="relative mx-auto max-w-7xl px-4 md:px-6 lg:px-8 py-24 md:py-32">
          <div className="mb-4 flex items-center gap-1.5 text-xs text-[var(--text-on-navy-muted)]">
            <Link href="/" className="hover:text-[var(--gold)] transition-colors">Home</Link>
            <span>/</span>
            <span className="text-[var(--text-on-navy)]">About</span>
          </div>

          <div className="max-w-3xl mt-10">
            <p className="eyebrow-light mb-6">About Chiben</p>
            <h1 className="h1 text-[var(--text-on-navy)] mb-7">
              A property <em>investment</em> company, not a property <em>listings</em> site.
            </h1>
            <p className="text-lg md:text-xl text-[var(--text-on-navy-muted)] leading-relaxed max-w-2xl">
              Chiben Properties Ltd was incorporated in October 2025 to do one thing well: acquire residential assets in the UK that produce income today and capital growth tomorrow. We&apos;re early — and that&apos;s the point.
            </p>
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="bg-[var(--bg-page)]">
        <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8 py-20 md:py-28">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-20 lg:items-start">
            <div>
              <p className="eyebrow mb-4">Our story</p>
              <h2 className="h2 text-[var(--text-primary)]">
                Started with one HMO. <em>Building toward a portfolio.</em>
              </h2>
            </div>
            <div className="space-y-5 text-[var(--text-secondary)] leading-relaxed text-lg">
              <p>
                Chiben began with a cash-purchased HMO in Hull — fully tenanted from day one, generating the cash yield that funds the next deal. Since then we&apos;ve added a value-add flip in Oldbury and a care-home-let BTL in Stoke-on-Trent.
              </p>
              <p>
                The plan from here is simple: refinance what we own, recycle the capital, partner with investors on deals our balance sheet alone can&apos;t carry, and keep the strategy tight while we grow.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Founder */}
      <section className="bg-[var(--bg-surface)] border-y border-[var(--border-soft)]">
        <div className="mx-auto max-w-4xl px-4 md:px-6 lg:px-8 py-20 md:py-28 text-center">
          <p className="eyebrow mb-5">Founder</p>
          <h2 className="font-serif text-4xl md:text-5xl text-[var(--text-primary)] mb-3">
            Cyprian Chukwuemeka Okolie
          </h2>
          <p className="text-sm font-semibold uppercase tracking-[0.15em] text-[var(--accent)] mb-8">
            Founder & Director
          </p>
          <p className="text-lg text-[var(--text-secondary)] leading-relaxed max-w-2xl mx-auto">
            Hands-on operator across acquisition, refurb and tenant management.
            Personally underwrites every deal Chiben takes on.
          </p>
        </div>
      </section>

      {/* How we work */}
      <section className="bg-[var(--bg-page)]">
        <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8 py-20 md:py-28">
          <div className="max-w-2xl mb-14">
            <p className="eyebrow mb-4">How we work</p>
            <h2 className="h2 text-[var(--text-primary)]">
              Three things we <em>won&apos;t compromise on.</em>
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {pillars.map((p, i) => (
              <div
                key={p.title}
                className="rounded-card border border-[var(--border)] bg-[var(--bg-surface)] p-8"
              >
                <p className="font-serif text-3xl text-[var(--accent)]/40 leading-none mb-5">
                  0{i + 1}
                </p>
                <h3 className="font-serif text-2xl text-[var(--text-primary)] mb-4">
                  {p.title}
                </h3>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                  {p.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Snapshot — navy */}
      <section className="navy-radial">
        <div className="mx-auto max-w-5xl px-4 md:px-6 lg:px-8 py-20 md:py-28">
          <div className="text-center mb-12">
            <p className="eyebrow-light mb-5">Our vision</p>
            <h2 className="h2 text-[var(--text-on-navy)] max-w-3xl mx-auto font-serif italic">
              Building a portfolio that <em>works</em> — for investors, for tenants, and for the long term.
            </h2>
          </div>

          <div className="mt-16 border-t border-[var(--border-on-navy)]">
            {snapshot.map((row) => (
              <div
                key={row.label}
                className="flex flex-col gap-1 md:flex-row md:items-center md:justify-between py-5 md:py-6 border-b border-[var(--border-on-navy)]"
              >
                <p className="eyebrow-light">{row.label}</p>
                <p className="text-base md:text-lg text-[var(--text-on-navy)]">
                  {row.value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTABanner
        eyebrow="Let's talk"
        headline={<>Want to <em>talk?</em></>}
        body="Whether you're an investor, a JV partner, or a vendor with off-market stock — we'd like to hear from you."
        primary={{ label: 'Get in Touch', href: '/contact' }}
      />
    </>
  )
}
