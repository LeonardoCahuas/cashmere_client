import * as v from 'valibot'
import { AuthenticatedUser } from './AuthContext'
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

const loginResponseSchema = v.object({
  id: v.pipe(v.string(), v.nonEmpty()),
  email: v.pipe(
    v.string('Email must be a string'),
    v.nonEmpty('Please Enter an email'),
    v.email('Email badly formatted')
  ),
  role: v.pipe(v.string(), v.nonEmpty()),
  exp: v.pipe(v.number(), v.integer()),
  session: v.pipe(v.string(), v.nonEmpty()),
  verified: v.boolean(),
})

export const LoginSchema = v.object({
  email: v.pipe(
    v.string('Email must be a string'),
    v.nonEmpty('Please Enter an email'),
    v.email('Email badly formatted')
  ),
  password: v.pipe(
    v.string('Password must be a string'),
    v.nonEmpty('Please enter your password.'),
    v.minLength(6, 'Password must be at least 6 characters long')
  ),
})

export type LoginSchemaType = v.InferOutput<typeof LoginSchema>

const logInWithEmail = async ({
  email,
  password,
}: LoginSchemaType): Promise<AuthenticatedUser | null> => {
  const response = await fetch('http://localhost:3000/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
    headers: { 'Content-Type': 'application/json' },
  })
  const authedUser = await response.json()
  const result = v.safeParse(loginResponseSchema, authedUser)
  if (!result.success) return null
  return authedUser
}

const signUpWithEmail = async ({
  email,
  password,
}: LoginSchemaType): Promise<AuthenticatedUser | null> => {
  const response = await fetch('http://localhost:3000/auth/signup', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
    headers: { 'Content-Type': 'application/json' },
  })
  const authedUser = await response.json()
  const result = v.safeParse(loginResponseSchema, authedUser)
  if (!result.success) return null
  return authedUser
}

const appleOauth = () => {}

const loginWithToken = async (token: string): Promise<AuthenticatedUser | null> => {
  try {
    const response = await fetch('http://localhost:3000/auth/apple/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })

    if (!response.ok) {
      console.error('Login failed:', response.statusText)
      return null
    }

    const authedUser = await response.json()
    const result = v.safeParse(loginResponseSchema, authedUser)

    if (!result.success) {
      console.error('Invalid user data received:', result.issues)
      return null
    }
    console.log('oauth ', authedUser)
    return authedUser
  } catch (error) {
    console.error('Error during token login:', error)
    return null
  }
}

export const auth = {
  logInWithEmail,
  signUpWithEmail,
  appleOauth,
  loginWithToken, // Add this line to export the new function
}
