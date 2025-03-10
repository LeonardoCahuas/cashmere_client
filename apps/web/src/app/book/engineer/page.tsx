"use client"

import Link from "next/link"
import { Button } from "@/components/Button"
import { BackButton } from "../components/BackButton"
import { BookingSummary } from "../components/BookingSummary"
import { EngineerCard } from "./components/EngineerCard"
import { Engineer, useBookingStore } from "../../../store/booking-store"

interface EngineerCardProps{
    name: Engineer | "Primo fonico disponibile"
    isAvailable: boolean
    unavailabilityInfo?:UnavailabilityInfo
}
interface DateAlternative{
    timeRange:string
    date:string
}
interface UnavailabilityInfo{
    alternativeDates: DateAlternative[]
    message: string
}

const engineers:EngineerCardProps[] = [
  {
    name: "Primo fonico disponibile",
    isAvailable: true,
  },
  {
    name: "Sleza",
    isAvailable: true,
  },
  {
    name: "Tarantino",
    isAvailable: true,
  },
  {
    name: "Rivreck",
    isAvailable: true,
  },
  {
    name: "Nicholas Frey",
    isAvailable: true,
  },
  {
    name: "Emdi",
    isAvailable: false,
    unavailabilityInfo: {
      message: "Emdi non è disponibile nella fascia oraria selezionata.",
      alternativeDates: [
        { date: "Sab 25 Gen", timeRange: "10:00 - 13:00" },
        { date: "Dom 26 Gen", timeRange: "16:00 - 21:00" },
      ],
    },
  },
]

export default function EngineerPage() {
  const { needsEngineer, selectedEngineer, setNeedsEngineer, setSelectedEngineer } = useBookingStore()

  return (
    <div className="container max-w-3xl py-8 pb-32">
      <div className="flex justify-between items-center">
        <BackButton href="/book/studio" />
        <BookingSummary />
      </div>

      <div className="mt-6 space-y-8">
        <div>
          <h1 className="text-3xl font-bold">Desideri avere il fonico per la tua sessione?</h1>
          <p className="text-muted-foreground mt-2">
            Se non ti serve un nostro fonico, seleziona "Voglio solo affittare la sala".
          </p>
        </div>

        <div className="space-y-4">
          <EngineerCard
            name="Desidero il fonico"
            isSelected={needsEngineer}
            onSelect={() => {
              setNeedsEngineer(true)
              setSelectedEngineer(null)
            }}
          />

          <EngineerCard
            name="No, voglio solo affittare la sala"
            isSelected={!needsEngineer}
            onSelect={() => {
              setNeedsEngineer(false)
              setSelectedEngineer(null)
            }}
          />
        </div>

        {needsEngineer && (
          <>
            <div>
              <h2 className="text-xl font-semibold mb-4">Fonici disponibili nella tua fascia oraria</h2>
              <div className="space-y-4">
                {engineers
                  .filter((eng) => eng.isAvailable)
                  .map((eng) => (
                    <EngineerCard
                      key={eng.name}
                      name={eng.name}
                      isSelected={selectedEngineer === eng.name}
                      onSelect={() => setSelectedEngineer(eng.name)}
                    />
                  ))}
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-4">Fonici non disponibili nella tua fascia oraria</h2>
              <div className="space-y-4">
                {engineers
                  .filter((eng) => !eng.isAvailable)
                  .map((eng) => (
                    <EngineerCard
                      key={eng.name}
                      name={eng.name}
                      isUnavailable
                      unavailabilityInfo={eng.unavailabilityInfo}
                    />
                  ))}
              </div>
            </div>
          </>
        )}

        <div className="flex justify-end">
          <Button variant="gradient" size="lg" asChild disabled={needsEngineer && !selectedEngineer}>
            <Link href="/book/contact">Avanti</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

