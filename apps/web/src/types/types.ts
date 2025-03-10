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