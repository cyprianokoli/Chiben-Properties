'use client'

import { useCallback, useRef, useState } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/cn'

interface PropertyGalleryProps {
  images: string[]
  title: string
  status: string
}

export default function PropertyGallery({ images, title, status }: PropertyGalleryProps) {
  const [current, setCurrent] = useState(0)
  const touchStartX = useRef<number | null>(null)
  const count = images.length

  const go = useCallback(
    (i: number) => setCurrent(((i % count) + count) % count),
    [count]
  )

  if (count === 0) {
    return (
      <div className="flex aspect-[16/10] items-center justify-center rounded-xl2 bg-[var(--n-100)]">
        <span className="text-sm text-[var(--text-3)]">Photos coming soon</span>
      </div>
    )
  }

  return (
    <div>
      <div
        className="relative aspect-[4/3] overflow-hidden rounded-xl2 bg-[var(--n-100)] sm:aspect-[16/10] md:rounded-xl3"
        onTouchStart={(e) => (touchStartX.current = e.touches[0].clientX)}
        onTouchEnd={(e) => {
          if (touchStartX.current === null) return
          const delta = e.changedTouches[0].clientX - touchStartX.current
          if (Math.abs(delta) > 40) go(current + (delta < 0 ? 1 : -1))
          touchStartX.current = null
        }}
        onKeyDown={(e) => {
          if (e.key === 'ArrowRight') go(current + 1)
          if (e.key === 'ArrowLeft') go(current - 1)
        }}
        tabIndex={count > 1 ? 0 : undefined}
        role={count > 1 ? 'region' : undefined}
        aria-roledescription={count > 1 ? 'carousel' : undefined}
        aria-label={count > 1 ? `${title} photos` : undefined}
      >
        {images.map((src, i) => (
          <Image
            key={src}
            src={src}
            alt={`${title}, photo ${i + 1} of ${count}`}
            fill
            sizes="(max-width: 1024px) 100vw, 66vw"
            priority={i === 0}
            className={cn(
              'object-cover transition-opacity duration-300',
              i === current ? 'opacity-100' : 'opacity-0'
            )}
            aria-hidden={i !== current}
          />
        ))}

        <span className="absolute right-4 top-4 rounded-full bg-white px-3.5 py-1.5 text-xs font-semibold text-[var(--text-1)]">
          {status}
        </span>

        {count > 1 && (
          <>
            <button
              type="button"
              onClick={() => go(current - 1)}
              aria-label="Previous photo"
              className="absolute left-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-[var(--ink)] shadow-sm transition-colors hover:bg-white"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              type="button"
              onClick={() => go(current + 1)}
              aria-label="Next photo"
              className="absolute right-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-[var(--ink)] shadow-sm transition-colors hover:bg-white"
            >
              <ChevronRight size={20} />
            </button>
            <span
              aria-live="polite"
              className="absolute bottom-4 right-4 rounded-full bg-black/60 px-3 py-1 text-xs font-medium text-white"
            >
              {current + 1} / {count}
            </span>
          </>
        )}
      </div>

      {count > 1 && (
        <div className="mt-3 flex gap-2 overflow-x-auto pb-1 [scrollbar-width:thin]">
          {images.map((src, i) => (
            <button
              key={src}
              type="button"
              onClick={() => go(i)}
              aria-label={`Show photo ${i + 1}`}
              aria-current={i === current ? 'true' : undefined}
              className={cn(
                'relative h-16 w-24 flex-shrink-0 overflow-hidden rounded-xl transition-all md:h-20 md:w-28',
                i === current
                  ? 'ring-2 ring-[var(--brand-blue)] ring-offset-2'
                  : 'opacity-70 hover:opacity-100'
              )}
            >
              <Image src={src} alt="" fill sizes="112px" className="object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
