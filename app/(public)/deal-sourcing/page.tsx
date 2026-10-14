import type { Metadata } from 'next'
import { Check, Mail } from 'lucide-react'
import PageHeader from '@/components/site/PageHeader'
import Container from '@/components/site/Container'
import FaqList from '@/components/site/FaqList'
import DealSourcingForm from '@/components/site/DealSourcingForm'
import PillLink from '@/components/ui/PillLink'
import WhatsAppIcon from '@/components/ui/WhatsAppIcon'
import { EMAIL, FEES, WHATSAPP_URL } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Deal Sourcing',
  description:
    'Your UK property, found and vetted for you. Deal sourcing for first-time, busy, overseas and experienced investors across Northern England and the Midlands.',
}

const audiences = [
  'First-time investors who want a guided start',
  'Busy professionals with no time to search',
  'Overseas investors buying in the UK without being here',
  'Experienced landlords adding to their portfolio',
]

const deliverables = [
  'A deal pack for each property: purchase price, refurb estimate, rent evidence, comparables and projected yield',
  'Area research covering tenant demand and local market data',
  'Viewing support, including video walk-throughs for overseas buyers',
  'Introductions to mortgage brokers, solicitors and builders we work with',
  'Optional refurb oversight and letting setup',
]

const faqs = [
  {
    q: 'Can I buy UK property from Nigeria?',
    a: 'Yes. Overseas buyers can buy UK property. Mortgage options are more limited, so we connect you with brokers who specialise in overseas clients.',
  },
  {
    q: 'Do you guarantee returns?',
    a: 'No. We share our numbers and assumptions so you can make your own decision. Property values and rents can go down as well as up.',
  },
  {
    q: 'Can I buy through a company?',
    a: 'Yes. Many investors buy through a UK limited company. Speak to an accountant about what suits you.',
  },
]

export default function DealSourcingPage() {
  return (
    <>
      <PageHeader
        kicker="Deal sourcing"
        title={
          <>
            Your UK property, <em>found and vetted for you.</em>
          </>
        }
        intro="Whether you live in the UK, Nigeria or elsewhere, we find investment property that fits your budget and goals, and we stay with you until the keys are in your hand."
        crumbs={[{ label: 'Deal Sourcing' }]}
      >
        <div className="mt-8 flex flex-wrap items-center gap-3">
          <PillLink href="#enquire">Find Me a Deal</PillLink>
          <PillLink
            href={WHATSAPP_URL}
            external
            variant="outline"
            arrow={false}
            icon={<WhatsAppIcon size={18} className="text-[var(--whatsapp)]" />}
          >
            Message us on WhatsApp
          </PillLink>
        </div>
      </PageHeader>

      {/* ── Who it's for / What you get ─────────────────── */}
      <section className="bg-[var(--n-50)]" aria-label="Who it's for and what you get">
        <Container className="py-16 md:py-24">
          <div className="grid grid-cols-1 gap-5 lg:grid-cols-[0.85fr_1.15fr] lg:gap-6">
            <div className="rounded-xl2 border border-[var(--line)] bg-white p-6 md:p-10">
              <p className="kicker mb-4">Who it&apos;s for</p>
              <h2 className="font-serif text-3xl leading-tight text-[var(--text-1)] md:text-4xl">
                Investors who want the <em className="em-blue">legwork done.</em>
              </h2>
              <ul className="mt-8 flex flex-col gap-4">
                {audiences.map((a) => (
                  <li key={a} className="flex gap-3 text-base leading-relaxed text-[var(--text-2)]">
                    <span aria-hidden className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-[var(--brand-blue-bg)] text-[var(--brand-blue)]">
                      <Check size={14} strokeWidth={2.5} />
                    </span>
                    {a}
                  </li>
                ))}
              </ul>
            </div>

            <div className="on-dark rounded-xl2 bg-[var(--ink)] p-6 text-[var(--text-on-dark)] md:p-10">
              <p className="kicker kicker-on-dark mb-4">What you get</p>
              <h2 className="font-serif text-3xl leading-tight md:text-4xl">
                Everything you need to <em className="em-blue-light">decide with confidence.</em>
              </h2>
              <ol className="mt-8 flex flex-col">
                {deliverables.map((d, i) => (
                  <li key={d} className="grid grid-cols-[36px_1fr] gap-3 border-t border-[var(--line-on-dark)] py-4 text-[15px] leading-relaxed text-[var(--text-on-dark-2)] first:border-t-0 first:pt-0">
                    <span className="text-sm font-semibold text-[var(--brand-blue-light)]">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    {d}
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </Container>
      </section>

      {/* ── Our fee + FAQs ──────────────────────────────── */}
      <section className="bg-white" aria-label="Fees and questions">
        <Container className="py-16 md:py-24">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <p className="kicker mb-4">Our fee</p>
              <h2 className="title text-[var(--text-1)]">
                Clear fees, <em>agreed upfront.</em>
              </h2>
              <div className="mt-8 overflow-hidden rounded-xl2 border border-[var(--line)]">
                <table className="w-full text-left">
                  <thead className="bg-[var(--n-50)]">
                    <tr>
                      <th scope="col" className="px-5 py-4 text-xs font-semibold uppercase tracking-[0.14em] text-[var(--text-3)] md:px-6">
                        Service
                      </th>
                      <th scope="col" className="px-5 py-4 text-xs font-semibold uppercase tracking-[0.14em] text-[var(--text-3)] md:px-6">
                        Fee
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {FEES.map((f) => (
                      <tr key={f.service} className="border-t border-[var(--line)]">
                        <th scope="row" className="px-5 py-5 text-[15px] font-semibold text-[var(--text-1)] md:px-6">
                          {f.service}
                        </th>
                        <td className="px-5 py-5 text-[15px] text-[var(--text-2)] md:px-6">
                          {f.fee ?? 'Set out in our terms of business'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-[var(--text-2)]">
                All fees are set out in writing in our terms of business before you commit.
              </p>
            </div>

            <div>
              <p className="kicker mb-4">Questions buyers ask</p>
              <h2 className="title mb-8 text-[var(--text-1)]">
                Good <em>questions.</em>
              </h2>
              <FaqList items={faqs} />
            </div>
          </div>
        </Container>
      </section>

      {/* ── Enquiry form ────────────────────────────────── */}
      <section id="enquire" className="scroll-mt-20 bg-[var(--n-50)]" aria-labelledby="enquire-title">
        <Container className="py-16 md:py-24">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
            <div>
              <p className="kicker mb-4">Start here</p>
              <h2 id="enquire-title" className="title text-[var(--text-1)]">
                Tell us what you&apos;re <em>looking for.</em>
              </h2>
              <p className="mt-5 text-base leading-relaxed text-[var(--text-2)] md:text-lg">
                Share your brief and we&apos;ll book a free 20-minute call to talk through your budget,
                strategy and timeline.
              </p>

              <div className="mt-8 flex flex-col gap-3">
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 rounded-2xl border border-[var(--line)] bg-white p-4 transition-colors hover:border-[var(--ink)]"
                >
                  <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full bg-[var(--whatsapp)] text-white">
                    <WhatsAppIcon size={20} />
                  </span>
                  <span>
                    <span className="block text-sm font-semibold text-[var(--text-1)]">Prefer WhatsApp?</span>
                    <span className="block text-sm text-[var(--text-2)]">Message us any time</span>
                  </span>
                </a>
                <a
                  href={`mailto:${EMAIL}`}
                  className="flex items-center gap-4 rounded-2xl border border-[var(--line)] bg-white p-4 transition-colors hover:border-[var(--ink)]"
                >
                  <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full bg-[var(--ink)] text-white">
                    <Mail size={18} />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-sm font-semibold text-[var(--text-1)]">Email us</span>
                    <span className="block truncate text-sm text-[var(--text-2)]">{EMAIL}</span>
                  </span>
                </a>
              </div>
            </div>

            <DealSourcingForm />
          </div>
        </Container>
      </section>
    </>
  )
}
