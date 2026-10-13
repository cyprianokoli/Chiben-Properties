import Image from 'next/image'
import PillLink from '@/components/ui/PillLink'
import WhatsAppIcon from '@/components/ui/WhatsAppIcon'
import Container from './Container'
import { WHATSAPP_URL } from '@/lib/constants'
import { route } from '@/lib/routes'

interface ClosingCtaProps {
  title?: React.ReactNode
  body?: string
  primary?: { label: string; href: string }
  /** Drop the top padding when the section above is also white */
  flushTop?: boolean
}

export default function ClosingCta({
  title = (
    <>
      Ready to buy your next <em>UK property?</em>
    </>
  ),
  body = "Tell us what you're looking for and we'll show you what's out there.",
  primary = { label: 'Book a Free Call', href: route('/deal-sourcing#enquire') },
  flushTop = false,
}: ClosingCtaProps) {
  return (
    <section className="bg-white" aria-labelledby="closing-cta">
      <Container className={flushTop ? 'pb-16 md:pb-24' : 'py-16 md:py-24'}>
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
                {title}
              </h2>
              <p className="mt-5 text-base leading-relaxed text-[var(--text-on-dark-2)] md:text-lg">{body}</p>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <PillLink href={primary.href} variant="light" size="md">
                  {primary.label}
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
  )
}
