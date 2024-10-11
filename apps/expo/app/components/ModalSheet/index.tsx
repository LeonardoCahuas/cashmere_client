import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetView,
  TouchableOpacity,
} from '@gorhom/bottom-sheet'
import { BottomSheetMethods } from '@gorhom/bottom-sheet/lib/typescript/types'
import { Colors, Icon } from '@siva/ui'
import React, { ReactNode, forwardRef, useCallback, useRef, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'

export const ModalSheetProvider = GestureHandlerRootView

export const useModalSheetRef = () => useRef<BottomSheet>(null)