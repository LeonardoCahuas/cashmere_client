import { Button } from "@/components/Button"
import { CardContent, Card } from "@/components/Card"
import { Badge } from "@/components/Badge"
import { Calendar, Phone, Music } from 'lucide-react'
import Image from "next/image"
import { NavbarVariants } from "@/components/navbar/Navbar"

export default function CurrentPage() {
  return (
    <div className="h-screen w-screen flex flex-col">
      <div className="flex-1 overflow-y-auto">
      <div className="flex min-h-screen bg-white">
      {/* Sidebar - solo indicato con icone */}
      <div className="w-16 h-screen fixed border-r bg-white flex flex-col items-center py-6 gap-6">
        <div className="p-2 bg-black rounded-full">
          <div className="w-6 h-6 flex items-center justify-center">
            <svg viewBox="0 0 24 24" className="w-5 h-5 text-white" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
              <circle cx="12" cy="12" r="4" fill="currentColor" />
            </svg>
          </div>
        </div>
        <div className="p-2">
          <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <div className="p-2">
          <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4 19.5C4 18.837 4.26339 18.2011 4.73223 17.7322C5.20107 17.2634 5.83696 17 6.5 17H20M4 19.5C4 20.163 4.26339 20.7989 4.73223 21.2678C5.20107 21.7366 5.83696 22 6.5 22H20V2H6.5C5.83696 2 5.20107 2.26339 4.73223 2.73223C4.26339 3.20107 4 3.83696 4 4.5V19.5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 p-8 pl-36  pr-20">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <p className="text-gray-500 text-sm">admin@gmail.com</p>
            <h1 className="text-2xl font-bold">Bentornato</h1>
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
          
          <div className="bg-gray-100 p-3 rounded-md mb-4 flex items-center">
            <Calendar className="w-5 h-5 mr-2" />
            <span>Oggi, 20:30</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Studio 1 */}
            <Card className="border">
              <CardContent className="p-4">
                <div className="flex justify-between items-center mb-4 border-b pb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-md overflow-hidden">
                      <Image 
                        src="/placeholder.svg?height=40&width=40" 
                        width={40} 
                        height={40} 
                        alt="Studio 1" 
                        className="object-cover"
                      />
                    </div>
                    <span className="font-bold text-lg">Studio 1</span>
                  </div>
                  <Badge className="bg-green-500 text-white hover:bg-green-600">Libero</Badge>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-gray-500 mb-1">Artista:</p>
                    <p className="text-gray-500 mb-1">Fascia oraria:</p>
                  </div>
                  <div>
                    <p className="text-gray-500 mb-1">Telefono:</p>
                    <p className="text-gray-500 mb-1">Fonico:</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Studio 2 */}
            <Card className="border">
              <CardContent className="p-4">
                <div className="flex justify-between items-center mb-4 border-b pb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-md overflow-hidden">
                      <Image 
                        src="/placeholder.svg?height=40&width=40" 
                        width={40} 
                        height={40} 
                        alt="Studio 2" 
                        className="object-cover"
                      />
                    </div>
                    <span className="font-bold text-lg">Studio 2</span>
                  </div>
                  <Badge className="bg-red-500 text-white hover:bg-red-600">Occupato</Badge>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-gray-500 mb-1">Artista: <span className="text-black">skugnizz</span></p>
                    <p className="text-gray-500 mb-1">Fascia oraria: <span className="text-black">15:00 - 18:00</span></p>
                  </div>
                  <div>
                    <p className="text-gray-500 mb-1">Telefono: <span className="text-black">366 400 7807</span></p>
                    <p className="text-gray-500 mb-1">Fonico: <span className="text-black">Emdi</span></p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Studio 3 */}
            <Card className="border">
              <CardContent className="p-4">
                <div className="flex justify-between items-center mb-4 border-b pb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-md overflow-hidden">
                      <Image 
                        src="/placeholder.svg?height=40&width=40" 
                        width={40} 
                        height={40} 
                        alt="Studio 3" 
                        className="object-cover"
                      />
                    </div>
                    <span className="font-bold text-lg">Studio 3</span>
                  </div>
                  <Badge className="bg-red-500 text-white hover:bg-red-600">Occupato</Badge>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-gray-500 mb-1">Artista: <span className="text-black">ogkkange</span></p>
                    <p className="text-gray-500 mb-1">Fascia oraria: <span className="text-black">15:00 - 18:00</span></p>
                  </div>
                  <div>
                    <p className="text-gray-500 mb-1">Telefono: <span className="text-black">366 400 7807</span></p>
                    <p className="text-gray-500 mb-1">Fonico: <span className="text-black">Emdi</span></p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Studio 4 */}
            <Card className="border">
              <CardContent className="p-4">
                <div className="flex justify-between items-center mb-4 border-b pb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-md overflow-hidden">
                      <Image 
                        src="/placeholder.svg?height=40&width=40" 
                        width={40} 
                        height={40} 
                        alt="Studio 4" 
                        className="object-cover"
                      />
                    </div>
                    <span className="font-bold text-lg">Studio 4</span>
                  </div>
                  <Badge className="bg-green-500 text-white hover:bg-green-600">Libero</Badge>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-gray-500 mb-1">Artista:</p>
                    <p className="text-gray-500 mb-1">Fascia oraria:</p>
                  </div>
                  <div>
                    <p className="text-gray-500 mb-1">Telefono:</p>
                    <p className="text-gray-500 mb-1">Fonico:</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Quick availability check */}
        <div>
          <h2 className="text-lg font-bold mb-4">Verifica rapida disponibilità</h2>
          
          <div className="mb-6">
            <p className="mb-2">Seleziona studio</p>
            <div className="flex flex-wrap gap-2">
              <Button className="bg-black text-white rounded-full hover:bg-black/90">Studio 1</Button>
              <Button variant="outline" className="bg-gray-100 border-0 rounded-full hover:bg-gray-200">Studio 2</Button>
              <Button variant="outline" className="bg-gray-100 border-0 rounded-full hover:bg-gray-200">Studio 3</Button>
              <Button variant="outline" className="bg-gray-100 border-0 rounded-full hover:bg-gray-200">Studio 4</Button>
            </div>
          </div>

          <div className="mb-6">
            <p className="mb-2">Seleziona fonico</p>
            <div className="flex flex-wrap gap-2">
              <Button variant="outline" className="bg-gray-100 border-0 rounded-full hover:bg-gray-200">Senza fonico</Button>
              <Button variant="outline" className="bg-gray-100 border-0 rounded-full hover:bg-gray-200">Tarantino</Button>
              <Button variant="outline" className="bg-gray-100 border-0 rounded-full hover:bg-gray-200">Emdi</Button>
              <Button className="bg-black text-white rounded-full hover:bg-black/90">Rivreck</Button>
              <Button variant="outline" className="bg-gray-100 border-0 rounded-full hover:bg-gray-200">MVN</Button>
              <Button variant="outline" className="bg-gray-100 border-0 rounded-full hover:bg-gray-200">Estel</Button>
              <Button variant="outline" className="bg-gray-100 border-0 rounded-full hover:bg-gray-200">Nicholas Frey</Button>
              <Button variant="outline" className="bg-gray-100 border-0 rounded-full hover:bg-gray-200">Dystopic</Button>
              <Button variant="outline" className="bg-gray-100 border-0 rounded-full hover:bg-gray-200">Sizza</Button>
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
    </div>
      </div>
    </div>
  )
}
