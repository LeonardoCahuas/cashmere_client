import { useLocalSearchParams } from 'expo-router'
import { StyleSheet, Text, View } from 'react-native'

const PostingDetailView = () => {
  const { id } = useLocalSearchParams()

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
