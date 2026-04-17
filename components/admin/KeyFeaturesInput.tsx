'use client'

import { useState, KeyboardEvent } from 'react'
import { X, Plus } from 'lucide-react'

interface Props {
  value: string[]
  onChange: (features: string[]) => void
}

export default function KeyFeaturesInput({ value, onChange }: Props) {
  const [inputValue, setInputValue] = useState('')

  function addFeature() {
    const trimmed = inputValue.trim()
    if (trimmed && !value.includes(trimmed)) {
      onChange([...value, trimmed])
    }
    setInputValue('')
  }

  function removeFeature(index: number) {
    onChange(value.filter((_, i) => i !== index))
  }

  function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') {
      e.preventDefault()
      addFeature()
    }
  }

  return (
    <div className="space-y-3">
      <div className="flex gap-2">
        <input
          type="text"
          value={inputValue}
          onChange={e => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="e.g. South-facing garden"
          className="h-10 flex-1 rounded-btn border bg-[var(--bg-surface)] px-3 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:border-[var(--accent)] focus:outline-none transition-colors"
          style={{ borderColor: 'var(--border)' }}
        />
        <button
          type="button"
          onClick={addFeature}
          disabled={!inputValue.trim()}
          className="flex h-10 items-center gap-1.5 rounded-btn px-4 text-sm font-semibold transition-all disabled:opacity-40"
          style={{ background: 'var(--accent-bg)', color: 'var(--accent)', border: '1px solid var(--border-gold)' }}
        >
          <Plus className="h-4 w-4" />
          Add
        </button>
      </div>

      {value.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {value.map((feature, i) => (
            <span
              key={i}
              className="flex items-center gap-1.5 rounded-[6px] px-3 py-1.5 text-sm font-medium"
              style={{ background: 'var(--accent-bg)', color: 'var(--accent)', border: '1px solid var(--border-gold)' }}
            >
              {feature}
              <button
                type="button"
                onClick={() => removeFeature(i)}
                className="rounded-full transition-opacity hover:opacity-70"
                aria-label={`Remove ${feature}`}
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </span>
          ))}
        </div>
      )}
    </div>
  )
}
