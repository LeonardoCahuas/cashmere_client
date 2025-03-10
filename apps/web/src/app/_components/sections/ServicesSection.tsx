"use client"

import ServiceCard from "../ServiceCard"

const services = [
  {
    id: "0",
    title: "Affitto sala",
    description:
      "Cashmere Studio è il tuo punto di riferimento per la registrazione e la produzione musicale a Milano.",
    imageUrl: "/Studio 1/1.jpg",
    hasStudioButtons: true,
  },
  {
    id: "1",
    title: "Registrazione",
    description:
      "La fase di registrazione è quella in cui l'artista viene al microfono e registra le sue parti vocali.",
    imageUrl: "/Studio 1/1.jpg",
  },
  {
    id: "2",
    title: "Mix & Master",
    description:
      "Processo finale di lavorazione sulla traccia, in breve è l'attività che serve per far suonare bene una canzone.",
    imageUrl: "/Studio 1/1.jpg",
  },
  {
    id: "3",
    title: "Produzione",
    description:
      "Il nostro servizio di produzione musicale offre beat personalizzati di alta qualità su misura per l'artista.",
    imageUrl: "/Studio 1/1.jpg",
  },
]

export default function ServicesSection(id: any) {
  console.log(id)
  return (
    <section>
      <h2 className="mb-12 text-3xl font-bold">I nostri servizi</h2>

      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {services.filter(s => s.id != id?.id).map((service, index) => (
          <ServiceCard
            id={service.id}
            key={index}
            title={service.title}
            description={service.description}
            imageUrl={service.imageUrl}
            hasStudioButtons={service.hasStudioButtons}
          />
        ))}
      </div>
    </section>
  )
}

