import React from 'react'
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

type positionprops={
    name: string;
    lat: number;
    lng: number;
    id:number;
}[]

const policeLocations: positionprops =  [
    { id:1, name: "GCM - Praça Mello Peixoto", lat: -22.97794717549575, lng: -49.86824625696814 },
    { id:2,name: "SEDE GCM - R. Silva Jardim, 164 - Vila Emilia", lat: -22.985907706493986, lng: -49.86897232165561 },
    { id:3,name: "DELEGACIA DA MULHER - R. Aristídes Lau Sampaio, 159 - Jardim Paulista", lat: -22.97966733718405, lng: -49.87410952060253 },
    { id:4,name: "POLÍCIA MILITAR - Av. Domingos Perino, 1055 - Vila Perino", lat: -22.965902372024612, lng: -49.865990865022596 },
    { id:5,name: "GCM - Praça dos Burgueses - Jardim Paulista", lat: -22.97890047462074, lng: -49.87858783409708 },
  ];


const Map = () => {
  return (
    <div className=''>
    <MapContainer center={[policeLocations[0].lat, policeLocations[0].lng]} zoom={20} style={{ height: '500px' }}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            {policeLocations.map((location)=>(

            <Marker key={location.id} position={[location.lat, location.lng]}>
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