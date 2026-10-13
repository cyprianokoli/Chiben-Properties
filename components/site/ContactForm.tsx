'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { CheckCircle2 } from 'lucide-react'
import { SelectField, SubmitButton, TextAreaField, TextField } from './Field'
import { EMAIL } from '@/lib/constants'

const schema = z.object({
  name: z.string().trim().min(2, 'Please enter your name'),
  email: z.string().trim().email('Please enter a valid email'),
  phone: z.string().trim().max(30),
  inquiry_type: z.enum(['deal_sourcing', 'off_market', 'general']),
  message: z.string().trim().min(10, 'Please write a short message (10+ characters)').max(2000),
  company: z.string().max(0),
})

type FormValues = z.infer<typeof schema>

const inquiryOptions = [
  { value: 'deal_sourcing', label: 'Finding a property for me' },
  { value: 'off_market', label: 'Selling a property' },
  { value: 'general', label: 'Something else' },
]

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false)
  const [serverError, setServerError] = useState('')

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { name: '', email: '', phone: '', inquiry_type: 'deal_sourcing', message: '', company: '' },
  })

  async function onSubmit(values: FormValues) {
    setServerError('')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...values, phone: values.phone || undefined }),
      })
      if (res.status === 429) {
        setServerError('Too many attempts. Please wait a few minutes and try again.')
        return
      }
      if (!res.ok) throw new Error('Submission failed')
      setSubmitted(true)
    } catch {
      setServerError(`Something went wrong. Please try again, or email us at ${EMAIL}.`)
    }
  }

  if (submitted) {
    return (
      <div role="status" className="flex flex-col items-start gap-4 rounded-xl2 border border-[var(--line)] bg-white p-8 md:p-10">
        <CheckCircle2 size={40} className="text-[var(--brand-blue)]" aria-hidden />
        <h3 className="font-serif text-3xl text-[var(--text-1)]">Message sent.</h3>
        <p className="max-w-md text-[15px] leading-relaxed text-[var(--text-2)]">
          Thanks for getting in touch. We&apos;ll reply within one business day.
        </p>
      </div>
    )
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="flex flex-col gap-5 rounded-xl2 border border-[var(--line)] bg-white p-5 sm:p-8 md:p-10"
    >
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <TextField id="c-name" label="Name" required autoComplete="name" error={errors.name?.message} {...register('name')} />
        <TextField id="c-email" label="Email" type="email" required autoComplete="email" error={errors.email?.message} {...register('email')} />
        <TextField id="c-phone" label="Phone or WhatsApp" type="tel" autoComplete="tel" placeholder="+44 7700 000000" error={errors.phone?.message} {...register('phone')} />
        <SelectField id="c-type" label="I'm getting in touch about" options={inquiryOptions} error={errors.inquiry_type?.message} {...register('inquiry_type')} />
      </div>

      <TextAreaField id="c-message" label="Message" required error={errors.message?.message} {...register('message')} />

      {/* Honeypot, hidden from people and screen readers */}
      <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="c-company">Company</label>
        <input id="c-company" tabIndex={-1} autoComplete="off" {...register('company')} />
      </div>

      {serverError && (
        <p role="alert" className="rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
          {serverError}
        </p>
      )}

      <SubmitButton loading={isSubmitting}>Send message</SubmitButton>
    </form>
  )
}
