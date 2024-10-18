import BottomSheet from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheet/BottomSheet'
import { ModalSheet, ModalSheetProps } from 'apps/expo/app/components/ModalSheet/ModalSheet'
import {
  MultiModalSheetProps,
  MultiStepModalSheet,
} from 'apps/expo/app/components/ModalSheet/MultiStepModalSheet'
import { forwardRef } from 'react'

export type DynamicModalProps =
  | { type: 'single'; content: ModalSheetProps }
  | { type: 'multi'; content: MultiModalSheetProps }

export const DynamicModalSheet = forwardRef<BottomSheet, DynamicModalProps>(
  ({ type, content }, ref) => {
    if (type === 'multi') {
      console.log('rendering multi', { type, content })
      return <MultiStepModalSheet ref={ref} {...content} />
    }
    if (type === 'single') {
      console.log('rendering single', { type, content })
      return <ModalSheet ref={ref} {...content} />
    }
    return null
  }
)
