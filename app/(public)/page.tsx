import { Suspense } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Shield, Users, TrendingUp, Home, Star } from 'lucide-react'
import type { Metadata } from 'next'
import Button from '@/components/ui/Button'

export const dynamic = 'force-dynamic'
import PropertyGrid from '@/components/properties/PropertyGrid'
import SearchBar from '@/components/properties/SearchBar'
import { createClient } from '@/lib/supabase/server'
import type { Property } from '@/lib/supabase/types'

export const metadata: Metadata = {
  title: 'Chiben Properties — Premium UK Real Estate',
  description: 'Discover exceptional homes across the United Kingdom with Chiben Properties.',
}

async function getFeaturedProperties(): Promise<Property[]> {
  try {
    const supabase = createClient()
    const { data } = await supabase
      .from('properties')
      .select('*')
      .eq('is_featured', true)
      .neq('status', 'sold')
      .order('listed_at', { ascending: false })
      .limit(3)
    return data ?? []
  } catch {
    return []
  }
}

const stats = [
  { value: '500+', label: 'Properties Sold' },
  { value: '98%', label: 'Client Satisfaction' },
  { value: '15+', label: 'Years of Excellence' },
  { value: '£2.4B+', label: 'Total Value Transacted' },
]

const services = [
  {
    icon: Home,
    title: 'Property Sales',
    description: 'Expert guidance through every step of buying or selling your home, from valuation to completion.',
  },
  {
    icon: TrendingUp,
    title: 'Market Valuation',
    description: 'Accurate, data-driven valuations from our senior team, helping you make informed decisions.',
  },
  {
    icon: Shield,
    title: 'Lettings & Management',
    description: 'Full-service lettings management, protecting your investment and maximising returns.',
  },
  {
    icon: Users,
    title: 'Concierge Service',
    description: 'Dedicated support from your first enquiry through to keys in hand — and beyond.',
  },
]

const testimonials = [
  {
    name: 'Sarah Pemberton',
    location: 'Richmond, Surrey',
    quote: 'Chiben Properties made the whole process seamless. Their knowledge of the local market is second to none.',
  },
  {
    name: 'James Hartley',
    location: 'Notting Hill, London',
    quote: 'Professional, attentive and genuinely invested in finding us the right home. Could not recommend more highly.',
  },
  {
    name: 'Priya Sharma',
    location: 'Cheltenham, Gloucestershire',
    quote: 'From valuation to sale in under six weeks. Exceptional service and outstanding results.',
  },
]

export default async function HomePage() {
  const featuredProperties = await getFeaturedProperties()

  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[88vh] flex flex-col justify-center overflow-hidden bg-[var(--bg-page)]">
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute top-0 right-0 w-1/2 h-full opacity-[0.07]"
            style={{
              backgroundImage: 'radial-gradient(ellipse at 70% 50%, var(--accent) 0%, transparent 70%)',
            }}
          />
        </div>

        <div className="relative mx-auto w-full max-w-7xl px-4 md:px-6 lg:px-8 py-20 md:py-28">
          <div className="max-w-2xl lg:max-w-3xl">
            <p className="eyebrow mb-5">Premium UK Real Estate</p>
            <h1 className="h1 text-[var(--text-primary)] mb-6">
              Find Your <em>Perfect</em> Property Across the&nbsp;UK
            </h1>
            <p className="text-lg text-[var(--text-secondary)] leading-relaxed mb-8 max-w-xl">
              Chiben Properties connects buyers and sellers with exceptional homes. From city apartments to countryside estates, we bring expertise, care and outstanding results.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link href="/properties">
                <Button size="lg">
                  Browse Properties <ArrowRight size={18} />
                </Button>
              </Link>
              <Link href="/contact">
                <Button variant="secondary" size="lg">
                  Book a Valuation
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Search bar pinned to bottom of hero */}
        <div className="relative mx-auto w-full max-w-7xl px-4 md:px-6 lg:px-8 pb-10">
          <Suspense>
            <SearchBar />
          </Suspense>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-[var(--bg-surface)]">
        <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8 py-14">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label} className="text-center">
                <p className="text-3xl md:text-4xl font-bold text-[var(--accent)] mb-1">{s.value}</p>
                <p className="text-sm text-[var(--text-secondary)]">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured properties */}
      <section className="bg-[var(--bg-page)]">
        <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8 py-16 md:py-24">
          <div className="flex flex-col gap-4 mb-10 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="eyebrow mb-3">Hand-Picked</p>
              <h2 className="h2 text-[var(--text-primary)]">
                Featured <em>Properties</em>
              </h2>
            </div>
            <Link
              href="/properties"
              className="flex items-center gap-1.5 text-sm font-semibold text-[var(--accent)] hover:gap-3 transition-all duration-200 whitespace-nowrap"
            >
              View All Properties <ArrowRight size={16} />
            </Link>
          </div>

          {featuredProperties.length > 0 ? (
            <PropertyGrid properties={featuredProperties} />
          ) : (
            <div className="rounded-card border border-[var(--border)] bg-[var(--bg-surface)] p-12 text-center">
              <p className="text-[var(--text-muted)] mb-4">Featured properties coming soon.</p>
              <Link href="/properties">
                <Button variant="secondary">Browse All Properties</Button>
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Services */}
      <section className="bg-[var(--bg-surface)]">
        <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8 py-16 md:py-24">
          <div className="max-w-xl mb-12">
            <p className="eyebrow mb-3">What We Do</p>
            <h2 className="h2 text-[var(--text-primary)]">
              A Complete <em>Property Service</em>
            </h2>
            <p className="mt-4 text-[var(--text-secondary)] leading-relaxed">
              Whether you&apos;re buying, selling or letting, our experienced team provides tailored support every step of the way.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((s) => (
              <div
                key={s.title}
                className="rounded-card border border-[var(--border)] bg-[var(--bg-page)] p-6 hover:border-[var(--border-gold)] hover:-translate-y-1 transition-all duration-200"
              >
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-[10px] bg-[var(--accent-bg)]">
                  <s.icon size={22} className="text-[var(--accent)]" />
                </div>
                <h3 className="text-base font-semibold text-[var(--text-primary)] mb-2">{s.title}</h3>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{s.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About teaser */}
      <section className="bg-[var(--bg-page)]">
        <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8 py-16 md:py-24">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="eyebrow mb-3">Our Story</p>
              <h2 className="h2 text-[var(--text-primary)] mb-6">
                Built on <em>Trust</em>,<br />Driven by Results
              </h2>
              <p className="text-[var(--text-secondary)] leading-relaxed mb-4">
                For over 15 years, Chiben Properties has been helping families and investors find exceptional homes across the United Kingdom. Our approach is simple: deep local knowledge, honest advice, and relentless attention to detail.
              </p>
              <p className="text-[var(--text-secondary)] leading-relaxed mb-8">
                We don&apos;t just list properties — we build lasting relationships. From the first call to completion, you&apos;ll work with the same dedicated agent who knows your needs inside out.
              </p>
              <div className="flex gap-6 mb-8">
                <div>
                  <p className="text-2xl font-bold text-[var(--accent)]">500+</p>
                  <p className="text-sm text-[var(--text-secondary)]">Happy Clients</p>
                </div>
                <div className="w-px bg-[var(--border)]" />
                <div>
                  <p className="text-2xl font-bold text-[var(--accent)]">15+</p>
                  <p className="text-sm text-[var(--text-secondary)]">Years Experience</p>
                </div>
                <div className="w-px bg-[var(--border)]" />
                <div>
                  <p className="text-2xl font-bold text-[var(--accent)]">UK Wide</p>
                  <p className="text-sm text-[var(--text-secondary)]">Coverage</p>
                </div>
              </div>
              <Link href="/about">
                <Button variant="secondary">
                  Learn About Us <ArrowRight size={16} />
                </Button>
              </Link>
            </div>

            {/* Image mosaic */}
            <div className="grid grid-cols-2 gap-3">
              <div className="relative aspect-[4/5] rounded-card overflow-hidden bg-[var(--bg-elevated)]">
                <Image
                  src="/images/brand/about-1.jpg"
                  alt="Chiben Properties team"
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col gap-3">
                <div className="relative aspect-square rounded-card overflow-hidden bg-[var(--bg-elevated)]">
                  <Image
                    src="/images/brand/about-2.jpg"
                    alt="Premium property"
                    fill
                    sizes="(max-width: 768px) 50vw, 25vw"
                    className="object-cover"
                  />
                </div>
                <div className="relative aspect-square rounded-card overflow-hidden bg-[var(--bg-elevated)]">
                  <Image
                    src="/images/brand/about-3.jpg"
                    alt="Modern interior"
                    fill
                    sizes="(max-width: 768px) 50vw, 25vw"
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-[var(--bg-surface)]">
        <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8 py-16 md:py-24">
          <div className="text-center max-w-xl mx-auto mb-12">
            <p className="eyebrow mb-3">Client Stories</p>
            <h2 className="h2 text-[var(--text-primary)]">
              What Our <em>Clients</em> Say
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {testimonials.map((t) => (
              <div
                key={t.name}
                className="rounded-card border border-[var(--border)] bg-[var(--bg-page)] p-6"
              >
                <div className="flex gap-0.5 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={14} className="fill-[var(--accent)] text-[var(--accent)]" />
                  ))}
                </div>
                <p className="text-[var(--text-secondary)] leading-relaxed mb-5 text-sm">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div>
                  <p className="text-sm font-semibold text-[var(--text-primary)]">{t.name}</p>
                  <p className="text-xs text-[var(--text-muted)]">{t.location}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Strip */}
      <section style={{ backgroundColor: '#0F1117' }} className="py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8 text-center">
          <p className="eyebrow mb-4" style={{ color: '#C9A96E' }}>Ready to Move?</p>
          <h2
            className="mb-4 font-bold"
            style={{
              fontSize: 'clamp(28px, 3.5vw, 48px)',
              color: '#F1F0EC',
              lineHeight: '1.15',
            }}
          >
            Ready to Make Your <em style={{ fontStyle: 'italic', color: '#C9A96E' }}>Move?</em>
          </h2>
          <p className="mb-8 max-w-lg mx-auto text-[rgba(241,240,236,0.65)] leading-relaxed">
            Whether you&apos;re buying, selling, or looking for a valuation, our team is ready to help you take the next step.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/properties">
              <button
                className="inline-flex items-center justify-center gap-2 h-[52px] px-8 rounded-btn font-semibold text-base transition-all duration-200 hover:opacity-90"
                style={{ backgroundColor: '#C9A96E', color: '#0F1117' }}
              >
                Browse Properties <ArrowRight size={18} />
              </button>
            </Link>
            <Link href="/contact">
              <button
                className="inline-flex items-center justify-center gap-2 h-[52px] px-8 rounded-btn font-semibold text-base transition-all duration-200 hover:bg-white/10"
                style={{
                  border: '1px solid rgba(255,255,255,0.2)',
                  color: '#F1F0EC',
                }}
              >
                Get in Touch
              </button>
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
