import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { getClientIp, isRateLimited } from '@/lib/rateLimit'
import { sendEnquiryEmail } from '@/lib/email'
import {
  BUDGETS,
  FINANCE_OPTIONS,
  STRATEGY_OPTIONS,
  TIMELINES,
  dealEnquirySchema,
  optionLabel,
} from '@/lib/dealEnquiry'

export async function POST(req: NextRequest) {
  if (isRateLimited(getClientIp(req))) {
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

  const result = dealEnquirySchema.safeParse(body)
  if (!result.success) {
    return NextResponse.json(
      { error: 'Invalid submission', details: result.error.flatten().fieldErrors },
      { status: 422 }
    )
  }

  const d = result.data
  const rows = [
    { label: 'Country', value: d.country },
    { label: 'Budget', value: optionLabel(BUDGETS, d.budget) },
    { label: 'Strategy', value: optionLabel(STRATEGY_OPTIONS, d.strategy) },
    { label: 'Cash or mortgage', value: optionLabel(FINANCE_OPTIONS, d.finance) },
    { label: 'Timeline', value: optionLabel(TIMELINES, d.timeline) },
  ]

  // The enquiries table has no columns for the brief, so it is written into
  // the message where the admin inbox shows it.
  const brief = rows.map((r) => `${r.label}: ${r.value}`).join('\n')
  const message = d.message ? `${brief}\n\n${d.message}` : brief

  const supabase = createClient()
  const { error } = await supabase.from('enquiries').insert({
    name: d.name,
    email: d.email,
    phone: d.whatsapp,
    inquiry_type: 'deal_sourcing',
    message,
  })

  if (error) {
    console.error('Deal enquiry insert error:', error.message)
    return NextResponse.json({ error: 'Failed to save enquiry' }, { status: 500 })
  }

  await sendEnquiryEmail({
    subject: `New deal sourcing enquiry from ${d.name} (${d.country})`,
    replyTo: d.email,
    rows: [
      { label: 'Name', value: d.name },
      { label: 'Email', value: d.email },
      { label: 'WhatsApp', value: d.whatsapp },
      ...rows,
    ],
    message: d.message || null,
  })

  return NextResponse.json({ success: true })
}
