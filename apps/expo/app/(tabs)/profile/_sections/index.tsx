import * as WebBrowser from 'expo-web-browser'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { Alert, Button, StyleSheet, Text, View } from 'react-native'
import { Input } from '../../../components/Input'
import { LoginSchemaType, auth, getLoginData } from '../../../setup/auth/helpers'
import { useIsAuthenticated } from '../../../setup/auth/hooks'
import { useAuthContext } from '../../../setup/auth/useAuthContext'

const Profile: React.FC = () => {
  const isLoggedIn = useIsAuthenticated()
  const { setUser, user } = useAuthContext()
  const { control, handleSubmit, reset } = useForm()

  async function signInWithEmail({ email, password }: LoginSchemaType) {
    const user = await auth.logInWithEmail({ email, password })
    if (!user) {
      Alert.alert('error logging in!')
      return
    }
    setUser(user)
    reset()
  }

  async function signUpWithEmail({ email, password }: LoginSchemaType) {
    const user = await auth.signUpWithEmail({ email, password })
    if (!user) {
      Alert.alert('error logging in')
    }
    if (false) Alert.alert('Please check your inbox for email verification!')
    setUser(user)
  }

  function logOut() {
    setUser(null)
  }

  async function loginWithApple() {
    const user = await auth.loginWithApple()
    if (!user) {
      Alert.alert('Error logging in with OAuth')
      return
    }
    setUser(user)
  }

  async function loginWithGoogle() {
    const user = await auth.loginWithGoogle()
    if (!user) {
      Alert.alert('Error logging in with OAuth')
      return
    }
    setUser(user)
  }

  useEffect(() => {
    WebBrowser.maybeCompleteAuthSession()
  }, [])

  return (
    <View style={styles.container}>
      {isLoggedIn && <Text>Logged In as {user?.email}</Text>}

      <View>
        <View style={[styles.verticallySpaced, styles.mt20]}>
          <Input name="email" placeholder="you@email.com" control={control} />
        </View>
        <View style={styles.verticallySpaced}>
          <Input name="password" placeholder="*****" control={control} password />
        </View>
        <Button
          title="Sign IN!!!"
          onPress={handleSubmit((values) => {
            const result = getLoginData(values)
            if (result.error) return
            const { email, password } = result.values
            signInWithEmail({ email, password })
          })}
        />
        <Button
          title="Sign up"
          onPress={handleSubmit((values) => {
            const result = getLoginData(values)
            if (result.error) return
            const { email, password } = result.values
            signUpWithEmail({ email, password })
          })}
        />
        <Button title="Log out" onPress={() => logOut()} />
        <Button title="User" onPress={() => console.log(user)} />
        <Button title="Sign in with Apple" onPress={loginWithApple} />
        <Button title="Sign in with Google" onPress={loginWithGoogle} />
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
