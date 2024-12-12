import { router } from 'expo-router'

export const linkToChat = () => {
  router.push({
    pathname: `screens/ChatView`,
  })
}
