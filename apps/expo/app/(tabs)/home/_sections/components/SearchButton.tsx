import { Icon, PrimaryButton } from '@siva/ui'
import { useRouter } from 'expo-router'

export const SearchButton = () => {
  const router = useRouter()

  const handlePress = () => {
    router.push('/home/search')
  }

  return (
    <PrimaryButton icon={<Icon name="search" color="white" />} onPress={handlePress}>
      Avvia la ricerca
    </PrimaryButton>
  )
}
