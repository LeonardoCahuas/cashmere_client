'use client'

import { useState, useRef, useEffect } from 'react'
import { CalendarIcon, ChevronLeft, ChevronRight } from 'lucide-react'
import { Calendar } from '@/components/Calendar'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/Select'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/Popover'
import { Button } from '@/components/Button'
import { BookingCalendar } from './components/Calendar'
import { format } from 'date-fns'
import { it } from 'date-fns/locale'

export default function CalendarPage() {
  const [view, setView] = useState<"timeGridDay" | "timeGridWeek" | "dayGridMonth">("timeGridWeek")
  const [selectedStudio, setSelectedStudio] = useState<string>("all")
  const [selectedFonico, setSelectedFonico] = useState<string>("all")
  const [date, setDate] = useState<Date>(new Date())
  const calendarRef = useRef(null)

  const handleViewChange = (newView: "timeGridDay" | "timeGridWeek" | "dayGridMonth") => {
    setView(newView)
  }

  const handleDateSelect = (date: Date | undefined) => {
    if (date) {
      setDate(date)
      if (calendarRef.current) {
        // @ts-ignore - FullCalendar methods
        calendarRef.current.getApi().gotoDate(date)
      }
    }
  }

  const handlePrevClick = () => {
    if (calendarRef.current) {
      // @ts-ignore - FullCalendar methods
      calendarRef.current.getApi().prev()
      // @ts-ignore - FullCalendar methods
      setDate(calendarRef.current.getApi().getDate())
    }
  }

  const handleNextClick = () => {
    if (calendarRef.current) {
      // @ts-ignore - FullCalendar methods
      calendarRef.current.getApi().next()
      // @ts-ignore - FullCalendar methods
      setDate(calendarRef.current.getApi().getDate())
    }
  }

  const handleTodayClick = () => {
    if (calendarRef.current) {
      // @ts-ignore - FullCalendar methods
      calendarRef.current.getApi().today()
      // @ts-ignore - FullCalendar methods
      setDate(calendarRef.current.getApi().getDate())
    }
  }

  return (
    <div className="h-screen bg-white mx-auto overflow-y-auto py-16 sm:p-4 md:p-6 lg:p-8 xl:p-16">
      <div className="container mx-auto max-w-7xl">
        <div className="mb-6 flex flex-col space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap gap-2">
              <Button
                variant={view === "timeGridDay" ? "light_blue" : "gray"}
                className="rounded-md px-4 py-2 text-sm font-medium"
                onClick={() => handleViewChange("timeGridDay")}
              >
                Giorno
              </Button>
              <Button
                variant={view === "timeGridWeek" ? "light_blue" : "gray"}
                className="rounded-md px-4 py-2 text-sm font-medium"
                onClick={() => handleViewChange("timeGridWeek")}
              >
                Settimana
              </Button>
              <Button
                variant={view === "dayGridMonth" ? "light_blue" : "gray"}
                className="rounded-md px-4 py-2 text-sm font-medium"
                onClick={() => handleViewChange("dayGridMonth")}
              >
                Mese
              </Button>
              <Button variant="outline" className="rounded-md px-4 py-2 text-sm font-medium" onClick={handleTodayClick}>
                Oggi
              </Button>
            </div>

            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="icon" onClick={handlePrevClick}>
                <ChevronLeft className="h-5 w-5" />
              </Button>
              <h2 className="text-xl font-semibold">
                {format(date, view === "dayGridMonth" ? "MMMM yyyy" : "MMMM yyyy", { locale: it })}
              </h2>
              <Button variant="ghost" size="icon" onClick={handleNextClick}>
                <ChevronRight className="h-5 w-5" />
              </Button>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <Select value={selectedStudio} onValueChange={setSelectedStudio}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Studio 1" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tutti gli studi</SelectItem>
                  <SelectItem value="studio1">Studio 1</SelectItem>
                  <SelectItem value="studio2">Studio 2</SelectItem>
                  <SelectItem value="studio3">Studio 3</SelectItem>
                  <SelectItem value="studio4">Studio 4</SelectItem>
                </SelectContent>
              </Select>

              <Select value={selectedFonico} onValueChange={setSelectedFonico}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Fonico" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tutti i fonici</SelectItem>
                  <SelectItem value="tizio">Tizio</SelectItem>
                  <SelectItem value="caio">Caio</SelectItem>
                  <SelectItem value="sempronio">Sempronio</SelectItem>
                </SelectContent>
              </Select>

              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" size="icon">
                    <CalendarIcon className="h-5 w-5" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar mode="single" selected={date} onSelect={handleDateSelect} initialFocus />
                </PopoverContent>
              </Popover>
            </div>
          </div>
        </div>

        <div>
          <BookingCalendar
            ref={calendarRef}
            view={view}
            selectedStudio={selectedStudio}
            selectedFonico={selectedFonico}
          />
        </div>
      </div>
    </div>
  )
}

