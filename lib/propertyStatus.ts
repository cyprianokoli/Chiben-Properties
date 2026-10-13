export const statusMeta: Record<string, { label: string; bg: string; text: string }> = {
  available: {
    label: 'Live',
    bg: 'var(--status-live-bg)',
    text: 'var(--status-live-text)',
  },
  'under-offer': {
    label: 'Under Offer',
    bg: 'var(--status-active-bg)',
    text: 'var(--status-active-text)',
  },
  sold: {
    label: 'Completed',
    bg: 'var(--status-progress-bg)',
    text: 'var(--status-progress-text)',
  },
  'off-market': {
    label: 'Off-Market',
    bg: 'rgba(15, 30, 71, 0.08)',
    text: 'var(--navy)',
  },
}

export function getStatusMeta(status: string | null | undefined) {
  return statusMeta[status ?? ''] ?? statusMeta['available']
}
