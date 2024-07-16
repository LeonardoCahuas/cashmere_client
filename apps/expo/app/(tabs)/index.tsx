import { useGetMessages } from '@siva/api'
import { Row, Text, View, YStack } from '@siva/ui'
import Home from '../Home/home'

export default function Screen() {
  const { isLoading, data } = useGetMessages('7452a439-624a-4108-902d-11dda2312238')

  if (isLoading) {
    return <Text>Loading...</Text>
  }

  return (
    <View>
      <YStack padding={8} gap={8}>
        <Home/>
      </YStack>
    </View>
  )
}
