'use client'

import { Button } from "@/components/Button"
import { CardContent, Card } from "@/components/Card"
import { Badge } from "@/components/Badge"
import { Calendar, Phone, Music } from 'lucide-react'
import Image from "next/image"
import { NavbarVariants } from "@/components/navbar/Navbar"
import { useState, useEffect } from 'react'

// Define TypeScript interfaces
interface Studio {
  id: number
  name: string
  status: 'free' | 'occupied'
  currentBooking?: {
    artist: string
    timeSlot: string
    phone: string
    engineer: string
  }
}

interface Engineer {
  id: number
  name: string
}

interface TimeSlot {
  start: string
  end: string
}

interface AvailabilityDay {
  date: string
  slots: TimeSlot[]
  isUnavailable?: boolean
}

export default function CurrentPage() {
  const [studios, setStudios] = useState<Studio[]>([])
  const [engineers, setEngineers] = useState<Engineer[]>([])
  const [availability, setAvailability] = useState<AvailabilityDay[]>([])
  const [selectedStudio, setSelectedStudio] = useState<number | null>(null)
  const [selectedEngineer, setSelectedEngineer] = useState<number | null>(null)

  useEffect(() => {
    // Replace these with actual API calls
    const fetchStudios = async () => {
      // const response = await fetch('/api/studios')
      // const data = await response.json()
      // setStudios(data)
      
      // Temporary mock data
      setStudios([
        {
          id: 1,
          name: 'Studio 1',
          status: 'free'
        },
        {
          id: 2,
          name: 'Studio 2',
          status: 'occupied',
          currentBooking: {
            artist: 'skugnizz',
            timeSlot: '15:00 - 18:00',
            phone: '366 400 7807',
            engineer: 'Emdi'
          }
        }
        // ... add other studios
      ])
    }

    const fetchEngineers = async () => {
      // const response = await fetch('/api/engineers')
      // const data = await response.json()
      // setEngineers(data)
      
      setEngineers([
        { id: 1, name: 'Tarantino' },
        { id: 2, name: 'Emdi' },
        { id: 3, name: 'Rivreck' }
        // ... add other engineers
      ])
    }

    fetchStudios()
    fetchEngineers()
  }, [])

  useEffect(() => {
    const fetchAvailability = async () => {
      if (!selectedStudio || !selectedEngineer) return
      
      // Replace with actual API call
      // const response = await fetch(`/api/availability?studio=${selectedStudio}&engineer=${selectedEngineer}`)
      // const data = await response.json()
      // setAvailability(data)
    }

    fetchAvailability()
  }, [selectedStudio, selectedEngineer])

  const renderStudioCard = (studio: Studio) => (
    <Card className="border" key={studio.id}>
      <CardContent className="p-4">
        <div className="flex justify-between items-center mb-4 border-b pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-md overflow-hidden">
              <Image 
                src={`/studios/${studio.id}.jpg`}
                width={40} 
                height={40} 
                alt={studio.name}
                className="object-cover"
              />
            </div>
            <span className="font-bold text-lg">{studio.name}</span>
          </div>
          <Badge 
            className={studio.status === 'free' ? 
              'bg-green-500 text-white hover:bg-green-600' : 
              'bg-red-500 text-white hover:bg-red-600'
            }
          >
            {studio.status === 'free' ? 'Libero' : 'Occupato'}
          </Badge>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-gray-500 mb-1">
              Artista: {studio.currentBooking?.artist && 
                <span className="text-black">{studio.currentBooking.artist}</span>
              }
            </p>
            <p className="text-gray-500 mb-1">
              Fascia oraria: {studio.currentBooking?.timeSlot && 
                <span className="text-black">{studio.currentBooking.timeSlot}</span>
              }
            </p>
          </div>
          <div>
            <p className="text-gray-500 mb-1">
              Telefono: {studio.currentBooking?.phone && 
                <span className="text-black">{studio.currentBooking.phone}</span>
              }
            </p>
            <p className="text-gray-500 mb-1">
              Fonico: {studio.currentBooking?.engineer && 
                <span className="text-black">{studio.currentBooking.engineer}</span>
              }
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )

  return (
    <div className="p-8 overflow-y-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold">Bentornato</h1>
          <p className="text-gray-500 text-sm">admin@gmail.com</p>
        </div>
        <Button className="bg-black text-white rounded-full hover:bg-black/90">
          INSERISCI PRENOTAZIONE
        </Button>
      </div>

      {/* Cards section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <Card className="bg-gray-100">
          <CardContent className="p-6 flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center">
              <Calendar className="w-5 h-5 text-white" />
            </div>
            <span className="font-medium">Calendario studi</span>
          </CardContent>
        </Card>

        <Card className="bg-gray-100">
          <CardContent className="p-6 flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center">
              <Calendar className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="font-medium">Conferma prenotazioni</span>
              <p className="text-sm text-gray-500">2 nuove</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-100">
          <CardContent className="p-6 flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-purple-500 flex items-center justify-center">
              <Phone className="w-5 h-5 text-white" />
            </div>
            <span className="font-medium">Panoramica fonici</span>
          </CardContent>
        </Card>
      </div>

      {/* Studio status section */}
      <div className="mb-8">
        <h2 className="text-lg font-bold mb-4">Stato studi</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {studios.map(renderStudioCard)}
        </div>
      </div>

      {/* Quick availability check */}
      <div>
        <h2 className="text-lg font-bold mb-4">Verifica rapida disponibilità</h2>
        
        <div className="mb-6">
          <p className="mb-2">Seleziona studio</p>
          <div className="flex flex-wrap gap-2">
            {studios.map(studio => (
              <Button 
                key={studio.id}
                onClick={() => setSelectedStudio(studio.id)}
                className={`rounded-full ${
                  selectedStudio === studio.id ? 
                  'bg-black text-white hover:bg-black/90' : 
                  'bg-white text-black border border-[1px] border-black hover:bg-gray-200'
                }`}
              >
                {studio.name}
              </Button>
            ))}
          </div>
        </div>

        <div className="mb-6">
          <p className="mb-2">Seleziona fonico</p>
          <div className="flex flex-wrap gap-2">
            {engineers.map(engineer => (
              <Button 
                key={engineer.id}
                onClick={() => setSelectedEngineer(engineer.id)}
                className={`rounded-full ${
                  selectedEngineer === engineer.id ? 
                  'bg-black text-white hover:bg-black/90' : 
                  'bg-white text-black border border-[1px] border-black hover:bg-gray-200'
                }`}
              >
                {engineer.name}
              </Button>
            ))}
          </div>
        </div>

        {/* Availability table */}
        <div className="border rounded-md overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="p-4 text-left font-medium">Data</th>
                <th className="p-4 text-left font-medium">Fascia oraria disponibile</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="p-4">Giovedì, 6/02</td>
                <td className="p-4">
                  <div className="flex gap-2 flex-wrap">
                    <Badge variant="outline" className="bg-white">10:00 - 14:00</Badge>
                    <Badge variant="outline" className="bg-white">18:00 - 04:00</Badge>
                  </div>
                </td>
              </tr>
              <tr className="border-b">
                <td className="p-4">Venerdì, 7/02</td>
                <td className="p-4">
                  <div className="flex gap-2 flex-wrap">
                    <Badge variant="outline" className="bg-white">10:00 - 12:00</Badge>
                    <Badge variant="outline" className="bg-white">15:00 - 18:00</Badge>
                    <Badge variant="outline" className="bg-white">22:00 - 04:00</Badge>
                  </div>
                </td>
              </tr>
              <tr className="border-b bg-red-500 text-white">
                <td className="p-4">Sabato, 8/02</td>
                <td className="p-4"></td>
              </tr>
              <tr className="border-b">
                <td className="p-4">Domenica, 9/02</td>
                <td className="p-4">
                  <div className="flex gap-2 flex-wrap">
                    <Badge variant="outline" className="bg-white">10:00 - 04:00</Badge>
                  </div>
                </td>
              </tr>
              <tr className="border-b">
                <td className="p-4">Lunedì, 10/02</td>
                <td className="p-4">
                  <div className="flex gap-2 flex-wrap">
                    <Badge variant="outline" className="bg-white">10:00 - 14:00</Badge>
                    <Badge variant="outline" className="bg-white">22:00 - 04:00</Badge>
                  </div>
                </td>
              </tr>
              <tr className="border-b bg-red-500 text-white">
                <td className="p-4">Domenica, 11/02</td>
                <td className="p-4"></td>
              </tr>
              <tr className="bg-red-500 text-white">
                <td className="p-4">Lunedì, 12/02</td>
                <td className="p-4"></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
