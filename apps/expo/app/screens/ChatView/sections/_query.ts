import { Posting } from '@siva/entities'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { apiUrl, WEBSOCKET_URL } from 'apps/expo/app/setup/query/constants'
import { apiRoutes } from 'apps/expo/app/setup/query/routes'
import axios from 'axios'
import { nanoid } from 'nanoid/non-secure'
import { useCallback, useEffect, useRef, useState } from 'react'

export interface Message {
  id: string
  content: string
  type: 'text' | 'media'
  senderId: string
  chatId: string
  createdAt: string
}

interface UseChatProps {
  chatId: string
  userId: string
  sessionToken: string
  apiUrl?: string
}

interface UseChatReturn {
  messages: Array<Message>
  sendMessage: (content: string, type?: 'text' | 'media') => void
  isConnected: boolean
  error: Error | null
}

interface ChatEndpointPayload {
  messages: Array<Message>
  posting: Posting
  users: Array<{ id: string; image: string | null; name: string }>
}

const getMessagesQuery = (chatId: string) => {
  const url = new URL(`${apiUrl}/${apiRoutes.getMessagesByChatId.split(':')[0]}${chatId}`)
  return {
    queryKey: ['chat', chatId],
    queryFn: () =>
      axios.get(url.toString()).then((res) => {
        return res.data
      }),
  }
}

export const useGetMessages = (chatId: string) => {
  const query = getMessagesQuery(chatId)
  return useQuery<ChatEndpointPayload>(query)
}

export const useChat = ({
  chatId,
  userId,
  sessionToken,
  apiUrl = WEBSOCKET_URL,
}: UseChatProps): UseChatReturn => {
  const queryKey = ['chat', chatId]
  const [isConnected, setIsConnected] = useState(false)
  const [error, setError] = useState<Error | null>(null)
  const wsRef = useRef<WebSocket | null>(null)
  const queryClient = useQueryClient()

  const connect = useCallback(() => {
    const url = `${apiUrl}`
    try {
      const ws = new WebSocket(url)
      wsRef.current = ws

      ws.onopen = () => {
        setIsConnected(true)
        setError(null)
        // Join the chat room
        ws.send(
          JSON.stringify({
            action: 'join',
            chatId,
            userId,
          })
        )
      }

      ws.onmessage = (event) => {
        const data = JSON.parse(event.data)
        if (data.type === 'message') {
          queryClient.setQueryData<ChatEndpointPayload>(queryKey, (prev) => {
            if (!prev) return empty
            return { ...prev, messages: [...prev.messages, data.message] }
          })
        }
      }

      ws.onclose = () => {
        setIsConnected(false)
        // Attempt to reconnect after a delay
        setTimeout(connect, 3000)
      }

      ws.onerror = (event) => {
        setError(new Error('WebSocket error occurred'))
        console.error('WebSocket error:', event)
      }
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to connect'))
    }
  }, [apiUrl, sessionToken, chatId, userId])

  const sendMessage = useCallback(
    (content: string, type: 'text' | 'media' = 'text') => {
      if (!wsRef.current || !isConnected) {
        setError(new Error('Not connected to chat'))
        return
      }

      const payload: Message = {
        id: nanoid(),
        createdAt: new Date().toString(),
        chatId,
        content,
        type,
        senderId: userId,
      }

      queryClient.setQueryData<ChatEndpointPayload>(queryKey, (prev) => {
        if (!prev) return empty
        return { ...prev, messages: [...prev.messages, payload] }
      })
      wsRef.current.send(JSON.stringify({ ...payload, action: 'message' }))
    },
    [chatId, userId, isConnected]
  )

  useEffect(() => {
    connect()

    return () => {
      if (wsRef.current) {
        wsRef.current.close()
      }
    }
  }, [connect])

  return {
    messages: queryClient.getQueryData<ChatEndpointPayload['messages']>(queryKey) || [],
    sendMessage,
    isConnected,
    error,
  }
}

const empty = {
  messages: [],
  users: [],
  posting: {
    id: 'b89e5b72-9d28-474d-ace3-44ca21437d97',
    created_at: '',
    posting_id: '',
    duration: 'GIORNALIERO',
    subtitle: null,
    dropoff_location_plain: '',
    pickup_location_plain: '',
    deposit: '',
    price: 1400,
    age_required: 0,
    distance_limit_in_km: '',
    taxes_included: false,
    vehicle_id: '',
    brand: 'Lamborghini',
    model: 'Huracan',
    fuel_type: '',
    year: 0,
    interior_material: null,
    interior_color: null,
    exterior_color: null,
    transmission_type: null,
    vehicle_images: [
      'https://mkvfjhboywoocbqdzilx.supabase.co/storage/v1/object/public/images/kia-sorento-2024-frontal-lateral.369513.webp?t=2024-09-25T16%3A15%3A47.703Z',
    ],
    renter_name: null,
    bookmarked: false,
    vehicle_type: '',
    services: [],
    insurancePolicies: [],
    otherServices: [],
  },
}
