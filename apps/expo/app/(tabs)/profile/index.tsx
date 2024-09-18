import { StyleSheet, View } from 'react-native'
import Profile from './_sections'

export default function Tab() {
  return (
    <View style={styles.container}>
      <Profile />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})
