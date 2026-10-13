import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import Container from './Container'
import { route } from '@/lib/routes'

interface Crumb {
  label: string
  href?: string
}

interface PageHeaderProps {
  kicker: string
  title: React.ReactNode
  intro?: React.ReactNode
  crumbs: Crumb[]
  children?: React.ReactNode
}

// Shared top-of-page block for the inner pages: breadcrumb, kicker, H1, intro
export default function PageHeader({ kicker, title, intro, crumbs, children }: PageHeaderProps) {
  const trail: Crumb[] = [{ label: 'Home', href: route('/') }, ...crumbs]

  return (
    <section className="bg-white">
      <Container className="pt-8 pb-12 md:pt-12 md:pb-16">
        <nav aria-label="Breadcrumb" className="mb-8 md:mb-12">
          <ol className="flex flex-wrap items-center gap-1.5 text-[13px] text-[var(--text-3)]">
            {trail.map((c, i) => (
              <li key={c.label} className="inline-flex items-center gap-1.5">
                {i > 0 && <ChevronRight size={13} aria-hidden />}
                {c.href && i < trail.length - 1 ? (
                  <Link href={c.href} className="transition-colors hover:text-[var(--text-1)]">
                    {c.label}
                  </Link>
                ) : (
                  <span aria-current={i === trail.length - 1 ? 'page' : undefined} className="text-[var(--text-1)]">
                    {c.label}
                  </span>
                )}
              </li>
            ))}
          </ol>
        </nav>

        <div className="max-w-3xl">
          <p className="kicker mb-5">{kicker}</p>
          <h1 className="display text-[var(--text-1)]">{title}</h1>
          {intro && (
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-[var(--text-2)] md:text-lg">{intro}</p>
          )}
        </div>
        {children}
      </Container>
    </section>
  )
}
