import { NavBar } from '@/components/Navbar'
import { css } from '../../styled-system/css'

export default function Home() {
  return (
    <div className={css({ background: 'light-gray', height: '100vh', width: '100vw' })}>
      <NavBar />
    </div>
  )
}
