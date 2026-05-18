import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

interface CTABannerProps {
  eyebrow?: string
  headline: React.ReactNode
  body?: string
  primary: { label: string; href: string }
  secondary?: { label: string; href: string }
}

export default function CTABanner({
  eyebrow,
  headline,
  body,
  primary,
  secondary,
}: CTABannerProps) {
  return (
    <section className="navy-radial py-16 md:py-24">
      <div className="mx-auto max-w-3xl px-4 md:px-6 lg:px-8 text-center">
        {eyebrow && <p className="eyebrow-light mb-5">{eyebrow}</p>}
        <h2 className="h2 text-[var(--text-on-navy)] mb-5">{headline}</h2>
        {body && (
          <p className="mb-9 text-[var(--text-on-navy-muted)] leading-relaxed text-lg max-w-xl mx-auto">
            {body}
          </p>
        )}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href={primary.href}>
            <button
              className="inline-flex h-[52px] items-center justify-center gap-2 rounded-btn px-8 font-semibold text-base transition-all hover:bg-[var(--gold-hover)]"
              style={{ backgroundColor: 'var(--gold)', color: 'var(--navy-deep)' }}
            >
              {primary.label} <ArrowRight size={18} />
            </button>
          </Link>
          {secondary && (
            <Link href={secondary.href}>
              <button
                className="inline-flex h-[52px] items-center justify-center gap-2 rounded-btn px-8 font-semibold text-base transition-all hover:bg-white/5"
                style={{
                  border: '1px solid var(--border-on-navy)',
                  color: 'var(--text-on-navy)',
                }}
              >
                {secondary.label}
              </button>
            </Link>
          )}
        </div>
      </div>
    </section>
  )
}
