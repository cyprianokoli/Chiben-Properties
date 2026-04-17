'use client'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { CheckCircle } from 'lucide-react'
import Input from '@/components/ui/Input'
import Textarea from '@/components/ui/Textarea'
import Select from '@/components/ui/Select'
import Button from '@/components/ui/Button'

const schema = z.object({
  name: z.string().min(2, 'Please enter your name'),
  email: z.string().email('Please enter a valid email'),
  phone: z.string().optional(),
  inquiry_type: z.string(),
  message: z.string().min(10, 'Please provide a brief message'),
})

type FormValues = z.infer<typeof schema>

const inquiryOptions = [
  { value: 'general', label: 'General Enquiry' },
  { value: 'valuation', label: 'Property Valuation' },
  { value: 'buying', label: 'Buying Enquiry' },
  { value: 'selling', label: 'Selling Enquiry' },
  { value: 'lettings', label: 'Lettings Enquiry' },
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
    defaultValues: { inquiry_type: 'general' },
  })

  async function onSubmit(values: FormValues) {
    setServerError('')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      })
      if (!res.ok) throw new Error('Submission failed')
      setSubmitted(true)
    } catch {
      setServerError('Something went wrong. Please try again or call us directly.')
    }
  }

  if (submitted) {
    return (
      <div
        id="contact-form"
        className="flex flex-col items-center justify-center rounded-card border border-[var(--border)] bg-[var(--bg-page)] p-12 text-center"
      >
        <CheckCircle size={48} className="text-[var(--accent)] mb-4" />
        <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-2">Message Sent!</h3>
        <p className="text-[var(--text-secondary)] max-w-sm">
          Thank you for getting in touch. A member of our team will respond within 2 working hours.
        </p>
      </div>
    )
  }

  return (
    <form id="contact-form" onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Input
          id="name"
          label="Full Name"
          placeholder="Your full name"
          error={errors.name?.message}
          {...register('name')}
        />
        <Input
          id="email"
          label="Email Address"
          type="email"
          placeholder="you@example.com"
          error={errors.email?.message}
          {...register('email')}
        />
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Input
          id="phone"
          label="Phone (optional)"
          type="tel"
          placeholder="+44 7700 000000"
          {...register('phone')}
        />
        <Select
          id="inquiry_type"
          label="Enquiry Type"
          options={inquiryOptions}
          error={errors.inquiry_type?.message}
          {...register('inquiry_type')}
        />
      </div>

      <Textarea
        id="message"
        label="Your Message"
        placeholder="Tell us how we can help…"
        rows={5}
        error={errors.message?.message}
        {...register('message')}
      />

      {serverError && (
        <p className="text-sm text-red-500">{serverError}</p>
      )}

      <Button type="submit" size="lg" disabled={isSubmitting} className="sm:self-start">
        {isSubmitting ? 'Sending…' : 'Submit Enquiry'}
      </Button>
    </form>
  )
}
