"use client"

import { useState } from "react"
import { Calendar, Briefcase, X, Eye, ArrowUpDown } from "lucide-react"
import { useRouter } from "next/navigation"
import { format } from "date-fns"
import { it } from "date-fns/locale"

import { Button } from "@/components/Button"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/Dialog"
import { Calendar as CalendarComponent } from "@/components/Calendar"
import { Textarea } from "@/components/TextArea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/Select"
import { ScrollArea } from "@/components/ScrollArea"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/Table"
import { Input } from "@/components/Input"

type RequestType = "ferie" | "permesso" | null

// Tipo per le sessioni
interface Sessione {
  id: string
  giornoRichiesta: {
    giorno: string
    ora: string
  }
  instagram: string
  servizi: string[]
  fonico: string
  dataOra: {
    giorno: string
    oraInizio: string
    oraFine: string
  }
  sala: string
  stato: "Fuori orario" | "Accettata"
  nomeArtista: string
  entita?: {
    nome: string
    logo?: string
  }
  telefono?: string
}

// Dati di esempio
const sessioni: Sessione[] = [
  {
    id: "1",
    giornoRichiesta: {
      giorno: "Gio, 7 febbraio",
      ora: "17:42",
    },
    instagram: "@skugnizz",
    servizi: ["Rec", "Affitto sala", "Mix & Master"],
    fonico: "Estel",
    dataOra: {
      giorno: "Ven, 7 febbraio",
      oraInizio: "16:00",
      oraFine: "21:00",
    },
    sala: "Studio 2",
    stato: "Fuori orario",
    nomeArtista: "Skugnizz",
    entita: {
      nome: "ADA Music",
      logo: "ada",
    },
    telefono: "366 400 7807",
  },
  {
    id: "2",
    giornoRichiesta: {
      giorno: "Gio, 7 febbraio",
      ora: "00:34",
    },
    instagram: "@bl3dem",
    servizi: ["Affitto sala"],
    fonico: "Estel",
    dataOra: {
      giorno: "Sab, 8 febbraio",
      oraInizio: "14:00",
      oraFine: "21:00",
    },
    sala: "Studio 3",
    stato: "Accettata",
    nomeArtista: "Bl3dem",
  },
  {
    id: "3",
    giornoRichiesta: {
      giorno: "Gio, 7 febbraio",
      ora: "17:42",
    },
    instagram: "@oggkange",
    servizi: ["Rec", "Affitto sala"],
    fonico: "Estel",
    dataOra: {
      giorno: "Ven, 7 febbraio",
      oraInizio: "16:00",
      oraFine: "21:00",
    },
    sala: "Studio 2",
    stato: "Accettata",
    nomeArtista: "Oggkange",
  },
  {
    id: "4",
    giornoRichiesta: {
      giorno: "Gio, 7 febbraio",
      ora: "00:34",
    },
    instagram: "Niky Savage",
    servizi: ["Affitto sala"],
    fonico: "Estel",
    dataOra: {
      giorno: "Sab, 8 febbraio",
      oraInizio: "14:00",
      oraFine: "21:00",
    },
    sala: "Studio 3",
    stato: "Accettata",
    nomeArtista: "Niky Savage",
  },
]

export default function DashboardPage() {
  const router = useRouter()
  const [requestDialogOpen, setRequestDialogOpen] = useState(false)
  const [requestType, setRequestType] = useState<RequestType>(null)
  const [dateRange, setDateRange] = useState<{
    from: Date | undefined
    to: Date | undefined
  }>({
    from: undefined,
    to: undefined,
  })
  const [singleDate, setSingleDate] = useState<Date>()
  const [startTime, setStartTime] = useState<string>("")
  const [endTime, setEndTime] = useState<string>("")
  const [motivazione, setMotivazione] = useState("")

  // Aggiungiamo stati per il modale di visualizzazione
  const [viewSessionDialogOpen, setViewSessionDialogOpen] = useState(false)
  const [selectedSession, setSelectedSession] = useState<Sessione | null>(null)

  const handleCalendarClick = () => {
    router.push("/admin/calendar")
  }

  const handleRequestClick = () => {
    setRequestDialogOpen(true)
  }

  const handleTypeSelect = (type: RequestType) => {
    setRequestType(type)
    // Reset form when changing type
    setDateRange({ from: undefined, to: undefined })
    setSingleDate(undefined)
    setStartTime("")
    setEndTime("")
    setMotivazione("")
  }

  const handleSubmit = () => {
    // Qui gestisci l'invio della richiesta
    console.log({
      type: requestType,
      dateRange,
      singleDate,
      startTime,
      endTime,
      motivazione,
    })
    setRequestDialogOpen(false)
    // Reset form
    setRequestType(null)
    setDateRange({ from: undefined, to: undefined })
    setSingleDate(undefined)
    setStartTime("")
    setEndTime("")
    setMotivazione("")
  }

  const handleViewSession = (sessione: Sessione) => {
    setSelectedSession(sessione)
    setViewSessionDialogOpen(true)
  }

  // Generiamo gli orari con intervalli di 15 minuti
  const timeOptions = Array.from({ length: 19 }, (_, i) => {
    const hour = (10 + i) % 24 // Partiamo da 10 e gestiamo il ciclo oltre la mezzanotte
    return `${hour.toString().padStart(2, "0")}:00`
})

  // Formatta la data per la visualizzazione
  const formatDateRange = () => {
    if (dateRange.from && dateRange.to) {
      return `${format(dateRange.from, "dd/MM/yyyy")} - ${format(dateRange.to, "dd/MM/yyyy")}`
    }
    return "Seleziona date"
  }

  const formatSingleDate = () => {
    if (singleDate) {
      return format(singleDate, "dd/MM/yyyy")
    }
    return "Seleziona data"
  }

  return (
    <div className="container mx-auto p-4 space-y-8 py-12">
      <div>
        <div className="text-sm text-muted-foreground">fonico@gmail.com</div>
        <h1 className="text-2xl font-bold">Bentornato</h1>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Button variant="outline" className="h-24 bg-gray-50 hover:bg-gray-100" onClick={handleCalendarClick}>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-violet-500 flex items-center justify-center">
              <Calendar className="h-6 w-6 text-white" />
            </div>
            <span className="text-lg">Calendario</span>
          </div>
        </Button>

        <Button variant="outline" className="h-24 bg-gray-50 hover:bg-gray-100" onClick={handleRequestClick}>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-emerald-500 flex items-center justify-center">
              <Briefcase className="h-6 w-6 text-white" />
            </div>
            <span className="text-lg">Richiedi ferie o permesso</span>
          </div>
        </Button>
      </div>

      {/* Tabella Nuove sessioni */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold">Nuove sessioni</h2>

        <div className="border rounded-md overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-white">
                <TableHead className="font-medium">
                  <div className="flex items-center gap-1">
                    Giorno richiesta
                    <ArrowUpDown className="h-4 w-4 text-gray-400" />
                  </div>
                </TableHead>
                <TableHead className="font-medium">Instagram</TableHead>
                <TableHead className="font-medium">Servizi</TableHead>
                <TableHead className="font-medium">Fonico</TableHead>
                <TableHead className="font-medium">
                  <div className="flex items-center gap-1">
                    Data e fascia oraria
                    <ArrowUpDown className="h-4 w-4 text-gray-400" />
                  </div>
                </TableHead>
                <TableHead className="font-medium">Sala</TableHead>
                <TableHead className="font-medium">Stato</TableHead>
                <TableHead className="font-medium"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sessioni.map((sessione) => (
                <TableRow key={sessione.id} className="border-t">
                  <TableCell className="align-top">
                    <div>{sessione.giornoRichiesta.giorno}</div>
                    <div className="text-gray-500">{sessione.giornoRichiesta.ora}</div>
                  </TableCell>
                  <TableCell>{sessione.instagram}</TableCell>
                  <TableCell className="align-top">
                    {sessione.servizi.includes("Rec") && <div>Rec</div>}
                    {sessione.servizi.includes("Affitto sala") && <div>Affitto sala</div>}
                    {sessione.servizi.includes("Mix & Master") && <div>Mix & Master</div>}
                  </TableCell>
                  <TableCell className="text-pink-500">{sessione.fonico}</TableCell>
                  <TableCell className="align-top">
                    <div>{sessione.dataOra.giorno}</div>
                    <div className="flex gap-4 text-gray-500">
                      <span>{sessione.dataOra.oraInizio}</span>
                      <span>{sessione.dataOra.oraFine}</span>
                    </div>
                  </TableCell>
                  <TableCell>{sessione.sala}</TableCell>
                  <TableCell className={sessione.stato === "Accettata" ? "text-green-500" : "text-orange-500"}>
                    {sessione.stato}
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="outline"
                      className="rounded-full px-6 py-2 h-auto"
                      onClick={() => handleViewSession(sessione)}
                    >
                      <Eye className="h-4 w-4" />
                      <span className="sr-only">Visualizza</span>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Dialog Richiedi ferie/permesso */}
      <Dialog open={requestDialogOpen} onOpenChange={setRequestDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <div className="flex items-center justify-between">
              <DialogTitle>Richiedi ferie</DialogTitle>
            </div>
          </DialogHeader>

          <ScrollArea className="max-h-[70vh]">
            <div className="grid gap-6 py-4 pr-4">
              {/* Selezione tipo */}
              <div className="grid grid-cols-2 gap-4">
                <Button
                  variant="outline"
                  className={`h-24 relative ${requestType === "ferie" ? "border-2 border-red-400" : ""}`}
                  onClick={() => handleTypeSelect("ferie")}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-red-400 flex items-center justify-center">
                      <Briefcase className="h-6 w-6 text-white" />
                    </div>
                    <span className="text-lg">Ferie</span>
                  </div>
                </Button>

                <Button
                  variant="outline"
                  className={`h-24 relative ${requestType === "permesso" ? "border-2 border-orange-400" : ""}`}
                  onClick={() => handleTypeSelect("permesso")}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-orange-400 flex items-center justify-center">
                      <Calendar className="h-6 w-6 text-white" />
                    </div>
                    <span className="text-lg">Permesso</span>
                  </div>
                </Button>
              </div>

              {requestType && (
                <>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Data e ora</h3>
                    {requestType === "ferie" ? (
                      // Calendario per ferie (selezione range)
                      <div className="space-y-4">
                        <div className="border rounded-md p-4">
                          <div className="mb-4">
                            <Button
                              variant="outline"
                              className="w-full justify-start text-left font-normal"
                              type="button"
                            >
                              <Calendar className="mr-2 h-4 w-4" />
                              {formatDateRange()}
                            </Button>
                          </div>
                          <CalendarComponent
                            mode="range"
                            selected={dateRange}
                            onSelect={(range: any) => {
                              if (range) {
                                setDateRange(range)
                              }
                            }}
                            locale={it}
                            initialFocus
                            className="rounded-md"
                          />
                        </div>
                      </div>
                    ) : (
                      // Calendario per permesso (singolo giorno) + orari
                      <div className="space-y-4">
                        <div className="border rounded-md p-4">
                          <div className="mb-4">
                            <Button
                              variant="outline"
                              className="w-full justify-start text-left font-normal"
                              type="button"
                            >
                              <Calendar className="mr-2 h-4 w-4" />
                              {formatSingleDate()}
                            </Button>
                          </div>
                          <CalendarComponent
                            mode="single"
                            selected={singleDate}
                            onSelect={(date) => {
                              if (date) {
                                setSingleDate(date)
                              }
                            }}
                            locale={it}
                            initialFocus
                            className="rounded-md"
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <label className="text-sm font-medium">Ora inizio</label>
                            <Select value={startTime} onValueChange={setStartTime}>
                              <SelectTrigger>
                                <SelectValue placeholder="Seleziona ora" />
                              </SelectTrigger>
                              <SelectContent>
                                {timeOptions.map((time) => (
                                  <SelectItem key={time} value={time}>
                                    {time}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>

                          <div className="space-y-2">
                            <label className="text-sm font-medium">Ora fine</label>
                            <Select value={endTime} onValueChange={setEndTime}>
                              <SelectTrigger>
                                <SelectValue placeholder="Seleziona ora" />
                              </SelectTrigger>
                              <SelectContent>
                                {timeOptions.map((time) => (
                                  <SelectItem key={time} value={time}>
                                    {time}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label className="text-lg font-semibold">Motivazione</label>
                    <Textarea
                      value={motivazione}
                      onChange={(e) => setMotivazione(e.target.value)}
                      placeholder="Inserisci la motivazione della richiesta..."
                      className="min-h-[100px]"
                    />
                  </div>
                </>
              )}
            </div>
          </ScrollArea>

          <DialogFooter className="flex sm:justify-between gap-2">
            <Button variant="outline" className="flex-1" onClick={() => setRequestDialogOpen(false)}>
              Annulla
            </Button>
            <Button
              className="flex-1"
              onClick={handleSubmit}
              disabled={
                !requestType ||
                !motivazione ||
                (requestType === "ferie" && (!dateRange.from || !dateRange.to)) ||
                (requestType === "permesso" && (!singleDate || !startTime || !endTime))
              }
            >
              Conferma
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialog Visualizza sessione */}
      <Dialog open={viewSessionDialogOpen} onOpenChange={setViewSessionDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader className="flex flex-row items-center justify-between">
            <DialogTitle className="text-center flex-1">{selectedSession?.instagram}</DialogTitle>
            <Button variant="outline" className="px-4">
              Modifica
            </Button>
          </DialogHeader>

          {selectedSession && (
            <ScrollArea className="max-h-[80vh]">
              <div className="space-y-6 py-4">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Data e ora</h3>
                  <div className="flex items-center gap-4">
                    <div className="bg-gray-100 rounded-md py-3 px-4 flex-1">
                      <span>{selectedSession.dataOra.giorno}</span>
                    </div>
                    <div className="bg-gray-100 rounded-md py-3 px-4 w-24 text-center">
                      <span>{selectedSession.dataOra.oraInizio}</span>
                    </div>
                    <span>-</span>
                    <div className="bg-gray-100 rounded-md py-3 px-4 w-24 text-center">
                      <span>{selectedSession.dataOra.oraFine}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2">Nome artista</h3>
                  <Input value={selectedSession.nomeArtista} className="w-full" readOnly />
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2">Entità</h3>
                  <div className="border rounded-md p-3 flex items-center gap-3">
                    <div className="font-bold text-lg">ada</div>
                    <span>{selectedSession.entita?.nome || "Non specificata"}</span>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2">Numero di telefono</h3>
                  <Input value={selectedSession.telefono || "Non specificato"} className="w-full" readOnly />
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2">Servizi</h3>
                  <div className="flex gap-3">
                    {selectedSession.servizi.includes("Affitto sala") && (
                      <div className="border rounded-md p-3 flex-1 flex items-center gap-2 bg-blue-50 border-blue-200 text-blue-600">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path
                            d="M12 14C13.1046 14 14 13.1046 14 12C14 10.8954 13.1046 10 12 10C10.8954 10 10 10.8954 10 12C10 13.1046 10.8954 14 12 14Z"
                            fill="currentColor"
                          />
                          <path
                            d="M19 4C15.96 4 13.1 5.17 11 7.09C8.9 5.17 6.04 4 3 4C3 4 1 14 11 20C21 14 19 4 19 4Z"
                            fill="currentColor"
                          />
                        </svg>
                        <span>Affitto sala</span>
                      </div>
                    )}
                    {selectedSession.servizi.includes("Rec") && (
                      <div className="border rounded-md p-3 flex-1 flex items-center gap-2 bg-blue-50 border-blue-200 text-blue-600">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path
                            d="M12 14C13.1046 14 14 13.1046 14 12C14 10.8954 13.1046 10 12 10C10.8954 10 10 10.8954 10 12C10 13.1046 10.8954 14 12 14Z"
                            fill="currentColor"
                          />
                          <path
                            d="M19 4C15.96 4 13.1 5.17 11 7.09C8.9 5.17 6.04 4 3 4C3 4 1 14 11 20C21 14 19 4 19 4Z"
                            fill="currentColor"
                          />
                        </svg>
                        <span>Registrazione</span>
                      </div>
                    )}
                    {selectedSession.servizi.includes("Mix & Master") && (
                      <div className="border rounded-md p-3 flex-1 flex items-center gap-2">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path
                            d="M12 14C13.1046 14 14 13.1046 14 12C14 10.8954 13.1046 10 12 10C10.8954 10 10 10.8954 10 12C10 13.1046 10.8954 14 12 14Z"
                            fill="currentColor"
                          />
                          <path
                            d="M19 4C15.96 4 13.1 5.17 11 7.09C8.9 5.17 6.04 4 3 4C3 4 1 14 11 20C21 14 19 4 19 4Z"
                            fill="currentColor"
                          />
                        </svg>
                        <span>Mix & Master</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </ScrollArea>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}

