import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import WhatsAppButton from '@/components/layout/WhatsAppButton'
import Container from '@/components/site/Container'
import PillLink from '@/components/ui/PillLink'
import { route } from '@/lib/routes'

export default function NotFound() {
  // Rendered outside the (public) layout, so it brings its own header and footer
  return (
    <>
      <Navbar />
      <main className="pt-[64px] md:pt-[76px]">
        <section className="bg-white">
          <Container className="py-24 md:py-32">
            <p className="kicker mb-5">404</p>
            <h1 className="display max-w-2xl text-[var(--text-1)]">
              We couldn&apos;t find <em>that page.</em>
            </h1>
            <p className="mt-6 max-w-md text-base leading-relaxed text-[var(--text-2)] md:text-lg">
              It may have moved, or the property may no longer be listed.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <PillLink href={route('/')}>Back to home</PillLink>
              <PillLink href={route('/portfolio')} variant="outline" arrow={false}>
                See Our Portfolio
              </PillLink>
            </div>
          </Container>
        </section>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  )
}
