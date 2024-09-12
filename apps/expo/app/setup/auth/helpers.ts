import * as Linking from 'expo-linking'
import * as WebBrowser from 'expo-web-browser'
import * as v from 'valibot'
import { AuthenticatedUser } from './AuthContext'

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

export function getLoginData(
  data: unknown
): { values: LoginSchemaType; error: false } | { error: true; issues: unknown[] } {
  const result = v.safeParse(LoginSchema, data)
  if (result.success) {
    return { values: result.output, error: false }
  }
  return { issues: result.issues, error: true }
}

const baseURL = 'https://sivahono-production.up.railway.app'

const logInWithEmail = async ({
  email,
  password,
}: LoginSchemaType): Promise<AuthenticatedUser | null> => {
  const response = await fetch(`${baseURL}/auth/login`, {
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
  const response = await fetch(`${baseURL}/auth/signup`, {
    method: 'POST',
    body: JSON.stringify({ email, password }),
    headers: { 'Content-Type': 'application/json' },
  })
  const authedUser = await response.json()
  const result = v.safeParse(loginResponseSchema, authedUser)
  if (!result.success) return null
  return authedUser
}

const loginWithApple = async () => {
  const callbackUrl = Linking.createURL('callback')
  const result = await WebBrowser.openAuthSessionAsync(
    `${baseURL}/auth/apple/login?isMobile=true`,
    callbackUrl
  )

  if (result.type === 'success') {
    const { url } = result
    const session = Linking.parse(decodeURIComponent(url)).queryParams?.['token'] as string
    if (session) {
      const user = JSON.parse(session) as AuthenticatedUser
      if (user) {
        return user
      } else {
        return null
      }
    }
  }
  return null
}

const loginWithGoogle = async () => {
  const callbackUrl = Linking.createURL('callback')
  const result = await WebBrowser.openAuthSessionAsync(
    `${baseURL}/auth/google/login?isMobile=true`,
    callbackUrl
  )

  if (result.type === 'success') {
    const { url } = result
    const session = Linking.parse(decodeURIComponent(url)).queryParams?.['token'] as string
    if (session) {
      const user = JSON.parse(session) as AuthenticatedUser
      if (user) {
        return user
      } else {
        return null
      }
    }
  }
  return null
}

export const auth = {
  logInWithEmail,
  signUpWithEmail,
  loginWithApple,
  loginWithGoogle,
}
