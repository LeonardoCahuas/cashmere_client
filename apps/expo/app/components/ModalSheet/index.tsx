import BottomSheet from '@gorhom/bottom-sheet'
import { useRef } from 'react'
import { GestureHandlerRootView } from 'react-native-gesture-handler'

export const ModalSheetProvider = GestureHandlerRootView

export const useModalSheetRef = () => useRef<BottomSheet>(null)
