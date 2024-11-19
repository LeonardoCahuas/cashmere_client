import { StyleSheet, Text, View } from 'react-native'

export const PowerContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Potenza</Text>
      <View style={styles.childrenContainer}>{children}</View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    display: 'flex',
    gap: 12,
  },
  title: {
    fontSize: 14,
    fontWeight: '600',
    paddingLeft: 2,
  },
  childrenContainer: {
    width: '100%',
    display: 'flex',
    gap: 12,
  },
})
