export interface Message {
  id: string
  created_at: Date
  updated_at: Date
  deleted_at: Date
  chat_id: string
  sender_id: string
  type: string
  reply_to: string
  content: string
  meta: unknown
}

export interface Vehicle {
  id: string
  created_at: Date
  updated_at: Date
  deleted_at: Date
  renter_id: string
  brand: string
  model: string
  year: number
  fuel_type: string
  transmission_type: string
  exterior_color: string
  interior_color: string
  interior_material: string
}

export interface Coupon {
  id: string
  created_at: Date
  updated_at: Date
  deleted_at: Date
  start_validity: Date
  end_validity: Date
  code: string
  issuer_id: string
  type: string
  value: number
}

export interface Bookmark {
  id: string
  created_at: Date
  updated_at: Date
  deleted_at: Date
  user_id: string
  posting_id: string
}

export interface Chat {
  id: string
  created_at: Date
  updated_at: Date
  deleted_at: Date
}

export interface Customer {
  id: string
  user_id: string
  created_at: Date
  updated_at: Date
  deleted_at: Date
}

export interface Posting {
  id: string
  created_at: Date
  updated_at: Date
  deleted_at: Date
  renter_id: string
  vehicle_id: string
  price: number
  deposit: number
  pickup_location_plain: string
  dropoff_location_plain: string
  pickup_location: string
  dropoff_location: string
}

export interface Rental {
  id: string
  created_at: Date
  updated_at: Date
  deleted_at: Date
  renter_id: string
  customer_id: string
  posting_id: string
  start_date: Date
  end_date: Date
  price: number
  deposit: number
  pickup_location_plain: string
  dropoff_location_plain: string
  pickup_location: string
  dropoff_location: string
}

export interface Renter {
  id: string
  created_at: Date
  updated_at: Date
  deleted_at: Date
  name: string
  address: string
  website: string
}

export interface User {
  id: string
  instance_id: string
  aud: string
  role: string
  email: string
  encrypted_password: string
  email_confirmed_at: Date
  invited_at: Date
  confirmation_token: string
  confirmation_sent_at: Date
  recovery_token: string
  recovery_sent_at: Date
  email_change_token_new: string
  email_change: string
  email_change_sent_at: Date
  last_sign_in_at: Date
  raw_app_meta_data: any
  raw_user_meta_data: any
  is_super_admin: boolean
  created_at: Date
  updated_at: Date
  phone: string
  phone_confirmed_at: Date
  phone_change: string
  phone_change_token: string
  phone_change_sent_at: Date
  confirmed_at: Date
  email_change_token_current: string
  email_change_confirm_status: number
  banned_until: Date
  reauthentication_token: string
  reauthentication_sent_at: Date
  is_sso_user: boolean
  deleted_at: Date
  is_anonymous: boolean
}
