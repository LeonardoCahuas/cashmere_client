import { Stack } from 'expo-router'
import { Provider } from './setup/Provider'

export default function App() {
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
        <Stack.Screen
          name="screens/ChatView"
          options={{
            headerShown: false,
          }}
        />
      </Stack>
    </Provider>
  )
}
