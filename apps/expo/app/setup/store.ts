import { BottomSheetMethods } from '@gorhom/bottom-sheet/lib/typescript/types'
import { Posting } from '@siva/entities'
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

interface DetailViewState {
  posting: Posting | null
  setPosting: (posting: Posting | null) => void
  isBookmarked: boolean
  setIsBookmarked: (v: boolean) => void
}

interface AppState {
  home: HomeState
  search: SearchState
  saved: SavedState
  messages: MessagesState
  profile: ProfileState
  detailView: DetailViewState
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
    isSearchOpen: false,
    openSearch: () => set((state) => ({ ...state, saved: { ...state.saved, isSearchOpen: true } })),
    closeSearch: () =>
      set((state) => ({ ...state, saved: { ...state.saved, isSearchOpen: false } })),
    searchText: null,
    onSearchTextChange: (v) => set((s) => ({ ...s, saved: { ...s.saved, searchText: v } })),
  },
  messages: {},
  profile: {},
  detailView: {
    posting: null,
    setPosting: (id) => {
      set((state) => ({ ...state, detailView: { ...state.detailView, posting: id } }))
    },
    isBookmarked: false,
    setIsBookmarked: (updated) => {
      set((state) => ({ ...state, detailView: { ...state.detailView, isBookmarked: updated } }))
    },
  },
}))
