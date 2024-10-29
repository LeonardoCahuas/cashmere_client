import { linkToChat } from 'apps/expo/app/screens/ChatView/_link'
import { useAppStore } from 'apps/expo/app/setup/store'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

const Chats = () => {
  const {setChatName} = useAppStore((s) => s.messages)
  return (
    <View style={styles.container}>
      <Text>Chat</Text>
      <TouchableOpacity onPress={() => {
        setChatName("Massimo bossetti")
        linkToChat()
        }}>
        <Text>
          Go to chat
        </Text>
      </TouchableOpacity>
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
