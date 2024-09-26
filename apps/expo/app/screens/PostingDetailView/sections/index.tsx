import { useGlobalSearchParams, useLocalSearchParams, usePathname } from 'expo-router'
import { StyleSheet, Text, View } from 'react-native'

const PostingDetailView = () => {
  const glob = useGlobalSearchParams()
  const params = useLocalSearchParams()
  const pathname = usePathname()
  console.log({ params, pathname, glob })
  return (
    <View style={styles.container}>
      <Text>PostingDetailView section</Text>
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
