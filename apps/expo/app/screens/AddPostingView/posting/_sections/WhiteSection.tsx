import { StyleSheet, View } from 'react-native'

interface WhiteSectionProps {
  children?: React.ReactNode
}

export const WhiteSection = ({ children }: WhiteSectionProps) => {
  return <View style={styles.container}>{children}</View>
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#fff',
    paddingVertical: 24,
  },
})
