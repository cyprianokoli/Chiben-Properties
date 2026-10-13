import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { createClient } from '@/lib/supabase/server'
import { getClientIp, isRateLimited } from '@/lib/rateLimit'
import { sendEnquiryEmail } from '@/lib/email'

const TYPE_LABELS: Record<string, string> = {
  deal_sourcing: 'Finding a property',
  off_market: 'Selling / off-market property',
  investment: 'Investment',
  jv: 'JV opportunity',
  general: 'General',
}

// ── Input validation schema ──────────────────────────────
const enquirySchema = z.object({
  name: z.string().trim().min(2).max(100),
  email: z.string().trim().toLowerCase().email().max(254),
  phone: z.string().trim().max(30).optional(),
  inquiry_type: z
    .enum(['deal_sourcing', 'off_market', 'investment', 'jv', 'general'])
    .default('general'),
  message: z.string().trim().min(10).max(2000),
  // Honeypot: real visitors never see or fill this field
  company: z.string().max(0).optional(),
})

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

  const { name, email, phone, inquiry_type, message } = result.data

  const supabase = createClient()
  const { error } = await supabase.from('enquiries').insert({
    name,
    email,
    phone: phone || null,
    inquiry_type,
    message,
  })

  if (error) {
    console.error('Enquiry insert error:', error.message)
    return NextResponse.json({ error: 'Failed to save enquiry' }, { status: 500 })
  }

  await sendEnquiryEmail({
    subject: `New enquiry: ${TYPE_LABELS[inquiry_type]} from ${name}`,
    replyTo: email,
    rows: [
      { label: 'Name', value: name },
      { label: 'Email', value: email },
      { label: 'Phone', value: phone },
      { label: 'Enquiry', value: TYPE_LABELS[inquiry_type] },
    ],
    message,
  })

  return NextResponse.json({ success: true })
}
