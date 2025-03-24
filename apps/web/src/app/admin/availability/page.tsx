"use client"

import { useState, useRef } from "react"
import { CalendarIcon, ChevronLeft, ChevronRight } from "lucide-react"
import { Calendar } from "@/components/Calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/Popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/Select"
import { Button } from "@/components/Button"
import { AvailabilityCalendar } from "./components/AvailabilityCalendar"
import { format } from "date-fns"
import { it } from "date-fns/locale"
import { Card, CardContent } from "@/components/Card"

const fonici = [
  { id: "emdi", name: "Emdi" },
  { id: "tizio", name: "Tizio" },
  { id: "caio", name: "Caio" },
  { id: "sempronio", name: "Sempronio" },
]

export default function AvailabilityPage() {
  const [view, setView] = useState<"timeGridDay" | "timeGridWeek">("timeGridDay")
  const [date, setDate] = useState<Date>(new Date())
  const [selectedFonico, setSelectedFonico] = useState<string>("emdi")
  const calendarRef = useRef(null)

  const handleViewChange = (newView: "timeGridDay" | "timeGridWeek") => {
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

  const stats = {
    availability: view === "timeGridDay" ? 13 : 78,
    sessions: view === "timeGridDay" ? 9 : 33,
    holidays: view === "timeGridDay" ? 0 : 12,
  }

  return (
    <div className="h-screen overflow-y-auto bg-white p-4 md:p-6 lg:p-8 py-12">
      <div className="container mx-auto max-w-7xl">
        <div className="mb-6 flex flex-col space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap gap-2">
              <Button
                variant={view === "timeGridDay" ? "secondary" : "outline"}
                className="rounded-md px-4 py-2 text-sm font-medium"
                onClick={() => handleViewChange("timeGridDay")}
              >
                Giorno
              </Button>
              <Button
                variant={view === "timeGridWeek" ? "secondary" : "outline"}
                className="rounded-md px-4 py-2 text-sm font-medium"
                onClick={() => handleViewChange("timeGridWeek")}
              >
                Settimana
              </Button>
              <Button variant="outline" className="rounded-md px-4 py-2 text-sm font-medium" onClick={handleTodayClick}>
                Oggi
              </Button>
            </div>

            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="icon" onClick={handlePrevClick}>
                <ChevronLeft className="h-5 w-5" />
              </Button>
              <h2 className="text-xl font-semibold">{format(date, "MMMM yyyy", { locale: it })}</h2>
              <Button variant="ghost" size="icon" onClick={handleNextClick}>
                <ChevronRight className="h-5 w-5" />
              </Button>
            </div>

            <div className="flex items-center gap-2">
              <Select value={selectedFonico} onValueChange={setSelectedFonico}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Seleziona fonico" />
                </SelectTrigger>
                <SelectContent>
                  {fonici.map((fonico) => (
                    <SelectItem key={fonico.id} value={fonico.id}>
                      {fonico.name}
                    </SelectItem>
                  ))}
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

        <div
          className="rounded-lg bg-white"
          style={{ height: "calc(100vh - 300px)", minHeight: "600px" }}
        >
          <AvailabilityCalendar
            ref={calendarRef}
            view={view}
            onViewChange={handleViewChange}
            selectedFonico={selectedFonico}
          />
        </div>

        <div className="mt-24">
          <h2 className="mb-4 text-xl font-semibold">Panoramica {fonici.find((f) => f.id === selectedFonico)?.name}</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-1">
                  <p className="text-sm text-emerald-500">Disponibilità</p>
                  <p className="text-2xl font-semibold">{stats.availability} ore</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-1">
                  <p className="text-sm text-primary">Totale sessioni</p>
                  <p className="text-2xl font-semibold">{stats.sessions} ore</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-1">
                  <p className="text-sm text-red-500">Ferie</p>
                  <p className="text-2xl font-semibold">{stats.holidays} ore</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

