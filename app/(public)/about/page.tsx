import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Shield, Eye, Lightbulb } from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About',
  description: 'Learn about Chiben Properties — who we are, what we stand for, and why clients trust us.',
}

const stats = [
  { value: '15+', label: 'Years in Business' },
  { value: '500+', label: 'Properties Sold' },
  { value: '£2.4B+', label: 'Value Transacted' },
  { value: '98%', label: 'Client Satisfaction' },
]

const values = [
  {
    icon: Eye,
    title: 'Aesthetic Integrity',
    description: 'We take pride in the quality of every property we represent. Presentation matters, and we hold every listing to the highest standard.',
  },
  {
    icon: Shield,
    title: 'Unwavering Trust',
    description: 'Discretion, honesty and transparency are the foundations of every client relationship. You can always count on straight answers from our team.',
  },
  {
    icon: Lightbulb,
    title: 'Forward Thinking',
    description: 'We combine deep local knowledge with modern technology — from immersive virtual tours to data-led pricing strategies.',
  },
]

const team = [
  {
    name: 'David Chiben',
    role: 'Founder & CEO',
    bio: 'David founded Chiben Properties with a vision to bring premium-level service to every client, regardless of budget. With over 20 years in UK residential property.',
  },
  {
    name: 'Angela Osei',
    role: 'Head of Sales',
    bio: 'Angela leads our sales team with a data-driven approach and a reputation for achieving record prices. Her negotiation expertise is unmatched.',
  },
  {
    name: 'Marcus Webb',
    role: 'Senior Valuer',
    bio: 'Marcus has valued over £800M worth of residential property. His market insight helps clients make confident, informed decisions.',
  },
  {
    name: 'Priya Nair',
    role: 'Client Relations Manager',
    bio: 'Priya ensures every client feels heard and supported from first enquiry through to completion. Her attention to detail is what sets us apart.',
  },
]

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-[var(--bg-page)]">
        <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8 pt-12 pb-16 md:pt-16 md:pb-24">
          <div className="mb-2 flex items-center gap-1.5 text-xs text-[var(--text-muted)]">
            <Link href="/" className="hover:text-[var(--accent)] transition-colors">Home</Link>
            <span>/</span>
            <span className="text-[var(--text-primary)]">About</span>
          </div>

          <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:items-center mt-8">
            <div>
              <p className="eyebrow mb-4">Our Story</p>
              <h1 className="h1 text-[var(--text-primary)] mb-6">
                Defining <em>New Standards</em> in Property
              </h1>
              <p className="text-lg text-[var(--text-secondary)] leading-relaxed mb-4">
                Where architectural vision meets exceptional living. We don&apos;t just list properties — we curate experiences and build lasting relationships.
              </p>
              <p className="text-[var(--text-secondary)] leading-relaxed">
                Our portfolio represents the intersection of quality, heritage and forward-thinking design across the United Kingdom.
              </p>
            </div>

            {/* Hero images */}
            <div className="grid grid-cols-2 gap-3">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="relative aspect-[4/3] rounded-card overflow-hidden bg-[var(--bg-elevated)]"
                >
                  <Image
                    src={`/images/brand/about-hero-${i}.jpg`}
                    alt="Chiben Properties"
                    fill
                    sizes="(max-width: 768px) 50vw, 25vw"
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
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

      {/* Foundation */}
      <section className="bg-[var(--bg-page)]">
        <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8 py-16 md:py-24">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">
            <div className="relative aspect-[4/3] rounded-card overflow-hidden bg-[var(--bg-elevated)] lg:order-2">
              <Image
                src="/images/brand/office.jpg"
                alt="Chiben Properties office"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
            <div className="lg:order-1">
              <p className="eyebrow mb-3">The Foundation</p>
              <h2 className="h2 text-[var(--text-primary)] mb-6">
                Built on <em>Experience</em>
              </h2>
              <p className="text-[var(--text-secondary)] leading-relaxed mb-4">
                Chiben Properties was founded on a single principle: every client deserves the kind of attentive, expert service that was once reserved for the ultra-high-net-worth market.
              </p>
              <p className="text-[var(--text-secondary)] leading-relaxed mb-4">
                Over 15 years, we&apos;ve grown from a small London boutique into a trusted name across the UK — but we&apos;ve never lost sight of what made us different in the first place.
              </p>
              <p className="text-[var(--text-secondary)] leading-relaxed">
                We examine each property with the same lens — the light, the materials, the craftsmanship — and represent only those that meet our standard.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-[var(--bg-surface)]">
        <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8 py-16 md:py-24">
          <div className="text-center max-w-xl mx-auto mb-12">
            <p className="eyebrow mb-3">What We Stand For</p>
            <h2 className="h2 text-[var(--text-primary)]">
              Our Core <em>Values</em>
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {values.map((v) => (
              <div
                key={v.title}
                className="rounded-card border border-[var(--border)] bg-[var(--bg-page)] p-8 hover:border-[var(--border-gold)] hover:-translate-y-1 transition-all duration-200"
              >
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-[10px] bg-[var(--accent-bg)]">
                  <v.icon size={24} className="text-[var(--accent)]" />
                </div>
                <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-3">{v.title}</h3>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{v.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="bg-[var(--bg-page)]">
        <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8 py-16 md:py-24">
          <div className="text-center max-w-xl mx-auto mb-12">
            <p className="eyebrow mb-3">The People Behind It</p>
            <h2 className="h2 text-[var(--text-primary)]">
              Meet the <em>Team</em>
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {team.map((member) => (
              <div
                key={member.name}
                className="rounded-card border border-[var(--border)] bg-[var(--bg-surface)] overflow-hidden hover:border-[var(--border-gold)] hover:-translate-y-1 transition-all duration-200"
              >
                <div className="relative aspect-square bg-[var(--bg-elevated)]">
                  <Image
                    src={`/images/brand/team-${member.name.split(' ')[0].toLowerCase()}.jpg`}
                    alt={member.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover"
                  />
                </div>
                <div className="p-5">
                  <h3 className="text-base font-semibold text-[var(--text-primary)]">{member.name}</h3>
                  <p className="text-xs font-medium text-[var(--accent)] mb-3">{member.role}</p>
                  <p className="text-xs text-[var(--text-secondary)] leading-relaxed">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Credentials */}
      <section className="bg-[var(--bg-surface)]">
        <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8 py-14">
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {['NAEA Propertymark', 'RICS Regulated', 'The Property Ombudsman', 'ICO Registered'].map((name) => (
              <div
                key={name}
                className="flex items-center justify-center rounded-card border border-[var(--border)] bg-[var(--bg-page)] px-6 py-5 text-center"
              >
                <p className="text-sm font-semibold text-[var(--text-secondary)]">{name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Strip */}
      <section style={{ backgroundColor: '#0F1117' }} className="py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8 text-center">
          <p className="eyebrow mb-4" style={{ color: '#C9A96E' }}>Work With Us</p>
          <h2
            className="mb-4 font-bold"
            style={{ fontSize: 'clamp(28px, 3.5vw, 48px)', color: '#F1F0EC' }}
          >
            Ready to Work With <em style={{ fontStyle: 'italic', color: '#C9A96E' }}>Chiben?</em>
          </h2>
          <p className="mb-8 max-w-lg mx-auto leading-relaxed" style={{ color: 'rgba(241,240,236,0.65)' }}>
            Whether you&apos;re buying, selling, or simply want expert advice, our team is here to help.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <button
                className="inline-flex items-center justify-center gap-2 h-[52px] px-8 rounded-btn font-semibold text-base transition-all hover:opacity-90"
                style={{ backgroundColor: '#C9A96E', color: '#0F1117' }}
              >
                Get in Touch <ArrowRight size={18} />
              </button>
            </Link>
            <Link href="/properties">
              <button
                className="inline-flex items-center justify-center gap-2 h-[52px] px-8 rounded-btn font-semibold text-base transition-all hover:bg-white/10"
                style={{ border: '1px solid rgba(255,255,255,0.2)', color: '#F1F0EC' }}
              >
                Browse Properties
              </button>
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
