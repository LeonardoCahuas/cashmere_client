import { Colors, Icon } from '@siva/ui'
import { Stack, usePathname, useRouter } from 'expo-router'
import { TouchableOpacity } from 'react-native'

const StackLayout = () => {
  const router = useRouter()
  const index = usePathname().split('/').pop() === 'AddPostingView'

  return (
    <Stack
      screenOptions={{
        headerShown: true,
        title: 'Inserisci annuncio',
        headerBackTitle: 'Indietro',
        headerTintColor: '#000',
        headerLeft: index
          ? () => (
              <TouchableOpacity
                onPress={() => {
                  router.back()
                }}
              >
                <Icon name="close" color={Colors.blackPrimary} />
              </TouchableOpacity>
            )
          : undefined,
      }}
    ></Stack>
  )
}

export default StackLayout
