"use client"

import { useState } from "react"
import { Button  } from "@/components/Button"
import type { BookingStatus } from "../data/bookings"

interface BookingFiltersProps {
  onFilterChange: (status: BookingStatus) => void
}

export function BookingFilters({ onFilterChange }: BookingFiltersProps) {
  const [activeFilter, setActiveFilter] = useState<BookingStatus>("future")

  const handleFilterClick = (status: BookingStatus) => {
    setActiveFilter(status)
    onFilterChange(status)
  }

  return (
    <div className="flex gap-2">
      <Button variant={activeFilter === "future" ? "default" : "outline"} onClick={() => handleFilterClick("future")}>
        Future
      </Button>
      <Button variant={activeFilter === "pending" ? "default" : "outline"} onClick={() => handleFilterClick("pending")}>
        In attesa di conferma
      </Button>
      <Button
        variant={activeFilter === "completed" ? "default" : "outline"}
        onClick={() => handleFilterClick("completed")}
      >
        Completate
      </Button>
    </div>
  )
}

