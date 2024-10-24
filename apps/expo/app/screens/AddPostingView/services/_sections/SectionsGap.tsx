import { StyleSheet, View } from 'react-native'

export const SectionsGap = ({ children }: { children?: React.ReactNode }) => {
  return <View style={styles.gap}>{children}</View>
}

const styles = StyleSheet.create({
  gap: {
    width: '100%',
    display: 'flex',
    gap: 6,
    flexDirection: 'column',
  },
})
