"use client"

import Link from "next/link"
import { Button } from "@/components/Button"
import { RadioGroup, RadioGroupItem } from "@/components/RadioGroup"
import { Label } from "@/components/Label"
import ServiceCard from "./components/ServiceCard"
import { useBookingStore, type ServiceType, type PackageType } from "../../store/booking-store"
import Image from "next/image"
import { useState } from "react"
import { useRouter } from "next/navigation"

export default function BookingPage() {
    const [services, setServices] = useState<Array<"recording" | "mixing">>([])
    const { selectedServices, selectedPackage, setSelectedServices, setSelectedPackage } = useBookingStore()
    const router = useRouter()

    const toggleService = (service: ServiceType) => {
        if (!service) return
        const newServices = services.includes(service)
            ? services.filter((s) => s !== service)
            : [...services, service]

        setServices(newServices)
        console.log(newServices)
        setSelectedPackage(null)
    }

    const handlePackageSelect = (pkg: PackageType) => {
        setSelectedPackage(pkg)
        setSelectedServices([])
    }

    const canProceed = services.length > 0 || selectedPackage !== null

    const handleBookingRequest = () => {
        setSelectedServices(services)
        router.push("/book/datetime")
    }

    return (
        <div className="container max-w-3xl py-8 pb-32">
            <Link href="/" className="text-sm text-black underline">
                Torna alla home
            </Link>

            <div className="mt-6 space-y-8">
                <div>
                    <h1 className="text-3xl font-bold">Prenota una sessione</h1>
                    <p className="text-gray-400 mt-2">Organizza la tua sessione in modo semplice e veloce</p>
                </div>
                <div>
                    <h2 className="text-2xl font-semibold mb-4">Di quali servizi hai bisogno?</h2>
                    <p className="text-gray-400 mb-6">Seleziona uno o più servizi oppure scegli tra i pacchetti.</p>

                    <div className="space-y-4">
                        <ServiceCard
                            title="Registrazione"
                            description="La fase di registrazione è quella in cui l'artista viene al microfono e registra le sue parti vocali."
                            selected={services.includes("recording")}
                            onSelect={() => toggleService("recording")}
                            imageUrl="/Microfono.svg"
                        />

                        <ServiceCard
                            imageUrl="/Mix & Master.svg"
                            title="Mix & Master"
                            description="Il Mix & Master è il processo finale di lavorazione sul beat e sulla voce, che serve a far suonare in modo professionale una canzone."
                            selected={services.includes("mixing")}
                            onSelect={() => toggleService("mixing")}
                        />
                    </div>
                </div>
                <div className="bg-gray-100 p-6 rounded-lg">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-1/6 aspect-square p-8">
                            <Image
                                src={"/Pacchetti.svg"}
                                alt={"Pacchetti"}
                                width={200}
                                height={200}
                                className="object-square object-cover transition-transform duration-300 hover:scale-105 rounded-md"
                            />
                        </div>
                        <div>
                            <h3 className="font-semibold">Pacchetti</h3>
                            <p className="text-sm text-gray-400">Scegli tra i nostri pacchetti di servizi musicali</p>
                        </div>
                    </div>
                    <div className="px-8 pb-8">
                        <h4 className="mb-4">Seleziona pacchetto</h4>
                        <RadioGroup
                            value={selectedPackage || ""}
                            onValueChange={(value) => handlePackageSelect(value as PackageType)}
                            className="grid grid-cols-1 md:grid-cols-2 gap-4"
                        >
                            {[
                                { id: "2h-mix", label: "2h + Mix & Master" },
                                { id: "2h-mix-beat", label: "2h + Mix & Master + Beat" },
                                { id: "4h-2mix", label: "4h + 2 Mix & Master" },
                                { id: "beat-session", label: "Beat in session" },
                            ].map((pkg) => (
                                <div key={pkg.id} className="flex items-center space-x-2">
                                    <RadioGroupItem value={pkg.id} id={pkg.id} />
                                    <Label htmlFor={pkg.id}>{pkg.label}</Label>
                                </div>
                            ))}
                        </RadioGroup>
                    </div>
                </div>
            </div>
            <div className="flex flex-col py-8 items-end">
                <Button disabled={!canProceed} variant="gradient" className='px-12 py-6' onClick={handleBookingRequest}>
                    Avanti
                </Button>
            </div>
        </div>
    )
}