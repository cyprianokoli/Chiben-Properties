'use client'

import { useState } from 'react'
import Image from 'next/image'
import { UploadCloud, X, GripVertical } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'

interface Props {
  propertyId: string
  value: string[]
  onChange: (urls: string[]) => void
}

export default function ImageUploader({ propertyId, value, onChange }: Props) {
  const [draggingOver, setDraggingOver] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')
  const [dragIndex, setDragIndex] = useState<number | null>(null)

  async function uploadFiles(files: File[]) {
    setUploading(true)
    setError('')
    const supabase = createClient()
    const newUrls: string[] = []

    for (const file of files) {
      if (!file.type.startsWith('image/')) continue
      const ext = file.name.split('.').pop()
      const filename = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`
      const path = `${propertyId}/${filename}`

      const { error: uploadError } = await supabase.storage
        .from('property-images')
        .upload(path, file, { cacheControl: '3600', upsert: false })

      if (uploadError) {
        setError(`Failed to upload ${file.name}: ${uploadError.message}`)
        continue
      }

      const { data } = supabase.storage.from('property-images').getPublicUrl(path)
      newUrls.push(data.publicUrl)
    }

    onChange([...value, ...newUrls])
    setUploading(false)
  }

  async function handleDrop(e: React.DragEvent) {
    e.preventDefault()
    setDraggingOver(false)
    const files = Array.from(e.dataTransfer.files)
    await uploadFiles(files)
  }

  function handleFileInput(e: React.ChangeEvent<HTMLInputElement>) {
    if (!e.target.files) return
    uploadFiles(Array.from(e.target.files))
    e.target.value = ''
  }

  function removeImage(index: number) {
    onChange(value.filter((_, i) => i !== index))
  }

  function handleImageDragStart(index: number) {
    setDragIndex(index)
  }

  function handleImageDrop(targetIndex: number) {
    if (dragIndex === null || dragIndex === targetIndex) return
    const reordered = [...value]
    const [moved] = reordered.splice(dragIndex, 1)
    reordered.splice(targetIndex, 0, moved)
    onChange(reordered)
    setDragIndex(null)
  }

  return (
    <div className="space-y-4">
      <div
        onDragOver={e => { e.preventDefault(); setDraggingOver(true) }}
        onDragLeave={() => setDraggingOver(false)}
        onDrop={handleDrop}
        className="relative rounded-card border-2 border-dashed p-8 text-center transition-all"
        style={{
          borderColor: draggingOver ? 'var(--accent)' : 'var(--border)',
          background: draggingOver ? 'var(--accent-bg)' : 'var(--bg-elevated)',
        }}
      >
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleFileInput}
          className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
          disabled={uploading}
        />
        <UploadCloud className="mx-auto h-8 w-8 mb-3" style={{ color: 'var(--text-muted)' }} />
        <p className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>
          {uploading ? 'Uploading…' : 'Drop images here or click to browse'}
        </p>
        <p className="mt-1 text-xs" style={{ color: 'var(--text-muted)' }}>
          JPG, PNG, WebP — max 50MB each
        </p>
      </div>

      {error && (
        <p className="text-sm text-red-500">{error}</p>
      )}

      {value.length > 0 && (
        <div className="space-y-2">
          <p className="text-xs font-medium uppercase tracking-[0.08em]" style={{ color: 'var(--text-muted)' }}>
            {value.length} image{value.length !== 1 ? 's' : ''} — first is cover
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {value.map((url, i) => (
              <div
                key={url}
                draggable
                onDragStart={() => handleImageDragStart(i)}
                onDragOver={e => e.preventDefault()}
                onDrop={() => handleImageDrop(i)}
                className="group relative aspect-video rounded-[8px] overflow-hidden cursor-grab"
                style={{ border: i === 0 ? '2px solid var(--accent)' : '1px solid var(--border)' }}
              >
                <Image src={url} alt={`Property image ${i + 1}`} fill className="object-cover" sizes="200px" />
                {i === 0 && (
                  <span
                    className="absolute bottom-1 left-1 rounded-[4px] px-1.5 py-0.5 text-[10px] font-semibold uppercase"
                    style={{ background: 'var(--accent)', color: '#fff' }}
                  >
                    Cover
                  </span>
                )}
                <div className="absolute inset-0 flex items-start justify-between p-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <GripVertical className="h-4 w-4 text-white drop-shadow" />
                  <button
                    type="button"
                    onClick={() => removeImage(i)}
                    className="flex h-6 w-6 items-center justify-center rounded-full bg-black/60 text-white hover:bg-black/80 transition-colors"
                    aria-label="Remove image"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
