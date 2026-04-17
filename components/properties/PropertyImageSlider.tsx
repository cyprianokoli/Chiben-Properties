'use client'

import { useState, useRef } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import Badge, { statusToBadgeVariant } from '@/components/ui/Badge'

interface Props {
  images: string[]
  title: string
  status: string | null | undefined
}

export default function PropertyImageSlider({ images, title, status }: Props) {
  const [current, setCurrent] = useState(0)
  const touchStartX = useRef<number | null>(null)
  const badge = statusToBadgeVariant(status ?? 'available')

  function prev() {
    setCurrent((c) => (c === 0 ? images.length - 1 : c - 1))
  }
  function next() {
    setCurrent((c) => (c === images.length - 1 ? 0 : c + 1))
  }

  function onTouchStart(e: React.TouchEvent) {
    touchStartX.current = e.touches[0].clientX
  }
  function onTouchEnd(e: React.TouchEvent) {
    if (touchStartX.current === null) return
    const delta = e.changedTouches[0].clientX - touchStartX.current
    if (Math.abs(delta) > 40) {
      if (delta < 0) { next() } else { prev() }
    }
    touchStartX.current = null
  }

  if (images.length === 0) {
    return (
      <div className="aspect-video rounded-card overflow-hidden bg-[var(--bg-elevated)] flex items-center justify-center">
        <span className="text-sm text-[var(--text-muted)]">No photos available</span>
      </div>
    )
  }

  return (
    <div
      className="relative aspect-video rounded-card overflow-hidden bg-[var(--bg-elevated)] select-none"
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <Image
        src={images[current]}
        alt={`${title} — photo ${current + 1}`}
        fill
        sizes="100vw"
        className="object-cover"
        priority={current === 0}
      />

      <div className="absolute top-3 left-3">
        <Badge variant={badge} />
      </div>

      {images.length > 1 && (
        <>
          <button
            onClick={prev}
            aria-label="Previous photo"
            className="absolute left-3 top-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-sm transition-opacity hover:bg-black/70"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={next}
            aria-label="Next photo"
            className="absolute right-3 top-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-sm transition-opacity hover:bg-black/70"
          >
            <ChevronRight size={20} />
          </button>

          <div className="absolute bottom-3 right-3 rounded-full bg-black/60 px-3 py-1 text-xs text-white">
            {current + 1} / {images.length}
          </div>

          {/* Dot indicators */}
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                aria-label={`Photo ${i + 1}`}
                className="h-1.5 rounded-full transition-all"
                style={{
                  width: i === current ? '20px' : '6px',
                  background: i === current ? '#C9A96E' : 'rgba(255,255,255,0.5)',
                }}
              />
            ))}
          </div>
        </>
      )}
    </div>
  )
}
