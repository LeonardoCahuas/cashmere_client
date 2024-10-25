import { Colors } from '@siva/ui'
import { StyleSheet, Text, View } from 'react-native'

interface SubsectionProps {
  title: string
  subtitle?: string
  children?: React.ReactNode
}

export const Subsection = ({ title, subtitle, children }: SubsectionProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{title}</Text>
        {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
      </View>
      <View style={styles.list}>{children}</View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    display: 'flex',
  },
  titleContainer: {
    width: '100%',
    display: 'flex',
    gap: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
  },
  subtitle: {
    fontSize: 12,
    color: Colors.textSecondary,
    lineHeight: 18,
  },
  list: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: 24,
    marginTop: 20,
  },
})
