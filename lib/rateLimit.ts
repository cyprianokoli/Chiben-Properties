import type { NextRequest } from 'next/server'

// Simple in-memory limiter (per serverless instance): 5 submissions / 15 min per IP
const RATE_LIMIT = 5
const WINDOW_MS = 15 * 60 * 1000
const hits = new Map<string, { count: number; resetAt: number }>()

export function isRateLimited(ip: string): boolean {
  const now = Date.now()
  const entry = hits.get(ip)

  if (!entry || now > entry.resetAt) {
    hits.set(ip, { count: 1, resetAt: now + WINDOW_MS })
    return false
  }

  if (entry.count >= RATE_LIMIT) return true

  entry.count++
  return false
}

export function getClientIp(req: NextRequest): string {
  return (
    req.headers.get('x-forwarded-for')?.split(',')[0].trim() ??
    req.headers.get('x-real-ip') ??
    'unknown'
  )
}
