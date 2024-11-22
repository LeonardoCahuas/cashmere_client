import { Posting } from '@siva/entities'
import { useMutation, useQuery } from '@tanstack/react-query'
import axios from 'axios'
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
    queryKey: [`${queryKeys.getPostingById}-${id}`],
    queryFn: () => axios.get(url).then((res) => res.data),
  })
}

export const useAddBookmark = (sessionId: string) => {
  const url = `${apiUrl}/${apiRoutes.createBookmark.split(':')[0]}`
  const headers = { Authorization: `Bearer ${sessionId}` }
  return useMutation<Posting, unknown, { postingId: string; sessionId: string }>({
    mutationFn: ({ postingId }) =>
      axios.post(url, { postingId }, { headers }).then((res) => res.data),
    onMutate: ({ postingId }) => {
      queryClient.setQueryData<Posting>(
        [`${queryKeys.getPostingById}-${postingId}`],
        (old: Posting) => ({ ...old, bookmarked: true })
      )
    },
    onSuccess: (_, { postingId }) => {
      queryClient.invalidateQueries({
        queryKey: [queryKeys.getBookmarksByUserId],
      })
      queryClient.invalidateQueries({
        queryKey: [`${queryKeys.getPostingById}-${postingId}`],
      })
    },
  })
}

export const useRemoveBookmark = (sessionId: string) => {
  const headers = { Authorization: `Bearer ${sessionId}` }
  return useMutation<Posting, unknown, { bookmarkId: string; postingId: string }>({
    mutationFn: ({ bookmarkId }) =>
      axios
        .delete(`${apiUrl}/${apiRoutes.removeBookmark.split(':')[0]}${bookmarkId}`, { headers })
        .then((res) => res.data),
    onMutate: ({ postingId }) => {
      queryClient.setQueryData<Posting>(
        [`${queryKeys.getPostingById}-${postingId}`],
        (old: Posting) => ({ ...old, bookmarked: false })
      )
    },
    onSuccess: (_, { postingId }) => {
      queryClient.invalidateQueries({
        queryKey: [queryKeys.getBookmarksByUserId],
      })
      queryClient.invalidateQueries({
        queryKey: [`${queryKeys.getPostingById}-${postingId}`],
      })
    },
  })
}
