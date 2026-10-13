import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { cn } from '@/lib/cn'

type Variant = 'dark' | 'outline' | 'light' | 'outline-on-dark'

interface PillLinkProps {
  href: string
  children: React.ReactNode
  variant?: Variant
  size?: 'sm' | 'md' | 'lg'
  arrow?: boolean
  external?: boolean
  className?: string
  icon?: React.ReactNode
}

const variants: Record<Variant, { base: string; chip: string }> = {
  dark: {
    base: 'bg-[var(--ink)] text-white hover:bg-[var(--brand-navy)]',
    chip: 'bg-white text-[var(--ink)]',
  },
  outline: {
    base: 'bg-white text-[var(--text-1)] border border-[var(--line)] hover:border-[var(--ink)]',
    chip: 'bg-[var(--ink)] text-white',
  },
  light: {
    base: 'bg-white text-[var(--ink)] hover:bg-[var(--n-100)]',
    chip: 'bg-[var(--ink)] text-white',
  },
  'outline-on-dark': {
    base: 'bg-transparent text-white border border-[var(--line-on-dark)] hover:border-white/60',
    chip: 'bg-white text-[var(--ink)]',
  },
}

const sizes = {
  sm: { base: 'h-10 pl-5 text-[13px]', pr: 'pr-1.5', noArrow: 'pr-5', chip: 'h-7 w-7' },
  md: { base: 'h-12 pl-6 text-sm', pr: 'pr-1.5', noArrow: 'pr-6', chip: 'h-9 w-9' },
  lg: { base: 'h-14 pl-7 text-[15px]', pr: 'pr-2', noArrow: 'pr-7', chip: 'h-10 w-10' },
}

export default function PillLink({
  href,
  children,
  variant = 'dark',
  size = 'md',
  arrow = true,
  external = false,
  className,
  icon,
}: PillLinkProps) {
  const v = variants[variant]
  const s = sizes[size]
  const classes = cn(
    'group inline-flex items-center justify-between gap-3 rounded-full font-semibold whitespace-nowrap transition-colors duration-200',
    'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--brand-blue)]',
    v.base,
    s.base,
    arrow ? s.pr : s.noArrow,
    className
  )

  const content = (
    <>
      <span className="inline-flex items-center gap-2">
        {icon}
        {children}
      </span>
      {arrow && (
        <span
          aria-hidden
          className={cn(
            'inline-flex flex-shrink-0 items-center justify-center rounded-full transition-transform duration-200 group-hover:rotate-45',
            v.chip,
            s.chip
          )}
        >
          <ArrowUpRight size={16} strokeWidth={2.25} />
        </span>
      )}
    </>
  )

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
        {content}
      </a>
    )
  }

  return (
    <Link href={href} className={classes}>
      {content}
    </Link>
  )
}
