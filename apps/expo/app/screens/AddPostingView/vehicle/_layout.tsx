import { Stack } from 'expo-router'

const StackLayout = () => {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        title: 'Dettaglio veicolo',
      }}
    ></Stack>
  )
}

export default StackLayout
