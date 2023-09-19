import React from 'react'
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

type positionprops={
    name: string;
    lat: number;
    lng: number;
}[]

const policeLocations: positionprops =  [
    { name: "GCM", lat: -22.97794717549575, lng: -49.86824625696814 },
    { name: "SEDE GCM", lat: -22.985907706493986, lng: -49.86897232165561 },
    { name: "DELEGACIA DA MULHER", lat: -22.97966733718405, lng: -49.87410952060253 },
    { name: "POLÍCIA MILITAR", lat: -22.965902372024612, lng: -49.865990865022596 },
    { name: "GCM 2", lat: -22.97890047462074, lng: -49.87858783409708 },
  ];


const Map = () => {
  return (
    <div className=''>
    <MapContainer center={[policeLocations[0].lat, policeLocations[0].lng]} zoom={20} style={{ height: '500px' }}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            {policeLocations.map((location)=>(

            <Marker position={[location.lat, location.lng]}>
                <Popup>
                    {location.name}
                </Popup>
            </Marker>
            ))}
        </MapContainer>
  </div>
  )
}

export default Map