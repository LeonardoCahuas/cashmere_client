import { KeyboardAvoidingView, Platform, StyleSheet, View } from 'react-native'
import { ChatControls } from './ChatControls'
import { ChatHeader, ChatHeaderProps } from './ChatHeader'
import { MessageList } from './MessageList'
import {  UserProps } from '..'
import { MessageProps } from './components/Message'

export interface ChatProps {
  id: string
  users: UserProps[]
  vehicle: ChatHeaderProps | null
  messages: MessageProps[]
}

const ChatView = ({ chat, currentUser }: { chat: ChatProps, currentUser: string }) => {
  return (
    <View style={styles.container}>
      {chat.vehicle && <ChatHeader data={chat.vehicle} />}
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardAvoidingView}
        keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0}
      >
        <MessageList id={currentUser} messages={chat.messages} users={chat.users} />
        <ChatControls />
      </KeyboardAvoidingView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white"
  },
  keyboardAvoidingView: {
    flex: 1
  }
})

export default ChatView
