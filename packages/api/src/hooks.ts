import axios from 'axios'
import { useQuery } from 'react-query'
import { apiUrl } from './constants'
import { queryKeys } from './queryKeys'
import { apiRoutes } from './routes'
import { Bookmark, Coupon, Message } from './types'

export const useGetMessages = (id: string) => {
  const url = `${apiUrl}/${apiRoutes.getMeesagesByChatId.split(':')[0]}${id}`
  return useQuery<Array<Message>>({
    queryKey: [queryKeys.getMessagesByChatId],
    queryFn: () => axios.get(url).then((res) => res.data),
  })
}

export const useGetCouponsByVehicleId = (id: string) => {
  const url = `${apiUrl}/${apiRoutes.getCouponByVehicleId.split(':')[0]}${id}`
  return useQuery<Coupon>({
    queryKey: [queryKeys.getCouponByVehicleId],
    queryFn: () => axios.get(url).then((res) => res.data),
  })
}

export const useGetBookmarksByUser = (id: string) => {
  const url = `${apiUrl}/${apiRoutes.getBookmarksByUserId.split(':')[0]}${id}`
  return useQuery<Array<Bookmark>>({
    queryKey: [queryKeys.getBookmarksByUserId],
    queryFn: () => axios.get(url).then((res) => res.data),
  })
}

const getUserParams = (token?: any) => {
  const id = token ? token?.sub : ''
  const headers = token ? { headers: { Authorization: 'Bearer' } } : {}
  return { id, headers }
}

export const useGetBookmarksByUserJwt = (token?: any) => {
  const { id, headers } = getUserParams(token)
  const url = `${apiUrl}/${apiRoutes.getBookmarksByUserId.split(':')[0]}${id}`
  return useQuery<Array<Bookmark>>({
    queryKey: [queryKeys.getBookmarksByUserId],
    queryFn: () => axios.get(url, headers).then((res) => res.data),
  })
}
