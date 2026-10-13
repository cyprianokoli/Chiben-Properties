import type { Metadata } from 'next'
import LegalPage from '@/components/ui/LegalPage'
import CookiesDocument from '@/components/legal/CookiesDocument'
import { LIVE_LEGAL_HREFS } from '@/components/legal/types'

export const metadata: Metadata = {
  title: 'Cookie Policy',
  description:
    'How Chiben Properties uses cookies and similar technologies, and how you can control them.',
}

export default function CookiesPage() {
  return <CookiesDocument Layout={LegalPage} hrefs={LIVE_LEGAL_HREFS} />
}
