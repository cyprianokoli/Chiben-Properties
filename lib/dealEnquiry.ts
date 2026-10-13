import { z } from 'zod'

// Shared by the Deal Sourcing form (client) and /api/deal-enquiry (server).
// Option values are plain ASCII so they survive any client encoding; the
// labels are what the enquirer sees and what lands in the inbox.

interface Option {
  value: string
  label: string
}

export const BUDGETS: Option[] = [
  { value: 'under-100k', label: 'Under £100k' },
  { value: '100k-150k', label: '£100k – £150k' },
  { value: '150k-250k', label: '£150k – £250k' },
  { value: '250k-500k', label: '£250k – £500k' },
  { value: '500k-plus', label: '£500k+' },
]
export const STRATEGY_OPTIONS: Option[] = [
  { value: 'btl', label: 'BTL' },
  { value: 'hmo', label: 'HMO' },
  { value: 'refurb', label: 'Refurb' },
  { value: 'not-sure', label: 'Not sure' },
]
export const FINANCE_OPTIONS: Option[] = [
  { value: 'cash', label: 'Cash' },
  { value: 'mortgage', label: 'Mortgage' },
  { value: 'not-sure', label: 'Not sure yet' },
]
export const TIMELINES: Option[] = [
  { value: 'asap', label: 'As soon as possible' },
  { value: '0-3-months', label: 'Within 3 months' },
  { value: '3-6-months', label: '3–6 months' },
  { value: '6-plus-months', label: '6+ months' },
  { value: 'exploring', label: 'Just exploring' },
]

export function optionLabel(options: Option[], value: string): string {
  return options.find((o) => o.value === value)?.label ?? value
}

const oneOf = (options: Option[], message: string) =>
  z.string().refine((v) => options.some((o) => o.value === v), { message })

export const dealEnquirySchema = z.object({
  name: z.string().trim().min(2, 'Please enter your name').max(100),
  email: z.string().trim().toLowerCase().email('Please enter a valid email').max(254),
  whatsapp: z
    .string()
    .trim()
    .min(7, 'Please enter your WhatsApp number')
    .max(30)
    .regex(/^[+()\d\s-]+$/, 'Numbers, spaces and + only'),
  country: z.string().trim().min(2, 'Please tell us where you live').max(80),
  budget: oneOf(BUDGETS, 'Please choose a budget'),
  strategy: oneOf(STRATEGY_OPTIONS, 'Please choose a strategy'),
  finance: oneOf(FINANCE_OPTIONS, 'Please choose cash or mortgage'),
  timeline: oneOf(TIMELINES, 'Please choose a timeline'),
  message: z.string().trim().max(2000),
  // Honeypot: real visitors never see or fill this field
  company: z.string().max(0),
})

export type DealEnquiry = z.infer<typeof dealEnquirySchema>
