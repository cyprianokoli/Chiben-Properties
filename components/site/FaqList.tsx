import { Plus } from 'lucide-react'

interface Faq {
  q: string
  a: string
}

// Native <details> accordion: works without JS and is keyboard accessible
export default function FaqList({ items }: { items: Faq[] }) {
  return (
    <div className="flex flex-col gap-3">
      {items.map((f, i) => (
        <details
          key={f.q}
          open={i === 0}
          className="group rounded-2xl border border-[var(--line)] bg-white open:bg-white"
        >
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-5 text-left text-base font-semibold text-[var(--text-1)] md:px-6 [&::-webkit-details-marker]:hidden">
            {f.q}
            <span
              aria-hidden
              className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-[var(--n-50)] text-[var(--text-1)] transition-transform duration-200 group-open:rotate-45"
            >
              <Plus size={16} />
            </span>
          </summary>
          <p className="px-5 pb-5 text-[15px] leading-relaxed text-[var(--text-2)] md:px-6">{f.a}</p>
        </details>
      ))}
    </div>
  )
}
