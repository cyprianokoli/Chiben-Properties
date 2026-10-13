import Image from 'next/image'
import type { Metadata } from 'next'
import PageHeader from '@/components/site/PageHeader'
import Container from '@/components/site/Container'
import ClosingCta from '@/components/site/ClosingCta'
import WhyChiben from '@/components/site/WhyChiben'
import { FOUNDERS } from '@/lib/content'

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

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:gap-8">
            {FOUNDERS.map((f) => (
              <article key={f.name} className="flex flex-col overflow-hidden rounded-xl2 border border-[var(--line)] bg-[var(--n-50)]">
                <div className="relative aspect-[4/3] bg-[var(--n-100)] sm:aspect-[5/4]">
                  <Image
                    src={f.photo}
                    alt={`Portrait of ${f.name}`}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover object-top"
                  />
                </div>
                <div className="flex flex-1 flex-col p-6 md:p-8">
                  <h3 className="font-serif text-3xl leading-tight text-[var(--text-1)]">{f.name}</h3>
                  <p className="mt-1.5 text-sm font-semibold text-[var(--brand-blue)]">{f.role}</p>
                  <p className="mt-5 text-[15px] leading-relaxed text-[var(--text-2)]">{f.bio}</p>
                </div>
              </article>
            ))}
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
