'use client'

import { forwardRef, useRef, useState, useCallback, useEffect, useImperativeHandle } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import itLocale from '@fullcalendar/core/locales/it'
import { BookingState, CalendarEvent, Booking, DraggedEvent, BookingFormData } from '../types/booking'
import { BookingDialog } from './BookingDialog'
import { BookingInfoTooltip } from './BookingInfoTooltip'
import { ConfirmDialog } from './ConfirmDialog'
import { generateMockBookings } from '../lib/data'
import { format } from 'date-fns'

interface BookingCalendarProps {
  view: "timeGridDay" | "timeGridWeek" | "dayGridMonth"
  selectedStudio: string
  selectedFonico: string
}

export const BookingCalendar = forwardRef<any, BookingCalendarProps>(
  ({ view, selectedStudio, selectedFonico }, ref) => {
    const calendarRef = useRef<any>(null)
    const [bookings, setBookings] = useState<CalendarEvent[]>(generateMockBookings())
    const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null)
    const [isBookingDialogOpen, setIsBookingDialogOpen] = useState(false)
    const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false)
    const [newBookingData, setNewBookingData] = useState<Partial<BookingFormData> | null>(null)
    const [draggedEvent, setDraggedEvent] = useState<DraggedEvent | null>(null)
    const [tooltipEvent, setTooltipEvent] = useState<CalendarEvent | null>(null)
    const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 })

    useImperativeHandle(ref, () => ({
      getApi: () => calendarRef.current?.getApi(),
    }))

    useEffect(() => {
      const api = calendarRef.current?.getApi()
      if (api && api.view.type !== view) {
        setTimeout(() => {
          api.changeView(view)
        }, 0)
      }
    }, [view])

    const filteredEvents = bookings.filter((booking) => {
      if (selectedStudio !== "all" && booking.extendedProps.studioId !== selectedStudio) {
        return false
      }
      if (selectedFonico !== "all" && booking.extendedProps.fonicoId !== selectedFonico) {
        return false
      }
      return true
    })

    const handleEventClick = useCallback((info: any) => {
      setSelectedEvent(info.event.extendedProps as CalendarEvent)
      setIsBookingDialogOpen(true)
    }, [])

    const handleDateSelect = useCallback((selectInfo: any) => {
      const newBooking: Partial<BookingFormData> = {
        start: selectInfo.start,
        end: selectInfo.end,
      }
      setNewBookingData(newBooking)
      setIsBookingDialogOpen(true)
    }, [])

    const handleEventDrop = useCallback((dropInfo: any) => {
      const draggedEvent: DraggedEvent = {
        event: dropInfo.event,
        oldStart: dropInfo.oldEvent.start,
        oldEnd: dropInfo.oldEvent.end,
        newStart: dropInfo.event.start,
        newEnd: dropInfo.event.end,
      }
      setDraggedEvent(draggedEvent)
      setIsConfirmDialogOpen(true)
    }, [])

    const handleEventResize = useCallback((resizeInfo: any) => {
      const draggedEvent: DraggedEvent = {
        event: resizeInfo.event,
        oldStart: resizeInfo.prevEvent.start,
        oldEnd: resizeInfo.prevEvent.end,
        newStart: resizeInfo.event.start,
        newEnd: resizeInfo.event.end,
      }
      setDraggedEvent(draggedEvent)
      setIsConfirmDialogOpen(true)
    }, [])

    const handleEventMouseEnter = useCallback((mouseEnterInfo: any) => {
      const event = mouseEnterInfo.event.extendedProps as CalendarEvent
      setTooltipEvent(event)

      const rect = mouseEnterInfo.el.getBoundingClientRect()
      setTooltipPosition({
        x: rect.right,
        y: rect.top,
      })
    }, [])

    const handleEventMouseLeave = useCallback(() => {
      setTooltipEvent(null)
    }, [])

    const handleSaveBooking = useCallback(
      (bookingData: BookingFormData) => {
        const newEvent: CalendarEvent = {
          id: selectedEvent ? selectedEvent.id : `booking-${Date.now()}`,
          title: `${format(bookingData.start, "HH:mm")} - ${format(bookingData.end, "HH:mm")} ${bookingData.userId}`,
          start: bookingData.start,
          end: bookingData.end,
          backgroundColor: getRandomColor(),
          borderColor: getRandomColor(),
          userId: bookingData.userId,
          fonicoId: bookingData.fonicoId,
          studioId: bookingData.studioId,
          services: bookingData.services,
          notes: bookingData.notes,
          state: BookingState.CONFIRMED,
          extendedProps: {
            ...bookingData,
            id: selectedEvent ? selectedEvent.id : `booking-${Date.now()}`,
            state: BookingState.CONFIRMED,
          },
        }

        setBookings((prevBookings) => {
          if (selectedEvent) {
            return prevBookings.map((booking) => (booking.id === selectedEvent.id ? newEvent : booking))
          } else {
            return [...prevBookings, newEvent]
          }
        })

        setIsBookingDialogOpen(false)
        setSelectedEvent(null)
        setNewBookingData(null)
      },
      [selectedEvent],
    )

    const handleConfirmDrag = useCallback(() => {
      if (draggedEvent) {
        setBookings((prevBookings) =>
          prevBookings.map((booking) =>
            booking.id === draggedEvent.event.id
              ? {
                  ...booking,
                  start: draggedEvent.newStart,
                  end: draggedEvent.newEnd,
                  title: `${format(draggedEvent.newStart, "HH:mm")} - ${format(draggedEvent.newEnd, "HH:mm")} ${booking.userId}`,
                  extendedProps: {
                    ...booking.extendedProps,
                    start: draggedEvent.newStart,
                    end: draggedEvent.newEnd,
                  },
                }
              : booking,
          ),
        )
      }
      setIsConfirmDialogOpen(false)
      setDraggedEvent(null)
    }, [draggedEvent])

    const handleCancelDrag = useCallback(() => {
      if (draggedEvent && draggedEvent.event) {
        draggedEvent.event.setStart(draggedEvent.oldStart)
        draggedEvent.event.setEnd(draggedEvent.oldEnd)
      }
      setIsConfirmDialogOpen(false)
      setDraggedEvent(null)
    }, [draggedEvent])

    const getRandomColor = () => {
      const colors = ["#38bdf8", "#f87171", "#a78bfa", "#4ade80", "#fb923c", "#f472b6"]
      return colors[Math.floor(Math.random() * colors.length)]
    }

    return (
      <>
        <div className="fc-custom-container">
          <FullCalendar
            ref={calendarRef}
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            initialView={view}
            headerToolbar={false}
            locale={itLocale}
            firstDay={1}
            events={filteredEvents}
            editable={true}
            selectable={true}
            selectMirror={true}
            dayMaxEvents={false}
            allDaySlot={false}
            slotMinTime="10:00:00"
            slotMaxTime="28:00:00"
            slotDuration="01:00:00"
            slotLabelInterval="01:00:00"
            slotLabelFormat={{
              hour: '2-digit',
              minute: '2-digit',
              hour12: false,
              meridiem: false
            }}
            scrollTime="10:00:00"
            nowIndicator={true}
            expandRows={true}
            height="auto"
            dayHeaderFormat={{ weekday: 'short', day: 'numeric' }}
            views={{
              timeGridWeek: {
                type: 'timeGrid',
                duration: { days: 7 },
                slotDuration: '01:00:00',
                slotLabelInterval: '01:00:00',
                displayEventTime: true,
                dayHeaderFormat: { weekday: 'short', day: 'numeric' }
              },
              timeGridDay: {
                type: 'timeGrid',
                duration: { days: 1 },
                slotDuration: '01:00:00',
                slotLabelInterval: '01:00:00',
                displayEventTime: true
              },
              dayGridMonth: {
                dayHeaderFormat: { weekday: 'short' },
                fixedWeekCount: false
              }
            }}
            eventContent={(eventInfo) => {
              return (
                <div className="fc-event-main-frame p-1">
                  <div className="fc-event-time font-medium">
                    {format(eventInfo.event.start!, "HH:mm")} - {format(eventInfo.event.end!, "HH:mm")}
                  </div>
                  <div className="fc-event-title-container">
                    <div className="fc-event-title font-medium text-white">{eventInfo.event.extendedProps.userId}</div>
                  </div>
                </div>
              )
            }}
            eventClick={handleEventClick}
            select={handleDateSelect}
            eventDrop={handleEventDrop}
            eventResize={handleEventResize}
            eventMouseEnter={handleEventMouseEnter}
            eventMouseLeave={handleEventMouseLeave}
          />
        </div>

        {tooltipEvent && (
          <BookingInfoTooltip event={tooltipEvent} position={tooltipPosition} onClose={() => setTooltipEvent(null)} />
        )}

        <BookingDialog
          isOpen={isBookingDialogOpen}
          onClose={() => {
            setIsBookingDialogOpen(false)
            setSelectedEvent(null)
            setNewBookingData(null)
          }}
          onSave={handleSaveBooking}
          booking={selectedEvent ? selectedEvent.extendedProps : newBookingData}
        />

        <ConfirmDialog
          isOpen={isConfirmDialogOpen}
          onClose={() => {
            setIsConfirmDialogOpen(false)
            handleCancelDrag()
          }}
          onConfirm={handleConfirmDrag}
          title="Conferma modifica prenotazione"
          description={
            draggedEvent
              ? `Vuoi spostare la prenotazione da ${format(draggedEvent.oldStart, "dd/MM/yyyy HH:mm")} - ${format(draggedEvent.oldEnd, "HH:mm")} a ${format(draggedEvent.newStart, "dd/MM/yyyy HH:mm")} - ${format(draggedEvent.newEnd, "HH:mm")}?`
              : "Vuoi confermare la modifica della prenotazione?"
          }
        />
      </>
    )
  },
)

BookingCalendar.displayName = "BookingCalendar"

