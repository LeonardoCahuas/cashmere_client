"use client"

import { useState, useEffect } from "react"
import { format } from "date-fns"
import { CalendarIcon, Clock } from "lucide-react"
import { Button } from "@/components/Button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/Dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/Form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/Select"
import { Input } from "@/components/Input"
import { Textarea } from "@/components/TextArea"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/Popover"
import { Calendar } from "@/components/Calendar"
import type { BookingFormData } from "../types/booking"
import { cn } from "@/lib/utils"
import { useForm } from "react-hook-form"
import { getMockUsers, getMockFonici, getMockStudios, getMockServices } from "../lib/data"

interface BookingDialogProps {
  isOpen: boolean
  onClose: () => void
  onSave: (booking: BookingFormData) => void
  booking: Partial<BookingFormData> | null
}

export function BookingDialog({ isOpen, onClose, onSave, booking }: BookingDialogProps) {
  const [startDate, setStartDate] = useState<Date | undefined>(booking?.start)
  const [endDate, setEndDate] = useState<Date | undefined>(booking?.end)
  const [startTime, setStartTime] = useState<string>("")
  const [endTime, setEndTime] = useState<string>("")

  const users = getMockUsers()
  const fonici = getMockFonici()
  const studios = getMockStudios()
  const services = getMockServices()

  const form = useForm<BookingFormData>({
    defaultValues: {
      userId: booking?.userId || "",
      fonicoId: booking?.fonicoId || "",
      studioId: booking?.studioId || "",
      services: booking?.services || [],
      notes: booking?.notes || "",
      start: booking?.start || new Date(),
      end: booking?.end || new Date(),
    },
  })

  useEffect(() => {
    if (booking) {
      form.reset({
        userId: booking.userId || "",
        fonicoId: booking.fonicoId || "",
        studioId: booking.studioId || "",
        services: booking.services || [],
        notes: booking.notes || "",
        start: booking.start || new Date(),
        end: booking.end || new Date(),
      })

      setStartDate(booking.start)
      setEndDate(booking.end)

      if (booking.start) {
        setStartTime(format(booking.start, "HH:mm"))
      }

      if (booking.end) {
        setEndTime(format(booking.end, "HH:mm"))
      }
    }
  }, [booking, form])

  const handleSubmit = (data: BookingFormData) => {
    // Combine date and time
    if (startDate && startTime) {
      const [hours, minutes] = startTime.split(":").map(Number)
      const start = new Date(startDate)
      start.setHours(hours, minutes)
      data.start = start
    }

    if (endDate && endTime) {
      const [hours, minutes] = endTime.split(":").map(Number)
      const end = new Date(endDate)
      end.setHours(hours, minutes)
      data.end = end
    }

    onSave(data)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{booking?.userId ? "Modifica Prenotazione" : "Nuova Prenotazione"}</DialogTitle>
          <DialogDescription>Inserisci i dettagli della prenotazione</DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="userId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Cliente</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Seleziona cliente" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {users.map((user) => (
                          <SelectItem key={user.id} value={user.id}>
                            {user.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="fonicoId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Fonico</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Seleziona fonico" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {fonici.map((fonico) => (
                          <SelectItem key={fonico.id} value={fonico.id}>
                            {fonico.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="studioId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Studio</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleziona studio" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {studios.map((studio) => (
                        <SelectItem key={studio.id} value={studio.id}>
                          {studio.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <FormLabel>Data inizio</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !startDate && "text-muted-foreground",
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {startDate ? format(startDate, "dd/MM/yyyy") : "Seleziona data"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar mode="single" selected={startDate} onSelect={setStartDate} initialFocus />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="space-y-2">
                <FormLabel>Ora inizio</FormLabel>
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <Input
                    type="time"
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                    className="flex-1"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <FormLabel>Data fine</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn("w-full justify-start text-left font-normal", !endDate && "text-muted-foreground")}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {endDate ? format(endDate, "dd/MM/yyyy") : "Seleziona data"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar mode="single" selected={endDate} onSelect={setEndDate} initialFocus />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="space-y-2">
                <FormLabel>Ora fine</FormLabel>
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <Input type="time" value={endTime} onChange={(e) => setEndTime(e.target.value)} className="flex-1" />
                </div>
              </div>
            </div>

            <FormField
              control={form.control}
              name="services"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Servizi</FormLabel>
                  <Select onValueChange={(value) => field.onChange([...field.value, value])} value="">
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Aggiungi servizi" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {services.map((service) => (
                        <SelectItem key={service.id} value={service.id}>
                          {service.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {field.value.map((serviceId) => {
                      const service = services.find((s) => s.id === serviceId)
                      return service ? (
                        <div key={serviceId} className="flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs">
                          {service.name}
                          <Button
                            variant="ghost"
                            size="sm"
                            className="ml-1 h-4 w-4 p-0"
                            onClick={() => field.onChange(field.value.filter((id) => id !== serviceId))}
                          >
                            ×
                          </Button>
                        </div>
                      ) : null
                    })}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Note</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Inserisci eventuali note" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button type="button" variant="outline" onClick={onClose}>
                Annulla
              </Button>
              <Button type="submit">Salva</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

