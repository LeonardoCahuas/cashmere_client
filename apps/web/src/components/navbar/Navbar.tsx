import { Level, Variant } from '@/lib/shared-types'
import Image from 'next/image'
import logoSiva from '../../../public/siva_logo.svg'
import { HeartIcon } from '../icons/Heart'
import { AccountIcon } from './AccountIcon'
import { ChatIcon } from './ChatIcon'
import { DropDownMenu } from './DropDownMenu'
import { PillButton } from './PillButton'

export const NavBar = () => {
  return (
    <nav className="w-full bg-white h-[80px] flex items-center border border-dark-gray px-[70px] justify-between">
      <div className="flex gap-8 items-center">
        <Image src={logoSiva} alt="Logo Siva" width={60} height={50} />
        <DropDownMenu />
      </div>
      <div className="flex gap-2">
        <PillButton
          label="Preferiti"
          variant={Variant.neutral}
          level={Level.secondary}
          icon={<HeartIcon />}
        />
        <ChatIcon />
        <PillButton
          label="Inserisci annuncio"
          variant={Variant.success}
          level={Level.secondary}
          icon={<HeartIcon />}
        />
        <AccountIcon />
      </div>
    </nav>
  )
}
