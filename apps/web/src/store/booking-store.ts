import { create } from "zustand"

export type ServiceType = "recording" | "mixing" | null
export type PackageType = "2h-mix" | "2h-mix-beat" | "4h-2mix" | "beat-session" | null
export type Studio = "1" | "2" | "3" | "4"
export type Engineer = "Primo fonico" | "Sleza" | "Tarantino" | "Rivreck" | "Nicholas Frey" | "Emdi"

interface BookingState {
  // Step 1: Services
  selectedServices: ServiceType[]
  selectedPackage: PackageType

  // Step 2: Date & Time
  selectedDate: Date | null
  timeFrom: string | null
  timeTo: string | null

  // Step 3: Studio
  selectedStudio: Studio | null

  // Step 4: Engineer
  needsEngineer: boolean
  selectedEngineer: Engineer | null

  // Step 5: Contact
  instagramUsername: string
  phoneNumber: string
  notes: string

  // Actions
  setSelectedServices: (services: ServiceType[]) => void
  setSelectedPackage: (pkg: PackageType) => void
  setSelectedDate: (date: Date | null) => void
  setTimeRange: (from: string | null, to: string | null) => void
  setSelectedStudio: (studio: Studio | null) => void
  setNeedsEngineer: (needs: boolean) => void
  setSelectedEngineer: (engineer: Engineer | null) => void
  setContactInfo: (instagram: string, phone: string, notes: string) => void
  resetBooking: () => void
}

export const useBookingStore = create<BookingState>((set) => ({
  // Initial state
  selectedServices: [],
  selectedPackage: null,
  selectedDate: null,
  timeFrom: null,
  timeTo: null,
  selectedStudio: null,
  needsEngineer: false,
  selectedEngineer: null,
  instagramUsername: "",
  phoneNumber: "",
  notes: "",

  // Actions
  setSelectedServices: (services) => set({ selectedServices: services }),
  setSelectedPackage: (pkg) => set({ selectedPackage: pkg }),
  setSelectedDate: (date) => set({ selectedDate: date }),
  setTimeRange: (from, to) => set((state) => ({ timeFrom: from ? from : state.timeFrom, timeTo: to ? to : state.timeTo })),
  setSelectedStudio: (studio) => set({ selectedStudio: studio }),
  setNeedsEngineer: (needs) => set({ needsEngineer: needs }),
  setSelectedEngineer: (engineer) => set({ selectedEngineer: engineer }),
  setContactInfo: (instagram, phone, notes) => set({ instagramUsername: instagram, phoneNumber: phone, notes: notes }),
  resetBooking: () =>
    set({
      selectedServices: [],
      selectedPackage: null,
      selectedDate: null,
      timeFrom: null,
      timeTo: null,
      selectedStudio: null,
      needsEngineer: false,
      selectedEngineer: null,
      instagramUsername: "",
      phoneNumber: "",
      notes: "",
    }),
}))

