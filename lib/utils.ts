export function slugify(str: string): string {
  return str.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat('en-GB', {
    style: 'currency', currency: 'GBP', maximumFractionDigits: 0,
  }).format(price)
}

export function formatPriceShort(price: number): string {
  if (price >= 1_000_000) return `£${(price / 1_000_000).toFixed(1)}M`
  if (price >= 1_000)     return `£${(price / 1_000).toFixed(0)}K`
  return formatPrice(price)
}
