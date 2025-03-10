"use client"

import Link from "next/link"
import { Button } from "@/components/Button"
import { BackButton } from "../components/BackButton"
import { BookingSummary } from "../components/BookingSummary"
import { StudioCard } from "./components/StudioCard"
import { Studio, useBookingStore } from "../../../store/booking-store"

interface DateAlternative{
    timeRange:string
    date:string
}
interface UnavailabilityInfo{
    alternativeDates: DateAlternative[]
    occupiedTime: string
}

interface StudioCardProps {
    id: Studio
    name:string
    description:string
    image:string
    isAvailable:boolean
    unavailabilityInfo?: UnavailabilityInfo
}

const studios: StudioCardProps[] = [
  {
    id: "1",
    name: "Studio 1",
    description: "Il nostro studio di punta.",
    image: "/Studio 1/1.jpg",
    isAvailable: true,
  },
  {
    id: "2",
    name: "Studio 2",
    description: "Garantisce registrazioni di massima qualità.",
    image: "/Studio 2/1.jpg",
    isAvailable: true,
  },
  {
    id: "3",
    name: "Studio 3",
    description: "Studio ideale per momenti creativi.",
    image: "/Studio 3/1.jpg",
    isAvailable: true,
  },
  {
    id: "4",
    name: "Studio 4",
    description: "Descrizione",
    image: "/Studio 3/1.jpg",
    isAvailable: false,
    unavailabilityInfo: {
      occupiedTime: "Sab 25 Gen / 16:00 - 19:00",
      alternativeDates: [
        { date: "Sab 25 Gen", timeRange: "10:00 - 13:00" },
        { date: "Dom 26 Gen", timeRange: "16:00 - 21:00" },
      ],
    },
  },
]

export default function StudioPage() {
  const { selectedStudio, setSelectedStudio } = useBookingStore()

  return (
    <div className="container max-w-3xl py-8 pb-32">
      <div className="flex justify-between items-center">
        <BackButton href="/book/datetime" />
        <BookingSummary />
      </div>

      <div className="mt-6 space-y-8">
        <div>
          <h1 className="text-3xl font-bold">Quale sala vuoi affittare?</h1>
          <p className="text-muted-foreground mt-2">Seleziona la sala che desideri.</p>
        </div>

        {/* Available Studios */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Studi disponibili nella tua fascia oraria</h2>
          <div className="space-y-4">
            {studios
              .filter((studio) => studio.isAvailable)
              .map((studio) => (
                <StudioCard
                  key={studio.id}
                  id={studio.id}
                  name={studio.name}
                  description={studio.description}
                  image={studio.image}
                  isSelected={selectedStudio === studio.id}
                  onSelect={setSelectedStudio}
                />
              ))}
          </div>
        </div>

        {/* Unavailable Studios */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Studi non disponibili nella tua fascia oraria</h2>
          <div className="space-y-4">
            {studios
              .filter((studio) => !studio.isAvailable)
              .map((studio) => (
                <StudioCard
                  key={studio.id}
                  id={studio.id}
                  name={studio.name}
                  description={studio.description}
                  image={studio.image}
                  isUnavailable
                  unavailabilityInfo={studio.unavailabilityInfo}
                />
              ))}
          </div>
        </div>

        <div className="flex justify-end">
          <Button 
            size="lg" 
            asChild
            variant="gradient"
            className='px-12 py-6'
          >
            <Link href="/book/engineer">
              Avanti
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

