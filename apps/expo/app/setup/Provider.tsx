import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native'
import { Provider as AppProvider } from 'app/provider'
import { useFonts } from 'expo-font'
import { SplashScreen } from 'expo-router'
import { PropsWithChildren, useEffect } from 'react'
import { useColorScheme } from 'react-native'
import { QueryClient, QueryClientProvider } from 'react-query'
import { AuthProvider } from './auth/AuthContext'
import { LargeSecureStore } from './local-storage/secure-store'

export const queryClient = new QueryClient()
export const secureStore = new LargeSecureStore()

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync()

export function Provider({ children }: PropsWithChildren) {
  const [interLoaded, interError] = useFonts({
    Inter: require('@tamagui/font-inter/otf/Inter-Medium.otf'),
    InterBold: require('@tamagui/font-inter/otf/Inter-Bold.otf'),
  })
  const colorScheme = useColorScheme()

  useEffect(() => {
    if (interLoaded || interError) {
      // Hide the splash screen after the fonts have loaded (or an error was returned) and the UI is ready.
      SplashScreen.hideAsync()
    }
  }, [interLoaded, interError])

  if (!interLoaded && !interError) {
    return null
  }

  return (
    <QueryClientProvider client={queryClient}>
      <AppProvider>
        <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
          <AuthProvider>
            {children}
            {/* <NativeToast /> */}
          </AuthProvider>
        </ThemeProvider>
      </AppProvider>
    </QueryClientProvider>
  )
}
