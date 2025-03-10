"use client"

import { useState } from "react"
import { format } from "date-fns"
import { Check, Eye, Calendar, Clock, User, Mic2, Home, ListChecks, FileText, X } from "lucide-react"

import { Button } from "@/components/Button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/Dialog"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/Table"
import { Badge } from "@/components/Badge"
import { ScrollArea } from "@/components/ScrollArea"
import { Separator } from "@/components/Separator"

// Mock BookingState enum since it's from Prisma
enum BookingState {
  PENDING = "PENDING",
  CONFIRMED = "CONFIRMED",
  REJECTED = "REJECTED",
  COMPLETED = "COMPLETED",
  CANCELLED = "CANCELLED",
}

// Mock booking type
interface Booking {
  id: string
  userId: string
  userName: string
  fonicoId: string
  fonicoName: string
  studioId: string
  studioName: string
  start: Date
  end: Date
  services: string[]
  notes?: string
  state: BookingState
}

// Mock data
const bookings: Booking[] = [
  {
    id: "1",
    userId: "user1",
    userName: "Marco Rossi",
    fonicoId: "fonico1",
    fonicoName: "Luigi Verdi",
    studioId: "studio1",
    studioName: "Studio A",
    start: new Date("2024-03-15T10:00:00"),
    end: new Date("2024-03-15T12:00:00"),
    services: ["Registrazione vocale", "Mixaggio"],
    notes: "Cliente abituale, preferisce microfono Neumann U87",
    state: BookingState.PENDING,
  },
  {
    id: "2",
    userId: "user2",
    userName: "Giulia Bianchi",
    fonicoId: "fonico2",
    fonicoName: "Andrea Neri",
    studioId: "studio2",
    studioName: "Studio B",
    start: new Date("2024-03-16T14:00:00"),
    end: new Date("2024-03-16T17:00:00"),
    services: ["Registrazione strumenti", "Mastering"],
    state: BookingState.PENDING,
  },
  {
    id: "3",
    userId: "user3",
    userName: "Paolo Gialli",
    fonicoId: "fonico1",
    fonicoName: "Luigi Verdi",
    studioId: "studio3",
    studioName: "Studio C",
    start: new Date("2024-03-17T09:00:00"),
    end: new Date("2024-03-17T11:30:00"),
    services: ["Registrazione podcast", "Editing audio"],
    notes: "Prima sessione di registrazione",
    state: BookingState.PENDING,
  },
  {
    id: "4",
    userId: "user4",
    userName: "Francesca Blu",
    fonicoId: "fonico3",
    fonicoName: "Maria Rosa",
    studioId: "studio1",
    studioName: "Studio A",
    start: new Date("2024-03-18T13:00:00"),
    end: new Date("2024-03-18T16:00:00"),
    services: ["Registrazione vocale", "Mixaggio", "Mastering"],
    state: BookingState.PENDING,
  },
  {
    id: "5",
    userId: "user5",
    userName: "Alessandro Viola",
    fonicoId: "fonico2",
    fonicoName: "Andrea Neri",
    studioId: "studio2",
    studioName: "Studio B",
    start: new Date("2024-03-19T11:00:00"),
    end: new Date("2024-03-19T14:00:00"),
    services: ["Registrazione strumenti"],
    notes: "Portare batteria acustica",
    state: BookingState.PENDING,
  },
]

export default function ConfirmPage() {
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null)
  const [viewDialogOpen, setViewDialogOpen] = useState(false)
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false)

  const handleConfirm = (booking: Booking) => {
    setSelectedBooking(booking)
    setConfirmDialogOpen(true)
  }

  const handleView = (booking: Booking) => {
    setSelectedBooking(booking)
    setViewDialogOpen(true)
  }

  const confirmBooking = () => {
    // Here you would update the booking state to CONFIRMED
    console.log(`Booking ${selectedBooking?.id} confirmed`)
    setConfirmDialogOpen(false)
  }

  const rejectBooking = () => {
    // Here you would update the booking state to REJECTED
    console.log(`Booking ${selectedBooking?.id} rejected`)
    setViewDialogOpen(false)
  }

  const formatDuration = (start: Date, end: Date) => {
    const durationMs = end.getTime() - start.getTime()
    const hours = Math.floor(durationMs / (1000 * 60 * 60))
    const minutes = Math.floor((durationMs % (1000 * 60 * 60)) / (1000 * 60))
    return `${hours}h ${minutes}m`
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-6">Prenotazioni da Confermare</h1>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <Table>
          <TableCaption>Lista delle prenotazioni in attesa di conferma</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Cliente</TableHead>
              <TableHead className="hidden md:table-cell">Fonico</TableHead>
              <TableHead className="hidden md:table-cell">Studio</TableHead>
              <TableHead>Data</TableHead>
              <TableHead className="hidden sm:table-cell">Durata</TableHead>
              <TableHead className="text-right">Azioni</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {bookings.map((booking) => (
              <TableRow key={booking.id}>
                <TableCell className="font-medium">{booking.userName}</TableCell>
                <TableCell className="hidden md:table-cell">{booking.fonicoName}</TableCell>
                <TableCell className="hidden md:table-cell">{booking.studioName}</TableCell>
                <TableCell>{format(booking.start, "dd/MM/yyyy")}</TableCell>
                <TableCell className="hidden sm:table-cell">{formatDuration(booking.start, booking.end)}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" size="sm" className="h-8 w-8 p-0" onClick={() => handleView(booking)}>
                      <Eye className="h-4 w-4" />
                      <span className="sr-only">Visualizza</span>
                    </Button>
                    <Button variant="default" size="sm" className="h-8 w-8 p-0" onClick={() => handleConfirm(booking)}>
                      <Check className="h-4 w-4" />
                      <span className="sr-only">Conferma</span>
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Confirmation Dialog */}
      <Dialog open={confirmDialogOpen} onOpenChange={setConfirmDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Conferma prenotazione</DialogTitle>
            <DialogDescription>Sei sicuro di voler confermare questa prenotazione?</DialogDescription>
          </DialogHeader>
          <div className="py-4 text-center font-bold text-xl">Conferma conferma ahahaha</div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setConfirmDialogOpen(false)}>
              Annulla
            </Button>
            <Button onClick={confirmBooking}>Conferma</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* View Details Dialog */}
      <Dialog open={viewDialogOpen} onOpenChange={setViewDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Dettagli prenotazione</DialogTitle>
            <DialogDescription>Informazioni complete sulla prenotazione</DialogDescription>
          </DialogHeader>

          {selectedBooking && (
            <ScrollArea className="max-h-[60vh]">
              <div className="space-y-4 py-2 pr-4">
                <div className="flex items-start gap-3">
                  <User className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium">Cliente</p>
                    <p className="text-sm text-muted-foreground">{selectedBooking.userName}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mic2 className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium">Fonico</p>
                    <p className="text-sm text-muted-foreground">{selectedBooking.fonicoName}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Home className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium">Studio</p>
                    <p className="text-sm text-muted-foreground">{selectedBooking.studioName}</p>
                  </div>
                </div>

                <Separator />

                <div className="flex items-start gap-3">
                  <Calendar className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium">Data e orario</p>
                    <p className="text-sm text-muted-foreground">
                      {format(selectedBooking.start, "dd/MM/yyyy")} dalle {format(selectedBooking.start, "HH:mm")} alle{" "}
                      {format(selectedBooking.end, "HH:mm")}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium">Durata</p>
                    <p className="text-sm text-muted-foreground">
                      {formatDuration(selectedBooking.start, selectedBooking.end)}
                    </p>
                  </div>
                </div>

                <Separator />

                <div className="flex items-start gap-3">
                  <ListChecks className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium">Servizi richiesti</p>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {selectedBooking.services.map((service, index) => (
                        <Badge key={index} variant="secondary">
                          {service}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>

                {selectedBooking.notes && (
                  <div className="flex items-start gap-3">
                    <FileText className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium">Note</p>
                      <p className="text-sm text-muted-foreground">{selectedBooking.notes}</p>
                    </div>
                  </div>
                )}
              </div>
            </ScrollArea>
          )}

          <DialogFooter className="flex sm:justify-between gap-2">
            <Button variant="destructive" onClick={rejectBooking} className="sm:flex-1">
              <X className="mr-2 h-4 w-4" />
              Rifiuta
            </Button>
            <Button onClick={confirmBooking} className="sm:flex-1">
              <Check className="mr-2 h-4 w-4" />
              Conferma
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

