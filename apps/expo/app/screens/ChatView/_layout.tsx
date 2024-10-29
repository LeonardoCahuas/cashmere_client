import { Colors, Icon } from '@siva/ui'
import { Stack, useRouter } from 'expo-router'
import { TouchableOpacity } from 'react-native'
import { useAppStore } from '../../setup/store'

const StackLayout = () => {
  const router = useRouter()
  const { openChatModal, chatName } = useAppStore((s) => s.messages)

  return (
    <Stack
      screenOptions={{
        headerShown: true,
        title: chatName,
        headerTintColor: '#000',
        headerRight: () => {
          return (
            <TouchableOpacity
            style={{paddingHorizontal:10, height:30, flexDirection:"row", alignItems:"center", justifyContent:"center"}}
              onPress={() => {
                openChatModal()
              }}
            >
              <Icon name="horizontal_dots" color={Colors.blackPrimary} width={30} />
            </TouchableOpacity>
          )
        },
        headerLeft: () => {
          return (
            <TouchableOpacity
              onPress={() => {
                router.back()
              }}
            >
              <Icon name="chevron-right" color={Colors.blackPrimary} width={30} />
            </TouchableOpacity>
          )
        },
      }}
    ></Stack>
  )
}

export default StackLayout
