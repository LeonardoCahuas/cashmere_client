"use client"

import { useState } from "react"
import { Search, X } from "lucide-react"
import { Button } from "@/components/Button"
import { Input } from "@/components/Input"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/Dialog"
import { Textarea } from "@/components/TextArea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/Select"
import { Accordion,AccordionContent, AccordionItem, AccordionTrigger } from "@/components/Accordion"

// Tipi di dati
interface Artista {
  id: string
  nome: string
  entita: string
  note: string
}

interface Entita {
  id: string
  nome: string
  logo?: string
  artisti: Artista[]
}

export default function FatturazioneRoasterPage() {
  // Stati per i modali
  const [aggiungiArtistaAperto, setAggiungiArtistaAperto] = useState(false)
  const [aggiungiEntitaAperto, setAggiungiEntitaAperto] = useState(false)
  const [modificaArtistaAperto, setModificaArtistaAperto] = useState(false)
  const [artistaSelezionato, setArtistaSelezionato] = useState<Artista | null>(null)

  // Stati per i form
  const [nuovoArtista, setNuovoArtista] = useState<Partial<Artista>>({
    nome: "",
    entita: "Warner Music",
    note: "Le sessioni gliele scontiamo a 20€ l'ora",
  })

  // Dati di esempio
  const [entita, setEntita] = useState<Entita[]>([
    {
      id: "1",
      nome: "ADA Music",
      artisti: [],
    },
    {
      id: "2",
      nome: "Warner Music",
      logo: "/placeholder.svg?height=24&width=24",
      artisti: [
        { id: "1", nome: "Niky Savage", entita: "Warner Music", note: "Le sessioni gliele scontiamo a 20€ l'ora" },
        { id: "2", nome: "Baby Gang", entita: "Warner Music", note: "" },
        { id: "3", nome: "Capo Plaza", entita: "Warner Music", note: "" },
        { id: "4", nome: "Olly", entita: "Warner Music", note: "" },
        { id: "5", nome: "Bello Figo", entita: "Warner Music", note: "" },
        { id: "6", nome: "Simba la Rue", entita: "Warner Music", note: "" },
      ],
    },
    {
      id: "3",
      nome: "Island Records",
      artisti: [],
    },
    {
      id: "4",
      nome: "Sugar Music",
      artisti: [],
    },
  ])

  // Gestione apertura modale artista
  const apriAggiungiArtista = () => {
    setNuovoArtista({
      nome: "",
      entita: "Warner Music",
      note: "Le sessioni gliele scontiamo a 20€ l'ora",
    })
    setAggiungiArtistaAperto(true)
  }

  // Gestione apertura modale modifica artista
  const apriModificaArtista = (artista: Artista) => {
    setArtistaSelezionato(artista)
    setNuovoArtista({
      nome: artista.nome,
      entita: artista.entita,
      note: artista.note,
    })
    setModificaArtistaAperto(true)
  }

  // Dati per la sezione di calcolo fatturazione
  const artistiOre = [
    { nome: "Estel", ore: 80, colore: "text-pink-500" },
    { nome: "Emdi", ore: 32, colore: "text-red-500" },
    { nome: "Tarantino", ore: 32, colore: "text-purple-500" },
    { nome: "Senza fonico", ore: 245, colore: "text-gray-500" },
  ]

  const totaleOre = artistiOre.reduce((acc, curr) => acc + curr.ore, 0)

  return (
    <div className="p-6">
      {/* Sezione Entità & Artisti */}
      <div className="mb-10">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Entità & artisti</h2>
          <div className="flex gap-2">
            <Button
              variant="outline"
              className="rounded-full bg-white text-black border-gray-300"
              onClick={() => setAggiungiEntitaAperto(true)}
            >
              Aggiungi entità
            </Button>
            <Button className="rounded-full bg-black text-white" onClick={apriAggiungiArtista}>
              Aggiungi artista
            </Button>
          </div>
        </div>

        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <Input className="pl-10 bg-gray-100 border-none" placeholder="Cerca" />
        </div>

        <Accordion type="multiple" defaultValue={["item-2"]} className="border-none">
          {entita.map((ent) => (
            <AccordionItem key={ent.id} value={`item-${ent.id}`} className="border-b py-2">
              <AccordionTrigger className="hover:no-underline py-2">
                <span className="font-medium">{ent.nome}</span>
              </AccordionTrigger>
              <AccordionContent>
                <div className="flex flex-wrap gap-2 mt-2">
                  {ent.artisti.map((artista) => (
                    <div
                      key={artista.id}
                      className="bg-gray-100 rounded-full px-4 py-2 text-sm cursor-pointer"
                      onClick={() => apriModificaArtista(artista)}
                    >
                      {artista.nome}
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>

      {/* Sezione Calcolo Fatturazione */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Calcolo fatturazione</h2>

        <div className="mb-4">
          <p className="text-sm text-gray-600 mb-1">Seleziona entità</p>
          <Input className="bg-white" placeholder="Entità" />
        </div>

        <div className="mb-4">
          <p className="text-sm text-gray-600 mb-1">Seleziona artista</p>
          <Input className="bg-white" placeholder="Artista" />
        </div>

        <div className="flex gap-4 mb-6">
          <div className="w-1/2">
            <p className="text-sm text-gray-600 mb-1">Da</p>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Da" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="01-01-2023">01/01/2023</SelectItem>
                <SelectItem value="01-02-2023">01/02/2023</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="w-1/2">
            <p className="text-sm text-gray-600 mb-1">A</p>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Da" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="01-03-2023">01/03/2023</SelectItem>
                <SelectItem value="01-04-2023">01/04/2023</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <h3 className="font-medium mb-3">Totale ore</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
          {artistiOre.map((artista, index) => (
            <div key={index} className="bg-white rounded-lg p-4 border">
              <p className={`${artista.colore} font-medium`}>{artista.nome}</p>
              <p className="text-2xl font-bold">{artista.ore} ore</p>
            </div>
          ))}
          <div className="bg-black rounded-lg p-4 text-white">
            <p className="font-medium">Totale</p>
            <p className="text-2xl font-bold">{totaleOre} ore</p>
          </div>
        </div>
      </div>

      {/* Modale Aggiungi Artista */}
      <Dialog open={aggiungiArtistaAperto} onOpenChange={setAggiungiArtistaAperto}>
        <DialogContent className="sm:max-w-md p-0 overflow-hidden">
          <DialogHeader className="px-6 py-4 border-b flex flex-row items-center justify-between">
            <DialogTitle className="text-xl font-medium">Aggiungi artista</DialogTitle>
            <Button variant="ghost" size="icon" onClick={() => setAggiungiArtistaAperto(false)} className="h-8 w-8">
              <X size={24} />
            </Button>
          </DialogHeader>
          <div className="p-6">
            <div className="space-y-6">
              <div>
                <label className="text-lg font-medium mb-2 block">Nome artista</label>
                <Input
                  placeholder="Artista"
                  value={nuovoArtista.nome}
                  onChange={(e) => setNuovoArtista({ ...nuovoArtista, nome: e.target.value })}
                />
              </div>

              <div>
                <label className="text-lg font-medium mb-2 block">Entità</label>
                <Select
                  value={nuovoArtista.entita}
                  onValueChange={(value) => setNuovoArtista({ ...nuovoArtista, entita: value })}
                >
                  <SelectTrigger className="w-full">
                    <div className="flex items-center gap-2">
                      {nuovoArtista.entita === "Warner Music" && (
                        <img src="/placeholder.svg?height=24&width=24" alt="Warner Music" className="h-6 w-6" />
                      )}
                      <SelectValue>{nuovoArtista.entita}</SelectValue>
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    {entita.map((ent) => (
                      <SelectItem key={ent.id} value={ent.nome}>
                        <div className="flex items-center gap-2">
                          {ent.logo && <img src={ent.logo || "/placeholder.svg"} alt={ent.nome} className="h-6 w-6" />}
                          {ent.nome}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-lg font-medium mb-2 block">Note</label>
                <Textarea
                  placeholder="Note"
                  value={nuovoArtista.note}
                  onChange={(e) => setNuovoArtista({ ...nuovoArtista, note: e.target.value })}
                  className="min-h-[120px]"
                />
              </div>
            </div>
          </div>
          <div className="border-t p-4 flex justify-between">
            <Button variant="ghost" onClick={() => setAggiungiArtistaAperto(false)} className="text-lg font-medium">
              Annulla
            </Button>
            <Button className="bg-black text-white text-lg font-medium px-8 rounded-md">Conferma</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Modale Modifica Artista */}
      <Dialog open={modificaArtistaAperto} onOpenChange={setModificaArtistaAperto}>
        <DialogContent className="sm:max-w-md p-0 overflow-hidden">
          <DialogHeader className="px-6 py-4 border-b flex flex-row items-center justify-between">
            <DialogTitle className="text-xl font-medium">{artistaSelezionato?.nome || ""}</DialogTitle>
            <Button variant="ghost" size="icon" onClick={() => setModificaArtistaAperto(false)} className="h-8 w-8">
              <X size={24} />
            </Button>
          </DialogHeader>
          <div className="p-6">
            <div className="space-y-6">
              <div>
                <label className="text-lg font-medium mb-2 block">Nome artista</label>
                <Input
                  placeholder="Artista"
                  value={nuovoArtista.nome}
                  onChange={(e) => setNuovoArtista({ ...nuovoArtista, nome: e.target.value })}
                />
              </div>

              <div>
                <label className="text-lg font-medium mb-2 block">Entità</label>
                <Select
                  value={nuovoArtista.entita}
                  onValueChange={(value) => setNuovoArtista({ ...nuovoArtista, entita: value })}
                >
                  <SelectTrigger className="w-full">
                    <div className="flex items-center gap-2">
                      {nuovoArtista.entita === "Warner Music" && (
                        <img src="/placeholder.svg?height=24&width=24" alt="Warner Music" className="h-6 w-6" />
                      )}
                      <SelectValue>{nuovoArtista.entita}</SelectValue>
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    {entita.map((ent) => (
                      <SelectItem key={ent.id} value={ent.nome}>
                        <div className="flex items-center gap-2">
                          {ent.logo && <img src={ent.logo || "/placeholder.svg"} alt={ent.nome} className="h-6 w-6" />}
                          {ent.nome}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-lg font-medium mb-2 block">Note</label>
                <Textarea
                  placeholder="Note"
                  value={nuovoArtista.note}
                  onChange={(e) => setNuovoArtista({ ...nuovoArtista, note: e.target.value })}
                  className="min-h-[120px]"
                />
              </div>
            </div>
          </div>
          <div className="border-t p-4 flex justify-between">
            <Button variant="ghost" onClick={() => setModificaArtistaAperto(false)} className="text-lg font-medium">
              Annulla
            </Button>
            <Button className="bg-black text-white text-lg font-medium px-8 rounded-md">Conferma</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Modale Aggiungi Entità */}
      <Dialog open={aggiungiEntitaAperto} onOpenChange={setAggiungiEntitaAperto}>
        <DialogContent className="sm:max-w-md p-0 overflow-hidden">
          <DialogHeader className="px-6 py-4 border-b flex flex-row items-center justify-between">
            <DialogTitle className="text-xl font-medium">Aggiungi entità</DialogTitle>
            <Button variant="ghost" size="icon" onClick={() => setAggiungiEntitaAperto(false)} className="h-8 w-8">
              <X size={24} />
            </Button>
          </DialogHeader>
          <div className="p-6">
            <div className="space-y-6">
              <div>
                <label className="text-lg font-medium mb-2 block">Nome entità</label>
                <Input placeholder="Nome entità" />
              </div>

              <div>
                <label className="text-lg font-medium mb-2 block">Logo</label>
                <div className="border-2 border-dashed rounded-lg p-8 text-center">
                  <p className="text-gray-500">Trascina qui il logo o clicca per caricare</p>
                </div>
              </div>
            </div>
          </div>
          <div className="border-t p-4 flex justify-between">
            <Button variant="ghost" onClick={() => setAggiungiEntitaAperto(false)} className="text-lg font-medium">
              Annulla
            </Button>
            <Button className="bg-black text-white text-lg font-medium px-8 rounded-md">Conferma</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

