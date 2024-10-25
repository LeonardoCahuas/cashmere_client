import { KeyboardAvoidingView, Platform, StyleSheet, View } from 'react-native'
import { ChatControls } from './ChatControls'
import { ChatHeader } from './ChatHeader'
import { MessageList } from './MessageList'
import { UserProps } from '..'
import { MessageProps } from './components/Message'
import { ModalSheetProvider } from 'apps/expo/app/components/ModalSheet'
import { ModalOptions, ModalSheet } from 'apps/expo/app/components/ModalSheet/ModalSheet'
import { useAppStore } from 'apps/expo/app/setup/store'
import { Colors, Icon } from '@siva/ui'
import { linkToDetail } from '../../PostingDetailView/_link'
import { Posting } from '@siva/entities'
import { HorizontalModalSheet } from 'apps/expo/app/components/ModalSheet/HorizontalModalSheet'

export interface ChatProps {
  id: string
  users: UserProps[]
  vehicle: Posting | null 
  messages: MessageProps[]
}

const options: ModalOptions = {
  options: [
    {
      label: 'Attiva notifiche',
      icon: <Icon name="notifications" color={Colors.blackPrimary} />,
      action: () => {}
    },
    {
      label: 'Blocca utente',
      icon: <Icon name="block" color={Colors.blackPrimary} />,
      action: () => {}
    },
    {
      label: 'Segnala utente',
      icon: <Icon name="report" color={Colors.blackPrimary} />,
      action: () => {}
    },
    {
      label: 'Elimina chat',
      icon: <Icon name="trash" color={"red"} />,
      action: () => {}
    },
  ]
}

const mediaOptions: ModalOptions = {
  options: [
    {
      label: 'Fotocamera',
      icon: <Icon name="camera" color={Colors.blackPrimary} width={30} height={30} />,
      action: () => {}
    },
    {
      label: 'Galleria',
      icon: <Icon name="gallery" color={Colors.blackPrimary}  width={30} height={30} />,
      action: () => {}
    },
    {
      label: 'Documento',
      icon: <Icon name="document" color={Colors.blackPrimary}  width={30} height={30}  />,
      action: () => {}
    },
  ]
}

const ChatView = ({ chat, currentUser }: { chat: ChatProps, currentUser: string }) => {
   const { chatModalRef, mediaModalRef} = useAppStore((s) => s.messages)

  const handlePress = (posting: Posting | null) => {
    if(!posting) return
    linkToDetail(posting)
  }

  return (
    <ModalSheetProvider>
      <View style={styles.container}>
        {chat.vehicle && <ChatHeader data={chat.vehicle} onClick={() => handlePress(chat?.vehicle)} />}
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.keyboardAvoidingView}
          keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0}
        >
          <MessageList id={currentUser} messages={chat.messages} users={chat.users} />
          <ChatControls />
        </KeyboardAvoidingView>
      </View>
      <ModalSheet ref={chatModalRef} title="Azioni"  options={options}/>
      <HorizontalModalSheet ref={mediaModalRef} options={mediaOptions} />
    </ModalSheetProvider>
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
