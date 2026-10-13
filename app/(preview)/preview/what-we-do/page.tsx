import Image from 'next/image'
import type { Metadata } from 'next'
import PageHeader from '@/components/site/PageHeader'
import Container from '@/components/site/Container'
import ClosingCta from '@/components/site/ClosingCta'
import PillLink from '@/components/ui/PillLink'
import { STEPS, STRATEGIES, VETTING } from '@/lib/content'
import { route } from '@/lib/routes'

export const metadata: Metadata = {
  title: 'What We Do',
  description:
    'Buy-to-let, HMO and refurb deals sourced and vetted for investors across Northern England and the Midlands, from first call to completion.',
}

const strategyImages: Record<string, { src: string; alt: string }> = {
  'buy-to-let': {
    src: '/images/brand/terrace-doors.jpg',
    alt: 'Terraced houses with coloured front doors',
  },
  hmo: {
    src: '/images/brand/terrace-redbrick.jpg',
    alt: 'A row of red-brick terraced houses',
  },
  'value-add': {
    src: '/images/brand/hero-terrace.jpg',
    alt: 'A long terrace of brick houses on a tree-lined street',
  },
}

export default function WhatWeDoPage() {
  return (
    <>
      <PageHeader
        kicker="What we do"
        title={
          <>
            We source the deals <em>we&apos;d buy ourselves.</em>
          </>
        }
        intro="Buy-to-let, HMOs and refurb deals in high-yield markets across Northern England and the Midlands. We handle the legwork from search to completion."
        crumbs={[{ label: 'What We Do' }]}
      >
        <div className="mt-8 flex flex-wrap items-center gap-3">
          <PillLink href={route('/deal-sourcing#enquire')}>Find Me a Deal</PillLink>
          <PillLink href={route('/portfolio')} variant="outline" arrow={false}>
            See Our Portfolio
          </PillLink>
        </div>
      </PageHeader>

      {/* ── Strategies ──────────────────────────────────── */}
      <section className="bg-[var(--n-50)]" aria-labelledby="strategies">
        <Container className="py-16 md:py-24">
          <div className="mb-10 max-w-2xl md:mb-14">
            <p className="kicker mb-4">What we source</p>
            <h2 id="strategies" className="title text-[var(--text-1)]">
              Three strategies, <em>vetted as owners.</em>
            </h2>
          </div>

          <div className="flex flex-col gap-5 md:gap-6">
            {STRATEGIES.map((s, i) => {
              const img = strategyImages[s.id]
              return (
                <article
                  key={s.id}
                  id={s.id}
                  className="grid scroll-mt-28 grid-cols-1 overflow-hidden rounded-xl2 border border-[var(--line)] bg-white md:grid-cols-[0.9fr_1.1fr]"
                >
                  <div className={`relative aspect-[16/10] md:aspect-auto md:min-h-[300px] ${i % 2 === 1 ? 'md:order-2' : ''}`}>
                    <Image src={img.src} alt={img.alt} fill sizes="(max-width: 768px) 100vw, 45vw" className="object-cover" />
                  </div>
                  <div className="flex flex-col justify-center p-6 md:p-10">
                    <span className="text-sm font-semibold text-[var(--text-3)]">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <h3 className="mt-3 font-serif text-3xl leading-tight text-[var(--text-1)] md:text-4xl">
                      {s.title}
                    </h3>
                    <p className="mt-3 text-base font-medium text-[var(--text-1)]">{s.body}</p>
                    <p className="mt-3 text-[15px] leading-relaxed text-[var(--text-2)]">{s.detail}</p>
                  </div>
                </article>
              )
            })}
          </div>
        </Container>
      </section>

      {/* ── How it works ────────────────────────────────── */}
      <section className="bg-white" aria-labelledby="how-it-works">
        <Container className="py-16 md:py-24">
          <div className="mb-10 max-w-2xl md:mb-14">
            <p className="kicker mb-4">How it works</p>
            <h2 id="how-it-works" className="title text-[var(--text-1)]">
              From first call to <em>completion.</em>
            </h2>
          </div>
          <ol className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
            {STEPS.map((s, i) => (
              <li key={s.title} className="flex flex-col rounded-xl2 border border-[var(--line)] bg-[var(--n-50)] p-6 md:p-7">
                <span className="font-serif text-5xl leading-none text-[var(--brand-blue)]">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="mt-8 text-lg font-semibold leading-snug text-[var(--text-1)]">{s.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-[var(--text-2)]">{s.body}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      {/* ── How we vet ──────────────────────────────────── */}
      <section className="bg-[var(--n-50)]" aria-labelledby="how-we-vet">
        <Container className="py-16 md:py-24">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
            <div>
              <p className="kicker mb-4">How we vet a deal</p>
              <h2 id="how-we-vet" className="title text-[var(--text-1)]">
                Four tests before a deal <em>reaches you.</em>
              </h2>
              <p className="mt-5 max-w-md text-base leading-relaxed text-[var(--text-2)] md:text-lg">
                Every deal pack uses conservative assumptions, not best case. If a deal fails any
                test, we don&apos;t send it.
              </p>
            </div>
            <ul className="flex flex-col border-t border-[var(--line)]">
              {VETTING.map((v, i) => (
                <li key={v.title} className="grid grid-cols-[44px_1fr] gap-4 border-b border-[var(--line)] py-6 md:py-7">
                  <span className="pt-1 text-sm font-semibold text-[var(--text-3)]">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <h3 className="font-serif text-2xl leading-tight text-[var(--text-1)] md:text-[28px]">{v.title}</h3>
                    <p className="mt-2 text-base leading-relaxed text-[var(--text-2)]">{v.body}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      <ClosingCta />
    </>
  )
}
