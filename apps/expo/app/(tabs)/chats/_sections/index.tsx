import { linkToChat } from 'apps/expo/app/screens/ChatView/_link'
import { useAppStore } from 'apps/expo/app/setup/store'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

const Chats = () => {
  const { setChatName, __setLoadedUser } = useAppStore((s) => s.messages)
  const users = [
    {
      id: '79194c4e-37fc-475b-aee6-f53d351d9406',
      name: 'Rod',
      image:
        'https://lh3.googleusercontent.com/ogw/AF2bZygqwVtHlqfvqHOrJ5AQWQPRSBDG_2cC3IL6HsmnmpR0MA=s64-c-mo',
    },
    {
      id: 'fa0d125a-756d-4fba-8de1-d36597e0c41b',
      name: 'Leo',
      image: null,
    },
  ]

  return (
    <View style={styles.container}>
      <Text>Chat</Text>
      {users.map((user) => (
        <TouchableOpacity
          key={user.id}
          onPress={() => {
            setChatName(user.name)
            __setLoadedUser(user.id)
            linkToChat()
          }}
        >
          <Text>{user.name}</Text>
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
