import Link from 'next/link'
import type { Metadata } from 'next'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import PageHeader from '@/components/site/PageHeader'
import Container from '@/components/site/Container'
import ClosingCta from '@/components/site/ClosingCta'
import PropertyShowcase from '@/components/properties/PropertyShowcase'
import PillLink from '@/components/ui/PillLink'
import { getProperties } from '@/lib/properties'
import { route } from '@/lib/routes'
import { cn } from '@/lib/cn'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Portfolio',
  description:
    'Properties Chiben Properties has bought and runs itself, with real purchase figures. New deals are added once they complete.',
}

const PAGE_SIZE = 12

function parsePage(raw: string | string[] | undefined): number {
  const n = Number(Array.isArray(raw) ? raw[0] : raw)
  return Number.isFinite(n) && n >= 1 ? Math.floor(n) : 1
}

function Pagination({ page, totalPages }: { page: number; totalPages: number }) {
  if (totalPages <= 1) return null
  const href = (p: number) => `${route('/portfolio')}${p > 1 ? `?page=${p}` : ''}`
  const base =
    'inline-flex h-11 min-w-[44px] items-center justify-center gap-2 rounded-full px-4 text-sm font-semibold transition-colors'

  return (
    <nav aria-label="Portfolio pages" className="mt-12 flex flex-wrap items-center justify-center gap-2">
      {page > 1 && (
        <Link href={href(page - 1)} className={cn(base, 'border border-[var(--line)] bg-white hover:border-[var(--ink)]')}>
          <ArrowLeft size={16} aria-hidden /> Previous
        </Link>
      )}
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
        <Link
          key={p}
          href={href(p)}
          aria-current={p === page ? 'page' : undefined}
          className={cn(
            base,
            p === page ? 'bg-[var(--ink)] text-white' : 'border border-[var(--line)] bg-white hover:border-[var(--ink)]'
          )}
        >
          {p}
        </Link>
      ))}
      {page < totalPages && (
        <Link href={href(page + 1)} className={cn(base, 'border border-[var(--line)] bg-white hover:border-[var(--ink)]')}>
          Next <ArrowRight size={16} aria-hidden />
        </Link>
      )}
    </nav>
  )
}

export default async function PortfolioPage({ searchParams }: { searchParams: { page?: string | string[] } }) {
  const requested = parsePage(searchParams.page)
  const { properties, total } = await getProperties({ limit: PAGE_SIZE, offset: (requested - 1) * PAGE_SIZE })
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE))

  return (
    <>
      <PageHeader
        kicker="Our portfolio"
        title={
          <>
            Deals we&apos;ve <em>bought ourselves.</em>
          </>
        }
        intro="We judge every deal we source the way we judged our own. Real figures only. We add new deals once they complete."
        crumbs={[{ label: 'Portfolio' }]}
      />

      <section className="bg-[var(--n-50)]" aria-label="Properties">
        <Container className="py-16 md:py-24">
          {total === 0 ? (
            <div className="rounded-xl2 border border-[var(--line)] bg-white p-10 text-center md:p-16">
              <h2 className="font-serif text-3xl text-[var(--text-1)] md:text-4xl">New deals coming soon.</h2>
              <p className="mx-auto mt-4 max-w-md text-[15px] leading-relaxed text-[var(--text-2)]">
                We list properties here once they complete. Tell us what you&apos;re looking for in the
                meantime.
              </p>
              <div className="mt-8 flex justify-center">
                <PillLink href={route('/deal-sourcing#enquire')}>Find Me a Deal</PillLink>
              </div>
            </div>
          ) : properties.length === 0 ? (
            <div className="rounded-xl2 border border-[var(--line)] bg-white p-10 text-center">
              <p className="text-[var(--text-2)]">There are no properties on this page.</p>
              <div className="mt-6 flex justify-center">
                <PillLink href={route('/portfolio')} variant="outline">
                  Back to page 1
                </PillLink>
              </div>
            </div>
          ) : (
            <>
              <p className="mb-6 text-sm text-[var(--text-2)]">
                {total} {total === 1 ? 'property' : 'properties'}
              </p>
              <PropertyShowcase properties={properties} />
              <Pagination page={requested} totalPages={totalPages} />
            </>
          )}
        </Container>
      </section>

      <ClosingCta
        title={
          <>
            Want a deal <em>like this?</em>
          </>
        }
        body="Tell us your budget and strategy, and we'll send you deals that pass the same tests ours did."
        primary={{ label: 'Find Me a Deal', href: route('/deal-sourcing#enquire') }}
      />
    </>
  )
}
