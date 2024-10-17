import { StyleSheet, Text } from 'react-native'

export const SectionTitle = ({ children }: { children: any }) => {
  return <Text style={styles.text}>{children}</Text>
}

const styles = StyleSheet.create({
  text: {
    fontSize: 14,
    fontWeight: '600',
  },
})
