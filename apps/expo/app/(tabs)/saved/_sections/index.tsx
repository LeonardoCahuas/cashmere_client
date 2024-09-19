import {
  ModalOptions,
  ModalSheet,
  ModalSheetProvider,
  useModalSheetRef,
} from 'apps/expo/app/components/ModalSheet'
import { useCallback, useState } from 'react'
import { Button, StyleSheet, Text, View } from 'react-native'

const Saved = () => {
  const ref = useModalSheetRef()
  const [isOpen, setIsOpen] = useState(false)

  const handleSheetChanges = useCallback((index: number) => {
    setIsOpen(index !== -1)
  }, [])

  const toggleBottomSheet = useCallback(() => {
    if (isOpen) {
      ref.current?.close()
    } else {
      ref.current?.expand()
    }
  }, [isOpen])

  const modalOptions: ModalOptions = {
    title: 'Ordina',
    options: [
      { label: 'Ultimo Salvato', action: () => {} },
      { label: 'Veicoli Scontati', action: () => {} },
    ],
  }

  return (
    <ModalSheetProvider style={styles.container}>
      <View style={styles.content}>
        <Text>Salvati</Text>
        <Button title={isOpen ? 'Close Sheet' : 'Open Sheet'} onPress={toggleBottomSheet} />
      </View>
      <ModalSheet ref={ref} onChange={handleSheetChanges} options={modalOptions} />
    </ModalSheetProvider>
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
