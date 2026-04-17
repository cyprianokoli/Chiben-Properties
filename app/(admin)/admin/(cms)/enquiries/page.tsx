import { createClient } from '@/lib/supabase/server'
import EnquiriesTable from '@/components/admin/EnquiriesTable'

export const metadata = { title: 'Enquiries | Admin' }

export default async function EnquiriesPage() {
  const supabase = createClient()
  const { data: enquiries } = await supabase
    .from('enquiries')
    .select('*')
    .order('created_at', { ascending: false })

  return (
    <div>
      <div className="mb-6">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] mb-1" style={{ color: 'var(--accent)' }}>
          Inbox
        </p>
        <h2 className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>
          Enquiries
        </h2>
      </div>
      <EnquiriesTable enquiries={enquiries ?? []} />
    </div>
  )
}
