import { Stack } from 'expo-router'

const StackLayout = () => {
  return (
    <Stack
      screenOptions={{
        headerTintColor: '#000',
        headerBackTitle: 'Indietro',
        title: 'Home',
        headerShown: true,
      }}
    ></Stack>
  )
}

export default StackLayout
