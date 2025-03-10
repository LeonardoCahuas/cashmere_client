import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/Card"
import type { Booking } from "../data/bookings"

interface BookingCardProps {
  booking: Booking
}

export function BookingCard({ booking }: BookingCardProps) {
  return (
    <Link href={`/studio/${booking.studioId}`}>
      <Card className="hover:bg-muted/50 transition-colors">
        <CardContent className="p-0">
          <div className="aspect-video relative overflow-hidden rounded-t-lg">
            <Image
              src={booking.studioImage || "/placeholder.svg"}
              alt={booking.studioName}
              fill
              className="object-cover"
            />
          </div>
          <div className="p-4">
            <h3 className="font-semibold text-lg">{booking.studioName}</h3>
            <p className="text-muted-foreground">{booking.date}</p>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}

