"use client"

import { Carousel, CarouselItem, CarouselNext, CarouselPrevious, CarouselContent } from "@/components/carousel"
import PortfolioCard from "../PortfolioCard"
import type { PortfolioItem } from "@/types/types"

const portfolioItems: PortfolioItem[] = [
  {
    title: "Pistole nella Fendi",
    artist: "Niko Pandetta",
    imageUrl: "/Studio 1/1.jpg",
    tags: ["Rec", "Mix & Master"],
  },
  {
    title: "Plaquette",
    artist: "Nabi",
    imageUrl: "/Studio 1/1.jpg",
    tags: ["Rec"],
  },
  {
    title: "Giù EP",
    artist: "Neima Ezza",
    imageUrl: "/Studio 1/1.jpg",
    tags: ["Rec", "Produzione"],
  },
  {
    title: "Go Go Jack",
    artist: "Minur, Simba la Rue",
    imageUrl: "/Studio 1/1.jpg",
    tags: ["Rec"],
  },
  {
    title: "Pistole nella Fendi",
    artist: "Niko Pandetta",
    imageUrl: "/Studio 1/1.jpg",
    tags: ["Rec", "Mix & Master"],
  },
  {
    title: "Plaquette",
    artist: "Nabi",
    imageUrl: "/Studio 1/1.jpg",
    tags: ["Rec"],
  },
  {
    title: "Giù EP",
    artist: "Neima Ezza",
    imageUrl: "/Studio 1/1.jpg",
    tags: ["Rec", "Produzione"],
  },
  {
    title: "Go Go Jack",
    artist: "Minur, Simba la Rue",
    imageUrl: "/Studio 1/1.jpg",
    tags: ["Rec"],
  }
]

export default function PortfolioGrid() {
  return (
    <section className="relative">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <h2 className="text-3xl font-bold">Portfolio</h2>
        <a href="/portfolio" className="text-[#6FC7DF] underline-offset-4 hover:underline">
          Visualizza portfolio completo →
        </a>
      </div>

      {/* Carousel */}
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent className="-ml-2 md:-ml-4">
          {portfolioItems.map((item, index) => (
            <CarouselItem key={index} className="pl-2 md:pl-4 sm:basis-1/2 lg:basis-1/4">
              <PortfolioCard {...item} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="hidden md:flex" />
        <CarouselNext className="hidden md:flex" />
      </Carousel>
    </section>
  )
}

