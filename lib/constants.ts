export const EMAIL = 'info@chibenproperties.com'
export const PHONE_DISPLAY = '0330 043 7697'
export const PHONE_TEL = '+443300437697'

export const WHATSAPP_DISPLAY = '+44 330 043 7697'
export const WHATSAPP_URL = `https://wa.me/443300437697?text=${encodeURIComponent(
  "Hi Chiben, I'd like help finding a UK property deal."
)}`

export const COMPANY_NUMBER = '16819031'

export const OFFICE_ADDRESS = ['Bartle House, Oxford Court', 'Manchester, M2 3WQ']

// Sourcing fees. Leave as null until the client confirms real figures: the
// site then says fees are set out in the terms of business instead of
// publishing a placeholder.
export const FEES: { service: string; fee: string | null }[] = [
  { service: 'Sourcing fee', fee: null },
  { service: 'Refurb oversight (optional)', fee: null },
]
