'use client'

import { Level, Variant } from '@/lib/shared-types'
import { HeartIcon } from '../icons/Heart'
import { PillButton } from './PillButton'

interface AccountButtonProps {
  loggedIn: boolean
}

export function AccountIconButton({ loggedIn }: AccountButtonProps) {
  const handleClick = () => {
    if (loggedIn) {
      // logout
    } else {
      // login
    }
  }

  return (
    <PillButton
      label={loggedIn ? 'Account' : 'Accedi'}
      variant={Variant.neutral}
      level={Level.secondary}
      icon={<HeartIcon />}
      onClick={handleClick}
    />
  )
}
