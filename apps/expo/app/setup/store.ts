import { BottomSheetMethods } from '@gorhom/bottom-sheet/lib/typescript/types'
import { createRef } from 'react'
import { create } from 'zustand'

interface HomeState {}

interface SearchState {}

interface SavedState {
  modalRef: React.RefObject<ModalSheetRef>
}

interface ModalSheetRef extends BottomSheetMethods {
  isOpen: boolean
}

interface MessagesState {}

interface ProfileState {}

interface AppState {
  home: HomeState
  search: SearchState
  saved: SavedState
  messages: MessagesState
  profile: ProfileState
}

export const useAppStore = create<AppState>((set) => ({
  home: {},
  search: {},
  saved: {
    modalRef: createRef<ModalSheetRef>(),
  },
  messages: {},
  profile: {},
}))
