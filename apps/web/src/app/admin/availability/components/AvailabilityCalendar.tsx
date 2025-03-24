"use client"

import { forwardRef, useRef, useState, useImperativeHandle, useEffect, useCallback } from "react"
import FullCalendar from "@fullcalendar/react"
import timeGridPlugin from "@fullcalendar/timegrid"
import interactionPlugin from "@fullcalendar/interaction"
import itLocale from "@fullcalendar/core/locales/it"
import { format, addMinutes } from "date-fns"
import { Button } from "@/components/Button"
import { X } from "lucide-react"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/Dialog"

interface AvailabilityCalendarProps {
  view: "timeGridDay" | "timeGridWeek"
  onViewChange: (view: "timeGridDay" | "timeGridWeek") => void
  selectedFonico: string
}

interface Availability {
  id: string
  start: Date
  end: Date
  type: "available" | "booked" | "holiday" | "permission"
  title?: string
  fonicoId: string
}

export const AvailabilityCalendar = forwardRef<any, AvailabilityCalendarProps>(
  ({ view, onViewChange, selectedFonico }, ref) => {
    const calendarRef = useRef<any>(null)
    const [isEditMode, setIsEditMode] = useState(false)
    const [availabilities, setAvailabilities] = useState<Availability[]>([
      // Fonico 1 - Emdi
      {
        id: "default-1",
        start: new Date(new Date().setHours(10, 0, 0, 0)),
        end: new Date(new Date().setHours(22, 0, 0, 0)),
        type: "available",
        title: "Disponibile",
        fonicoId: "emdi",
      },
      {
        id: "booking-1",
        start: new Date(new Date().setHours(15, 0, 0, 0)),
        end: new Date(new Date().setHours(19, 0, 0, 0)),
        type: "booked",
        title: "Skugnizz, Emdi",
        fonicoId: "emdi",
      },
      {
        id: "booking-2",
        start: new Date(new Date().setHours(19, 0, 0, 0)),
        end: new Date(new Date().setHours(21, 0, 0, 0)),
        type: "booked",
        title: "Mambolosco, Emdi",
        fonicoId: "emdi",
      },
      // Fonico 2 - Tizio
      {
        id: "tizio-1",
        start: new Date(new Date().setHours(10, 0, 0, 0)),
        end: new Date(new Date().setHours(18, 0, 0, 0)),
        type: "available",
        title: "Disponibile",
        fonicoId: "tizio",
      },
      {
        id: "tizio-booking-1",
        start: new Date(new Date().setHours(14, 0, 0, 0)),
        end: new Date(new Date().setHours(15, 0, 0, 0)),
        type: "permission",
        title: "Permesso",
        fonicoId: "tizio",
      },
      // Fonico 3 - Caio
      {
        id: "caio-1",
        start: new Date(new Date().setHours(14, 0, 0, 0)),
        end: new Date(new Date().setHours(22, 0, 0, 0)),
        type: "available",
        title: "Disponibile",
        fonicoId: "caio",
      },
      // Aggiungiamo disponibilità per altri giorni della settimana
      // Emdi - Giorno successivo
      {
        id: "emdi-next-day-1",
        start: new Date(new Date(new Date().setDate(new Date().getDate() + 1)).setHours(10, 0, 0, 0)),
        end: new Date(new Date(new Date().setDate(new Date().getDate() + 1)).setHours(16, 0, 0, 0)),
        type: "available",
        title: "Disponibile",
        fonicoId: "emdi",
      },
      // Emdi - Giorno successivo - Prenotazione
      {
        id: "emdi-next-day-booking",
        start: new Date(new Date(new Date().setDate(new Date().getDate() + 1)).setHours(18, 0, 0, 0)),
        end: new Date(new Date(new Date().setDate(new Date().getDate() + 1)).setHours(22, 0, 0, 0)),
        type: "booked",
        title: "Kango, Emdi",
        fonicoId: "emdi",
      },
      // Emdi - Due giorni dopo
      {
        id: "emdi-day-after-tomorrow",
        start: new Date(new Date(new Date().setDate(new Date().getDate() + 2)).setHours(10, 0, 0, 0)),
        end: new Date(new Date(new Date().setDate(new Date().getDate() + 2)).setHours(23, 0, 0, 0)),
        type: "available",
        title: "Disponibile",
        fonicoId: "emdi",
      },
      // Emdi - Tre giorni dopo - Ferie
      {
        id: "emdi-holiday",
        start: new Date(new Date(new Date().setDate(new Date().getDate() + 3)).setHours(10, 0, 0, 0)),
        end: new Date(new Date(new Date().setDate(new Date().getDate() + 3)).setHours(23, 0, 0, 0)),
        type: "holiday",
        title: "Ferie",
        fonicoId: "emdi",
      },
    ])
    const [selectedSlot, setSelectedSlot] = useState<{ start: Date; end: Date } | null>(null)
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const [existingAvailability, setExistingAvailability] = useState<Availability | null>(null)

    // Manteniamo una copia separata delle disponibilità settimanali
    const [weeklyAvailabilities, setWeeklyAvailabilities] = useState<Availability[]>([
      // Esempio di disponibilità settimanali per Emdi
      {
        id: "emdi-mon",
        start: new Date(new Date().setHours(10, 0, 0, 0)),
        end: new Date(new Date().setHours(22, 0, 0, 0)),
        type: "available",
        title: "Disponibile",
        fonicoId: "emdi",
      },
      {
        id: "emdi-tue",
        start: new Date(new Date(new Date().setDate(new Date().getDate() + 1)).setHours(10, 0, 0, 0)),
        end: new Date(new Date(new Date().setDate(new Date().getDate() + 1)).setHours(16, 0, 0, 0)),
        type: "available",
        title: "Disponibile",
        fonicoId: "emdi",
      },
      {
        id: "emdi-wed",
        start: new Date(new Date(new Date().setDate(new Date().getDate() + 2)).setHours(10, 0, 0, 0)),
        end: new Date(new Date(new Date().setDate(new Date().getDate() + 2)).setHours(23, 0, 0, 0)),
        type: "available",
        title: "Disponibile",
        fonicoId: "emdi",
      },
      // Esempio di disponibilità settimanali per Tizio
      {
        id: "tizio-mon",
        start: new Date(new Date().setHours(10, 0, 0, 0)),
        end: new Date(new Date().setHours(18, 0, 0, 0)),
        type: "available",
        title: "Disponibile",
        fonicoId: "tizio",
      },
      // Esempio di disponibilità settimanali per Caio
      {
        id: "caio-mon",
        start: new Date(new Date().setHours(14, 0, 0, 0)),
        end: new Date(new Date().setHours(22, 0, 0, 0)),
        type: "available",
        title: "Disponibile",
        fonicoId: "caio",
      },
    ])

    useImperativeHandle(ref, () => ({
      getApi: () => calendarRef.current?.getApi(),
    }))

    useEffect(() => {
      if (calendarRef.current) {
        const api = calendarRef.current.getApi()
        // Sposta questo aggiornamento in un microtask o dopo il prossimo ciclo di rendering
        queueMicrotask(() => {
          api.changeView(view)
        })
      }
    }, [view])

    const getEventColor = (type: Availability["type"]) => {
      switch (type) {
        case "available":
          return { backgroundColor: "#4ade80", borderColor: "#22c55e" }
        case "booked":
          return { backgroundColor: "#22c55e", borderColor: "#16a34a" }
        case "holiday":
          return { backgroundColor: "#f87171", borderColor: "#ef4444" }
        case "permission":
          return { backgroundColor: "#fbbf24", borderColor: "#f59e0b" }
        default:
          return { backgroundColor: "#e5e7eb", borderColor: "#d1d5db" }
      }
    }

    const handleDateSelect = useCallback(
      (selectInfo: any) => {
        if (!isEditMode) return

        const roundToNearestHour = (date: Date) => {
          const minutes = date.getMinutes()
          const roundedMinutes = Math.round(minutes / 60) * 60
          return addMinutes(date, roundedMinutes - minutes)
        }

        const start = roundToNearestHour(selectInfo.start)
        const end = roundToNearestHour(selectInfo.end)

        // Verifica se esiste già una disponibilità per questo slot
        const existing = weeklyAvailabilities.find(
          (a) =>
            a.fonicoId === selectedFonico && a.start.getTime() === start.getTime() && a.end.getTime() === end.getTime(),
        )

        setSelectedSlot({ start, end })
        setExistingAvailability(existing || null)
        setIsDialogOpen(true)
      },
      [isEditMode, weeklyAvailabilities, selectedFonico],
    )

    const handleAddAvailability = (type: Availability["type"]) => {
      if (!selectedSlot) return

      // Se esiste già una disponibilità per questo slot, la rimuoviamo
      if (existingAvailability) {
        handleRemoveAvailability()
        return
      }

      const newAvailability: Availability = {
        id: `availability-${Date.now()}`,
        start: selectedSlot.start,
        end: selectedSlot.end,
        type,
        title: type === "available" ? "Disponibile" : type === "holiday" ? "Ferie" : "Permesso",
        fonicoId: selectedFonico,
      }

      setWeeklyAvailabilities((prev) => [...prev, newAvailability])
      setIsDialogOpen(false)
      setSelectedSlot(null)
      setExistingAvailability(null)
    }

    const handleRemoveAvailability = () => {
      if (!selectedSlot) return

      setWeeklyAvailabilities((prev) =>
        prev.filter(
          (a) =>
            !(
              a.fonicoId === selectedFonico &&
              a.start.getTime() === selectedSlot.start.getTime() &&
              a.end.getTime() === selectedSlot.end.getTime()
            ),
        ),
      )
      setIsDialogOpen(false)
      setSelectedSlot(null)
      setExistingAvailability(null)
    }

    // Filtra le disponibilità per il fonico selezionato
    // In modalità normale, mostra tutte le disponibilità e prenotazioni
    // In modalità modifica, mostra solo le disponibilità settimanali
    const eventsToDisplay = isEditMode
      ? weeklyAvailabilities.filter((a) => a.fonicoId === selectedFonico)
      : availabilities.filter((a) => a.fonicoId === selectedFonico)

    const handleDeleteEvent = (eventId: string) => {
      setWeeklyAvailabilities((prev) => prev.filter((a) => a.id !== eventId))
    }

    return (
      <>
        <div className="h-full">
          {/* Edit mode overlay button */}
          <div className="right-4 top-4 z-10 py-4">
            <Button variant={isEditMode ? "gradient" : "outline"} onClick={() => setIsEditMode(!isEditMode)}>
              {isEditMode ? "Salva modifiche" : "Modifica disponibilità"}
            </Button>
          </div>

          <div className="h-full overflow-y-hidden">
            <FullCalendar
              ref={calendarRef}
              plugins={[timeGridPlugin, interactionPlugin]}
              initialView={view}
              locale={itLocale}
              headerToolbar={false}
              allDaySlot={false}
              slotMinTime="10:00:00"
              slotMaxTime="28:00:00"
              slotDuration="01:00:00"
              slotLabelInterval="01:00:00"
              selectable={isEditMode}
              selectMirror={true}
              events={eventsToDisplay.map((availability) => ({
                ...availability,
                ...getEventColor(availability.type),
              }))}
              eventContent={(eventInfo) => (
                <div className="h-full w-full p-1 relative">
                  {isEditMode && (
                    <button
                      className="absolute right-1 top-1 rounded-full bg-white/20 p-0.5 text-white hover:bg-white/40"
                      onClick={(e) => {
                        e.stopPropagation()
                        handleDeleteEvent(eventInfo.event.id)
                      }}
                    >
                      <X className="h-3 w-3" />
                    </button>
                  )}
                  <div className="text-xs font-medium text-white">{eventInfo.event.title}</div>
                  <div className="mt-1 text-xs text-white/90">
                    {format(eventInfo.event.start!, "HH:mm")} - {format(eventInfo.event.end!, "HH:mm")}
                  </div>
                </div>
              )}
              select={handleDateSelect}
              selectConstraint={{
                startTime: "10:00:00",
                endTime: "28:00:00",
              }}
              slotLabelFormat={{
                hour: "2-digit",
                minute: "2-digit",
                hour12: false,
              }}
              dayHeaderFormat={{ weekday: "short", day: "2-digit", month: "2-digit" }}
              height="100%"
              editable={isEditMode}
              eventStartEditable={false} // Disable dragging
              eventDurationEditable={isEditMode} // Allow resizing only in edit mode
              eventResize={
                isEditMode
                  ? (info) => {
                      // Update the availability duration when resized
                      setWeeklyAvailabilities((prev) =>
                        prev.map((a) => (a.id === info.event.id ? { ...a, end: info.event.end as Date } : a)),
                      )
                    }
                  : undefined
              }
            />
          </div>
        </div>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Gestisci disponibilità</DialogTitle>
              <DialogDescription>
                {selectedSlot && (
                  <span>
                    Fascia oraria: {format(selectedSlot.start, "HH:mm")} - {format(selectedSlot.end, "HH:mm")}
                  </span>
                )}
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4">
              {existingAvailability ? (
                <Button variant="destructive" onClick={handleRemoveAvailability}>
                  Rimuovi{" "}
                  {existingAvailability.type === "available"
                    ? "disponibilità"
                    : existingAvailability.type === "holiday"
                      ? "ferie"
                      : existingAvailability.type === "permission"
                        ? "permesso"
                        : "prenotazione"}
                </Button>
              ) : (
                <>
                  <Button
                    variant="default"
                    className="bg-emerald-500 hover:bg-emerald-600"
                    onClick={() => handleAddAvailability("available")}
                  >
                    Imposta come disponibile
                  </Button>
                  <Button
                    variant="default"
                    className="bg-yellow-500 hover:bg-yellow-600"
                    onClick={() => handleAddAvailability("permission")}
                  >
                    Imposta come permesso
                  </Button>
                  <Button
                    variant="default"
                    className="bg-red-500 hover:bg-red-600"
                    onClick={() => handleAddAvailability("holiday")}
                  >
                    Imposta come ferie
                  </Button>
                </>
              )}
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Annulla
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </>
    )
  },
)

AvailabilityCalendar.displayName = "AvailabilityCalendar"

