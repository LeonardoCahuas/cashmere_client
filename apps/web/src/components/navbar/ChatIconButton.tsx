'use client'

import { Level, Variant } from '@/lib/shared-types'
import { HeartIcon } from '.././icons/Heart'
import { PillButton } from './PillButton'

interface ChatIconButtonProps {
  hasUnreadMessages: boolean
}

export function ChatIconButton({ hasUnreadMessages }: ChatIconButtonProps) {
  return (
    <PillButton
      label={hasUnreadMessages ? '3 messaggi non letti' : 'Chat'}
      variant={Variant.neutral}
      level={Level.secondary}
      icon={<HeartIcon />}
    />
  )
}
