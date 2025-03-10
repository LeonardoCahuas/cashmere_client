"use client"

import { useState } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/Select"
import { Button } from "@/components/Button"
import { BookingCard } from "./components/BookingCard"
import { BookingFilters } from "./components/BookingFilters"
import { bookings, type BookingStatus } from "./data/bookings"
import { NavbarVariants } from "@/components/navbar/Navbar"

export default function DashboardPage() {
  const [filter, setFilter] = useState<BookingStatus>("future")
  const [sortOrder, setSortOrder] = useState<"recent" | "oldest">("recent")

  const filteredBookings = bookings
    .filter((booking) => booking.status === filter)
    .sort((a, b) => {
      if (sortOrder === "recent") {
        return new Date(b.date).getTime() - new Date(a.date).getTime()
      }
      return new Date(a.date).getTime() - new Date(b.date).getTime()
    })

  return (
    <div className="h-screen w-screen flex flex-col">
      <NavbarVariants variant="Home" />
      <div className="flex-1 flex flex-col w-full items-center overflow-y-auto">
      <div className="container py-8 px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-72">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-xl font-semibold">info.trtgraphic@gmail.com</h1>
          <Select defaultValue="altro">
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Altro" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="altro">Altro</SelectItem>
              <SelectItem value="profilo">Profilo</SelectItem>
              <SelectItem value="logout">Logout</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Bookings Section */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">Le tue prenotazioni</h2>
            <Select defaultValue={sortOrder} onValueChange={(value) => setSortOrder(value as "recent" | "oldest")}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Ordina per" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="recent">Più recenti</SelectItem>
                <SelectItem value="oldest">Meno recenti</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <BookingFilters onFilterChange={setFilter} />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredBookings.map((booking) => (
              <BookingCard key={booking.id} booking={booking} />
            ))}
          </div>
        </div>

        {/* Contact Section */}
        <div className="mt-16 space-y-4">
          <h3 className="text-xl font-semibold">Contatta segreteria</h3>
          <Button variant="secondary">Mostra numero</Button>
        </div>
      </div>
    </div>
    </div>
  )
}

