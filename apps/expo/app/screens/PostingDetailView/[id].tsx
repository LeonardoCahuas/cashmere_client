import { useLocalSearchParams } from 'expo-router'
import { StyleSheet, Text, View } from 'react-native'
import { useGetPosting } from '../../setup/query/hooks'

const PostingDetailView = () => {
  const { id } = useLocalSearchParams()
  if (!id || typeof id !== 'string') {
    return <Text>No id data</Text>
  }

  const { data: posting, isLoading } = useGetPosting(id)

  if (!isLoading) {
    return <Text>Loading...</Text>
  }

  if (!posting) {
    return <Text>No posting data</Text>
  }

  return (
    <View style={styles.container}>
      <Text>PostingDetailView {id} </Text>
    </View>
  )
}

export default PostingDetailView

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})
