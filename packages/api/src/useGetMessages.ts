import axios from 'axios'
import { useQuery } from 'react-query'
import { queryKeys } from './queryKeys'
import { apiRoutes } from './routes'

export const useGetMessages = (id: string) => {
  const url = `http://localhost:3000/${apiRoutes.getMeesagesByChatId.split(':')[0]}${id}`
  return useQuery<Array<Message>>({
    queryKey: [queryKeys.getMessagesByChatId],
    queryFn: () => axios.get(url).then((res) => res.data),
  })
}

interface Message {
  id: string
  created_at: Date
  updated_at: Date
  deleted_at: Date
  chat_id: string
  sender_id: string
  type: string
  reply_to: string
  content: string
  meta: unknown
}
