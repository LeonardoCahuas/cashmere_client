import { BottomSheetMethods } from '@gorhom/bottom-sheet/lib/typescript/types'
import { createRef } from 'react'
import { create } from 'zustand'

interface HomeState {}

interface SearchState {}

interface SavedState {
  modalRef: React.RefObject<ModalSheetRef>
  openModal: () => void
  closeModal: () => void
  isSearchOpen: boolean
  openSearch: () => void
  closeSearch: () => void
  searchText: string | null
  onSearchTextChange: (value: string) => void
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

export const useAppStore = create<AppState>((set, get) => ({
  home: {},
  search: {},
  saved: {
    modalRef: createRef<ModalSheetRef>(),
    openModal: () => {
      const state = get()
      state.saved.modalRef.current?.expand()
    },
    closeModal: () => {
      const state = get()
      state.saved.modalRef.current?.close()
    },
    isSearchOpen: true,
    openSearch: () => set((state) => ({ ...state, saved: { ...state.saved, isSearchOpen: true } })),
    closeSearch: () =>
      set((state) => ({ ...state, saved: { ...state.saved, isSearchOpen: false } })),
    searchText: null,
    onSearchTextChange: (v) => set((s) => ({ ...s, saved: { ...s.saved, searchText: v } })),
  },
  messages: {},
  profile: {},
}))
