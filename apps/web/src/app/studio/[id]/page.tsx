"use client"

import { useState } from "react"
import { Camera } from "lucide-react"
import { Button } from "@/components/Button"
import ServicesSection from "@/app/_components/sections/ServicesSection"
import Footer from "@/components/Footer"
import { NavbarVariants } from "@/components/navbar/Navbar"
import { PhotoCarouselDialog } from "./components/PhotoCarousel"
import { studios } from "@/lib/studios"
import { useParams } from "next/navigation"

export default function StudioDetailPage({
  params,
}: {
  params: { id: string }
}) {
    const {id} = useParams()
  const [isPhotoDialogOpen, setIsPhotoDialogOpen] = useState(false)
  const studio = studios.find((s) => s.id === id)

  if (!studio) {
    return <div>Studio non trovato</div>
  }

  return (
    <div className="h-screen w-screen flex flex-col">
      <NavbarVariants variant="Home" />
      <div className="flex-1 overflow-y-auto">
        {/* Video Header */}
        <div className="relative h-[600px]">
          <video autoPlay muted loop playsInline className="w-full h-full object-cover">
            <source src={studio.videoUrl} type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-black/40" />
          <div className="absolute inset-0 top-0 left-0 flex items-start justify-start px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-72 py-16 gap-8">
            <h1 className="text-white text-5xl font-bold">{studio.name}</h1>
            <Button variant="outline" className="text-white bg-black/50" onClick={() => setIsPhotoDialogOpen(true)}>
              <Camera className="w-4 h-4 mr-2" />
              Sfoglia le foto
            </Button>
          </div>
        </div>

        <div className="flex flex-col gap-16 items-center px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-72 py-16">
          {/* Equipment Section */}
          <div className="w-full">
            <h2 className="text-2xl font-bold mb-8">Strumentazione</h2>
            <div className="flex flex-wrap gap-3">
              {studio.equipment.map((item, index) => (
                <span key={index} className="px-4 py-2 bg-muted rounded-full text-sm">
                  {item}
                </span>
              ))}
            </div>
          </div>

          {/* Description Section */}
          <div className="w-full">
            <h2 className="text-2xl font-bold mb-8">Descrizione dello studio</h2>
            <div className="space-y-4">
              {studio.description.map((paragraph, index) => (
                <p key={index} className="text-muted-foreground leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>

          <ServicesSection />
        </div>

        <Footer />
      </div>

      <PhotoCarouselDialog
        isOpen={isPhotoDialogOpen}
        onClose={() => setIsPhotoDialogOpen(false)}
        images={studio.imagesUrl}
        studioName={studio.name}
      />
    </div>
  )
}

