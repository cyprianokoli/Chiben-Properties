import type { Metadata } from 'next'
import LegalPage from '@/components/ui/LegalPage'
import PrivacyDocument from '@/components/legal/PrivacyDocument'
import { LIVE_LEGAL_HREFS } from '@/components/legal/types'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description:
    'How Chiben Properties Ltd collects, uses and protects your personal data under UK GDPR and the Data Protection Act 2018.',
}

export default function PrivacyPage() {
  return <PrivacyDocument Layout={LegalPage} hrefs={LIVE_LEGAL_HREFS} />
}
