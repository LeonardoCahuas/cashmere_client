import Image from 'next/image'
import Link from 'next/link'
import logoSiva from '../../public/siva_logo.svg'
import { Level, PillButton, Variant } from './PillButton'
import { HeartIcon } from './icons/Heart'

export const NavBar = () => {
  const leftTabs = [
    { label: 'Ricerca', url: '/search' },
    { label: 'Noleggia', url: '/rent' },
    { label: 'Auto più noleggiate', url: '/trending' },
  ]

  return (
    <nav className="w-full bg-white h-[80px] flex items-center border border-dark-gray px-[70px] justify-between">
      <div className="flex gap-8 items-center">
        <Image src={logoSiva} alt="Logo Siva" width={60} height={50} />
        {leftTabs.map(({ label, url }) => (
          <Link key={url} href={url} className="text-sm font-medium text-siva-main-text">
            {label}
          </Link>
        ))}
      </div>
      <div className="flex gap-2">
        <PillButton
          label="Preferiti"
          variant={Variant.neutral}
          level={Level.secondary}
          icon={<HeartIcon />}
        />
        <PillButton
          label="Chat"
          variant={Variant.neutral}
          level={Level.secondary}
          icon={<HeartIcon />}
        />
        <PillButton
          label="Inserisci annuncio"
          variant={Variant.success}
          level={Level.secondary}
          icon={<HeartIcon />}
        />
        <PillButton
          label={<HeartIcon />}
          variant={Variant.neutral}
          level={Level.secondary}
          icon={<HeartIcon />}
        />
      </div>
    </nav>
  )
}
