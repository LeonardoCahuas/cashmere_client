"use client"

import { useState, useEffect } from "react"
import { format } from "date-fns"
import { Button } from "@/components/Button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/Dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/Form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/Select"
import { Textarea } from "@/components/TextArea"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/Popover"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/Command"
import { Check, ChevronsUpDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { BookingState, type Booking } from "../types/booking"
import { useForm } from "react-hook-form"
import { getMockFonici } from "../lib/data"
import { services, studios } from "@/lib/types"
import { useUser } from "@/hooks/useUser"
import { useBooking } from "@/hooks/useBooking"

const hours = [
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
  "18:00",
  "19:00",
  "20:00",
  "21:00",
  "22:00",
  "23:00",
  "00:00",
  "01:00",
  "02:00",
  "03:00",
  "04:00",
]

interface BookingDialogProps {
  isOpen: boolean
  onClose: () => void
  onSave: (booking: Booking) => void
  booking: Partial<Booking> | null
  onDelete: (id: string) => void
}

export function BookingDialog({ isOpen, onClose, onSave, booking, onDelete }: BookingDialogProps) {
  const [startDate, setStartDate] = useState<Date | undefined>(booking?.start)
  const [endDate, setEndDate] = useState<Date | undefined>(booking?.end)
  const [startTime, setStartTime] = useState<string>("")
  const [endTime, setEndTime] = useState<string>("")
  const [engineers, setEngineers] = useState<any[]>([])
  const [users, setUsers] = useState<any[]>([])
  const [openCombobox, setOpenCombobox] = useState(false)
  const { getEngineers, getUsers } = useUser()
  const { deleteBooking, updateBooking, createBooking } = useBooking()

  useEffect(() => {
    const fetchEngineers = async () => {
      const engns = await getEngineers()
      console.log(engns)
      setEngineers(engns)
    }
    const fetchUsers = async () => {
      const usrs = await getUsers()
      console.log(usrs)
      setUsers(usrs)
    }
    fetchEngineers()
    fetchUsers()
  }, [])

  const fonici = getMockFonici()

  const form = useForm<Booking>({
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
        // Use the date directly without any timezone conversion
        // since we're getting the date object directly from FullCalendar
        const startDate = booking.start instanceof Date ? booking.start : new Date(booking.start)
        setStartTime(format(startDate, "HH:mm"))
      }

      if (booking.end) {
        // Use the date directly without any timezone conversion
        const endDate = booking.end instanceof Date ? booking.end : new Date(booking.end)
        setEndTime(format(endDate, "HH:mm"))
      }
    }
  }, [booking, form])

  const handleSubmit = (data: Booking) => {
    // Combine date and time
    if (startDate && startTime) {
      const [hours, minutes] = startTime.split(":").map(Number)
      // Create a new date object from the startDate
      const start = new Date(startDate)
      // Set the hours and minutes directly
      start.setHours(hours, minutes, 0, 0)
      data.start = start
    }

    if (endDate && endTime) {
      const [hours, minutes] = endTime.split(":").map(Number)
      // Create a new date object from the endDate
      const end = new Date(endDate)
      // Set the hours and minutes directly
      end.setHours(hours, minutes, 0, 0)
      data.end = end
    }

    // If we're editing, include the ID
    if (booking?.id) {
      data.id = booking.id
    }

    // Include isNew flag if present
    if (booking?.isNew) {
      data.isNew = true
    }
    console.log(data)
    console.log({...data, services: data.services.map((s) => s.id), state: BookingState.CONFERMATO})
    onSave({...data, services: data.services.map((s) => s.id), state: BookingState.CONFERMATO})
  }


  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>
            {booking?.userId && !booking?.isNew ? "Modifica Prenotazione" : "Nuova Prenotazione"}
          </DialogTitle>
          <DialogDescription>Inserisci i dettagli della prenotazione</DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="userId"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Cliente</FormLabel>
                    <Popover open={openCombobox} onOpenChange={setOpenCombobox}>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            role="combobox"
                            aria-expanded={openCombobox}
                            className="w-full justify-between"
                          >
                            {field.value
                              ? users.find((user) => user.id === field.value)?.username
                              : "Seleziona cliente"}
                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-full p-0">
                        <Command>
                          <CommandInput placeholder="Cerca cliente..." />
                          <CommandList>
                            <CommandEmpty>Nessun cliente trovato.</CommandEmpty>
                            <CommandGroup>
                              {users.map((user) => (
                                <CommandItem
                                  key={user.id}
                                  value={user.username}
                                  onSelect={() => {
                                    form.setValue("userId", user.id)
                                    setOpenCombobox(false)
                                  }}
                                >
                                  <Check
                                    className={cn(
                                      "mr-2 h-4 w-4",
                                      field.value === user.id ? "opacity-100" : "opacity-0",
                                    )}
                                  />
                                  {user.username}
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          </CommandList>
                        </Command>
                      </PopoverContent>
                    </Popover>
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
                        {engineers.map((en) => {
                          return (
                            <SelectItem key={en.id} value={en.id}>
                              {en.username}
                            </SelectItem>
                          )
                        })}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              rules={{ required: "Seleziona uno studio" }}
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
              <FormItem>
                <FormLabel>Ora inizio</FormLabel>
                <Select onValueChange={setStartTime} defaultValue={startTime}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleziona ora" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {hours.map((hour) => (
                      <SelectItem key={hour} value={hour}>
                        {hour}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormItem>

              <FormItem>
                <FormLabel>Ora fine</FormLabel>
                <Select onValueChange={setEndTime} defaultValue={endTime}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleziona ora" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {hours.map((hour) => (
                      <SelectItem key={hour} value={hour}>
                        {hour}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormItem>
            </div>

            <FormField
              control={form.control}
              name="services"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Servizi</FormLabel>
                  <Select
                    onValueChange={(value) => {
                      // Check if service already exists
                      const exists = field.value.some((service) =>
                        typeof service === "string" ? service === value : service.id === value,
                      )

                      if (!exists) {
                        // Add the new service
                        const serviceToAdd = services.find((s) => s.id === value)
                        field.onChange([...field.value, serviceToAdd || value])
                      }
                    }}
                    value=""
                  >
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
                    {field.value &&
                      field.value.map((service) => {
                        const serviceObj =
                          typeof service === "string"
                            ? services.find((s) => s.id === service)
                            : services.find((s) => s.id === service.id)

                        return serviceObj ? (
                          <div
                            key={serviceObj.id}
                            className="flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs"
                          >
                            {serviceObj.name}
                            <Button
                              variant="ghost"
                              size="sm"
                              className="ml-1 h-4 w-4 p-0"
                              onClick={() => {
                                const newServices = field.value.filter((s) =>
                                  typeof s === "string" ? s !== serviceObj.id : s.id !== serviceObj.id,
                                )
                                field.onChange(newServices)
                              }}
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
              {booking?.id && (
                <Button
                  type="button"
                  variant="destructive"
                  onClick={() => onDelete(booking.id)}
                  className="mr-auto"
                >
                  Elimina
                </Button>
              )}
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

