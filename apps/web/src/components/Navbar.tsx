import Link from 'next/link'
import { css } from '../../styled-system/css'

export const NavBar = () => {
  const tabs = [
    { label: 'Ricerca', url: '/search' },
    { label: 'Noleggia', url: '/rent' },
    { label: 'Auto più noleggiate', url: '/trending' },
  ]

  return (
    <nav
      className={css({
        width: '100%',
        background: 'white',
        height: '90px',
        display: 'flex',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'dark-gray',
        paddingLeft: '70px',
        paddingRight: '70px',
      })}
    >
      <div className={css({ display: 'flex', gap: 4 })}>
        {tabs.map(({ label, url }) => (
          <Link key={url} href={url} className={css({ fontSize: 14, fontWeight: '500' })}>
            {label}
          </Link>
        ))}
      </div>
    </nav>
  )
}
