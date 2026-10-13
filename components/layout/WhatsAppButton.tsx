import WhatsAppIcon from '@/components/ui/WhatsAppIcon'
import { WHATSAPP_URL } from '@/lib/constants'

export default function WhatsAppButton() {
  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Message Chiben Properties on WhatsApp"
      className="group fixed z-40 right-4 md:right-6 flex h-[52px] w-[52px] md:h-14 md:w-14 items-center justify-center rounded-full bg-[var(--whatsapp)] text-white shadow-[0_8px_24px_rgba(0,0,0,0.18)] transition-transform duration-200 hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--whatsapp)]"
      style={{ bottom: 'calc(1rem + env(safe-area-inset-bottom, 0px))' }}
    >
      <WhatsAppIcon size={28} />
      <span className="pointer-events-none absolute right-full mr-3 hidden whitespace-nowrap rounded-full bg-[var(--ink)] px-3 py-1.5 text-xs font-semibold text-white opacity-0 transition-opacity duration-200 group-hover:opacity-100 md:block">
        Chat on WhatsApp
      </span>
    </a>
  )
}
