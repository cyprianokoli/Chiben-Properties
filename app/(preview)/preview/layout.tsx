import type { Metadata } from 'next'
import Navbar from '@/components/layout/preview/Navbar'
import Footer from '@/components/layout/preview/Footer'
import WhatsAppButton from '@/components/layout/WhatsAppButton'

// Temporary: the redesigned site lives under /preview for client sign-off,
// so the live pages stay untouched. Kept out of search results.
export const metadata: Metadata = {
  robots: { index: false, follow: false },
}

export default function PreviewLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main className="pt-[64px] md:pt-[76px]">{children}</main>
      <Footer />
      <WhatsAppButton />
    </>
  )
}
