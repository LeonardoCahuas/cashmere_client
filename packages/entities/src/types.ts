/** Complete Posting entity from postings view */
export interface Posting {
  id: string
  created_at: string
  posting_id: string
  duration: string
  subtitle: string | null
  dropoff_location_plain: string
  pickup_location_plain: string
  deposit: string
  price: number
  age_required: number
  distance_limit_in_km: string
  taxes_included: boolean
  vehicle_id: string
  brand: string
  model: string
  fuel_type: string
  year: number
  interior_material: string | null
  interior_color: string | null
  exterior_color: string | null
  transmission_type: string | null
  vehicle_images: string[] | null
  renter_name: string | null
  bookmarked: boolean
  bookmark_id?: string
  vehicle_type: string
  state?: 'new' | 'used'
  vehicle?: Partial<Vehicle>
}

export interface Vehicle {
  id: string
  created_at: string
  renter_id: string
  brand: string
  model: string
  year: string
  seats: string
  doors: string
  body_type: string
  fuel_type: string
  transmission_type: string
  exterior_color: string
  interior_color: string
  interior_material: string
  vehicle_type: string
  state: 'new' | 'used'
  distance_limit_in_km: string
  pollution_class: string
  traction: string
  gears: string
  optionals: string[]
}
