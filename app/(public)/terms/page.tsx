import type { Metadata } from 'next'
import SiteLegalPage from '@/components/site/SiteLegalPage'
import TermsDocument from '@/components/legal/TermsDocument'
import { route } from '@/lib/routes'

export const metadata: Metadata = {
  title: 'Terms of Service',
  description:
    'The terms that govern your use of the Chiben Properties website and the information published on it.',
}

export default function TermsPage() {
  return (
    <TermsDocument
      Layout={SiteLegalPage}
      hrefs={{ privacy: route('/privacy'), terms: route('/terms'), cookies: route('/cookies') }}
    />
  )
}
