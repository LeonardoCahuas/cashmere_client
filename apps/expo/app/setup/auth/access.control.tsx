import { ReactNode } from 'react'
import { useIsAdmin, useIsAuthenticated } from './hooks'

export const AdminUI = ({ children }: { children: ReactNode }) => {
  const isAdmin = useIsAdmin()
  if (!isAdmin) return null

  return <>{children}</>
}

export const LoggedInUI = ({ children }: { children: ReactNode }) => {
  const isLoggedIn = useIsAuthenticated()
  if (!isLoggedIn) null
  return <>{children}</>
}
