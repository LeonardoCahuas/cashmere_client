import { Posting } from '@siva/entities'
import axios from 'axios'
import { useMutation, useQuery } from 'react-query'
import { queryClient } from '../Provider'
import { apiUrl } from './constants'
import { queryKeys } from './keys'
import { apiRoutes } from './routes'

export const useGetBookmarksByUser = (id: string) => {
  const url = `${apiUrl}/${apiRoutes.getBookmarksByUserId.split(':')[0]}${id}`
  return useQuery<Array<Posting>>({
    queryKey: [queryKeys.getBookmarksByUserId],
    queryFn: () => axios.get(url).then((res) => res.data),
  })
}

export const useGetPosting = (id: string) => {
  const url = `${apiUrl}/${apiRoutes.getPostingById.split(':')[0]}${id}`
  return useQuery<Posting>({
    queryKey: [queryKeys.getPostingById],
    queryFn: () => axios.get(url).then((res) => res.data),
  })
}

export const useAddBookmark = (id: string) => {
  const url = `${apiUrl}/${apiRoutes.getPostingById.split(':')[0]}${id}`
  return useMutation<Posting, unknown, { postingId: string; userId: string }>({
    mutationFn: ({ postingId }) => axios.post(url, { postingId }).then((res) => res.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKeys.getBookmarksByUserId] })
    },
  })
}
