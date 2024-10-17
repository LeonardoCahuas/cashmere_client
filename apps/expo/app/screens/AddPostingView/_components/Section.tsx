import { Colors, Icon, IconName } from '@siva/ui'
import { StyleSheet, Text, View } from 'react-native'

interface SectionProps {
  title: string
  subtitile?: string
  icon?: IconName
  children?: React.ReactNode
}

export const Section = ({ title, subtitile, icon, children }: SectionProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.titleRow}>
          {!!icon && <Icon name={icon} color="#000" width={20} height={20} />}
          <Text style={styles.title}>{title}</Text>
        </View>
        {!!subtitile && <Text style={styles.subtitle}>{subtitile}</Text>}
      </View>
      {children}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    padding: 24,
    backgroundColor: '#fff',
  },
  titleRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: 8,
    width: '100%',
  },
  title: {
    fontSize: 19,
    fontWeight: '600',
  },
  subtitle: {
    fontSize: 13,
    color: Colors.greyPrimary,
    lineHeight: 16,
  },
  headerContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
    paddingBottom: 24,
  },
})
