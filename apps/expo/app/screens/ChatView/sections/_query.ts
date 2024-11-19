import { apiUrl } from 'apps/expo/app/setup/query/constants'
import { apiRoutes } from 'apps/expo/app/setup/query/routes'
import axios from 'axios'
import { useQuery } from 'react-query'

export const useChatMessages = (chatId: string) => {
  const url = `${apiUrl}/${apiRoutes.getMessagesByChatId.split(':')[0]}${chatId}`
  return useQuery({
    queryKey: ['chat', chatId],
    queryFn: () => axios.get(url).then((res) => res.data),
  })
}

// export function createConnection(endpoint: string, authorizer: string) {
//   return mqtt.connect(`wss://${endpoint}/mqtt?x-amz-customauthorizer-name=${authorizer}`, {
//     protocolVersion: 5,
//     manualConnect: true,
//     username: '', // Must be empty for the authorizer
//     password: 'token', // Passed as the token to the authorizer
//     clientId: `client_${LOGGED_USER.id}`,
//   })
// }
