import { useForm } from 'react-hook-form'
import { Alert, Button, StyleSheet, Text, View } from 'react-native'
import * as v from 'valibot'
import { Input } from '../../components/Input'
import { supabase } from '../../lib/supabase'
import { AuthenticatedUser } from '../../setup/auth/AuthContext'
import { useIsAuthenticated } from '../../setup/auth/hooks'
import { useAuthContext } from '../../setup/auth/useAuthContext'
import { Auth } from './apple-auth'

const LoginSchema = v.object({
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

type LoginSchemaType = v.InferOutput<typeof LoginSchema>

function getLoginData(
  data: unknown
): { values: LoginSchemaType; error: false } | { error: true; issues: unknown[] } {
  const result = v.safeParse(LoginSchema, data)
  if (result.success) {
    return { values: result.output, error: false }
  }
  return { issues: result.issues, error: true }
}

const Profile: React.FC = () => {
  const isLoggedIn = useIsAuthenticated()
  const { setUser, user } = useAuthContext()
  const { control, handleSubmit, reset } = useForm()

  async function signInWithEmail({ email, password }: LoginSchemaType) {
    const { error, data } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    })

    if (error) {
      Alert.alert(error.message)
      return
    }

    if (!data?.user?.email || !data.session.expires_at) return
    const user: AuthenticatedUser = {
      id: data.user.id,
      email: data.user.email,
      role: 'member',
      exp: data.session.expires_at,
    }

    setUser(user)
    reset()
  }

  async function signUpWithEmail({ email, password }: LoginSchemaType) {
    const {
      data: { session },
      error,
    } = await supabase.auth.signUp({
      email,
      password,
    })

    if (error) Alert.alert(error.message)
    if (!session) Alert.alert('Please check your inbox for email verification!')
  }

  return (
    <View style={styles.container}>
      {isLoggedIn && <Text>Logged In as {user?.email}</Text>}
      {!isLoggedIn && false && <Auth />}

      <View>
        <View style={[styles.verticallySpaced, styles.mt20]}>
          <Input name="email" placeholder="you@email.com" control={control} />
        </View>
        <View style={styles.verticallySpaced}>
          <Input name="password" placeholder="*****" control={control} password />
        </View>
        <View style={[styles.verticallySpaced, styles.mt20]}>
          <Button
            title="Sign in"
            onPress={handleSubmit((values) => {
              const result = getLoginData(values)
              if (result.error) return
              const { email, password } = result.values
              signInWithEmail({ email, password })
            })}
          />
        </View>
        <View style={styles.verticallySpaced}>
          <Button
            title="Sign up"
            onPress={handleSubmit((values) => {
              const result = getLoginData(values)
              if (result.error) return
              const { email, password } = result.values
              signUpWithEmail({ email, password })
            })}
          />
        </View>
      </View>
    </View>
  )
}

export default Profile

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    padding: 12,
  },
  verticallySpaced: {
    paddingTop: 4,
    paddingBottom: 4,
    alignSelf: 'stretch',
  },
  mt20: {
    marginTop: 20,
  },
})
