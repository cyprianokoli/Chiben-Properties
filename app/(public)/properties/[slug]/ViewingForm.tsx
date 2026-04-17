'use client'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Calendar, CheckCircle } from 'lucide-react'
import Input from '@/components/ui/Input'
import Textarea from '@/components/ui/Textarea'
import Button from '@/components/ui/Button'

const schema = z.object({
  name: z.string().min(2, 'Name required'),
  email: z.string().email('Valid email required'),
  phone: z.string().optional(),
  preferred_date: z.string().optional(),
  message: z.string().optional(),
})

type FormValues = z.infer<typeof schema>

interface ViewingFormProps {
  propertySlug: string
  propertyTitle: string
}

export default function ViewingForm({ propertySlug, propertyTitle }: ViewingFormProps) {
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ resolver: zodResolver(schema) })

  async function onSubmit(values: FormValues) {
    setError('')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...values,
          inquiry_type: 'viewing',
          property_slug: propertySlug,
          message: values.message || `Viewing request for ${propertyTitle}`,
        }),
      })
      if (!res.ok) throw new Error()
      setSubmitted(true)
    } catch {
      setError('Something went wrong. Please try again.')
    }
  }

  if (submitted) {
    return (
      <div className="rounded-card border border-[var(--border)] bg-[var(--bg-surface)] p-6 text-center">
        <CheckCircle size={36} className="text-[var(--accent)] mx-auto mb-3" />
        <p className="font-semibold text-[var(--text-primary)] mb-1">Request Sent!</p>
        <p className="text-sm text-[var(--text-secondary)]">
          We&apos;ll be in touch within 2 hours to confirm your viewing.
        </p>
      </div>
    )
  }

  return (
    <div className="rounded-card border border-[var(--border)] bg-[var(--bg-surface)] p-5">
      <div className="mb-5 flex items-center gap-2.5">
        <Calendar size={18} className="text-[var(--accent)]" />
        <p className="font-semibold text-[var(--text-primary)]">Arrange a Viewing</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <Input
          id="viewing-name"
          placeholder="Your full name"
          error={errors.name?.message}
          {...register('name')}
        />
        <Input
          id="viewing-email"
          type="email"
          placeholder="Email address"
          error={errors.email?.message}
          {...register('email')}
        />
        <Input
          id="viewing-phone"
          type="tel"
          placeholder="Phone (optional)"
          {...register('phone')}
        />
        <Input
          id="viewing-date"
          type="date"
          placeholder="Preferred date"
          {...register('preferred_date')}
        />
        <Textarea
          id="viewing-message"
          placeholder="Any questions or specific requirements…"
          rows={3}
          {...register('message')}
        />
        {error && <p className="text-sm text-red-500">{error}</p>}
        <Button type="submit" size="md" disabled={isSubmitting} className="w-full">
          {isSubmitting ? 'Sending…' : 'Request Viewing'}
        </Button>
      </form>
    </div>
  )
}
