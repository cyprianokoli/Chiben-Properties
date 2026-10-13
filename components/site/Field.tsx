import { forwardRef, InputHTMLAttributes, SelectHTMLAttributes, TextareaHTMLAttributes } from 'react'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/cn'

const control =
  'w-full rounded-xl border bg-white px-4 text-[15px] text-[var(--text-1)] placeholder:text-[var(--text-3)] transition-colors duration-150 focus:border-[var(--brand-blue)] focus:outline-none focus:ring-2 focus:ring-[var(--brand-blue-bg)]'

interface Base {
  label: string
  error?: string
  hint?: string
  id: string
  required?: boolean
}

function Label({ id, label, required }: { id: string; label: string; required?: boolean }) {
  return (
    <label htmlFor={id} className="text-sm font-medium text-[var(--text-1)]">
      {label}
      {required && (
        <span aria-hidden className="text-[var(--brand-blue)]">
          {' '}
          *
        </span>
      )}
    </label>
  )
}

function Message({ id, error, hint }: { id: string; error?: string; hint?: string }) {
  if (error)
    return (
      <p id={`${id}-error`} role="alert" className="text-xs font-medium text-red-600">
        {error}
      </p>
    )
  if (hint)
    return (
      <p id={`${id}-hint`} className="text-xs text-[var(--text-3)]">
        {hint}
      </p>
    )
  return null
}

type TextFieldProps = Base & InputHTMLAttributes<HTMLInputElement>

export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  ({ label, error, hint, id, required, className, ...props }, ref) => (
    <div className="flex flex-col gap-1.5">
      <Label id={id} label={label} required={required} />
      <input
        ref={ref}
        id={id}
        aria-invalid={error ? true : undefined}
        aria-required={required || undefined}
        aria-describedby={error ? `${id}-error` : hint ? `${id}-hint` : undefined}
        className={cn(control, 'h-12', error ? 'border-red-500' : 'border-[var(--line)]', className)}
        {...props}
      />
      <Message id={id} error={error} hint={hint} />
    </div>
  )
)
TextField.displayName = 'TextField'

type SelectFieldProps = Base &
  SelectHTMLAttributes<HTMLSelectElement> & {
    options: { value: string; label: string }[]
    placeholder?: string
  }

export const SelectField = forwardRef<HTMLSelectElement, SelectFieldProps>(
  ({ label, error, hint, id, required, options, placeholder, className, ...props }, ref) => (
    <div className="flex flex-col gap-1.5">
      <Label id={id} label={label} required={required} />
      <div className="relative">
        <select
          ref={ref}
          id={id}
          aria-invalid={error ? true : undefined}
          aria-required={required || undefined}
          aria-describedby={error ? `${id}-error` : hint ? `${id}-hint` : undefined}
          className={cn(
            control,
            'h-12 appearance-none pr-10',
            error ? 'border-red-500' : 'border-[var(--line)]',
            className
          )}
          {...props}
        >
          {placeholder && <option value="">{placeholder}</option>}
          {options.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
        <ChevronDown
          size={16}
          aria-hidden
          className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[var(--text-3)]"
        />
      </div>
      <Message id={id} error={error} hint={hint} />
    </div>
  )
)
SelectField.displayName = 'SelectField'

type TextAreaFieldProps = Base & TextareaHTMLAttributes<HTMLTextAreaElement>

export const TextAreaField = forwardRef<HTMLTextAreaElement, TextAreaFieldProps>(
  ({ label, error, hint, id, required, className, ...props }, ref) => (
    <div className="flex flex-col gap-1.5">
      <Label id={id} label={label} required={required} />
      <textarea
        ref={ref}
        id={id}
        aria-invalid={error ? true : undefined}
        aria-required={required || undefined}
        aria-describedby={error ? `${id}-error` : hint ? `${id}-hint` : undefined}
        className={cn(control, 'min-h-[132px] py-3', error ? 'border-red-500' : 'border-[var(--line)]', className)}
        {...props}
      />
      <Message id={id} error={error} hint={hint} />
    </div>
  )
)
TextAreaField.displayName = 'TextAreaField'

export function SubmitButton({
  children,
  loading,
  loadingLabel = 'Sending…',
}: {
  children: React.ReactNode
  loading: boolean
  loadingLabel?: string
}) {
  return (
    <button
      type="submit"
      disabled={loading}
      className="group inline-flex h-12 items-center justify-between gap-3 self-start rounded-full bg-[var(--ink)] pl-6 pr-1.5 text-sm font-semibold text-white transition-colors duration-200 hover:bg-[var(--brand-navy)] disabled:cursor-not-allowed disabled:opacity-60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--brand-blue)]"
    >
      <span>{loading ? loadingLabel : children}</span>
      <span
        aria-hidden
        className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white text-[var(--ink)] transition-transform duration-200 group-hover:rotate-45"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round">
          <path d="M7 17 17 7M7 7h10v10" />
        </svg>
      </span>
    </button>
  )
}
