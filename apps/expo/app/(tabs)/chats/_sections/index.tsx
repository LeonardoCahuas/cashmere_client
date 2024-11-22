import { linkToChat } from 'apps/expo/app/screens/ChatView/_link'
import { useAppStore } from 'apps/expo/app/setup/store'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

const Chats = () => {
  const { setChatName, __setLoadedUser } = useAppStore((s) => s.messages)
  const users = ['79194c4e-37fc-475b-aee6-f53d351d9406', 'fa0d125a-756d-4fba-8de1-d36597e0c41b']

  return (
    <View style={styles.container}>
      <Text>Chat</Text>
      {users.map((user) => (
        <TouchableOpacity
          key={user}
          onPress={() => {
            setChatName(user)
            __setLoadedUser(user)
            linkToChat()
          }}
        >
          <Text>Go to chat</Text>
        </TouchableOpacity>
      ))}
    </View>
  )
}

export default Chats

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})
