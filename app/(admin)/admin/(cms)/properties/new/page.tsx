import PropertyForm from '@/components/admin/PropertyForm'

export const metadata = { title: 'Add Property | Admin' }

export default function NewPropertyPage() {
  return (
    <div>
      <p className="text-sm font-semibold uppercase tracking-[0.18em] mb-1" style={{ color: 'var(--accent)' }}>
        Properties
      </p>
      <h2 className="text-2xl font-bold mb-8" style={{ color: 'var(--text-primary)' }}>
        Add New Property
      </h2>
      <PropertyForm />
    </div>
  )
}
