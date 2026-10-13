export interface LegalLayoutProps {
  eyebrow: string
  title: React.ReactNode
  intro?: string
  lastUpdated: string
  children: React.ReactNode
}

export type LegalLayout = (props: LegalLayoutProps) => React.ReactElement

export interface LegalHrefs {
  privacy: string
  terms: string
  cookies: string
}

export const LIVE_LEGAL_HREFS: LegalHrefs = {
  privacy: '/privacy',
  terms: '/terms',
  cookies: '/cookies',
}
