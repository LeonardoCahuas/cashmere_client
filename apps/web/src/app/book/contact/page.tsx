"use client"
import { Instagram, Phone } from "lucide-react"
import { Button } from "@/components/Button"
import { Textarea } from "@/components/TextArea"
import { Input } from "@/components/Input"
import { BackButton } from "../components/BackButton"
import { BookingSummary, SummaryContent } from "../components/BookingSummary"
import { useBookingStore } from "../../../store/booking-store"
import type React from "react"
import Link from "next/link"
import { BookButton } from "../components/BookButton"
import { BookingCreateRequest } from "@/types/booking"
import { useAuth } from "@/hooks/useAuth"
import { useUserStore } from "@/store/user-store"
import { useBooking } from "@/hooks/useBooking"

function combineDateAndTime(date: Date, time: string): Date {
    const [hours, minutes] = time.split(":").map(Number);
    const result = new Date(date);
    result.setHours(hours, minutes, 0, 0);
    return result;
}

export default function ContactPage() {
    const { instagramUsername, phoneNumber, notes, setContactInfo, selectedEngineer, selectedStudio, selectedServices, selectedDate, timeTo, timeFrom, selectedPackage  } = useBookingStore()
    const { user } = useUserStore()  
    const { createBooking} = useBooking()

    const handleSubmit = (e: React.FormEvent) => {
        console.log(timeFrom)
        console.log(timeTo)
        const booking: BookingCreateRequest = {
            userId: user.id || '',             
            fonicoId: 'cm6ds8hq80000w6d2y9ttjh7x',
            studioId: selectedStudio,
            start: combineDateAndTime(selectedDate, timeFrom),
            end: combineDateAndTime(selectedDate, timeTo),
            services: selectedPackage ? [...selectedServices, selectedPackage] : selectedServices,
            notes:'note'
        }
        console.log(booking)
        e.preventDefault()
        const res = createBooking(booking)
    }

    return (
        <div className="container max-w-3xl py-8 pb-32">
            <div className="flex justify-between items-center">
                <BackButton href="/book/engineer" />
            </div>

            <div className="mt-6 space-y-8">
                <div>
                    <h1 className="text-3xl font-bold">L'ultimo step!</h1>
                    <p className="text-gray-400 mt-2">Inserisci i tuoi contatti</p>
                    <p className="text-gray-400 mt-1">Ci serviranno per confermare la sessione.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Nome utente di Instagram</label>
                            <div className="relative">
                                <Instagram className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                                <Input
                                    placeholder="@nomeutente"
                                    className="pl-10"
                                    value={instagramUsername}
                                    onChange={(e) => setContactInfo(e.target.value, phoneNumber, notes)}
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium">Numero di telefono</label>
                            <div className="relative">
                                <Phone className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                                <Input
                                    type="tel"
                                    placeholder="Numero di telefono"
                                    className="pl-10"
                                    value={phoneNumber}
                                    onChange={(e) => setContactInfo(instagramUsername, e.target.value, notes)}
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium">
                                Note sulla sessione <span className="text-gray-400">(facoltativo)</span>
                            </label>
                            <Textarea
                                placeholder="Es. Indicazione per il fonico, preferenze sul microfono, dettagli vari..."
                                className="min-h-[100px]"
                                value={notes}
                                onChange={(e) => setContactInfo(instagramUsername, phoneNumber, e.target.value)}
                            />
                        </div>
                    </div>
                    <div>
                        <h6 className="font-bold mb-4">Riepilogo prenotazione</h6>
                        <SummaryContent />
                    </div>
                    <div className="flex flex-col items-end">
                        <BookButton/>
                    </div>
                </form>
            </div>
        </div>
    )
}

