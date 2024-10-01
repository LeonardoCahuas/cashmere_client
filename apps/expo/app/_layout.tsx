import { SplashScreen, Stack } from 'expo-router'
import { Provider } from './setup/Provider'

export const unstable_settings = {
  // Ensure that reloading on `/user` keeps a back button present.
  initialRouteName: 'Home',
}

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync()

export default function App() {
  console.log('that-|-|')
  return (
    <Provider>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="screens/PostingDetailView"
          options={{
            headerShown: true,
            title: 'Dettaglio Annuncio',
            headerTintColor: '#000',
            headerBackTitle: 'Indietro',
          }}
        />
      </Stack>
    </Provider>
  )
}
