import { useAuthContext } from './useAuthContext'

export const useUser = () => {
  const { user } = useAuthContext()
  return user
}

export const useIsAuthenticated = () => {
  const { user } = useAuthContext()
  return !!user
}

export const useUserRole = () => {
  const { user } = useAuthContext()
  if (!user) return null
  return user.role
}

export const useIsAdmin = () => {
  const { user } = useAuthContext()
  if (!user) return false
  return user.role !== 'member'
}
