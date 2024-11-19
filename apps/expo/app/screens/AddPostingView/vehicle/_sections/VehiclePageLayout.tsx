import { StyleSheet, View } from 'react-native'
import { PageLayout } from '../../_components/PageLayout'

interface VehiclePageLayoutProps {
  onButtonPress: () => void
  children: React.ReactNode
}
export const VehiclePageLayout = ({ onButtonPress, children }: VehiclePageLayoutProps) => {
  return (
    <PageLayout onButtonPress={onButtonPress}>
      <View style={styles.container}>{children}</View>
    </PageLayout>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    display: 'flex',
    gap: 6,
  },
})
