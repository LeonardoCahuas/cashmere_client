import { SplashScreen, Stack } from 'expo-router'
import { Provider } from './setup/Provider'

export const unstable_settings = {
  // Ensure that reloading on `/user` keeps a back button present.
  initialRouteName: 'Home',
}

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync()

export default function App() {
  console.log('-|-|-')
  return (
    <Provider>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="screens/AddPostingView"
          options={{
            headerShown: false,
            animation: 'slide_from_bottom',
          }}
        />
        <Stack.Screen
          name="screens/PostingDetailView"
          options={{
            headerShown: false,
          }}
        />
      </Stack>
    </Provider>
  )
}
