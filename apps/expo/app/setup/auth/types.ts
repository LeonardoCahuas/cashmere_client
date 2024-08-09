export enum UserRoles {
  super_admin = 'super_admin',
  admin = 'admin',
  member = 'member',
}

export type UserRole = `${UserRoles}`

export interface SupabaseJwtToken {
  sub: string
  exp: number
  iat: number
  email: string
  phone: string
}
