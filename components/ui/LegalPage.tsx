import Link from 'next/link'

interface Props {
  eyebrow: string
  title: React.ReactNode
  intro?: string
  lastUpdated: string
  children: React.ReactNode
}

export default function LegalPage({
  eyebrow,
  title,
  intro,
  lastUpdated,
  children,
}: Props) {
  return (
    <>
      <section className="navy-grid relative overflow-hidden">
        <div className="relative mx-auto max-w-7xl px-4 md:px-6 lg:px-8 py-20 md:py-24">
          <div className="mb-4 flex items-center gap-1.5 text-xs text-[var(--text-on-navy-muted)]">
            <Link href="/" className="hover:text-[var(--gold)] transition-colors">
              Home
            </Link>
            <span>/</span>
            <span className="text-[var(--text-on-navy)]">{eyebrow}</span>
          </div>

          <div className="max-w-3xl mt-8">
            <p className="eyebrow-light mb-5">{eyebrow}</p>
            <h1 className="h1 text-[var(--text-on-navy)] mb-5">{title}</h1>
            {intro && (
              <p className="text-lg text-[var(--text-on-navy-muted)] leading-relaxed max-w-2xl">
                {intro}
              </p>
            )}
            <p className="mt-6 text-xs uppercase tracking-[0.18em] text-[var(--text-on-navy-muted)]">
              Last updated: {lastUpdated}
            </p>
          </div>
        </div>
      </section>

      <section className="bg-[var(--bg-page)]">
        <article className="mx-auto max-w-3xl px-4 md:px-6 lg:px-8 py-16 md:py-24 legal-prose">
          {children}
        </article>
      </section>
    </>
  )
}
