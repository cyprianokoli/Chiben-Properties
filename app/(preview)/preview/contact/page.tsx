import type { Metadata } from 'next'
import { Clock, Mail, MapPin, Phone } from 'lucide-react'
import PageHeader from '@/components/site/PageHeader'
import Container from '@/components/site/Container'
import ContactForm from '@/components/site/ContactForm'
import PillLink from '@/components/ui/PillLink'
import WhatsAppIcon from '@/components/ui/WhatsAppIcon'
import { EMAIL, OFFICE_ADDRESS, PHONE_DISPLAY, PHONE_TEL, WHATSAPP_DISPLAY, WHATSAPP_URL } from '@/lib/constants'
import { route } from '@/lib/routes'

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Looking for a deal, selling a property, or have a question? Contact Chiben Properties by WhatsApp, phone or email. We reply within one business day.',
}

const channels = [
  {
    icon: <WhatsAppIcon size={20} />,
    iconClass: 'bg-[var(--whatsapp)] text-white',
    title: 'WhatsApp',
    value: WHATSAPP_DISPLAY,
    href: WHATSAPP_URL,
    external: true,
    note: 'Fastest way to reach us',
  },
  {
    icon: <Phone size={18} />,
    iconClass: 'bg-[var(--ink)] text-white',
    title: 'Phone',
    value: PHONE_DISPLAY,
    href: `tel:${PHONE_TEL}`,
    external: false,
    note: 'Mon–Fri, 09:00–18:00',
  },
  {
    icon: <Mail size={18} />,
    iconClass: 'bg-[var(--ink)] text-white',
    title: 'Email',
    value: EMAIL,
    href: `mailto:${EMAIL}`,
    external: false,
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
      <PageHeader
        kicker="Contact"
        title={
          <>
            Let&apos;s <em>talk.</em>
          </>
        }
        intro="Looking for a deal, selling a property, or just have a question? We read every message and reply within one business day."
        crumbs={[{ label: 'Contact' }]}
      />

      <section className="bg-[var(--n-50)]" aria-label="Contact details and form">
        <Container className="py-16 md:py-24">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
            <div className="flex flex-col gap-3">
              {channels.map((c) => (
                <a
                  key={c.title}
                  href={c.href}
                  {...(c.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  className="flex items-center gap-4 rounded-2xl border border-[var(--line)] bg-white p-4 transition-colors hover:border-[var(--ink)] md:p-5"
                >
                  <span className={`flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full ${c.iconClass}`}>
                    {c.icon}
                  </span>
                  <span className="min-w-0">
                    <span className="block text-xs font-semibold uppercase tracking-[0.14em] text-[var(--text-3)]">
                      {c.title}
                    </span>
                    <span className="mt-0.5 block truncate text-base font-semibold text-[var(--text-1)]">{c.value}</span>
                    <span className="block text-sm text-[var(--text-2)]">{c.note}</span>
                  </span>
                </a>
              ))}

              <div className="rounded-2xl border border-[var(--line)] bg-white p-5">
                <div className="flex items-center gap-3">
                  <MapPin size={18} className="text-[var(--brand-blue)]" aria-hidden />
                  <span className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--text-3)]">Office</span>
                </div>
                <p className="mt-2 text-base text-[var(--text-1)]">
                  {OFFICE_ADDRESS.map((l) => (
                    <span key={l} className="block">
                      {l}
                    </span>
                  ))}
                </p>

                <div className="mt-5 flex items-center gap-3 border-t border-[var(--line)] pt-5">
                  <Clock size={18} className="text-[var(--brand-blue)]" aria-hidden />
                  <span className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--text-3)]">Hours</span>
                </div>
                <dl className="mt-2 flex flex-col gap-1.5 text-[15px]">
                  {hours.map((h) => (
                    <div key={h.day} className="flex justify-between gap-4">
                      <dt className="text-[var(--text-2)]">{h.day}</dt>
                      <dd className="font-medium text-[var(--text-1)]">{h.time}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>

            <div>
              <ContactForm />
              <div className="mt-6 flex flex-col gap-4 rounded-2xl bg-[var(--ink)] p-6 text-white sm:flex-row sm:items-center sm:justify-between">
                <p className="text-[15px] leading-relaxed text-[var(--text-on-dark-2)]">
                  <span className="block font-serif text-xl text-white">Looking for a property?</span>
                  Share your budget and strategy for a faster answer.
                </p>
                <PillLink href={route('/deal-sourcing#enquire')} variant="light" size="sm" className="self-start sm:self-auto">
                  Find Me a Deal
                </PillLink>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  )
}
