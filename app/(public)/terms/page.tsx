import type { Metadata } from 'next'
import LegalPage from '@/components/ui/LegalPage'
import TermsDocument from '@/components/legal/TermsDocument'
import { LIVE_LEGAL_HREFS } from '@/components/legal/types'

export const metadata: Metadata = {
  title: 'Terms of Service',
  description:
    'The terms that govern your use of the Chiben Properties website and the information published on it.',
}

export default function TermsPage() {
  return <TermsDocument Layout={LegalPage} hrefs={LIVE_LEGAL_HREFS} />
}
