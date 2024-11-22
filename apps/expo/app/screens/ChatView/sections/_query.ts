import { apiUrl, WEBSOCKET_URL } from 'apps/expo/app/setup/query/constants'
import { apiRoutes } from 'apps/expo/app/setup/query/routes'
import axios from 'axios'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useQuery } from 'react-query'

export const useChatMessages = (chatId: string) => {
  const url = `${apiUrl}/${apiRoutes.getMessagesByChatId.split(':')[0]}${chatId}`
  return useQuery({
    queryKey: ['chat', chatId],
    queryFn: () => axios.get(url).then((res) => res.data),
  })
}

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

export const useChat = ({ chatId, userId, sessionToken, apiUrl = WEBSOCKET_URL }: UseChatProps) => {
  const [messages, setMessages] = useState<Message[]>([])
  const [isConnected, setIsConnected] = useState(false)
  const [error, setError] = useState<Error | null>(null)
  const wsRef = useRef<WebSocket | null>(null)

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
          setMessages((prev) => [...prev, data.message])
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

      wsRef.current.send(
        JSON.stringify({
          action: 'message',
          chatId,
          content,
          type,
          senderId: userId,
        })
      )
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
    messages,
    sendMessage,
    isConnected,
    error,
  }
}
