'use client'
import React from 'react'
import 'leaflet/dist/leaflet.css'; // Importa os estilos do Leaflet
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'react-leaflet';

type AlertProps = {
    data: {

        cpf: string;
        data: string;
        id: string;
        latitude: string; // Changed to string based on the provided data
        longitude: string; // Changed to string based on the provided data
        nome: string;
        telefone: string;
    }

};


const Mapa = (data: AlertProps) => {
    return (

        <MapContainer center={[data.data.latitude, data.data.longitude]} zoom={20} style={{ height: '500px' }}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <Marker position={[data.data.latitude, data.data.longitude]}>
                <Popup>
                    {'teste'}
                </Popup>
            </Marker>
        </MapContainer>
    );
};



export default Mapa