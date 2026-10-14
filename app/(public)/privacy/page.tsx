import type { Metadata } from 'next'
import SiteLegalPage from '@/components/site/SiteLegalPage'
import PrivacyDocument from '@/components/legal/PrivacyDocument'
import { route } from '@/lib/routes'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description:
    'How Chiben Properties Ltd collects, uses and protects your personal data under UK GDPR and the Data Protection Act 2018.',
}

export default function PrivacyPage() {
  return (
    <PrivacyDocument
      Layout={SiteLegalPage}
      hrefs={{ privacy: route('/privacy'), terms: route('/terms'), cookies: route('/cookies') }}
    />
  )
}
