'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { CheckCircle2 } from 'lucide-react'
import { SelectField, SubmitButton, TextAreaField, TextField } from './Field'
import {
  BUDGETS,
  FINANCE_OPTIONS,
  STRATEGY_OPTIONS,
  TIMELINES,
  dealEnquirySchema,
  type DealEnquiry,
} from '@/lib/dealEnquiry'
import { EMAIL, WHATSAPP_URL } from '@/lib/constants'

export default function DealSourcingForm() {
  const [submitted, setSubmitted] = useState(false)
  const [serverError, setServerError] = useState('')

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<DealEnquiry>({
    resolver: zodResolver(dealEnquirySchema),
    defaultValues: {
      name: '',
      email: '',
      whatsapp: '',
      country: '',
      budget: '',
      strategy: '',
      finance: '',
      timeline: '',
      message: '',
      company: '',
    },
  })

  async function onSubmit(values: DealEnquiry) {
    setServerError('')
    try {
      const res = await fetch('/api/deal-enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
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
        <h3 className="font-serif text-3xl text-[var(--text-1)]">Thanks, we&apos;ve got your brief.</h3>
        <p className="max-w-md text-[15px] leading-relaxed text-[var(--text-2)]">
          We&apos;ll be in touch within one business day to book your free call. If it&apos;s
          urgent, message us on{' '}
          <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="font-semibold text-[var(--brand-blue)] underline underline-offset-2">
            WhatsApp
          </a>
          .
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
        <TextField id="ds-name" label="Name" required autoComplete="name" error={errors.name?.message} {...register('name')} />
        <TextField id="ds-email" label="Email" type="email" required autoComplete="email" error={errors.email?.message} {...register('email')} />
        <TextField
          id="ds-whatsapp"
          label="WhatsApp number"
          type="tel"
          required
          autoComplete="tel"
          placeholder="+44 7700 000000"
          hint="Include your country code"
          error={errors.whatsapp?.message}
          {...register('whatsapp')}
        />
        <TextField
          id="ds-country"
          label="Country you live in"
          required
          autoComplete="country-name"
          error={errors.country?.message}
          {...register('country')}
        />
        <SelectField id="ds-budget" label="Budget" required placeholder="Choose a budget" options={BUDGETS} error={errors.budget?.message} {...register('budget')} />
        <SelectField
          id="ds-strategy"
          label="Strategy"
          required
          placeholder="Choose a strategy"
          options={STRATEGY_OPTIONS}
          error={errors.strategy?.message}
          {...register('strategy')}
        />
        <SelectField
          id="ds-finance"
          label="Cash or mortgage"
          required
          placeholder="Choose one"
          options={FINANCE_OPTIONS}
          error={errors.finance?.message}
          {...register('finance')}
        />
        <SelectField
          id="ds-timeline"
          label="Timeline"
          required
          placeholder="Choose a timeline"
          options={TIMELINES}
          error={errors.timeline?.message}
          {...register('timeline')}
        />
      </div>

      <TextAreaField
        id="ds-message"
        label="Message"
        placeholder="Anything else we should know: areas you like, tenant type, deals you've seen…"
        error={errors.message?.message}
        {...register('message')}
      />

      {/* Honeypot, hidden from people and screen readers */}
      <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="ds-company">Company</label>
        <input id="ds-company" tabIndex={-1} autoComplete="off" {...register('company')} />
      </div>

      {serverError && (
        <p role="alert" className="rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
          {serverError}
        </p>
      )}

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <SubmitButton loading={isSubmitting}>Find Me a Deal</SubmitButton>
        <p className="text-xs text-[var(--text-3)]">
          We only use these details to reply to you. No spam, ever.
        </p>
      </div>
    </form>
  )
}
