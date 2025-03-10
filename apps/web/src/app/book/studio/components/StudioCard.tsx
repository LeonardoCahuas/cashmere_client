'use client'

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/Button"
import { Studio } from "@/store/booking-store"

interface StudioCardProps {
  id: Studio
  name: string
  description: string
  image: string
  isSelected?: boolean
  isUnavailable?: boolean
  unavailabilityInfo?: {
    occupiedTime: string
    alternativeDates: Array<{
      date: string
      timeRange: string
    }>
  }
  onSelect?: (id: Studio) => void
}

export function StudioCard({
  id,
  name,
  description,
  image,
  isSelected,
  isUnavailable,
  unavailabilityInfo,
  onSelect
}: StudioCardProps) {
  return (
    <div
      className={`
        relative rounded-lg border transition-all
        ${isUnavailable ? 'opacity-80 cursor-default pb-8' : 'cursor-pointer hover:bg-muted/50'}
        ${isSelected && !isUnavailable ? 'border-primary' : 'border-border'}
      `}
      onClick={() => !isUnavailable && onSelect?.(id)}
    >
      <div className="p-6">
        <div className="flex gap-6">
          {/* Checkbox circle */}
          <div className="flex-shrink-0 flex items-center">
            <div 
              className={`
                w-8 h-8 rounded-full border-2 flex items-center justify-center
                ${isSelected && !isUnavailable ? 'bg-primary border-primary text-white' : 'border-gray-300'}
              `}
            >
              {isSelected && !isUnavailable && (
                <svg 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  className="w-5 h-5 stroke-current" 
                  strokeWidth={3}
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              )}
            </div>
          </div>

          {/* Content */}
          <div className="flex-grow">
            <h3 className="text-2xl font-bold">{name}</h3>
            <p className="text-gray-700 mt-1">{description}</p>
            <Button 
              variant="link" 
              className="h-auto p-0 mt-4 underline"
            >
              Scheda tecnica
            </Button>
          </div>

          {/* Image */}
          <div className="flex-shrink-0 w-64 h-40 relative rounded-lg overflow-hidden">
            <Image
              src={image || "/placeholder.svg"}
              alt={name}
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* Unavailability info */}
        {isUnavailable && unavailabilityInfo && (
          <div className="mt-6 space-y-4">
            <p className="text-gray-700">
              Lo {name} è occupato nella fascia oraria e nel giorno da te scelto
              <br />
              {unavailabilityInfo.occupiedTime} <Link 
                href="/book/datetime" 
                className="text-primary underline ml-4"
              >
                Seleziona nuova data
              </Link>
            </p>
            
            <div className="space-y-2">
              
              
              <p className="font-medium">Date libere suggerite</p>
              <div className="flex gap-4">
                {unavailabilityInfo.alternativeDates.map((date, i) => (
                  <div 
                    key={i}
                    className="px-4 py-2 bg-muted rounded-md text-sm"
                  >
                    {date.date} / {date.timeRange}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
