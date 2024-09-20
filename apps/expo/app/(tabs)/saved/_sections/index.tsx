import { ModalOptions, ModalSheet, ModalSheetProvider } from 'apps/expo/app/components/ModalSheet'
import { useAppStore } from 'apps/expo/app/setup/store'
import { StyleSheet, Text, View } from 'react-native'

const Saved = () => {
  const ref = useAppStore((state) => state.saved.modalRef)
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
        <Text>Salvati {ref.current?.isOpen}</Text>
      </View>
      <ModalSheet ref={ref} onChange={() => {}} options={modalOptions} />
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
