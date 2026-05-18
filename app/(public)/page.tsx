import Link from 'next/link'
import { ArrowRight, TrendingUp, Building2, Hammer } from 'lucide-react'
import type { Metadata } from 'next'
import Button from '@/components/ui/Button'
import CTABanner from '@/components/ui/CTABanner'

export const metadata: Metadata = {
  title: 'Chiben Properties — UK Property Investment',
  description:
    'UK property investment company acquiring residential assets across Northern England. Three live deals. One disciplined strategy.',
}

const stats = [
  { value: '3', label: 'Live Deals' },
  { value: '3', label: 'UK Markets' },
  { value: '£1M+', label: 'Target Portfolio' },
  { value: 'Oct 2025', label: 'Founded' },
]

const strategies = [
  {
    icon: Building2,
    eyebrow: 'Recurring Income',
    title: 'Buy-to-Let',
    body: 'Long-let residential in high-yield markets across Northern England. Stable tenants, above-average gross yields, financed for hold.',
  },
  {
    icon: TrendingUp,
    eyebrow: 'Yield Density',
    title: 'HMO',
    body: 'Converting the right stock into well-run Houses in Multiple Occupation. Higher rent per property, tighter management, stronger cash-on-cash returns.',
  },
  {
    icon: Hammer,
    eyebrow: 'Capital Growth',
    title: 'Value-Add Flips',
    body: 'Buying below market, refurbishing to a spec the comparables can defend, and exiting at a price the numbers were underwritten for from day one.',
  },
]

const markets = [
  {
    name: 'Hull',
    summary:
      'HMO market, strong tenant demand, the kind of cash-on-cash you can’t find south of the M25.',
  },
  {
    name: 'Oldbury, Birmingham',
    summary:
      'Refurb-to-resale stock, defensible comparables, fast transaction velocity.',
  },
  {
    name: 'Stoke-on-Trent',
    summary:
      'BTL with corporate tenancies. Predictable rent, low management overhead.',
  },
]

const deals = [
  {
    number: '01',
    title: 'Hull HMO',
    tag: 'HMO · Live',
    body:
      'Cash-purchased, fully tenanted. Strongest yield in the portfolio and our first refinance candidate.',
  },
  {
    number: '02',
    title: 'Oldbury Flip',
    tag: 'Flip · Active',
    body:
      'Bridging in, refurb underway. Targeting resale on completion of works.',
  },
  {
    number: '03',
    title: 'Stoke BTL',
    tag: 'BTL · In progress',
    body:
      'Let to a care home operator on a fixed monthly rent. Mortgage in progress.',
  },
]

const pillars = [
  {
    title: 'Underwriting first.',
    body: 'Every deal modelled on conservative assumptions — not best case.',
  },
  {
    title: 'Skin in the game.',
    body: 'Founder capital is in every deal we ask others to back.',
  },
  {
    title: 'Operator, not broker.',
    body: 'We hold and run what we buy. Our returns and yours come from the same place.',
  },
  {
    title: 'Transparent reporting.',
    body: 'Quarterly updates on every JV. No silence between investment and exit.',
  },
]

export default function HomePage() {
  return (
    <>
      {/* Hero — navy */}
      <section className="navy-grid relative overflow-hidden">
        <div className="absolute top-8 right-6 md:top-12 md:right-12 text-[120px] md:text-[200px] leading-none font-serif text-white/[0.04] select-none pointer-events-none">
          01
        </div>
        <div className="relative mx-auto w-full max-w-7xl px-4 md:px-6 lg:px-8 py-24 md:py-36">
          <div className="max-w-3xl">
            <p className="eyebrow-light mb-6">
              Chiben Properties Ltd · Est. Oct 2025
            </p>
            <h1 className="h1 text-[var(--text-on-navy)] mb-7">
              A UK property company built for <em>income</em> — and for <em>scale</em>.
            </h1>
            <p className="text-lg md:text-xl text-[var(--text-on-navy-muted)] leading-relaxed mb-10 max-w-2xl">
              We acquire, refurbish and hold residential assets in high-yield Northern markets. Three live deals. One disciplined strategy. Open to investors and JV partners.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link href="/invest">
                <button
                  className="inline-flex h-[52px] items-center justify-center gap-2 rounded-btn px-8 font-semibold text-base transition-all hover:bg-[var(--gold-hover)]"
                  style={{ backgroundColor: 'var(--gold)', color: 'var(--navy-deep)' }}
                >
                  Invest With Us <ArrowRight size={18} />
                </button>
              </Link>
              <Link href="/portfolio">
                <button
                  className="inline-flex h-[52px] items-center justify-center gap-2 rounded-btn px-8 font-semibold text-base transition-all hover:bg-white/5"
                  style={{
                    border: '1px solid var(--border-on-navy)',
                    color: 'var(--text-on-navy)',
                  }}
                >
                  See the Portfolio
                </button>
              </Link>
            </div>
          </div>
        </div>

        {/* Stats strip */}
        <div className="relative border-t border-[var(--border-on-navy)]">
          <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8 py-10 grid grid-cols-2 gap-8 md:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label}>
                <p className="font-serif text-3xl md:text-5xl text-[var(--gold)] mb-1.5 leading-none">
                  {s.value}
                </p>
                <p className="text-xs uppercase tracking-[0.18em] text-[var(--text-on-navy-muted)]">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Strategies */}
      <section className="bg-[var(--bg-page)]">
        <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8 py-20 md:py-28">
          <div className="max-w-2xl mb-14">
            <p className="eyebrow mb-4">What we do</p>
            <h2 className="h2 text-[var(--text-primary)] mb-5">
              Three strategies. <em>One outcome.</em>
            </h2>
            <p className="text-[var(--text-secondary)] leading-relaxed text-lg">
              Every asset we buy has to do one of three things: produce monthly income, multiply rent per square foot, or turn refurb spend into resale margin. If a deal doesn&apos;t fit, we walk.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            {strategies.map((s) => (
              <div
                key={s.title}
                className="rounded-card border border-[var(--border)] bg-[var(--bg-surface)] p-8 hover:border-[var(--border-gold)] hover:-translate-y-1 transition-all duration-200"
              >
                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-[10px] bg-[var(--accent-bg)]">
                  <s.icon size={24} className="text-[var(--accent)]" />
                </div>
                <p className="eyebrow mb-3">{s.eyebrow}</p>
                <h3 className="font-serif text-2xl text-[var(--text-primary)] mb-4">
                  {s.title}
                </h3>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                  {s.body}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-12">
            <Link
              href="/what-we-do"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--accent)] hover:gap-3 transition-all"
            >
              See how each strategy works <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* Markets — navy */}
      <section className="navy-grid">
        <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8 py-20 md:py-28">
          <div className="max-w-2xl mb-14">
            <p className="eyebrow-light mb-4">Where we operate</p>
            <h2 className="h2 text-[var(--text-on-navy)] mb-5">
              Northern markets. <em>Picked deliberately.</em>
            </h2>
            <p className="text-[var(--text-on-navy-muted)] leading-relaxed text-lg">
              We don&apos;t chase postcodes — we follow yield, demand, and exit liquidity. Right now that means three towns.
            </p>
          </div>

          <div className="border-t border-[var(--border-on-navy)]">
            {markets.map((m, i) => (
              <div
                key={m.name}
                className="grid grid-cols-[40px_1fr] md:grid-cols-[80px_280px_1fr] gap-6 md:gap-10 items-start py-8 md:py-10 border-b border-[var(--border-on-navy)]"
              >
                <p className="font-serif text-2xl md:text-4xl text-[var(--gold)]/40 leading-none">
                  0{i + 1}
                </p>
                <h3 className="font-serif text-2xl md:text-3xl text-[var(--text-on-navy)]">
                  {m.name}
                </h3>
                <p className="text-[var(--text-on-navy-muted)] leading-relaxed text-base md:text-lg md:max-w-xl col-span-2 md:col-span-1">
                  {m.summary}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-10">
            <Link
              href="/portfolio"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--gold)] hover:gap-3 transition-all"
            >
              See live deals <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* Active portfolio */}
      <section className="bg-[var(--bg-page)]">
        <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8 py-20 md:py-28">
          <div className="flex flex-col gap-4 mb-12 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-xl">
              <p className="eyebrow mb-4">Active portfolio</p>
              <h2 className="h2 text-[var(--text-primary)]">
                Three deals. <em>All in motion.</em>
              </h2>
            </div>
            <Link
              href="/portfolio"
              className="flex items-center gap-1.5 text-sm font-semibold text-[var(--accent)] hover:gap-3 transition-all whitespace-nowrap"
            >
              Full portfolio <ArrowRight size={16} />
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            {deals.map((d) => (
              <div
                key={d.title}
                className="rounded-card border border-[var(--border)] bg-[var(--bg-surface)] p-8 hover:border-[var(--border-gold)] hover:-translate-y-1 transition-all duration-200"
              >
                <div className="flex items-start justify-between mb-6">
                  <p className="font-serif text-4xl text-[var(--accent)]/50 leading-none">
                    {d.number}
                  </p>
                  <span className="inline-flex items-center text-[10px] font-semibold uppercase tracking-[0.15em] text-[var(--accent)] border border-[var(--border-gold)] rounded-full px-3 py-1.5">
                    {d.tag}
                  </span>
                </div>
                <h3 className="font-serif text-2xl text-[var(--text-primary)] mb-3">
                  {d.title}
                </h3>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                  {d.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Chiben */}
      <section className="bg-[var(--bg-surface)] border-y border-[var(--border-soft)]">
        <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8 py-20 md:py-28">
          <div className="grid grid-cols-1 gap-14 lg:grid-cols-[1fr_1.2fr] lg:gap-20 lg:items-start">
            <div>
              <p className="eyebrow mb-4">Why Chiben</p>
              <h2 className="h2 text-[var(--text-primary)] mb-6">
                A small operation that does the <em>boring things right.</em>
              </h2>
              <Link href="/about">
                <Button variant="secondary">
                  More about us <ArrowRight size={16} />
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-8">
              {pillars.map((p) => (
                <div key={p.title}>
                  <h3 className="font-serif text-xl text-[var(--text-primary)] mb-2">
                    {p.title}
                  </h3>
                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                    {p.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <CTABanner
        eyebrow="Get the numbers"
        headline={<>Want to see the <em>numbers?</em></>}
        body="We share full underwriting on request — deal-by-deal projections, comparables, refurb scope and exit assumptions. If you're looking to deploy capital into UK residential, let's talk."
        primary={{ label: 'Book a Call', href: '/contact' }}
        secondary={{ label: 'Email Us', href: 'mailto:info@chibenproperties.com' }}
      />
    </>
  )
}
