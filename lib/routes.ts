// Every internal link in the site goes through route(). SITE_BASE is '' now
// that the redesign is live; set it to a path prefix (e.g. '/preview') to
// stage a future redesign alongside the live pages.
export const SITE_BASE = ''

export function route(path: string): string {
  if (path === '/' || path === '') return SITE_BASE || '/'
  return `${SITE_BASE}${path}`
}
