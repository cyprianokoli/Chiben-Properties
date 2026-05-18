import Link from 'next/link'
import { Building2, TrendingUp, Hammer } from 'lucide-react'
import type { Metadata } from 'next'
import CTABanner from '@/components/ui/CTABanner'

export const metadata: Metadata = {
  title: 'What We Do',
  description:
    'Three strategies, run by the same hands. Buy-to-Let, HMO, Value-Add Flips — every deal underwritten before the refurb starts.',
}

const strategies = [
  {
    id: 'buy-to-let',
    number: '01',
    icon: Building2,
    tag: 'Recurring income',
    name: 'Buy-to-Let',
    what:
      'Single-let residential properties in markets where rent covers debt service with margin to spare. Long-term hold, financed on standard BTL mortgages, let to either private tenants or commercial operators (e.g. care home leases).',
    why:
      'Predictable monthly income that compounds. Lower management load than HMOs. Easier to scale once the model is repeatable.',
    current: 'Stoke-on-Trent BTL · Care home tenancy · Fixed monthly rent.',
  },
  {
    id: 'hmo',
    number: '02',
    icon: TrendingUp,
    tag: 'Yield density',
    name: 'HMO',
    what:
      'Houses converted to multiple-occupation use — room-by-room lets, shared kitchen and living space. Article 4 compliant, fully licensed where required.',
    why:
      'A well-run HMO can produce 2–3× the gross rent of the same property let on a single AST. The trade-off is more management — which is why we run the operations ourselves rather than handing it to a third party.',
    current: 'Hull HMO · Cash-purchased · Fully tenanted · First refinance candidate.',
  },
  {
    id: 'value-add',
    number: '03',
    icon: Hammer,
    tag: 'Capital growth',
    name: 'Value-Add Flips',
    what:
      'Buying undervalued stock — usually distressed, tired, or non-standard — refurbishing to a defensible spec, and selling on. Funded with bridging finance, exited inside 6–12 months.',
    why:
      'Generates the capital that funds the next BTL or HMO acquisition. Faster cycle than buy-and-hold. The discipline is in not falling in love with the project — every flip is sized to its exit comparable, not the refurb you wish you could do.',
    current: 'Oldbury, Birmingham · Bridging secured · Refurb in progress.',
  },
]

const filters = [
  {
    title: 'Area test',
    body: 'Yields, demand, transaction velocity, exit liquidity.',
  },
  {
    title: 'Property test',
    body: 'Full survey, refurb scope, post-refurb valuation from independent comparables.',
  },
  {
    title: 'Numbers test',
    body: 'Modelled on conservative rent, 15% refurb contingency, realistic void periods, and stress-tested against a 2% rate move.',
  },
  {
    title: 'Exit test',
    body: 'Every deal has a defined Plan A and Plan B exit. If both don’t work, neither does the deal.',
  },
]

export default function WhatWeDoPage() {
  return (
    <>
      {/* Hero — navy */}
      <section className="navy-grid relative overflow-hidden">
        <div className="absolute top-8 right-6 md:top-12 md:right-12 text-[120px] md:text-[200px] leading-none font-serif text-white/[0.04] select-none pointer-events-none">
          03
        </div>
        <div className="relative mx-auto max-w-7xl px-4 md:px-6 lg:px-8 py-24 md:py-32">
          <div className="mb-4 flex items-center gap-1.5 text-xs text-[var(--text-on-navy-muted)]">
            <Link href="/" className="hover:text-[var(--gold)] transition-colors">Home</Link>
            <span>/</span>
            <span className="text-[var(--text-on-navy)]">What We Do</span>
          </div>

          <div className="max-w-3xl mt-10">
            <p className="eyebrow-light mb-6">What we do</p>
            <h1 className="h1 text-[var(--text-on-navy)] mb-7">
              Three strategies, run by the <em>same hands.</em>
            </h1>
            <p className="text-lg md:text-xl text-[var(--text-on-navy-muted)] leading-relaxed max-w-2xl">
              Every Chiben deal sits in one of three buckets. Each one has its own underwriting, its own exit, and its own risk profile — but they all answer to the same rule: the numbers work before the refurb starts.
            </p>
          </div>
        </div>
      </section>

      {/* Strategy detail blocks */}
      <section className="bg-[var(--bg-page)]">
        <div className="mx-auto max-w-6xl px-4 md:px-6 lg:px-8 py-20 md:py-28">
          <div className="space-y-20 md:space-y-28">
            {strategies.map((s, i) => (
              <article key={s.id} id={s.id} className="scroll-mt-24">
                <div className="grid grid-cols-1 md:grid-cols-[280px_1fr] gap-10 md:gap-16">
                  <div>
                    <p className="font-serif text-6xl md:text-7xl text-[var(--accent)]/30 leading-none mb-5">
                      {s.number}
                    </p>
                    <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-[10px] bg-[var(--accent-bg)]">
                      <s.icon size={22} className="text-[var(--accent)]" />
                    </div>
                    <p className="eyebrow mb-3">{s.tag}</p>
                    <h2 className="font-serif text-3xl md:text-4xl text-[var(--text-primary)]">
                      {s.name}
                    </h2>
                  </div>

                  <div className="space-y-7">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--text-muted)] mb-2">
                        What it is
                      </p>
                      <p className="text-[var(--text-secondary)] leading-relaxed text-base md:text-lg">
                        {s.what}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--text-muted)] mb-2">
                        Why we do it
                      </p>
                      <p className="text-[var(--text-secondary)] leading-relaxed text-base md:text-lg">
                        {s.why}
                      </p>
                    </div>
                    <div className="rounded-card border border-[var(--border-gold)] bg-[var(--accent-bg)] p-5">
                      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--accent)] mb-1.5">
                        Current deal
                      </p>
                      <p className="text-sm md:text-base text-[var(--text-primary)]">
                        {s.current}
                      </p>
                    </div>
                  </div>
                </div>

                {i < strategies.length - 1 && (
                  <div className="mt-20 md:mt-28 border-b border-[var(--border)]" />
                )}
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Underwriting — navy */}
      <section className="navy-grid">
        <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8 py-20 md:py-28">
          <div className="max-w-2xl mb-14">
            <p className="eyebrow-light mb-4">How we underwrite</p>
            <h2 className="h2 text-[var(--text-on-navy)]">
              Every deal goes through <em>the same filter.</em>
            </h2>
            <p className="mt-5 text-[var(--text-on-navy-muted)] leading-relaxed text-lg">
              Before Chiben buys anything, the deal has to survive:
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {filters.map((f, i) => (
              <div
                key={f.title}
                className="rounded-card border border-[var(--border-on-navy)] p-7"
                style={{ backgroundColor: 'rgba(255,255,255,0.02)' }}
              >
                <p className="font-serif text-3xl text-[var(--gold)] mb-4 leading-none">
                  0{i + 1}
                </p>
                <h3 className="font-serif text-xl text-[var(--text-on-navy)] mb-3">
                  {f.title}
                </h3>
                <p className="text-sm text-[var(--text-on-navy-muted)] leading-relaxed">
                  {f.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTABanner
        eyebrow="Investor access"
        headline={<>Want the full <em>underwriting model?</em></>}
        body="Investors on our list receive deal-by-deal breakdowns: assumptions, comparables, projected returns and downside scenarios."
        primary={{ label: 'Request access', href: '/invest' }}
        secondary={{ label: 'Book a call', href: '/contact' }}
      />
    </>
  )
}
