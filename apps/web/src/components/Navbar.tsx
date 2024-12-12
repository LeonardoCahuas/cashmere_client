import Image from 'next/image'
import Link from 'next/link'
import logoSiva from '../../public/siva_logo.svg'
import { css } from '../../styled-system/css'
import { Fill, PillButton, Variant } from './PillButton'
import { HeartIcon } from './icons/Heart'

export const NavBar = () => {
  const leftTabs = [
    { label: 'Ricerca', url: '/search' },
    { label: 'Noleggia', url: '/rent' },
    { label: 'Auto più noleggiate', url: '/trending' },
  ]

  return (
    <nav
      className={css({
        width: '100%',
        background: 'white',
        height: '80px',
        display: 'flex',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'dark-gray',
        paddingLeft: '70px',
        paddingRight: '70px',
        justifyContent: 'space-between',
      })}
    >
      <div className={css({ display: 'flex', gap: 8, alignItems: 'center' })}>
        <Image src={logoSiva} alt="Logo Siva" width={60} height={50} />
        {leftTabs.map(({ label, url }) => (
          <Link key={url} href={url} className={css({ fontSize: 14, fontWeight: '500' })}>
            {label}
          </Link>
        ))}
      </div>
      <div className={css({ display: 'flex', gap: 8 })}>
        <PillButton
          label="Preferiti"
          variant={Variant.neutral}
          fill={Fill.outline}
          icon={<HeartIcon />}
        />
        <PillButton
          label="Chat"
          variant={Variant.neutral}
          fill={Fill.outline}
          icon={<HeartIcon />}
        />
        <PillButton
          label="Inserisci annuncio"
          variant={Variant.success}
          fill={Fill.none}
          icon={<HeartIcon />}
        />
        <PillButton
          label={<HeartIcon />}
          variant={Variant.neutral}
          fill={Fill.outline}
          icon={<HeartIcon />}
        />
      </div>
    </nav>
  )
}
