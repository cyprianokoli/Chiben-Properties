import Image from 'next/image'
import type { Metadata } from 'next'
import PageHeader from '@/components/site/PageHeader'
import Container from '@/components/site/Container'
import ClosingCta from '@/components/site/ClosingCta'
import WhyChiben from '@/components/site/WhyChiben'
import { FOUNDERS, FOUNDERS_PHOTO } from '@/lib/content'

export const metadata: Metadata = {
  title: 'About',
  description:
    'Chiben Properties was founded in October 2025 by brothers Edward and Valentine Emeka to help investors find, vet and secure UK property.',
}

export default function AboutPage() {
  return (
    <>
      <PageHeader
        kicker="About Chiben"
        title={
          <>
            Two brothers. One belief: <em>property builds lasting wealth.</em>
          </>
        }
        crumbs={[{ label: 'About' }]}
      />

      {/* ── Our story ───────────────────────────────────── */}
      <section className="bg-[var(--n-50)]" aria-labelledby="our-story">
        <Container className="py-16 md:py-24">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
            <div className="relative aspect-[4/3] overflow-hidden rounded-xl2 lg:aspect-auto lg:min-h-[460px]">
              <Image
                src="/images/brand/hero-terrace.jpg"
                alt="A row of traditional brick terraced houses on an English street"
                fill
                sizes="(max-width: 1024px) 100vw, 45vw"
                className="object-cover"
              />
            </div>

            <div>
              <p className="kicker mb-4">Our story</p>
              <h2 id="our-story" className="title text-[var(--text-1)]">
                We started with <em>our own money.</em>
              </h2>
              <div className="mt-7 space-y-5 text-base leading-relaxed text-[var(--text-2)] md:text-[17px]">
                <p>
                  Chiben Properties was founded in October 2025 by brothers Edward and Valentine
                  Emeka. We grew up in a family of business owners in Nigeria, where property was
                  always seen as the foundation of lasting wealth.
                </p>
                <p>
                  When we each built our lives in the UK, we saw two things clearly. UK property
                  offers real, long-term opportunity. And for many investors, especially those
                  overseas, it&apos;s hard to know which deals to trust.
                </p>
                <p>
                  So we started by investing our own money. Our first property, an HMO in Hull,
                  taught us what a good deal looks like on paper and in practice, from the numbers
                  to the tenants to the day-to-day running.
                </p>
                <p className="font-medium text-[var(--text-1)]">
                  Today we use that experience to help other investors find, vet and secure UK
                  property, with the same care we&apos;d apply to our own.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ── Founders ────────────────────────────────────── */}
      <section className="bg-white" aria-labelledby="founders">
        <Container className="py-16 md:py-24">
          <div className="mb-10 max-w-2xl md:mb-14">
            <p className="kicker mb-4">The founders</p>
            <h2 id="founders" className="title text-[var(--text-1)]">
              The people behind <em>every deal.</em>
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-start lg:gap-14">
            <div className="relative aspect-[4/5] overflow-hidden rounded-xl2 bg-[var(--n-100)] md:aspect-[4/3] lg:sticky lg:top-28 lg:aspect-[8/9]">
              <Image
                src={FOUNDERS_PHOTO}
                alt="Co-founders Edward Emeka and Dr Valentine Emeka"
                fill
                sizes="(max-width: 1024px) 100vw, 42vw"
                className="object-cover object-[center_30%]"
              />
            </div>

            <div className="flex flex-col">
              {FOUNDERS.map((f) => (
                <article key={f.name} className="border-t border-[var(--line)] py-8 first:border-t-0 first:pt-0 md:py-10">
                  <h3 className="font-serif text-3xl leading-tight text-[var(--text-1)] md:text-4xl">{f.name}</h3>
                  <p className="mt-2 text-sm font-semibold text-[var(--brand-blue)]">{f.role}</p>
                  <p className="mt-5 text-base leading-relaxed text-[var(--text-2)] md:text-[17px]">{f.bio}</p>
                </article>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <WhyChiben
        kicker="How we work"
        title={
          <>
            The same care we&apos;d apply to <em>our own.</em>
          </>
        }
        flushTop
      />

      <ClosingCta flushTop />
    </>
  )
}
