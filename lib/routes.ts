// The redesigned pages are being reviewed under /preview before they replace
// the live pages. Every link inside the new design goes through route(), so
// moving them to their real slugs only means setting SITE_BASE to ''.
export const SITE_BASE = '/preview'

export function route(path: string): string {
  if (path === '/' || path === '') return SITE_BASE || '/'
  return `${SITE_BASE}${path}`
}
