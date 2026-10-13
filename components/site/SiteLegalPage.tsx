import PageHeader from './PageHeader'
import Container from './Container'
import type { LegalLayoutProps } from '@/components/legal/types'

// Redesigned wrapper for the legal documents (same text as the live pages)
export default function SiteLegalPage({ eyebrow, title, intro, lastUpdated, children }: LegalLayoutProps) {
  return (
    <>
      <PageHeader kicker={eyebrow} title={title} intro={intro} crumbs={[{ label: eyebrow }]}>
        <p className="mt-6 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--text-3)]">
          Last updated: {lastUpdated}
        </p>
      </PageHeader>

      <section className="bg-[var(--n-50)]">
        <Container className="py-12 md:py-20">
          <article className="legal-prose site-prose mx-auto max-w-3xl rounded-xl2 border border-[var(--line)] bg-white p-6 sm:p-10 md:p-14">
            {children}
          </article>
        </Container>
      </section>
    </>
  )
}
