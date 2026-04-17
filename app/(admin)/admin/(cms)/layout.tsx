import AdminShell from '@/components/admin/AdminShell'

export default function CmsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen" style={{ background: 'var(--bg-page)' }}>
      <AdminShell />
      {/* Desktop: offset for sidebar + topbar. Mobile: offset for topbar only */}
      <main className="pt-14 md:pt-16 md:ml-[240px] min-h-screen">
        <div className="p-4 md:p-6 lg:p-8">{children}</div>
      </main>
    </div>
  )
}
