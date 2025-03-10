'use client'

import Link from 'next/link'
import { format, addDays } from 'date-fns'
import { it } from 'date-fns/locale'
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/carousel"
import { Button } from '@/components/Button'
import { BackButton } from '../components/BackButton'
import { BookingSummary } from '../components/BookingSummary'
import { useBookingStore } from '../../../store/booking-store'

export default function DateTimePage() {
    const { selectedDate, setSelectedDate, setTimeRange } = useBookingStore()

    // Genera 7 giorni a partire da oggi
    const dates = Array.from({ length: 30 }, (_, i) => addDays(new Date(), i))

    return (
        <div className="container max-w-3xl py-8">
            <div className="flex justify-between items-center">
                <BackButton href="/book" />
                <BookingSummary />
            </div>
            <div className="mt-6 space-y-8">
                <div>
                    <h1 className="text-3xl font-bold">Quando vuoi venire in studio?</h1>
                    <p className="text-gray-400 font-light mt-2">
                        Seleziona data e ora della sessione
                    </p>
                </div>
                <div>
                    <div className="flex flex-col justify-between items-start w-full mb-4">
                        <h2 className="text-xl font-semibold">Seleziona data</h2>
                        <div className='flex flex-row items-center justify-between w-full'>
                            <p className='font-light'>Selezionato: <span className='font-semibold'> { selectedDate && format(selectedDate, 'd MMMM', { locale: it })} </span></p>
                            <Button variant="ghost" onClick={() => setSelectedDate(new Date())} className='underline px-0'>
                                Torna alla data di oggi
                            </Button>
                        </div>
                    </div>

                    <Carousel className="w-full">
                        <CarouselContent>
                            {dates.map((date) => (
                                <CarouselItem key={date.toISOString()} className="basis-1/4">
                                    <div
                                        className={`
                      p-4 text-center rounded-lg cursor-pointer border
                      ${selectedDate?.toDateString() === date.toDateString()
                                                ? 'border-primary bg-primary/5'
                                                : 'hover:bg-muted/50'}
                    `}
                                        onClick={() => setSelectedDate(date)}
                                    >
                                        <div className="font-semibold">
                                            {format(date, 'd MMMM', { locale: it })}
                                        </div>
                                        <div className="text-sm text-gray-400">
                                            {format(date, 'EEEE', { locale: it })}
                                        </div>
                                    </div>
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                        <CarouselPrevious />
                        <CarouselNext />
                    </Carousel>
                </div>

                <div className="space-y-4">
                    <h2 className="text-xl font-semibold">Seleziona fascia oraria</h2>
                    <p className="text-sm text-gray-400" style={{margin:"0px"}}>Minimo 1 ora</p>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Dalle</label>
                            <select
                                className="w-full p-2 rounded-md border"
                                onChange={(e) => setTimeRange(e.target.value, null)}
                            >
                                <option value="">Seleziona orario</option>
                                {Array.from({ length: 13 }, (_, i) => i + 10).map((hour) => (
                                    <option key={hour} value={`${hour}:00`}>
                                        {`${hour}:00`}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Alle</label>
                            <select
                                className="w-full p-2 rounded-md border"
                                onChange={(e) => setTimeRange(null, e.target.value)}
                            >
                                <option value="">Seleziona orario</option>
                                {Array.from({ length: 13 }, (_, i) => i + 10).map((hour) => (
                                    <option key={hour} value={`${hour}:00`}>
                                        {`${hour}:00`}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>

                <div className="text-sm text-gray-400">
                    Per prenotazioni periodiche o superiori alle 4 ore scrivi su Whatsapp al numero{' '}
                    <a href="tel:3514206294" className="text-primary hover:underline">351 420 6294</a>
                    {' '}oppure su Instagram a questo profilo:{' '}
                    <a
                        href="https://instagram.com/cashmerestudiomilano"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline"
                    >
                        @cashmerestudiomilano
                    </a>
                </div>

                <div className="flex justify-end">
                    <Button
                        size="lg"
                        asChild
                        variant="gradient"
                        className='px-12 py-6'
                    >
                        <Link href="/book/studio">
                            Avanti
                        </Link>
                    </Button>
                </div>
            </div>
        </div>
    )
}
