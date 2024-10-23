import { ModalSheetProps } from 'apps/expo/app/components/ModalSheet/ModalSheet'
import { MultiModalSheetProps } from 'apps/expo/app/components/ModalSheet/MultiStepModalSheet'

export type DynamicModalProps =
  | { type: 'single'; content: ModalSheetProps }
  | { type: 'multi'; content: MultiModalSheetProps }
