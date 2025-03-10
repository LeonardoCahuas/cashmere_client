"use client"

import React from "react"
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api"

interface MapProps {
  center: {
    lat: number
    lng: number
  }
}

const containerStyle = {
  width: "100%",
  height: "400px",
}

const center ={
    lat: 45.451188,
    lng: 9.241651
  }
export default function MapsSection() {
  return (
    <div className="w-full">
        <h2 className="font-bold text-3xl mb-4">Dove siamo</h2>
      <div className="rounded-lg overflow-hidden">
        <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ''} >
          <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={15}>
            <Marker position={center} />
          </GoogleMap>
        </LoadScript>
      </div>
      <h4 className="text-xl font-bold mt-4 mb-2">Via Oreste Salomone, 61, 20138 Milano (MI)</h4>
      <p className="text-gray-400">Una volta arrivati all’entrata dello stabile, citofonare al citofono Cashmere Studio.</p>
    </div>
  )
}