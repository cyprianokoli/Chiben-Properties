'use client'
import { useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'
import { Search } from 'lucide-react'
import Button from '@/components/ui/Button'

const typeOptions = [
  { value: '', label: 'Any Type' },
  { value: 'detached', label: 'Detached' },
  { value: 'semi-detached', label: 'Semi-Detached' },
  { value: 'terraced', label: 'Terraced' },
  { value: 'apartment', label: 'Apartment' },
  { value: 'townhouse', label: 'Town House' },
  { value: 'bungalow', label: 'Bungalow' },
]

const priceOptions = [
  { value: '', label: 'Any Price' },
  { value: '250000', label: 'Up to £250K' },
  { value: '500000', label: 'Up to £500K' },
  { value: '750000', label: 'Up to £750K' },
  { value: '1000000', label: 'Up to £1M' },
  { value: '2000000', label: 'Up to £2M' },
  { value: '5000000', label: 'Up to £5M' },
]

const bedsOptions = [
  { value: '', label: 'Any Beds' },
  { value: '1', label: '1+ Beds' },
  { value: '2', label: '2+ Beds' },
  { value: '3', label: '3+ Beds' },
  { value: '4', label: '4+ Beds' },
  { value: '5', label: '5+ Beds' },
]

export default function SearchBar() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [location, setLocation] = useState(searchParams.get('location') ?? '')
  const [type, setType] = useState(searchParams.get('type') ?? '')
  const [maxPrice, setMaxPrice] = useState(searchParams.get('maxPrice') ?? '')
  const [beds, setBeds] = useState(searchParams.get('beds') ?? '')

  function handleSearch(e: React.FormEvent) {
    e.preventDefault()
    const params = new URLSearchParams()
    if (location) params.set('location', location)
    if (type) params.set('type', type)
    if (maxPrice) params.set('maxPrice', maxPrice)
    if (beds) params.set('beds', beds)
    router.push(`/properties${params.toString() ? `?${params}` : ''}`)
  }

  return (
    <form
      onSubmit={handleSearch}
      className="flex flex-col gap-3 rounded-card bg-[var(--bg-surface)] p-4 shadow-lg border border-[var(--border)] md:flex-row md:items-end md:gap-3"
    >
      {/* Location */}
      <div className="flex-1 flex flex-col gap-1.5">
        <label className="text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wide">
          Location
        </label>
        <div className="relative">
          <Search
            size={15}
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]"
          />
          <input
            type="text"
            placeholder="Town, county or postcode"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="h-11 w-full rounded-btn border border-[var(--border)] bg-[var(--bg-page)] pl-9 pr-4 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:border-[var(--accent)] focus:outline-none"
          />
        </div>
      </div>

      {/* Type */}
      <div className="flex flex-col gap-1.5 md:w-40">
        <label className="text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wide">
          Type
        </label>
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="h-11 w-full appearance-none rounded-btn border border-[var(--border)] bg-[var(--bg-page)] px-4 text-sm text-[var(--text-primary)] focus:border-[var(--accent)] focus:outline-none"
        >
          {typeOptions.map((o) => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </select>
      </div>

      {/* Max Price */}
      <div className="flex flex-col gap-1.5 md:w-40">
        <label className="text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wide">
          Max Price
        </label>
        <select
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          className="h-11 w-full appearance-none rounded-btn border border-[var(--border)] bg-[var(--bg-page)] px-4 text-sm text-[var(--text-primary)] focus:border-[var(--accent)] focus:outline-none"
        >
          {priceOptions.map((o) => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </select>
      </div>

      {/* Beds */}
      <div className="flex flex-col gap-1.5 md:w-36">
        <label className="text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wide">
          Bedrooms
        </label>
        <select
          value={beds}
          onChange={(e) => setBeds(e.target.value)}
          className="h-11 w-full appearance-none rounded-btn border border-[var(--border)] bg-[var(--bg-page)] px-4 text-sm text-[var(--text-primary)] focus:border-[var(--accent)] focus:outline-none"
        >
          {bedsOptions.map((o) => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </select>
      </div>

      <Button type="submit" size="md" className="md:self-end whitespace-nowrap">
        Search Properties
      </Button>
    </form>
  )
}
