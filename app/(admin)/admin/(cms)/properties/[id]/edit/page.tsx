import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import PropertyForm from '@/components/admin/PropertyForm'

export const metadata = { title: 'Edit Property | Admin' }

interface Props {
  params: { id: string }
}

export default async function EditPropertyPage({ params }: Props) {
  const supabase = createClient()
  const { data: property } = await supabase
    .from('properties')
    .select('*')
    .eq('id', params.id)
    .single()

  if (!property) notFound()

  return (
    <div>
      <p className="text-sm font-semibold uppercase tracking-[0.18em] mb-1" style={{ color: 'var(--accent)' }}>
        Properties
      </p>
      <h2 className="text-2xl font-bold mb-8" style={{ color: 'var(--text-primary)' }}>
        Edit: {property.title}
      </h2>
      <PropertyForm property={property} />
    </div>
  )
}
