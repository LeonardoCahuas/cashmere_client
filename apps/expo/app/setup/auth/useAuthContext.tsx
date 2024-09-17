import { useContext } from 'react'
import { AuthContext } from './AuthContext'

export const useAuthContext = () => {
  const ctx = useContext(AuthContext)
  if (!ctx) {
    throw new Error('useAuthContext must be called inside of AuthProvider')
  }
  return ctx
}
