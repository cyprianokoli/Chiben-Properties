'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Trash2 } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'

interface Props {
  id: string
  title: string
}

export default function DeletePropertyButton({ id, title }: Props) {
  const router = useRouter()
  const [confirming, setConfirming] = useState(false)
  const [loading, setLoading] = useState(false)

  async function handleDelete() {
    setLoading(true)
    const supabase = createClient()
    await supabase.from('properties').delete().eq('id', id)
    router.refresh()
  }

  if (confirming) {
    return (
      <div className="flex items-center gap-1">
        <button
          onClick={handleDelete}
          disabled={loading}
          className="rounded-[6px] px-2.5 py-1 text-xs font-semibold transition-all"
          style={{ background: '#ef4444', color: '#fff' }}
        >
          {loading ? '…' : 'Delete'}
        </button>
        <button
          onClick={() => setConfirming(false)}
          className="rounded-[6px] px-2.5 py-1 text-xs font-semibold transition-all"
          style={{ background: 'var(--bg-elevated)', color: 'var(--text-muted)', border: '1px solid var(--border)' }}
        >
          Cancel
        </button>
      </div>
    )
  }

  return (
    <button
      onClick={() => setConfirming(true)}
      className="flex h-8 w-8 items-center justify-center rounded-[6px] transition-all"
      style={{ color: 'var(--text-muted)', border: '1px solid var(--border)' }}
      aria-label={`Delete ${title}`}
    >
      <Trash2 className="h-3.5 w-3.5" />
    </button>
  )
}
