export interface PortfolioItem {
  title: string
  artist: string
  imageUrl: string
  tags: string[]
}

export interface CreateBooking {
  userId: string
  fonicoId: string
  studioId: string
  start: Date
  end: Date
  services: string[]
  notes?: string
}

export interface CreateHoliday{
  userId: string
  start: Date
  end: Date
  reason: string
}
export enum BookingState {
  CONTATTARE = "CONTATTARE",
  CONFERMATO = "CONFERMATO",
  CONTATTATO = "CONTATTATO",
  ANNULLATO = "ANNULLATO"
}

export type StateType = "CONTATTARE" | "CONTATTATO" | "ANNULLATO" | "CONFERMATO"

export enum HolidayState {
  CONFERMARE = "CONFERMARE",
  CONFERMATO = "CONFERMATO",
  ANNULLATO = "ANNULLATO"
}

export type HolidayStateType = "CONFERMARE" |  "ANNULLATO" | "CONFERMATO"


export enum HolidayType {
  FERIE = "FERIE",
  PERMESSO = "PERMESSO",
}

export type HolidayTypeType = "FERIE" | "PERMESSO"

