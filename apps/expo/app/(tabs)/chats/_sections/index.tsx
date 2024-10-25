import { linkToChat } from 'apps/expo/app/screens/ChatView/_link'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

const Chats = () => {
  return (
    <View style={styles.container}>
      <Text>Chat</Text>
      <TouchableOpacity onPress={() => linkToChat()}>
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
