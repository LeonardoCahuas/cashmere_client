import axios from 'axios'
import { useQuery } from 'react-query'
import { apiUrl } from './constants'
import { queryKeys } from './queryKeys'
import { apiRoutes } from './routes'
import { Message } from './types'

export const useGetMessages = (id: string) => {
  const url = `${apiUrl}/${apiRoutes.getMeesagesByChatId.split(':')[0]}${id}`
  return useQuery<Array<Message>>({
    queryKey: [queryKeys.getMessagesByChatId],
    queryFn: () => axios.get(url).then((res) => res.data),
  })
}
