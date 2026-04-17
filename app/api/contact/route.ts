import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { createClient } from '@/lib/supabase/server'

// ── Input validation schema ──────────────────────────────
const enquirySchema = z.object({
  name: z.string().min(2).max(100).trim(),
  email: z.string().email().max(254).trim().toLowerCase(),
  phone: z.string().max(30).trim().optional(),
  inquiry_type: z.enum(['general', 'valuation', 'buying', 'selling', 'lettings', 'viewing', 'offer']).default('general'),
  message: z.string().min(10).max(2000).trim(),
  property_slug: z.string().max(200).trim().optional(),
  preferred_date: z.string().max(20).trim().optional(),
})

// ── Simple in-memory rate limiter (5 submissions / 15 min per IP) ─
const rateLimitMap = new Map<string, { count: number; resetAt: number }>()
const RATE_LIMIT = 5
const WINDOW_MS = 15 * 60 * 1000

function isRateLimited(ip: string): boolean {
  const now = Date.now()
  const entry = rateLimitMap.get(ip)

  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + WINDOW_MS })
    return false
  }

  if (entry.count >= RATE_LIMIT) return true

  entry.count++
  return false
}

function getClientIp(req: NextRequest): string {
  return (
    req.headers.get('x-forwarded-for')?.split(',')[0].trim() ??
    req.headers.get('x-real-ip') ??
    'unknown'
  )
}

// ── Route handler ────────────────────────────────────────
export async function POST(req: NextRequest) {
  const ip = getClientIp(req)

  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: 'Too many requests. Please wait a few minutes and try again.' },
      { status: 429 }
    )
  }

  let body: unknown
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 })
  }

  const result = enquirySchema.safeParse(body)
  if (!result.success) {
    return NextResponse.json(
      { error: 'Invalid submission', details: result.error.flatten().fieldErrors },
      { status: 422 }
    )
  }

  const { name, email, phone, inquiry_type, message, property_slug, preferred_date } = result.data

  const fullMessage = preferred_date
    ? `${message}\n\nPreferred viewing date: ${preferred_date}`
    : message

  const supabase = createClient()
  const { error } = await supabase.from('enquiries').insert({
    name,
    email,
    phone: phone || null,
    inquiry_type,
    message: fullMessage,
    property_slug: property_slug || null,
  })

  if (error) {
    console.error('Enquiry insert error:', error.message)
    return NextResponse.json({ error: 'Failed to save enquiry' }, { status: 500 })
  }

  return NextResponse.json({ success: true })
}
