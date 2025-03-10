'use client'

import { notFound, useParams } from "next/navigation"
import ServicesSection from "@/app/_components/sections/ServicesSection"
import Footer from "@/components/Footer"
import { NavbarVariants } from "@/components/navbar/Navbar"
import { services } from "@/lib/services"

export default function ServicePage() {
    const { id } = useParams()
  const service = services.find((s) => s.id === id)

  if (!service) {
    notFound()
  }

  return (
    <div className="h-screen w-screen flex flex-col">
      <NavbarVariants variant="Home" />
      <div className="flex-1 overflow-y-auto">
        {/* Hero Section */}
        <div className="relative h-[400px]">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${service.bgImageUrl})` }}
          >
            <div className="absolute inset-0 bg-black/50" />
          </div>
          <div className="relative h-full flex items-center px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-72">
            <div className="flex items-center gap-4">
              <div className="p-2 rounded-lg bg-white backdrop-blur-sm">{service.icon}</div>
              <h1 className="text-4xl font-bold text-white">{service.title}</h1>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="flex flex-col gap-16 items-center px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-72 py-32">
          <div className="w-full">{service.content}</div>
          <ServicesSection id={typeof id == 'string' ? id : ''} />
        </div>

        <Footer />
      </div>
    </div>
  )
}

