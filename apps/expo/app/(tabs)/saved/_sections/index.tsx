import BottomSheet, { BottomSheetBackdrop, BottomSheetView } from '@gorhom/bottom-sheet'
import { useCallback, useRef, useState } from 'react'
import { Button, StyleSheet, Text, View } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'

const Saved = () => {
  const bottomSheetRef = useRef<BottomSheet>(null)
  const [isOpen, setIsOpen] = useState(false)

  const handleSheetChanges = useCallback((index: number) => {
    setIsOpen(index !== -1)
  }, [])

  const toggleBottomSheet = useCallback(() => {
    if (isOpen) {
      bottomSheetRef.current?.close()
    } else {
      bottomSheetRef.current?.expand()
    }
  }, [isOpen])

  const renderBackdrop = useCallback(
    (props) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
        onPress={() => bottomSheetRef.current?.close()}
      />
    ),
    []
  )

  return (
    <GestureHandlerRootView style={styles.container}>
      <View style={styles.content}>
        <Text>Salvati</Text>
        <Button title={isOpen ? 'Close Sheet' : 'Open Sheet'} onPress={toggleBottomSheet} />
      </View>
      <BottomSheet
        ref={bottomSheetRef}
        index={-1}
        snapPoints={['25%', '50%']}
        onChange={handleSheetChanges}
        enablePanDownToClose={true}
        backdropComponent={renderBackdrop}
      >
        <BottomSheetView style={styles.contentContainer}>
          <Text>Awesome 🎉</Text>
        </BottomSheetView>
      </BottomSheet>
    </GestureHandlerRootView>
  )
}

export default Saved

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
  },
})
