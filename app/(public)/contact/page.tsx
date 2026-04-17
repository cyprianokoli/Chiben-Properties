import Link from 'next/link'
import { MapPin, Phone, Mail, Clock } from 'lucide-react'
import type { Metadata } from 'next'
import ContactForm from './ContactForm'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch with Chiben Properties — book a valuation, make an enquiry or visit our office.',
}

const contactCards = [
  {
    icon: MapPin,
    title: 'Our Office',
    lines: ['12 Mayfair Court', 'London W1K 2AL', 'United Kingdom'],
  },
  {
    icon: Phone,
    title: 'Phone',
    lines: ['+44 20 7946 0123'],
    note: 'Mon–Fri 09:00–18:00',
  },
  {
    icon: Mail,
    title: 'Email',
    lines: ['hello@chibenproperties.co.uk'],
    note: 'We aim to reply within 2 hours',
  },
]

const hours = [
  { day: 'Monday – Friday', time: '09:00 – 18:00' },
  { day: 'Saturday', time: '10:00 – 16:00' },
  { day: 'Sunday', time: 'By Appointment' },
]

export default function ContactPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-[var(--bg-surface)] border-b border-[var(--border)]">
        <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8 pt-12 pb-10 md:pt-16">
          <div className="mb-4 flex items-center gap-1.5 text-xs text-[var(--text-muted)]">
            <Link href="/" className="hover:text-[var(--accent)] transition-colors">Home</Link>
            <span>/</span>
            <span className="text-[var(--text-primary)]">Contact</span>
          </div>
          <p className="eyebrow mb-3">Let&apos;s Talk</p>
          <h1 className="h1 text-[var(--text-primary)] max-w-lg">
            We&apos;d Love to <em>Hear</em> From You
          </h1>
          <p className="mt-4 max-w-xl text-lg text-[var(--text-secondary)] leading-relaxed">
            Whether you&apos;re looking to buy, sell or simply want expert advice — our team is ready to help.
          </p>
        </div>
      </section>

      {/* Contact info cards */}
      <section className="bg-[var(--bg-page)]">
        <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
            {contactCards.map((card) => (
              <div
                key={card.title}
                className="rounded-card border border-[var(--border)] bg-[var(--bg-surface)] p-6"
              >
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-[10px] bg-[var(--accent-bg)]">
                  <card.icon size={22} className="text-[var(--accent)]" />
                </div>
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--text-muted)] mb-3">
                  {card.title}
                </p>
                {card.lines.map((line) => (
                  <p key={line} className="text-sm font-medium text-[var(--text-primary)] leading-relaxed">
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

      {/* Form + Hours */}
      <section className="bg-[var(--bg-surface)]">
        <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8 py-12 md:py-20">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_400px]">
            {/* Form */}
            <div>
              <p className="eyebrow mb-3">Send a Message</p>
              <h2 className="h2 text-[var(--text-primary)] mb-8">
                Make an <em>Enquiry</em>
              </h2>
              <ContactForm />
            </div>

            {/* Office info */}
            <div className="flex flex-col gap-8">
              {/* Opening hours */}
              <div className="rounded-card border border-[var(--border)] bg-[var(--bg-page)] p-6">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-[10px] bg-[var(--accent-bg)]">
                  <Clock size={20} className="text-[var(--accent)]" />
                </div>
                <p className="eyebrow mb-4">Opening Hours</p>
                <ul className="flex flex-col gap-3">
                  {hours.map((h) => (
                    <li key={h.day} className="flex items-center justify-between">
                      <span className="text-sm text-[var(--text-secondary)]">{h.day}</span>
                      <span className="text-sm font-medium text-[var(--text-primary)]">{h.time}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Map placeholder */}
              <div className="rounded-card border border-[var(--border)] bg-[var(--bg-elevated)] overflow-hidden aspect-[4/3] flex items-center justify-center">
                <div className="text-center px-6">
                  <MapPin size={32} className="text-[var(--accent)] mx-auto mb-3" />
                  <p className="text-sm font-medium text-[var(--text-primary)] mb-1">12 Mayfair Court</p>
                  <p className="text-xs text-[var(--text-muted)]">London W1K 2AL</p>
                  <a
                    href="https://maps.google.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-[var(--accent)] hover:underline"
                  >
                    Open in Google Maps →
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Valuation CTA Strip */}
      <section style={{ backgroundColor: '#0F1117' }} className="py-14 md:py-20">
        <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="eyebrow mb-2" style={{ color: '#C9A96E' }}>Free & No Obligation</p>
              <h2
                className="font-bold mb-2"
                style={{ fontSize: 'clamp(24px, 3vw, 40px)', color: '#F1F0EC' }}
              >
                Thinking of Selling Your Home?
              </h2>
              <p className="max-w-md text-sm leading-relaxed" style={{ color: 'rgba(241,240,236,0.65)' }}>
                Receive an expert valuation from our senior team — completely free and with no obligation.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href="#contact-form"
                className="inline-flex h-[52px] items-center justify-center gap-2 whitespace-nowrap rounded-btn px-8 font-semibold text-base transition-all hover:opacity-90"
                style={{ backgroundColor: '#C9A96E', color: '#0F1117' }}
              >
                Get Started
              </a>
              <Link href="/properties">
                <button
                  className="inline-flex h-[52px] items-center justify-center gap-2 whitespace-nowrap rounded-btn px-8 font-semibold text-base transition-all hover:bg-white/10"
                  style={{ border: '1px solid rgba(255,255,255,0.2)', color: '#F1F0EC' }}
                >
                  View Properties
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
