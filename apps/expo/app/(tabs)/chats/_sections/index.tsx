import { StyleSheet, Text, View } from 'react-native'

const Chats = () => {
  return (
    <View style={styles.container}>
      <Text>Chat</Text>
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
