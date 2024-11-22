import { BottomSheetMethods } from '@gorhom/bottom-sheet/lib/typescript/types'
import { Posting, Vehicle } from '@siva/entities'
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

interface MessagesState {
  chatModalRef: React.RefObject<ModalSheetRef>
  mediaModalRef: React.RefObject<ModalSheetRef>
  openChatModal: () => void
  closeChatModal: () => void
  openMediaModal: () => void
  closeMediaModal: () => void
  chatName: string
  setChatName: (name: string) => void
  __loadedUser: string
  __setLoadedUser: (id: string) => void
}

interface ProfileState {}

interface DetailViewState {
  posting: Posting | null
  setPosting: (posting: Posting | null) => void
  isBookmarked: boolean
  setIsBookmarked: (v: boolean) => void
}

interface AddState {
  posting: Partial<Posting>
  setPosting: (posting: Partial<Posting>) => void
  setVehicle: (vehicle: Partial<Vehicle>) => void
}

interface AppState {
  home: HomeState
  search: SearchState
  saved: SavedState
  messages: MessagesState
  profile: ProfileState
  detailView: DetailViewState
  add: AddState
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
  messages: {
    chatModalRef: createRef<ModalSheetRef>(),
    openChatModal: () => {
      const state = get()
      state.messages.chatModalRef.current?.expand()
      state.messages.mediaModalRef.current?.close()
    },
    closeChatModal: () => {
      const state = get()
      state.messages.chatModalRef.current?.close()
    },
    mediaModalRef: createRef<ModalSheetRef>(),
    openMediaModal: () => {
      const state = get()
      state.messages.mediaModalRef.current?.expand()
      state.messages.chatModalRef.current?.close()
    },
    closeMediaModal: () => {
      const state = get()
      state.messages.mediaModalRef.current?.close()
    },
    chatName: '',
    setChatName: (name) => set((s) => ({ ...s, messages: { ...s.messages, chatName: name } })),
    __loadedUser: '',
    __setLoadedUser(id) {
      set((s) => ({ ...s, messages: { ...s.messages, __loadedUser: id } }))
    },
  },
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
  add: {
    posting: {
      duration: 'long_term',
      vehicle_type: 'car',
      vehicle_images: [
        'https://mkvfjhboywoocbqdzilx.supabase.co/storage/v1/object/public/images/1.jpg',
      ],
    },
    setPosting: (posting) => {
      set((state) => ({
        ...state,
        add: { ...state.add, posting: { ...state.add.posting, ...posting } },
      }))
    },
    setVehicle: (vehicle) => {
      set((state) => ({
        ...state,
        add: {
          ...state.add,
          posting: { ...state.add.posting, vehicle: { ...state.add.posting.vehicle, ...vehicle } },
        },
      }))
    },
  },
}))
