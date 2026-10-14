import type { Metadata } from 'next'
import SiteLegalPage from '@/components/site/SiteLegalPage'
import CookiesDocument from '@/components/legal/CookiesDocument'
import { route } from '@/lib/routes'

export const metadata: Metadata = {
  title: 'Cookie Policy',
  description:
    'How Chiben Properties uses cookies and similar technologies, and how you can control them.',
}

export default function CookiesPage() {
  return (
    <CookiesDocument
      Layout={SiteLegalPage}
      hrefs={{ privacy: route('/privacy'), terms: route('/terms'), cookies: route('/cookies') }}
    />
  )
}
