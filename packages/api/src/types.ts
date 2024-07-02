export interface Message {
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

export interface Bookmark{
  id: string
  created_at: Date
  updated_at: Date
  deleted_at: Date
  user_id: string
  posting_id: string
}
