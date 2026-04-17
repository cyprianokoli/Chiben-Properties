'use client'

import { useEffect, useRef, useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { slugify } from '@/lib/utils'
import type { Property } from '@/lib/supabase/types'
import Input from '@/components/ui/Input'
import Textarea from '@/components/ui/Textarea'
import Button from '@/components/ui/Button'
import KeyFeaturesInput from './KeyFeaturesInput'
import ImageUploader from './ImageUploader'

const schema = z.object({
  title: z.string().min(1, 'Title is required'),
  slug: z.string().min(1, 'Slug is required'),
  price: z.string(),
  price_qualifier: z.string(),
  status: z.string(),
  type: z.string(),
  tenure: z.string(),
  address_line1: z.string(),
  address_line2: z.string(),
  town: z.string(),
  county: z.string(),
  postcode: z.string(),
  bedrooms: z.string(),
  bathrooms: z.string(),
  reception_rooms: z.string(),
  square_footage: z.string(),
  epc_rating: z.string(),
  council_tax_band: z.string(),
  local_authority: z.string(),
  description: z.string(),
  key_features: z.array(z.string()),
  images: z.array(z.string()),
  is_featured: z.boolean(),
})

type FormValues = z.infer<typeof schema>

function numOrNull(v: string | undefined): number | null {
  if (!v || v === '') return null
  const n = Number(v)
  return isNaN(n) ? null : n
}
function intOrNull(v: string | undefined): number | null {
  const n = numOrNull(v)
  return n === null ? null : Math.round(n)
}
function strOrNull(v: string | undefined): string | null {
  return v?.trim() || null
}

interface Props {
  property?: Property
}

const fieldClass = 'h-10 w-full rounded-btn border bg-[var(--bg-surface)] px-3 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:border-[var(--accent)] focus:outline-none transition-colors'
const labelClass = 'text-sm font-medium text-[var(--text-primary)]'

function FieldGroup({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className={labelClass}>{label}</label>
      {children}
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  )
}

export default function PropertyForm({ property }: Props) {
  const router = useRouter()
  const isEdit = !!property
  const [saving, setSaving] = useState(false)
  const [globalError, setGlobalError] = useState('')
  const [savedSlug, setSavedSlug] = useState<string | null>(null)
  const propertyIdRef = useRef(property?.id ?? crypto.randomUUID())
  const propertyId = propertyIdRef.current

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    control,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: property?.title ?? '',
      slug: property?.slug ?? '',
      price: property?.price != null ? String(property.price) : '',
      price_qualifier: property?.price_qualifier ?? 'Guide Price',
      status: property?.status ?? 'available',
      type: property?.type ?? '',
      tenure: property?.tenure ?? '',
      address_line1: property?.address_line1 ?? '',
      address_line2: property?.address_line2 ?? '',
      town: property?.town ?? '',
      county: property?.county ?? '',
      postcode: property?.postcode ?? '',
      bedrooms: property?.bedrooms != null ? String(property.bedrooms) : '',
      bathrooms: property?.bathrooms != null ? String(property.bathrooms) : '',
      reception_rooms: property?.reception_rooms != null ? String(property.reception_rooms) : '',
      square_footage: property?.square_footage != null ? String(property.square_footage) : '',
      epc_rating: property?.epc_rating ?? '',
      council_tax_band: property?.council_tax_band ?? '',
      local_authority: property?.local_authority ?? '',
      description: property?.description ?? '',
      key_features: property?.key_features ?? [],
      images: property?.images ?? [],
      is_featured: property?.is_featured ?? false,
    },
  })

  const titleValue = watch('title')
  useEffect(() => {
    if (!isEdit && titleValue) {
      setValue('slug', slugify(titleValue))
    }
  }, [titleValue, isEdit, setValue])

  const images = watch('images')
  const keyFeatures = watch('key_features')

  async function onSubmit(data: FormValues) {
    setSaving(true)
    setGlobalError('')
    const supabase = createClient()

    const payload = {
      title: data.title,
      slug: data.slug,
      price: numOrNull(data.price),
      price_qualifier: data.price_qualifier,
      status: data.status,
      type: strOrNull(data.type),
      tenure: strOrNull(data.tenure),
      address_line1: strOrNull(data.address_line1),
      address_line2: strOrNull(data.address_line2),
      town: strOrNull(data.town),
      county: strOrNull(data.county),
      postcode: strOrNull(data.postcode),
      bedrooms: intOrNull(data.bedrooms),
      bathrooms: intOrNull(data.bathrooms),
      reception_rooms: intOrNull(data.reception_rooms),
      square_footage: intOrNull(data.square_footage),
      epc_rating: strOrNull(data.epc_rating),
      council_tax_band: strOrNull(data.council_tax_band),
      local_authority: strOrNull(data.local_authority),
      description: strOrNull(data.description),
      key_features: data.key_features,
      images: data.images,
      is_featured: data.is_featured,
      cover_image: data.images[0] ?? null,
    }

    let error
    if (isEdit) {
      ;({ error } = await supabase.from('properties').update(payload).eq('id', property.id))
    } else {
      ;({ error } = await supabase.from('properties').insert({ ...payload, id: propertyId }))
    }

    if (error) {
      setGlobalError(error.message)
      setSaving(false)
    } else {
      setSavedSlug(data.slug)
      setSaving(false)
    }
  }

  const selectClass = `${fieldClass} cursor-pointer`

  if (savedSlug) {
    return (
      <div className="max-w-4xl">
        <div
          className="rounded-card p-10 flex flex-col items-center text-center gap-6"
          style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)' }}
        >
          <div
            className="flex h-16 w-16 items-center justify-center rounded-full"
            style={{ background: 'rgba(201,169,110,0.12)', border: '1px solid rgba(201,169,110,0.3)' }}
          >
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] mb-2" style={{ color: 'var(--accent)' }}>
              {isEdit ? 'Changes Saved' : 'Property Listed'}
            </p>
            <h2 className="text-2xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
              {isEdit ? 'Property updated successfully' : 'Property added successfully'}
            </h2>
            <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
              {isEdit
                ? 'Your changes have been saved and are now live.'
                : 'The property is now live and visible to the public.'}
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <a
              href={`/properties/${savedSlug}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 rounded-btn px-6 py-2.5 text-sm font-semibold transition-all"
              style={{ background: 'var(--btn-primary-bg)', color: 'var(--btn-primary-text)' }}
            >
              View Live Listing
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                <polyline points="15 3 21 3 21 9"/>
                <line x1="10" y1="14" x2="21" y2="3"/>
              </svg>
            </a>
            <button
              onClick={() => router.push('/admin/properties')}
              className="flex items-center justify-center gap-2 rounded-btn px-6 py-2.5 text-sm font-semibold transition-all"
              style={{ background: 'var(--btn-ghost-bg)', color: 'var(--btn-ghost-text)', border: '1px solid var(--btn-ghost-border)' }}
            >
              Back to Properties
            </button>
            {!isEdit && (
              <button
                onClick={() => setSavedSlug(null)}
                className="flex items-center justify-center gap-2 rounded-btn px-6 py-2.5 text-sm font-semibold transition-all"
                style={{ background: 'transparent', color: 'var(--text-muted)', border: '1px solid var(--border)' }}
              >
                Add Another
              </button>
            )}
          </div>
        </div>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 max-w-4xl">
      {globalError && (
        <div className="rounded-btn border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-500">
          {globalError}
        </div>
      )}

      {/* Basic Information */}
      <section
        className="rounded-card p-6 space-y-5"
        style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)' }}
      >
        <h2 className="font-semibold text-base" style={{ color: 'var(--text-primary)' }}>
          Basic Information
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="sm:col-span-2">
            <Input
              label="Property Title *"
              id="title"
              placeholder="e.g. The Old Rectory"
              error={errors.title?.message}
              {...register('title')}
            />
          </div>
          <FieldGroup label="Slug *" error={errors.slug?.message}>
            <input
              className={`${fieldClass} font-mono`}
              style={{ borderColor: errors.slug ? '#ef4444' : 'var(--border)' }}
              placeholder="the-old-rectory"
              {...register('slug')}
            />
          </FieldGroup>
          <FieldGroup label="Price (GBP)">
            <input
              type="number"
              className={fieldClass}
              style={{ borderColor: 'var(--border)' }}
              placeholder="750000"
              {...register('price')}
            />
          </FieldGroup>
          <FieldGroup label="Price Qualifier">
            <select className={selectClass} style={{ borderColor: 'var(--border)' }} {...register('price_qualifier')}>
              <option>Guide Price</option>
              <option>Asking Price</option>
              <option>Offers Over</option>
              <option>Offers In Excess Of</option>
              <option>POA</option>
            </select>
          </FieldGroup>
          <FieldGroup label="Status">
            <select className={selectClass} style={{ borderColor: 'var(--border)' }} {...register('status')}>
              <option value="available">Available</option>
              <option value="under-offer">Under Offer</option>
              <option value="sold">Sold</option>
              <option value="off-market">Off Market</option>
            </select>
          </FieldGroup>
          <FieldGroup label="Property Type">
            <select className={selectClass} style={{ borderColor: 'var(--border)' }} {...register('type')}>
              <option value="">Select type</option>
              <option>Detached</option>
              <option>Semi-Detached</option>
              <option>Terraced</option>
              <option>Flat</option>
              <option>Bungalow</option>
              <option>Cottage</option>
              <option>Commercial</option>
              <option>Land</option>
            </select>
          </FieldGroup>
          <FieldGroup label="Tenure">
            <select className={selectClass} style={{ borderColor: 'var(--border)' }} {...register('tenure')}>
              <option value="">Select tenure</option>
              <option>Freehold</option>
              <option>Leasehold</option>
              <option>Share of Freehold</option>
            </select>
          </FieldGroup>
        </div>
      </section>

      {/* Location */}
      <section
        className="rounded-card p-6 space-y-5"
        style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)' }}
      >
        <h2 className="font-semibold text-base" style={{ color: 'var(--text-primary)' }}>
          Location
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="sm:col-span-2">
            <Input label="Address Line 1" id="address_line1" placeholder="12 Manor Road" {...register('address_line1')} />
          </div>
          <div className="sm:col-span-2">
            <Input label="Address Line 2" id="address_line2" placeholder="Kensington" {...register('address_line2')} />
          </div>
          <Input label="Town / City" id="town" placeholder="London" {...register('town')} />
          <Input label="County" id="county" placeholder="Greater London" {...register('county')} />
          <Input label="Postcode" id="postcode" placeholder="SW7 3AH" {...register('postcode')} />
        </div>
      </section>

      {/* Details */}
      <section
        className="rounded-card p-6 space-y-5"
        style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)' }}
      >
        <h2 className="font-semibold text-base" style={{ color: 'var(--text-primary)' }}>
          Property Details
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
          <FieldGroup label="Bedrooms">
            <input type="number" min={0} className={fieldClass} style={{ borderColor: 'var(--border)' }} {...register('bedrooms')} />
          </FieldGroup>
          <FieldGroup label="Bathrooms">
            <input type="number" min={0} className={fieldClass} style={{ borderColor: 'var(--border)' }} {...register('bathrooms')} />
          </FieldGroup>
          <FieldGroup label="Reception Rooms">
            <input type="number" min={0} className={fieldClass} style={{ borderColor: 'var(--border)' }} {...register('reception_rooms')} />
          </FieldGroup>
          <FieldGroup label="Sq Footage">
            <input type="number" min={0} className={fieldClass} style={{ borderColor: 'var(--border)' }} {...register('square_footage')} />
          </FieldGroup>
          <FieldGroup label="EPC Rating">
            <select className={selectClass} style={{ borderColor: 'var(--border)' }} {...register('epc_rating')}>
              <option value="">Select</option>
              {['A', 'B', 'C', 'D', 'E', 'F', 'G'].map(r => <option key={r}>{r}</option>)}
            </select>
          </FieldGroup>
          <FieldGroup label="Council Tax Band">
            <select className={selectClass} style={{ borderColor: 'var(--border)' }} {...register('council_tax_band')}>
              <option value="">Select</option>
              {['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'].map(b => <option key={b}>{b}</option>)}
            </select>
          </FieldGroup>
          <div className="col-span-2">
            <Input label="Local Authority" id="local_authority" placeholder="Royal Borough of Kensington" {...register('local_authority')} />
          </div>
        </div>
      </section>

      {/* Description */}
      <section
        className="rounded-card p-6 space-y-5"
        style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)' }}
      >
        <h2 className="font-semibold text-base" style={{ color: 'var(--text-primary)' }}>
          Description
        </h2>
        <Textarea
          label="Property Description"
          id="description"
          rows={6}
          placeholder="Describe the property in detail…"
          {...register('description')}
        />
      </section>

      {/* Key Features */}
      <section
        className="rounded-card p-6 space-y-5"
        style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)' }}
      >
        <h2 className="font-semibold text-base" style={{ color: 'var(--text-primary)' }}>
          Key Features
        </h2>
        <Controller
          name="key_features"
          control={control}
          render={() => (
            <KeyFeaturesInput
              value={keyFeatures}
              onChange={features => setValue('key_features', features)}
            />
          )}
        />
      </section>

      {/* Images */}
      <section
        className="rounded-card p-6 space-y-5"
        style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)' }}
      >
        <h2 className="font-semibold text-base" style={{ color: 'var(--text-primary)' }}>
          Images
        </h2>
        <Controller
          name="images"
          control={control}
          render={() => (
            <ImageUploader
              propertyId={propertyId}
              value={images}
              onChange={urls => setValue('images', urls)}
            />
          )}
        />
      </section>

      {/* Settings */}
      <section
        className="rounded-card p-6 space-y-5"
        style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)' }}
      >
        <h2 className="font-semibold text-base" style={{ color: 'var(--text-primary)' }}>
          Settings
        </h2>
        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            className="h-4 w-4 rounded"
            style={{ accentColor: 'var(--accent)' }}
            {...register('is_featured')}
          />
          <span className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>
            Feature this property on the homepage
          </span>
        </label>
      </section>

      {/* Actions */}
      <div className="flex items-center gap-3 pb-4">
        <Button type="submit" variant="primary" size="md" disabled={saving}>
          {saving ? 'Saving…' : isEdit ? 'Save Changes' : 'Publish Property'}
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="md"
          onClick={() => router.push('/admin/properties')}
        >
          Cancel
        </Button>
      </div>
    </form>
  )
}
