import Container from './Container'
import { REASONS } from '@/lib/content'

interface WhyChibenProps {
  kicker?: string
  title?: React.ReactNode
  /** Drop the top padding when the section above is also white */
  flushTop?: boolean
}

export default function WhyChiben({
  kicker = 'Why Chiben',
  title = (
    <>
      We judge deals as <em>owners,</em> not salespeople.
    </>
  ),
  flushTop = false,
}: WhyChibenProps) {
  return (
    <section className="bg-white" aria-labelledby="why-chiben">
      <Container className={flushTop ? 'pb-16 md:pb-24' : 'py-16 md:py-24'}>
        <div className="on-dark relative overflow-hidden rounded-xl2 bg-[var(--ink)] px-6 py-12 text-[var(--text-on-dark)] md:rounded-xl3 md:px-12 md:py-16">
          <div
            aria-hidden
            className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-[var(--brand-blue)] opacity-25 blur-[120px]"
          />
          <div className="relative max-w-2xl">
            <p className="kicker kicker-on-dark mb-4">{kicker}</p>
            <h2 id="why-chiben" className="title">
              {title}
            </h2>
          </div>

          <div className="relative mt-12 grid grid-cols-1 gap-y-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-y-0">
            {REASONS.map((r, i) => (
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
  )
}
