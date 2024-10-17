import { router } from 'expo-router'
import { Text, View } from 'react-native'
import { PageLayout } from '../../_components/PageLayout'

const Services = () => {
  return (
    <PageLayout
      onButtonPress={() => {
        router.push('screens/AddPostingView/posting')
      }}
    >
      <View>
        <Text>Services here</Text>
      </View>
    </PageLayout>
  )
}

export default Services
