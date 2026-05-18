import Link from 'next/link'
import { MapPin, Phone, Mail, Clock } from 'lucide-react'
import type { Metadata } from 'next'
import ContactForm from './ContactForm'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Investor enquiry, JV proposal, off-market deal, or a question — we read every message and reply within one business day.',
}

const contactCards = [
  {
    icon: MapPin,
    title: 'Office',
    lines: ['Bartle House, Oxford Court', 'Manchester, M2 3WQ', 'United Kingdom'],
  },
  {
    icon: Phone,
    title: 'Phone',
    lines: ['0330 043 7697'],
    note: 'Mon–Fri 09:00–18:00',
  },
  {
    icon: Mail,
    title: 'Email',
    lines: ['info@chibenproperties.com'],
    note: 'We reply within one business day',
  },
]

const hours = [
  { day: 'Monday – Friday', time: '09:00 – 18:00' },
  { day: 'Saturday', time: 'By appointment' },
  { day: 'Sunday', time: 'Closed' },
]

export default function ContactPage() {
  return (
    <>
      {/* Hero — navy */}
      <section className="navy-grid relative overflow-hidden">
        <div className="absolute top-8 right-6 md:top-12 md:right-12 text-[120px] md:text-[200px] leading-none font-serif text-white/[0.04] select-none pointer-events-none">
          06
        </div>
        <div className="relative mx-auto max-w-7xl px-4 md:px-6 lg:px-8 py-24 md:py-32">
          <div className="mb-4 flex items-center gap-1.5 text-xs text-[var(--text-on-navy-muted)]">
            <Link href="/" className="hover:text-[var(--gold)] transition-colors">Home</Link>
            <span>/</span>
            <span className="text-[var(--text-on-navy)]">Contact</span>
          </div>

          <div className="max-w-3xl mt-10">
            <p className="eyebrow-light mb-6">Contact</p>
            <h1 className="h1 text-[var(--text-on-navy)] mb-7">
              Let&apos;s <em>talk.</em>
            </h1>
            <p className="text-lg md:text-xl text-[var(--text-on-navy-muted)] leading-relaxed max-w-2xl">
              Investor enquiry, JV proposal, off-market deal, or a question — we read every message and reply within one business day.
            </p>
          </div>
        </div>
      </section>

      {/* Contact info cards */}
      <section className="bg-[var(--bg-page)]">
        <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8 py-14">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
            {contactCards.map((card) => (
              <div
                key={card.title}
                className="rounded-card border border-[var(--border)] bg-[var(--bg-surface)] p-7"
              >
                <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-[10px] bg-[var(--accent-bg)]">
                  <card.icon size={22} className="text-[var(--accent)]" />
                </div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--text-muted)] mb-3">
                  {card.title}
                </p>
                {card.lines.map((line) => (
                  <p
                    key={line}
                    className="text-base font-medium text-[var(--text-primary)] leading-relaxed"
                  >
                    {line}
                  </p>
                ))}
                {card.note && (
                  <p className="mt-2 text-xs text-[var(--text-muted)]">{card.note}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Form + sidebar */}
      <section className="bg-[var(--bg-surface)] border-y border-[var(--border-soft)]">
        <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8 py-16 md:py-24">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_360px]">
            <div>
              <p className="eyebrow mb-4">Send a message</p>
              <h2 className="h2 text-[var(--text-primary)] mb-10">
                Make an <em>enquiry.</em>
              </h2>
              <ContactForm />
            </div>

            <div className="flex flex-col gap-6">
              <div className="rounded-card border border-[var(--border)] bg-[var(--bg-page)] p-6">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-[10px] bg-[var(--accent-bg)]">
                  <Clock size={20} className="text-[var(--accent)]" />
                </div>
                <p className="eyebrow mb-4">Office hours</p>
                <ul className="flex flex-col gap-3">
                  {hours.map((h) => (
                    <li key={h.day} className="flex items-center justify-between">
                      <span className="text-sm text-[var(--text-secondary)]">{h.day}</span>
                      <span className="text-sm font-medium text-[var(--text-primary)]">{h.time}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-card border border-[var(--border)] bg-[var(--bg-page)] p-6">
                <p className="eyebrow mb-3">Prefer a call?</p>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-5">
                  Skip the form. Book a 30-minute intro call directly with the founder.
                </p>
                <a
                  href="tel:+443300437697"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--accent)] hover:gap-3 transition-all"
                >
                  0330 043 7697 →
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
