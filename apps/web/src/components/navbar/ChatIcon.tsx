import { ChatIconButton } from './ChatIconButton'

async function getUnreadMessages() {
  return new Promise<string[]>((resolve) => {
    setTimeout(() => {
      resolve(['1', '2', '3'])
    }, 2000)
  })
}

export async function ChatIcon() {
  const unreadMessages = await getUnreadMessages()
  const hasUnreadMessages = unreadMessages.length > 3

  return <ChatIconButton hasUnreadMessages={hasUnreadMessages} />
}
