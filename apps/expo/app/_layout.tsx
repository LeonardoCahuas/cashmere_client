import { Colors, Icon } from '@siva/ui'
import { SplashScreen, Stack } from 'expo-router'
import { TouchableOpacity, View } from 'react-native'
import { Provider } from './setup/Provider'

export const unstable_settings = {
  // Ensure that reloading on `/user` keeps a back button present.
  initialRouteName: 'Home',
}

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync()

export default function App() {
  console.log('that-|-')
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
            headerRight: () => {
              return (
                <View style={{ display: 'flex', flexDirection: 'row', gap: 12 }}>
                  <TouchableOpacity>
                    <Icon name="share" />
                  </TouchableOpacity>
                  <TouchableOpacity>
                    <Icon name="heart_filled" color={Colors.greenPrimary} />
                  </TouchableOpacity>
                </View>
              )
            },
          }}
        />
      </Stack>
    </Provider>
  )
}
