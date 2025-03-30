"use client"

import { useState, useEffect } from "react"
import { X, Check, ChevronsUpDown } from "lucide-react"
import type { Booking } from "@/types/booking"
import { Button } from "@/components/Button"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/Dialog"
import { Separator } from "@/components/Separator"
import { ScrollArea } from "@/components/ScrollArea"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/Popover"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/Command"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/Select"
import { cn } from "@/lib/utils"
import { services } from "@/lib/types"
import { useUser } from "@/hooks/useUser"

interface ViewBookingDialogProps {
  isOpen: boolean
  onClose: () => void
  booking: Booking | null
  onAccept: () => void
  onReject: () => void
}

export function ViewBookingDialog({ isOpen, onClose, booking, onAccept, onReject }: ViewBookingDialogProps) {
  const [openCombobox, setOpenCombobox] = useState(false)
  const [users, setUsers] = useState<any[]>([])
  const [selectedServices, setSelectedServices] = useState<any[]>([])
  const { getUsers } = useUser()

  useEffect(() => {
    const fetchUsers = async () => {
      const usrs = await getUsers()
      setUsers(usrs)
    }
    fetchUsers()
  }, [])

  useEffect(() => {
    if (booking) {
      // Converti gli ID dei servizi in oggetti servizio
      const serviceObjects = booking.services.map((serviceId) => {
        const service = services.find((s) => s.id === serviceId)
        return service || { id: serviceId, name: serviceId }
      })
      setSelectedServices(serviceObjects)
    }
  }, [booking])

  // Formatta data e ora
  const formatDate = (date: Date | string): string => {
    const d = new Date(date)
    return d.toLocaleDateString("it-IT", { day: "2-digit", month: "2-digit", year: "numeric" })
  }

  const formatTime = (date: Date | string): string => {
    const d = new Date(date)
    return d.toLocaleTimeString("it-IT", { hour: "2-digit", minute: "2-digit" })
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="flex flex-row items-center justify-between">
          
          <DialogTitle className="text-center flex-1">{booking?.user.username}</DialogTitle>
        </DialogHeader>

        {booking && (
          <ScrollArea className="max-h-[70vh]">
            <div className="space-y-6 py-4 pr-4">
              <div>
                <h3 className="text-lg font-semibold mb-2">Data e ora</h3>
                <div className="flex items-center gap-4">
                  <div className="bg-gray-100 rounded-md py-3 px-4 flex-1">
                    <span>{formatDate(booking.start)}</span>
                  </div>
                  <div className="bg-gray-100 rounded-md py-3 px-4 w-24 text-center">
                    <span>{formatTime(booking.start)}</span>
                  </div>
                  <span>-</span>
                  <div className="bg-gray-100 rounded-md py-3 px-4 w-24 text-center">
                    <span>{formatTime(booking.end)}</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">Nome artista</h3>
                <Popover open={openCombobox} onOpenChange={setOpenCombobox}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      aria-expanded={openCombobox}
                      className="w-full justify-between"
                    >
                      {booking.userId
                        ? users.find((user) => user.id === booking.userId)?.username || booking.userId
                        : "Seleziona cliente"}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
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
                                setOpenCombobox(false)
                              }}
                            >
                              <Check
                                className={cn("mr-2 h-4 w-4", booking.userId === user.id ? "opacity-100" : "opacity-0")}
                              />
                              {user.username}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">Servizi</h3>
                <div>
                  <Select value="" disabled>
                    <SelectTrigger>
                      <SelectValue placeholder="Servizi" />
                    </SelectTrigger>
                    <SelectContent>
                      {services.map((service) => 
                      {
                        console.log(service)
                        return(
                        <SelectItem key={service.id} value={service.id}>
                          {service.name}
                        </SelectItem>
                      )})}
                    </SelectContent>
                  </Select>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {selectedServices.map((service) => (
                      <div key={service.id} className="flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs">
                        {service.name.name}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <Separator />

              <DialogFooter className="flex sm:justify-between gap-2 px-0">
                <Button
                  variant="outline"
                  className="flex-1 border-red-500 text-red-500 hover:bg-red-50 hover:text-red-500"
                  onClick={onReject}
                >
                  Rifiuta
                </Button>
                <Button className="flex-1 bg-black text-white hover:bg-gray-800" onClick={onAccept}>
                  Accetta
                </Button>
              </DialogFooter>
            </div>
          </ScrollArea>
        )}
      </DialogContent>
    </Dialog>
  )
}

