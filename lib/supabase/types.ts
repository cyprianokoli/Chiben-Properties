export interface Property {
  id: string
  slug: string
  title: string
  description: string | null
  price: number | null
  price_qualifier: string | null
  status: string
  type: string | null
  tenure: string | null
  bedrooms: number | null
  bathrooms: number | null
  reception_rooms: number | null
  square_footage: number | null
  address_line1: string | null
  address_line2: string | null
  town: string | null
  county: string | null
  postcode: string | null
  latitude: number | null
  longitude: number | null
  key_features: string[] | null
  epc_rating: string | null
  council_tax_band: string | null
  local_authority: string | null
  images: string[] | null
  cover_image: string | null
  is_featured: boolean
  listed_at: string
  updated_at: string
}

export interface Enquiry {
  id: string
  name: string
  email: string
  phone: string | null
  message: string | null
  inquiry_type: string
  property_id: string | null
  property_slug: string | null
  is_read: boolean
  created_at: string
}
