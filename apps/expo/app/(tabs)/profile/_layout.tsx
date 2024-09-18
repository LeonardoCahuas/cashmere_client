import { Stack, useRouter } from 'expo-router'

const StackLayout = () => {
  const router = useRouter()
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    ></Stack>
  )
}

export default StackLayout
