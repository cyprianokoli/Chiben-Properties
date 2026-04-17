'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { Mail, Lock, LogIn } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import Button from '@/components/ui/Button'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')
    const supabase = createClient()
    const { error: authError } = await supabase.auth.signInWithPassword({ email, password })
    if (authError) {
      setError(authError.message)
      setLoading(false)
    } else {
      router.push('/admin/dashboard')
      router.refresh()
    }
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{ background: '#0F1117' }}
    >
      <div className="w-full max-w-[440px]">
        <div className="flex flex-col items-center mb-8">
          <Image
            src="/images/logo/logo-white.svg"
            alt="Chiben Properties"
            width={160}
            height={50}
            priority
          />
          <p className="mt-3 text-sm" style={{ color: '#9B9CA6' }}>
            Property Management
          </p>
        </div>

        <div
          className="rounded-card p-8"
          style={{ background: '#1A1D27', border: '1px solid rgba(255,255,255,0.08)' }}
        >
          <h1 className="text-xl font-semibold mb-6" style={{ color: '#F1F0EC' }}>
            Sign in to your account
          </h1>

          {error && (
            <div className="mb-4 rounded-btn border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium" style={{ color: '#9B9CA6' }}>
                Email address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4" style={{ color: '#5C5E6B' }} />
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                  placeholder="admin@chibenproperties.co.uk"
                  className="h-11 w-full rounded-btn pl-10 pr-4 text-sm focus:outline-none transition-colors"
                  style={{
                    background: '#21253A',
                    border: '1px solid rgba(255,255,255,0.08)',
                    color: '#F1F0EC',
                  }}
                  onFocus={e => (e.target.style.borderColor = '#C9A96E')}
                  onBlur={e => (e.target.style.borderColor = 'rgba(255,255,255,0.08)')}
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium" style={{ color: '#9B9CA6' }}>
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4" style={{ color: '#5C5E6B' }} />
                <input
                  type="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                  placeholder="••••••••"
                  className="h-11 w-full rounded-btn pl-10 pr-4 text-sm focus:outline-none transition-colors"
                  style={{
                    background: '#21253A',
                    border: '1px solid rgba(255,255,255,0.08)',
                    color: '#F1F0EC',
                  }}
                  onFocus={e => (e.target.style.borderColor = '#C9A96E')}
                  onBlur={e => (e.target.style.borderColor = 'rgba(255,255,255,0.08)')}
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 text-sm cursor-pointer" style={{ color: '#9B9CA6' }}>
                <input
                  type="checkbox"
                  className="rounded"
                  style={{ accentColor: '#C9A96E' }}
                />
                Keep me signed in
              </label>
              <button
                type="button"
                className="text-sm transition-colors"
                style={{ color: '#C9A96E' }}
                onMouseOver={e => (e.currentTarget.style.color = '#D4B87E')}
                onMouseOut={e => (e.currentTarget.style.color = '#C9A96E')}
              >
                Forgot password?
              </button>
            </div>

            <Button
              type="submit"
              variant="primary"
              size="md"
              className="mt-2 w-full"
              disabled={loading}
            >
              <LogIn className="h-4 w-4" />
              {loading ? 'Signing in…' : 'Sign In'}
            </Button>
          </form>
        </div>

        <div className="mt-6 text-center space-y-1">
          <p className="text-xs" style={{ color: '#5C5E6B' }}>
            Unauthorized access is strictly prohibited.
          </p>
          <p className="text-xs" style={{ color: '#5C5E6B' }}>
            © 2024 Chiben Properties
          </p>
        </div>
      </div>
    </div>
  )
}
