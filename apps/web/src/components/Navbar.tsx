import Link from 'next/link'
import { css } from '../../styled-system/css'
import logoSiva from '../../public/siva_logo.svg'
import heartIcon from '../../public/heart.svg'
import chatIcon from '../../public/chat.svg'
import rentIcon from '../../public/rent.svg'
import userIcon from '../../public/user.svg'
import burgerIcon from '../../public/burger.svg'
import Image from 'next/image'

export const NavBar = () => {
  const leftTabs = [
    { label: 'Ricerca', url: '/search' },
    { label: 'Noleggia', url: '/rent' },
    { label: 'Auto più noleggiate', url: '/trending' },
  ]

  // Stile comune per i pulsanti
  const buttonStyle = css({
    display: 'flex',
    alignItems: 'center',
    gap: 2,
    border: '1px solid',
    borderColor:"dark-gray",
    padding: '8px 12px',
    borderRadius: '20px',
    cursor: 'pointer',
    fontSize: "0.8rem"
  });
  const greenButtonStyle = css({
    display: 'flex',
    alignItems: 'center', 
    gap: 2,
    padding: '8px 12px',
    borderRadius: '20px',
    cursor: 'pointer',
    fontSize: "0.8rem",
    backgroundColor: 'light-green',
    color: 'primary-green',
    border: 'none',
  });

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
        justifyContent: 'space-between',
      })}
    >
      <div className={css({ display: 'flex', gap: 8, alignItems:"center" })}>
        <div>
          <Image src={logoSiva} alt="Logo Siva" width={60} height={50} /> 
        </div>
        {leftTabs.map(({ label, url }) => (
          <Link key={url} href={url} className={css({ fontSize: 14, fontWeight: '500' })}>
            {label}
          </Link>
        ))}
      </div>
      <div className={css({ display: 'flex', gap: 8 })}>
        <button className={buttonStyle}>
          <Image src={heartIcon} alt="Preferiti" width={20} height={20} />
          Preferiti
        </button>
        <button className={buttonStyle}>
          <Image src={chatIcon} alt="Chat" width={20} height={20} />
          Chat
        </button>
        <button className={greenButtonStyle}>
          <Image src={rentIcon} alt="Inserisci annuncio" width={20} height={20} />
          Inserisci annuncio
        </button>
        <button className={buttonStyle}>
          <Image src={userIcon} alt="User" width={20} height={20} />
          <Image src={burgerIcon} alt="Menu" width={20} height={20} />
        </button>
      </div>
    </nav>
  )
}