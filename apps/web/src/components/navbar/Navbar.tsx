
import { DropDownMenu } from './DropdownMenu'
import Image from 'next/image'
import logo from '../../../public/cashmere-logo.svg'
import Link from 'next/link'
import { Button } from '../Button'
import { UserIcon } from '../icons/User'
import { AuthDialog } from '../auth/AuthDialog'

interface NavbarVariantsProps {
  variant: 'Home' | 'Book'
}

export const NavbarVariants = ({ variant }: NavbarVariantsProps) => {
  switch (variant) {
    case 'Home':
      return (
        <nav className="w-full bg-white h-[80px] flex flex-row items-center border border-dark-gray justify-between px-32">
          <div className='flex flex-row items-center gap-16'>
            <Link href="/">
              <Image src={logo} alt="Logo Cashmere studio" />
            </Link>
            <DropDownMenu />
          </div>
          <div className='flex flex-row gap-2'>
            <Link href="/book"> <Button variant="gradient" color='black'>Prenota una sessione</Button></Link>
            <AuthDialog/>
          </div>
        </nav>
      )
      case 'Book':
      return (
        <nav className="w-full bg-white h-[80px] flex flex-row items-center border border-dark-gray justify-between px-32">
          <div className='flex flex-row items-center gap-16'>
            <Link href="/">
              <Image src={logo} alt="Logo Cashmere studio" />
            </Link>
          </div>
          <div className='flex flex-row gap-2'>
            <Link href="/book"> <Button variant="outline" color='black'><UserIcon/> Area personale</Button></Link>
          </div>
        </nav>
      )
    default:
      return null
  }
}
