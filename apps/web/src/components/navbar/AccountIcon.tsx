import { AccountIconButton } from './AccountIconButton'

async function getUser() {
  // const response = await fetch('YOUR_API_ENDPOINT/user', {
  //   cache: 'no-store',
  // })

  // if (!response.ok) {
  //   return []
  // }

  // return response.json() as Promise<{ id: string } | null>

  return new Promise<{ id: string } | null>((resolve) => {
    setTimeout(() => {
      resolve({ id: '1' })
    }, 2000)
  })
}

export async function AccountIcon() {
  const user = await getUser()

  return <AccountIconButton loggedIn={!user} />
}
