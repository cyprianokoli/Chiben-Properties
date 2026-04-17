import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, email, phone, inquiry_type, message, property_slug } = body

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const supabase = createClient()
    const { error } = await supabase.from('enquiries').insert({
      name,
      email,
      phone: phone || null,
      inquiry_type: inquiry_type || 'general',
      message,
      property_slug: property_slug || null,
    })

    if (error) {
      console.error('Enquiry insert error:', error)
      return NextResponse.json({ error: 'Failed to save enquiry' }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
