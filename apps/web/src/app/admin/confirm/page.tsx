"use client"

import { useState, useMemo, useEffect } from "react"
import { Check, Eye, X, ArrowUpDown } from "lucide-react"
import { BookingCreateRequest, Booking } from "@/types/booking"
import { Button } from "@/components/Button"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/Dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/Table"
import { Separator } from "@/components/Separator"
import { Input } from "@/components/Input"
import { ScrollArea } from "@/components/ScrollArea"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/Pagination"
import { useBooking } from "@/hooks/useBooking"

// Tipi più strutturati
type Servizio = "Rec" | "Affitto sala" | "Mix & Master" | "Registrazione"
type StatoPrenotazione = "Contattato" | "Da contattare"
type SortDirection = "asc" | "desc" | null
type SortField = "giornoRichiesta" | "dataOra" | null

interface Prenotazione {
  id: string
  giornoRichiesta: {
    giorno: string
    ora: string
    timestamp: number // Per ordinamento
  }
  instagram: string
  servizi: Servizio[]
  fonico: string
  dataOra: {
    giorno: string
    oraInizio: string
    oraFine: string
    timestamp: number // Per ordinamento
  }
  sala: string
  stato: StatoPrenotazione
  nomeArtista: string
  entita?: {
    nome: string
    logo?: string
  }
  telefono?: string
}


export default function Confirm() {
  const [prenotazioniState, setPrenotazioniState] = useState<Booking[]>([])
  const [selectedPrenotazione, setSelectedPrenotazione] = useState<Prenotazione | null>(null)
  const [viewDialogOpen, setViewDialogOpen] = useState(false)
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false)
  const [bookings, setBookings] = useState([])
  const { getToConfirm} = useBooking()

  useEffect(() => {
    const fetchBookings = async () => {
      const data = await getToConfirm()
      setBookings(data)
    }

    // Effettua il fetch solo una volta
    if (bookings.length === 0) {
      fetchBookings()
    }
  }, []) 

  // Stato per paginazione
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  // Stato per ordinamento
  const [sortField, setSortField] = useState<SortField>(null)
  const [sortDirection, setSortDirection] = useState<SortDirection>(null)

  // Gestione ordinamento
  const handleSort = (field: SortField) => {
    if (sortField === field) {
      // Cambia direzione se il campo è già selezionato
      if (sortDirection === "asc") {
        setSortDirection("desc")
      } else if (sortDirection === "desc") {
        setSortDirection(null)
        setSortField(null)
      } else {
        setSortDirection("asc")
      }
    } else {
      // Imposta nuovo campo e direzione ascendente
      setSortField(field)
      setSortDirection("asc")
    }
  }

  // Prenotazioni ordinate e paginate
  const sortedAndPaginatedPrenotazioni = useMemo(() => {
    // Ordina le prenotazioni
    const sorted = [...prenotazioniState]

    if (sortField && sortDirection) {
      sorted.sort((a, b) => {
        let valueA, valueB

        if (sortField === "giornoRichiesta") {
          valueA = a.giornoRichiesta.timestamp
          valueB = b.giornoRichiesta.timestamp
        } else if (sortField === "dataOra") {
          valueA = a.dataOra.timestamp
          valueB = b.dataOra.timestamp
        } else {
          return 0
        }

        if (sortDirection === "asc") {
          return valueA - valueB
        } else {
          return valueB - valueA
        }
      })
    }

    // Calcola gli indici per la paginazione
    const startIndex = (currentPage - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage

    // Restituisci le prenotazioni paginate
    return sorted.slice(startIndex, endIndex)
  }, [prenotazioniState, currentPage, sortField, sortDirection])

  // Calcola il numero totale di pagine
  const totalPages = Math.ceil(prenotazioniState.length / itemsPerPage)

  const handleView = (prenotazione: Prenotazione) => {
    setSelectedPrenotazione(prenotazione)
    setViewDialogOpen(true)
  }

  const handleConfirm = (prenotazione: Prenotazione) => {
    setSelectedPrenotazione(prenotazione)
    setConfirmDialogOpen(true)
  }

  const confermaPrenotazione = () => {
    if (!selectedPrenotazione) return

    // Aggiorna lo stato della prenotazione
    const updatedPrenotazioni = prenotazioniState.map((p) =>
      p.id === selectedPrenotazione.id ? { ...p, stato: "Contattato" as StatoPrenotazione } : p,
    )

    setPrenotazioniState(updatedPrenotazioni)
    setConfirmDialogOpen(false)
    setViewDialogOpen(false)
  }

  const rifiutaPrenotazione = () => {
    if (!selectedPrenotazione) return

    // Rimuovi la prenotazione dalla lista
    const updatedPrenotazioni = prenotazioniState.filter((p) => p.id !== selectedPrenotazione.id)

    setPrenotazioniState(updatedPrenotazioni)
    setViewDialogOpen(false)
  }

  // Determina quali servizi sono attivi per il modale
  const isServizioAttivo = (servizio: string): boolean => {
    return selectedPrenotazione?.servizi.includes(servizio as Servizio) || false
  }

  // Genera array di numeri di pagina da visualizzare
  const getPageNumbers = () => {
    const pageNumbers = []
    const maxVisiblePages = 5

    if (totalPages <= maxVisiblePages) {
      // Mostra tutte le pagine se sono meno del massimo
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i)
      }
    } else {
      // Logica per mostrare pagine con ellipsis
      if (currentPage <= 3) {
        // Inizio: mostra le prime 3 pagine, ellipsis, ultima pagina
        for (let i = 1; i <= 3; i++) {
          pageNumbers.push(i)
        }
        pageNumbers.push("ellipsis")
        pageNumbers.push(totalPages)
      } else if (currentPage >= totalPages - 2) {
        // Fine: mostra prima pagina, ellipsis, ultime 3 pagine
        pageNumbers.push(1)
        pageNumbers.push("ellipsis")
        for (let i = totalPages - 2; i <= totalPages; i++) {
          pageNumbers.push(i)
        }
      } else {
        // Medio: mostra prima pagina, ellipsis, pagina corrente e adiacenti, ellipsis, ultima pagina
        pageNumbers.push(1)
        pageNumbers.push("ellipsis")
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pageNumbers.push(i)
        }
        pageNumbers.push("ellipsis")
        pageNumbers.push(totalPages)
      }
    }

    return pageNumbers
  }

  return (
    <div className="max-w-6xl mx-auto p-4 py-12 h-screen overflow-y-auto">
  <h1 className="text-2xl font-semibold mb-6">Conferma prenotazioni</h1>
  <div className="border rounded-md overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-white">
              <TableHead className="font-medium">
                <button
                  className="flex items-center gap-1 hover:text-gray-700"
                  onClick={() => handleSort("giornoRichiesta")}
                >
                  Giorno richiesta
                  <ArrowUpDown
                    className={`h-4 w-4 ${sortField === "giornoRichiesta" ? "text-primary" : "text-gray-400"}`}
                  />
                </button>
              </TableHead>
              <TableHead className="font-medium">Instagram</TableHead>
              <TableHead className="font-medium">Servizi</TableHead>
              <TableHead className="font-medium">Fonico</TableHead>
              <TableHead className="font-medium">
                <button className="flex items-center gap-1 hover:text-gray-700" onClick={() => handleSort("dataOra")}>
                  Data e fascia oraria
                  <ArrowUpDown className={`h-4 w-4 ${sortField === "dataOra" ? "text-primary" : "text-gray-400"}`} />
                </button>
              </TableHead>
              <TableHead className="font-medium">Sala</TableHead>
              <TableHead className="font-medium">Stato</TableHead>
              <TableHead className="font-medium"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedAndPaginatedPrenotazioni.map((prenotazione) => (
              <TableRow key={prenotazione.id} className="border-t">
                <TableCell className="align-top">
                  <div>{prenotazione.giornoRichiesta.giorno}</div>
                  <div className="text-gray-500">{prenotazione.giornoRichiesta.ora}</div>
                </TableCell>
                <TableCell>{prenotazione.instagram}</TableCell>
                <TableCell className="align-top">
                  {prenotazione.servizi.includes("Rec") && <div>Rec</div>}
                  {prenotazione.servizi.includes("Affitto sala") && <div>Affitto sala</div>}
                </TableCell>
                <TableCell className={prenotazione.fonico === "Estel" ? "text-pink-500" : "text-gray-500"}>
                  {prenotazione.fonico}
                </TableCell>
                <TableCell className="align-top">
                  <div>{prenotazione.dataOra.giorno}</div>
                  <div className="flex gap-4 text-gray-500">
                    <span>{prenotazione.dataOra.oraInizio}</span>
                    <span>{prenotazione.dataOra.oraFine}</span>
                  </div>
                </TableCell>
                <TableCell>{prenotazione.sala}</TableCell>
                <TableCell className={prenotazione.stato === "Contattato" ? "text-orange-500" : "text-red-500"}>
                  {prenotazione.stato}
                </TableCell>
                <TableCell>
                  <div className="flex gap-2 justify-end">
                    <Button
                      variant="outline"
                      className="rounded-full px-6 py-2 h-auto"
                      onClick={() => handleView(prenotazione)}
                    >
                      <Eye className="h-4 w-4" />
                      <span className="sr-only">Visualizza</span>
                    </Button>
                    <Button
                    variant="gradient"
                      className="rounded-full px-6 py-2 h-auto"
                      onClick={() => handleConfirm(prenotazione)}
                    >
                      <Check className="h-4 w-4" />
                      <span className="sr-only">Conferma</span>
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Paginazione */}
      {totalPages > 1 && (
        <div className="mt-4">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href="#"
                  onClick={(e) => {
                    e.preventDefault()
                    if (currentPage > 1) setCurrentPage(currentPage - 1)
                  }}
                  className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                />
              </PaginationItem>

              {getPageNumbers().map((page, index) =>
                page === "ellipsis" ? (
                  <PaginationItem key={`ellipsis-${index}`}>
                    <PaginationEllipsis />
                  </PaginationItem>
                ) : (
                  <PaginationItem key={page}>
                    <PaginationLink
                      href="#"
                      isActive={currentPage === page}
                      onClick={(e) => {
                        e.preventDefault()
                        setCurrentPage(page as number)
                      }}
                    >
                      {page}
                    </PaginationLink>
                  </PaginationItem>
                ),
              )}

              <PaginationItem>
                <PaginationNext
                  href="#"
                  onClick={(e) => {
                    e.preventDefault()
                    if (currentPage < totalPages) setCurrentPage(currentPage + 1)
                  }}
                  className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}

      {/* Visualizza Dialog */}
      <Dialog open={viewDialogOpen} onOpenChange={setViewDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader className="flex flex-row items-center justify-between">
            <button
              className="absolute left-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
              onClick={() => setViewDialogOpen(false)}
            >
              <X className="h-6 w-6" />
              <span className="sr-only">Close</span>
            </button>
            <DialogTitle className="text-center flex-1">{selectedPrenotazione?.instagram}</DialogTitle>
            <Button variant="outline" className="px-4">
              Modifica
            </Button>
          </DialogHeader>

          {selectedPrenotazione && (
            <ScrollArea className="max-h-[70vh]">
              <div className="space-y-6 py-4 pr-4">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Data e ora</h3>
                  <div className="flex items-center gap-4">
                    <div className="bg-gray-100 rounded-md py-3 px-4 flex-1">
                      <span>{selectedPrenotazione.dataOra.giorno}</span>
                    </div>
                    <div className="bg-gray-100 rounded-md py-3 px-4 w-24 text-center">
                      <span>{selectedPrenotazione.dataOra.oraInizio}</span>
                    </div>
                    <span>-</span>
                    <div className="bg-gray-100 rounded-md py-3 px-4 w-24 text-center">
                      <span>{selectedPrenotazione.dataOra.oraFine}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2">Nome artista</h3>
                  <Input value={selectedPrenotazione.nomeArtista} className="w-full" readOnly />
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2">Entità</h3>
                  <div className="border rounded-md p-3 flex items-center gap-3">
                    <div className="font-bold text-lg">ada</div>
                    <span>{selectedPrenotazione.entita?.nome || "Non specificata"}</span>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2">Numero di telefono</h3>
                  <Input value={selectedPrenotazione.telefono || "Non specificato"} className="w-full" readOnly />
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2">Servizi</h3>
                  <div className="flex gap-3">
                    <div
                      className={`border rounded-md p-3 flex-1 flex items-center gap-2 ${isServizioAttivo("Affitto sala") ? "bg-blue-50 border-blue-200 text-blue-600" : ""}`}
                    >
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
                    <div
                      className={`border rounded-md p-3 flex-1 flex items-center gap-2 ${isServizioAttivo("Registrazione") ? "bg-blue-50 border-blue-200 text-blue-600" : ""}`}
                    >
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
                    <div
                      className={`border rounded-md p-3 flex-1 flex items-center gap-2 ${isServizioAttivo("Mix & Master") ? "bg-blue-50 border-blue-200 text-blue-600" : ""}`}
                    >
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
                  </div>
                </div>

                <Separator />

                <DialogFooter className="flex sm:justify-between gap-2 px-0">
                  <Button
                    variant="outline"
                    className="flex-1 border-red-500 text-red-500 hover:bg-red-50 hover:text-red-500"
                    onClick={rifiutaPrenotazione}
                  >
                    Rifiuta
                  </Button>
                  <Button className="flex-1 bg-black text-white hover:bg-gray-800" onClick={confermaPrenotazione}>
                    Accetta
                  </Button>
                </DialogFooter>
              </div>
            </ScrollArea>
          )}
        </DialogContent>
      </Dialog>

      {/* Conferma Dialog */}
      <Dialog open={confirmDialogOpen} onOpenChange={setConfirmDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center">Conferma prenotazione</DialogTitle>
          </DialogHeader>
          <div className="py-6 text-center">
            <p className="text-lg mb-2">Sei sicuro di voler confermare questa prenotazione?</p>
            <p className="text-sm text-gray-500">
              {selectedPrenotazione?.nomeArtista} - {selectedPrenotazione?.dataOra.giorno}
            </p>
          </div>
          <DialogFooter className="flex sm:justify-between gap-2">
            <Button variant="outline" className="flex-1" onClick={() => setConfirmDialogOpen(false)}>
              Annulla
            </Button>
            <Button className="flex-1" onClick={confermaPrenotazione}>
              Conferma
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

