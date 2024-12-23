import { useRouter } from 'expo-router'
import { Button } from 'react-native'

export const SearchButton = () => {
  const router = useRouter()

  const handlePress = () => router.push('/home/search')

  return <Button title="Avvia la ricerca" onPress={handlePress}></Button>
}
