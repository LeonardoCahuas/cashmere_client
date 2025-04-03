"use client"

import React from "react"
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api"

const containerStyle = {
  width: "100%",
  height: "400px",
}

const center = {
  lat: 45.451188,
  lng: 9.241651
}

export default function MapsSection() {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '',
  })

  if (loadError) return <p>Errore nel caricamento della mappa</p>
  if (!isLoaded) return <p>Caricamento in corso...</p>

  return (
    <div className="w-full">
      <h2 className="font-bold text-3xl mb-4">Dove siamo</h2>
      <div className="rounded-lg overflow-hidden">
        <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={15}>
          <Marker position={center} />
        </GoogleMap>
      </div>
      <h4 className="text-xl font-bold mt-4 mb-2">Via Oreste Salomone, 61, 20138 Milano (MI)</h4>
      <p className="text-gray-400">Una volta arrivati all’entrata dello stabile, citofonare al citofono Cashmere Studio.</p>
    </div>
  )
}
