import Image from "next/image"
import { ArrowRight, Calendar } from 'lucide-react'
import { Button } from "@/components/Button"
import Link from "next/link"

export interface StudioCardProps {
  id: "1" | "2" | "3" | "4"
  title: string
  subtitle: string
  badge?: string
  imageUrl: string
}

export default function StudioCard({ id, title, subtitle, badge, imageUrl }: StudioCardProps) {
  return (
    <div className="group relative aspect-square overflow-hidden rounded-2xl">
        <div className="absolute w-full h-full bg-black z-999"></div>
      {/* Background Image */}
      <Image
        src={imageUrl || "/placeholder.svg"}
        alt={title}
        fill
        className="object-cover transition-transform duration-300 group-hover:scale-105"
        quality={95}
      />
      
      {/* Default Black Overlay */}
      <div className="absolute inset-0 transition-bg duration-300 bg-black/50 group-hover:bg-black/70" />

      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-12">
        {/* Text Content - Moves up on hover */}
        <div className="transform transition-transform duration-300">
          {/* Badge */}
          {badge && (
            <div className="mb-4 w-fit rounded-lg bg-red-600 px-2 py-1 text-xs font-medium text-white">
              {badge}
            </div>
          )}
          
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-white">
            {title}
          </h2>
          <p className="text-base text-gray-200">
            {subtitle}
          </p>
        </div>
        
        {/* Buttons - Hidden by default, shown on hover */}
        <div className="mt-6 flex gap-4 opacity-0 transition-h duration-300 h-0 group-hover:h-[50px] group-hover:opacity-100 ">
          <Link href="/book">
          <Button variant="gradient">Prenota una sessione</Button>
          </Link>
          <Link href={`/studio/${id}`}>
          <Button variant="outline">Info studio</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
