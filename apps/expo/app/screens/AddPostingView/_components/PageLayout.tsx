import { Dimensions, Button as PrimaryButton, ScrollView, StyleSheet, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

interface PageLayoutProps {
  children: React.ReactNode
  onButtonPress: () => void
}
export const PageLayout = ({ children, onButtonPress }: PageLayoutProps) => {
  const screenWidth = Dimensions.get('screen').width
  const insets = useSafeAreaInsets()
  const height = Dimensions.get('screen').height - insets.top - insets.bottom - 84

  return (
    <View style={styles.container}>
      <View style={[styles.scrollableArea, { height }]}>
        <ScrollView contentContainerStyle={styles.scrollContainer} contentInset={{ bottom: 120 }}>
          {children}
        </ScrollView>
      </View>
      <View style={styles.fixedButtonsContainer}>
        {/* { width: screenWidth - 48 } */}
        <PrimaryButton
          title="Avanti"
          onPress={() => onButtonPress()}
          {...{ width: screenWidth - 48 }}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  fixedButtonsContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    paddingTop: 8,
    paddingBottom: 40,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  container: {
    width: '100%',
    height: '100%',
  },
  scrollableArea: {
    width: '100%',
  },
  scrollContainer: {
    width: '100%',
  },
})
