import { Colors, Icon } from '@siva/ui'
import { Stack, router } from 'expo-router'
import { TouchableOpacity } from 'react-native'

const StackLayout = () => {
  return (
    <Stack
      screenOptions={{
        headerShown: true,
        title: 'Inserisci annuncio',
        headerLeft: () => (
          <TouchableOpacity
            onPress={() => {
              router.back()
            }}
          >
            <Icon name="close" color={Colors.blackPrimary} />
          </TouchableOpacity>
        ),
      }}
    ></Stack>
  )
}

export default StackLayout
