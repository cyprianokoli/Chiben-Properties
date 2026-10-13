import Image from 'next/image'
import type { Metadata } from 'next'
import PillLink from '@/components/ui/PillLink'
import WhatsAppIcon from '@/components/ui/WhatsAppIcon'
import PropertyShowcase from '@/components/properties/PropertyShowcase'
import { createClient } from '@/lib/supabase/server'
import type { Property } from '@/lib/supabase/types'
import { WHATSAPP_URL } from '@/lib/constants'

export const dynamic = 'force-dynamic'

// Temporary preview of the redesigned homepage for client sign-off.
// Not linked from the live site and kept out of search results.
export const metadata: Metadata = {
  title: { absolute: 'Chiben Properties | UK Property Deal Sourcing for Investors' },
  robots: { index: false, follow: false },
  description:
    'We find, vet and secure buy-to-let, HMO and refurb deals for UK and overseas investors across Northern England and the Midlands.',
}

const HOMEPAGE_LIMIT = 6
const CTA_HREF = '/contact'

async function getProperties(): Promise<Property[]> {
  try {
    const supabase = createClient()
    const { data } = await supabase
      .from('properties')
      .select('*')
      .order('is_featured', { ascending: false })
      .order('listed_at', { ascending: false })
      .limit(HOMEPAGE_LIMIT)
    return (data as Property[] | null) ?? []
  } catch {
    return []
  }
}

// Preview of the multi-listing layouts for sign-off: /preview?showcase=4
function devPreview(properties: Property[], raw: string | string[] | undefined): Property[] {
  if (properties.length === 0) return properties
  const n = Math.min(HOMEPAGE_LIMIT, Math.max(1, Number(Array.isArray(raw) ? raw[0] : raw) || 0))
  if (!raw || !n) return properties
  return Array.from({ length: n }, (_, i) => ({ ...properties[i % properties.length], id: `preview-${i}` }))
}

const stats = [
  { value: '1 HMO', label: 'owned and run in Hull' },
  { value: 'Oct 2025', label: 'Founded' },
]

const steps = [
  {
    title: 'Tell us your goals.',
    body: 'Budget, strategy and timeline on a free 20-minute call.',
  },
  {
    title: 'We source and vet.',
    body: 'We find deals, check the numbers and comparables, and send you a full deal pack.',
  },
  {
    title: 'You decide.',
    body: "No pressure. If a deal isn't right, we keep looking.",
  },
  {
    title: 'We support you to completion.',
    body: 'Introductions to brokers, solicitors and builders, and refurb oversight if you need it.',
  },
]

const sourcing = [
  {
    title: 'Buy-to-Let',
    body: 'Long-let homes with stable tenants and solid gross yields.',
  },
  {
    title: 'HMOs',
    body: 'Higher rent per property, run by vetted local management.',
  },
  {
    title: 'Refurb and flips',
    body: 'Below-market stock with a clear, costed refurb plan and exit.',
  },
]

const reasons = [
  {
    title: 'We buy what we source.',
    body: 'We own and run an HMO in Hull, so we judge deals as owners, not salespeople.',
  },
  {
    title: 'Numbers first.',
    body: 'Every deal pack uses conservative assumptions, not best case.',
  },
  {
    title: 'Built for overseas buyers.',
    body: 'We work across time zones and keep you updated on WhatsApp.',
  },
  {
    title: 'Clear fees.',
    body: 'You see our fee before you commit to anything.',
  },
]

function Container({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-7xl px-4 md:px-6 lg:px-8 ${className}`}>{children}</div>
}

interface Props {
  searchParams: { showcase?: string | string[] }
}

export default async function PreviewHomePage({ searchParams }: Props) {
  const properties = devPreview(await getProperties(), searchParams.showcase)

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────── */}
      <section className="bg-white">
        <Container className="pt-10 pb-12 md:pt-16 md:pb-20">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1.45fr_1fr] lg:items-end lg:gap-16">
            <div>
              <p className="kicker mb-6">Chiben Properties Ltd · Manchester · Est. 2025</p>
              <h1 className="display text-[var(--text-1)]">
                We find, vet and secure UK property
                <span
                  aria-hidden
                  className="relative mx-2 hidden h-[0.78em] w-[1.9em] translate-y-[0.06em] overflow-hidden rounded-full align-baseline ring-1 ring-[var(--line)] sm:inline-block"
                >
                  <Image
                    src="/images/brand/terrace-redbrick.jpg"
                    alt=""
                    fill
                    sizes="140px"
                    className="object-cover"
                  />
                </span>{' '}
                for investors, <em>at home and abroad.</em>
              </h1>
            </div>

            <div className="lg:pb-2">
              <p className="text-base leading-relaxed text-[var(--text-2)] md:text-lg">
                Buy-to-let, HMOs and refurb deals in high-yield markets across Northern England and
                the Midlands. We source the deals we&apos;d buy ourselves, and we handle the legwork
                from search to completion.
              </p>
              <div className="mt-7 flex flex-wrap items-center gap-3">
                <PillLink href={CTA_HREF} size="md">
                  Find Me a Deal
                </PillLink>
                <PillLink href="/portfolio" variant="outline" size="md" arrow={false}>
                  See Our Portfolio
                </PillLink>
              </div>
            </div>
          </div>

          {/* Hero image + stats tab */}
          <div className="relative mt-10 md:mt-14">
            <div className="relative aspect-[4/3] overflow-hidden rounded-xl2 sm:aspect-[16/9] md:rounded-xl3 lg:aspect-[21/9]">
              <Image
                src="/images/brand/hero-terrace.jpg"
                alt="A row of traditional brick terraced houses on a tree-lined English street"
                fill
                priority
                sizes="(max-width: 1280px) 100vw, 1216px"
                className="object-cover object-[center_60%]"
              />
            </div>

            <div className="notch hidden md:flex md:gap-10 md:pl-8 md:pt-6 lg:gap-14 lg:pl-10 lg:pt-7">
              {stats.map((s) => (
                <div key={s.label}>
                  <p className="font-serif text-4xl leading-none text-[var(--text-1)] lg:text-5xl">
                    {s.value}
                  </p>
                  <p className="mt-2 text-sm text-[var(--text-2)]">{s.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Stats on mobile */}
          <div className="mt-4 grid grid-cols-2 gap-3 md:hidden">
            {stats.map((s) => (
              <div key={s.label} className="rounded-2xl bg-[var(--n-50)] p-4">
                <p className="font-serif text-[28px] leading-none text-[var(--text-1)]">{s.value}</p>
                <p className="mt-2 text-sm text-[var(--text-2)]">{s.label}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ── Track record (properties) ────────────────────── */}
      {properties.length > 0 && (
        <section className="bg-[var(--n-50)]" aria-labelledby="track-record">
          <Container className="py-16 md:py-24">
            <div className="mb-10 flex flex-col gap-6 md:mb-12 md:flex-row md:items-end md:justify-between">
              <div className="max-w-2xl">
                <p className="kicker mb-4">Our track record</p>
                <h2 id="track-record" className="title text-[var(--text-1)]">
                  Deals we&apos;ve <em>bought ourselves.</em>
                </h2>
                <p className="mt-4 text-base leading-relaxed text-[var(--text-2)] md:text-lg">
                  Real figures only. We add new deals once they complete.
                </p>
              </div>
              <PillLink href="/portfolio" variant="outline" size="md" className="self-start md:self-auto">
                View Portfolio
              </PillLink>
            </div>

            <PropertyShowcase properties={properties} />
          </Container>
        </section>
      )}

      {/* ── How it works ─────────────────────────────────── */}
      <section className="bg-white" aria-labelledby="how-it-works">
        <Container className="py-16 md:py-24">
          <div className="mb-10 max-w-2xl md:mb-14">
            <p className="kicker mb-4">How it works</p>
            <h2 id="how-it-works" className="title text-[var(--text-1)]">
              From first call to <em>completion.</em>
            </h2>
          </div>

          <ol className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
            {steps.map((s, i) => (
              <li
                key={s.title}
                className="flex flex-col rounded-xl2 border border-[var(--line)] bg-[var(--n-50)] p-6 md:p-7"
              >
                <span className="font-serif text-5xl leading-none text-[var(--brand-blue)]">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="mt-8 text-lg font-semibold leading-snug text-[var(--text-1)]">
                  {s.title}
                </h3>
                <p className="mt-2 text-[15px] leading-relaxed text-[var(--text-2)]">{s.body}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      {/* ── What we source ───────────────────────────────── */}
      <section className="bg-[var(--n-50)]" aria-labelledby="what-we-source">
        <Container className="py-16 md:py-24">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16">
            <div className="flex flex-col">
              <p className="kicker mb-4">What we source</p>
              <h2 id="what-we-source" className="title text-[var(--text-1)]">
                Three strategies, <em>vetted as owners.</em>
              </h2>
              <div className="relative mt-8 aspect-[16/10] overflow-hidden rounded-xl2 lg:mt-10 lg:aspect-auto lg:flex-1 lg:min-h-[320px]">
                <Image
                  src="/images/brand/terrace-doors.jpg"
                  alt="Georgian terraced houses with coloured front doors"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
            </div>

            <ul className="flex flex-col border-t border-[var(--line)] lg:self-end">
              {sourcing.map((s, i) => (
                <li key={s.title} className="grid grid-cols-[44px_1fr] gap-4 border-b border-[var(--line)] py-7 md:py-9">
                  <span className="pt-1.5 text-sm font-semibold text-[var(--text-3)]">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <h3 className="font-serif text-[28px] leading-tight text-[var(--text-1)] md:text-[32px]">
                      {s.title}
                    </h3>
                    <p className="mt-2 text-base leading-relaxed text-[var(--text-2)]">{s.body}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      {/* ── Why Chiben (dark band) ───────────────────────── */}
      <section className="bg-white" aria-labelledby="why-chiben">
        <Container className="py-16 md:py-24">
          <div className="on-dark relative overflow-hidden rounded-xl2 bg-[var(--ink)] px-6 py-12 text-[var(--text-on-dark)] md:rounded-xl3 md:px-12 md:py-16">
            <div
              aria-hidden
              className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-[var(--brand-blue)] opacity-25 blur-[120px]"
            />
            <div className="relative max-w-2xl">
              <p className="kicker kicker-on-dark mb-4">Why Chiben</p>
              <h2 id="why-chiben" className="title">
                We judge deals as <em>owners,</em> not salespeople.
              </h2>
            </div>

            <div className="relative mt-12 grid grid-cols-1 gap-y-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-y-0">
              {reasons.map((r, i) => (
                <div
                  key={r.title}
                  className={`sm:pr-8 lg:px-8 ${i === 0 ? 'lg:pl-0' : 'lg:border-l lg:border-[var(--line-on-dark)]'}`}
                >
                  <h3 className="font-serif text-2xl leading-tight">{r.title}</h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-[var(--text-on-dark-2)]">{r.body}</p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* ── Closing CTA ──────────────────────────────────── */}
      <section className="bg-white" aria-labelledby="closing-cta">
        <Container className="pb-16 md:pb-24">
          <div className="on-dark relative isolate overflow-hidden rounded-xl2 md:rounded-xl3">
            <Image
              src="/images/brand/terrace-redbrick.jpg"
              alt=""
              fill
              sizes="(max-width: 1280px) 100vw, 1216px"
              className="-z-10 object-cover"
            />
            <div
              aria-hidden
              className="absolute inset-0 -z-10"
              style={{
                background:
                  'linear-gradient(90deg, rgba(14,17,22,0.96) 0%, rgba(14,17,22,0.85) 50%, rgba(14,17,22,0.5) 100%)',
              }}
            />

            <div className="px-6 py-14 md:px-14 md:py-20">
              <div className="max-w-xl text-[var(--text-on-dark)]">
                <h2 id="closing-cta" className="title">
                  Ready to buy your next <em>UK property?</em>
                </h2>
                <p className="mt-5 text-base leading-relaxed text-[var(--text-on-dark-2)] md:text-lg">
                  Tell us what you&apos;re looking for and we&apos;ll show you what&apos;s out there.
                </p>
                <div className="mt-8 flex flex-wrap items-center gap-3">
                  <PillLink href={CTA_HREF} variant="light" size="md">
                    Book a Free Call
                  </PillLink>
                  <PillLink
                    href={WHATSAPP_URL}
                    external
                    variant="outline-on-dark"
                    size="md"
                    arrow={false}
                    icon={<WhatsAppIcon size={18} className="text-[var(--whatsapp)]" />}
                  >
                    Message us on WhatsApp
                  </PillLink>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  )
}
