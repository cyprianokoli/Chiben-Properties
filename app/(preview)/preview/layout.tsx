import Navbar from '@/components/layout/preview/Navbar'
import Footer from '@/components/layout/preview/Footer'
import WhatsAppButton from '@/components/layout/WhatsAppButton'

// Temporary: wraps /preview in the redesigned header/footer so the owner can
// review the new homepage without changing the live site.
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
