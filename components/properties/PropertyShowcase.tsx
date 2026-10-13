import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import type { Property } from '@/lib/supabase/types'
import { formatPrice } from '@/lib/utils'
import { cn } from '@/lib/cn'
import ShowcaseCard, { propertyHref } from './ShowcaseCard'

interface PropertyShowcaseProps {
  properties: Property[]
}

// Repairs UTF-8 text that was saved as Latin-1 (e.g. "Â£1,800" → "£1,800")
function fixEncoding(text: string) {
  return text
    .replace(/Â£/g, '£')
    .replace(/â€™/g, '’')
    .replace(/â€“/g, '–')
    .replace(/â€”/g, '—')
    .replace(/â€œ|â€\u009d/g, '"')
    .replace(/Â /g, ' ')
}

function summary(description: string | null) {
  if (!description) return null
  const paras = fixEncoding(description)
    .split(/\n\s*\n/)
    .map((s) => s.trim())
    .filter(Boolean)
  // Skip a short "headline" first line such as "13.47% Yield | Fully Let 4-Bed HMO | Hull"
  const body = paras.length > 1 && paras[0].length < 80 ? paras.slice(1) : paras
  return body[0] ?? null
}

function CaseStudy({ property: p }: { property: Property }) {
  const figures: { label: string; value: string }[] = []
  if (p.price != null) figures.push({ label: 'Purchase price', value: formatPrice(p.price) })
  if (p.refurb_cost != null) figures.push({ label: 'Refurb cost', value: formatPrice(p.refurb_cost) })
  if (p.monthly_rent != null)
    figures.push({ label: 'Monthly rent', value: formatPrice(p.monthly_rent) })
  if (p.gross_yield != null)
    figures.push({
      label: 'Gross yield',
      value: `${Number(p.gross_yield).toLocaleString('en-GB', { maximumFractionDigits: 2 })}%`,
    })

  const facts = [p.type, p.bedrooms != null ? `${p.bedrooms} bedrooms` : null, p.tenure]
    .filter(Boolean)
    .join(' · ')
  const text = summary(p.description)

  return (
    <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1.35fr_1fr] lg:gap-6">
      <ShowcaseCard
        property={p}
        featured
        priority={false}
        sizes="(max-width: 1024px) 100vw, 58vw"
      />

      <div className="flex flex-col rounded-xl2 border border-[var(--line)] bg-white p-6 md:p-8">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--text-3)]">
          Case study
        </p>
        <h3 className="mt-3 font-serif text-3xl leading-tight text-[var(--text-1)]">{p.title}</h3>
        {facts && <p className="mt-2 text-sm text-[var(--text-2)]">{facts}</p>}
        {text && (
          <p className="mt-5 text-[15px] leading-relaxed text-[var(--text-2)] line-clamp-4">{text}</p>
        )}

        {figures.length > 0 && (
          <dl
            className={cn(
              'mt-7 grid gap-px overflow-hidden rounded-2xl border border-[var(--line)] bg-[var(--line)]',
              figures.length === 1 ? 'grid-cols-1' : 'grid-cols-2'
            )}
          >
            {figures.map((f) => (
              <div key={f.label} className="bg-[var(--n-50)] p-4 md:p-5">
                <dt className="text-xs font-medium text-[var(--text-3)]">{f.label}</dt>
                <dd className="mt-1.5 font-serif text-2xl leading-none text-[var(--text-1)] md:text-[28px]">
                  {f.value}
                </dd>
              </div>
            ))}
          </dl>
        )}

        <div className="mt-auto pt-7">
          <Link
            href={propertyHref(p)}
            className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--brand-blue)] transition-all hover:gap-3"
          >
            See the full deal <ArrowRight size={16} aria-hidden />
          </Link>
        </div>
      </div>
    </div>
  )
}

export default function PropertyShowcase({ properties }: PropertyShowcaseProps) {
  const count = properties.length
  if (count === 0) return null
  if (count === 1) return <CaseStudy property={properties[0]} />

  // 2 or 4 → two columns; 3 → three across on desktop; 5+ → three across
  const threeUp = count === 3 || count >= 5
  const gridClass = threeUp ? 'md:grid-cols-2 lg:grid-cols-3' : 'md:grid-cols-2'
  const sizes = threeUp
    ? '(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw'
    : '(max-width: 768px) 100vw, 50vw'

  return (
    <div className={cn('grid grid-cols-1 gap-5 lg:gap-6', gridClass)}>
      {properties.map((p, i) => (
        <ShowcaseCard
          key={p.id}
          property={p}
          sizes={sizes}
          // With three cards on a 2-col tablet grid, let the last one span the row
          className={cn(count === 3 && i === 2 && 'md:col-span-2 md:aspect-[16/7] lg:col-span-1 lg:aspect-[4/3]')}
        />
      ))}
    </div>
  )
}
