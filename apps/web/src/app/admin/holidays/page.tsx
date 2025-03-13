"use client"

import { useState } from "react"
import { Check, X } from "lucide-react"

import { Button } from "@/components/Button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/Dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/Table"

type TipoRichiesta = "Permesso" | "Ferie"

interface Richiesta {
  id: string
  giornoRichiesta: {
    giorno: string
    ora: string
  }
  fonico: string
  tipologia: TipoRichiesta
  dataOra: {
    giorno: string
    oraInizio: string
    oraFine: string
    giornoFine?: string // Per richieste multi-giorno
  }
  motivazione: string
}

const richieste: Richiesta[] = [
  {
    id: "1",
    giornoRichiesta: {
      giorno: "Gio, 7 febbraio",
      ora: "17:42",
    },
    fonico: "Estel",
    tipologia: "Permesso",
    dataOra: {
      giorno: "Ven, 7 febbraio",
      oraInizio: "10:00",
      oraFine: "15:00",
    },
    motivazione: "Ho una visita medica, non so se è un problema",
  },
  {
    id: "2",
    giornoRichiesta: {
      giorno: "Gio, 7 febbraio",
      ora: "00:34",
    },
    fonico: "Emdi",
    tipologia: "Ferie",
    dataOra: {
      giorno: "Ven, 7 febbraio",
      oraInizio: "10:00",
      oraFine: "04:00",
      giornoFine: "Sab, 8 febbraio",
    },
    motivazione: "Parto in Sardegna",
  },
]

export default function HolidayRequests() {
  const [richiesteState, setRichiesteState] = useState<Richiesta[]>(richieste)
  const [selectedRichiesta, setSelectedRichiesta] = useState<Richiesta | null>(null)
  const [approveDialogOpen, setApproveDialogOpen] = useState(false)
  const [rejectDialogOpen, setRejectDialogOpen] = useState(false)

  const handleApprove = (richiesta: Richiesta) => {
    setSelectedRichiesta(richiesta)
    setApproveDialogOpen(true)
  }

  const handleReject = (richiesta: Richiesta) => {
    setSelectedRichiesta(richiesta)
    setRejectDialogOpen(true)
  }

  const confirmApprove = () => {
    if (!selectedRichiesta) return

    // Rimuovi la richiesta approvata dalla lista
    const updatedRichieste = richiesteState.filter((r) => r.id !== selectedRichiesta.id)
    setRichiesteState(updatedRichieste)
    setApproveDialogOpen(false)
  }

  const confirmReject = () => {
    if (!selectedRichiesta) return

    // Rimuovi la richiesta rifiutata dalla lista
    const updatedRichieste = richiesteState.filter((r) => r.id !== selectedRichiesta.id)
    setRichiesteState(updatedRichieste)
    setRejectDialogOpen(false)
  }

  return (
    <div className="max-w-6xl mx-auto p-4 py-12">
      <h1 className="text-2xl font-semibold mb-6">Richieste ferie e permessi</h1>

      <div className="border rounded-md overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-white">
              <TableHead className="font-medium">Giorno richiesta</TableHead>
              <TableHead className="font-medium">Fonico</TableHead>
              <TableHead className="font-medium">Tipologia</TableHead>
              <TableHead className="font-medium">Data e fascia oraria</TableHead>
              <TableHead className="font-medium">Motivazione</TableHead>
              <TableHead className="font-medium w-[100px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {richiesteState.map((richiesta) => (
              <TableRow key={richiesta.id} className="border-t">
                <TableCell className="align-top">
                  <div>{richiesta.giornoRichiesta.giorno}</div>
                  <div className="text-gray-500">{richiesta.giornoRichiesta.ora}</div>
                </TableCell>
                <TableCell className={richiesta.fonico === "Estel" ? "text-pink-500" : "text-red-500"}>
                  {richiesta.fonico}
                </TableCell>
                <TableCell>{richiesta.tipologia}</TableCell>
                <TableCell className="align-top">
                  <div>{richiesta.dataOra.giorno}</div>
                  <div className="flex gap-4 text-gray-500">
                    <span>{richiesta.dataOra.oraInizio}</span>
                    <span>{richiesta.dataOra.oraFine}</span>
                  </div>
                  {richiesta.dataOra.giornoFine && (
                    <div className="mt-1">
                      <div>{richiesta.dataOra.giornoFine}</div>
                      <div className="flex gap-4 text-gray-500">
                        <span>{richiesta.dataOra.oraInizio}</span>
                        <span>{richiesta.dataOra.oraFine}</span>
                      </div>
                    </div>
                  )}
                </TableCell>
                <TableCell>{richiesta.motivazione}</TableCell>
                <TableCell>
                  <div className="flex gap-2 justify-end">
                    <Button
                    variant="gradient"
                      size="icon"
                      className="rounded-full hover:bg-gray-800"
                      onClick={() => handleApprove(richiesta)}
                    >
                      <Check className="h-4 w-4" />
                    </Button>
                    <Button
                    variant="danger"
                      size="icon"
                      className="rounded-full bg-red"
                      onClick={() => handleReject(richiesta)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Dialog Approva */}
      <Dialog open={approveDialogOpen} onOpenChange={setApproveDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Conferma approvazione</DialogTitle>
            <DialogDescription>Sei sicuro di voler approvare questa richiesta?</DialogDescription>
          </DialogHeader>
          {selectedRichiesta && (
            <div className="py-4">
              <p className="font-medium">{selectedRichiesta.fonico}</p>
              <p className="text-sm text-gray-500">
                {selectedRichiesta.tipologia} - {selectedRichiesta.dataOra.giorno}
              </p>
            </div>
          )}
          <DialogFooter className="flex sm:justify-between gap-2">
            <Button variant="outline" className="flex-1" onClick={() => setApproveDialogOpen(false)}>
              Annulla
            </Button>
            <Button className="flex-1" onClick={confirmApprove}>
              Conferma
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialog Rifiuta */}
      <Dialog open={rejectDialogOpen} onOpenChange={setRejectDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Conferma rifiuto</DialogTitle>
            <DialogDescription>Sei sicuro di voler rifiutare questa richiesta?</DialogDescription>
          </DialogHeader>
          {selectedRichiesta && (
            <div className="py-4">
              <p className="font-medium">{selectedRichiesta.fonico}</p>
              <p className="text-sm text-gray-500">
                {selectedRichiesta.tipologia} - {selectedRichiesta.dataOra.giorno}
              </p>
            </div>
          )}
          <DialogFooter className="flex sm:justify-between gap-2">
            <Button variant="outline" className="flex-1" onClick={() => setRejectDialogOpen(false)}>
              Annulla
            </Button>
            <Button variant="destructive" className="flex-1" onClick={confirmReject}>
              Rifiuta
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

