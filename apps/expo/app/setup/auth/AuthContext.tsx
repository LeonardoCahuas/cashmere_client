import { ReactNode, createContext, useState } from 'react'
import { UserRole } from './types'

export interface AuthenticatedUser {
  id: string
  email: string
  role: UserRole | null
  exp: number
  session: string | null
  verified: boolean
}

export interface AuthContextProps {
  user: AuthenticatedUser | null
  setUser: React.Dispatch<React.SetStateAction<AuthenticatedUser | null>>
}

export const AuthContext = createContext<AuthContextProps | null>(null)

interface AuthContextProviderProps {
  children: ReactNode
}

export const AuthProvider = ({ children }: AuthContextProviderProps) => {
  const [user, setUser] = useState<AuthenticatedUser | null>(null)

  return <AuthContext.Provider value={{ user, setUser }}>{children}</AuthContext.Provider>
}
