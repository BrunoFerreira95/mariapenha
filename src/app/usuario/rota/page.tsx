"use client";
import { useState } from "react";
import Voltar from "@assets/voltar.svg";
import Link from "next/link";
import Image from "next/image";
import Menumaria from "../../../components/Menumaria";
import Header from "@/components/Header";
import Logo from '@/components/logo'; 
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import dynamic from "next/dynamic";

const Mapa = dynamic(() => import("../../../components/Map"), { ssr: false });

const Contatos = () => {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [policePoints, setPolicePoints] = useState([]);
  const [showPolicePoints, setShowPolicePoints] = useState(false);

  const handleViewPolicePoints = (e) => {
    e.preventDefault();

    const policeLocations = [
      { name: "GCM", lat: -22.97794717549575, lng: -49.86824625696814 },
      { name: "SEDE GCM", lat: -22.985907706493986, lng: -49.86897232165561 },
      { name: "DELEGACIA DA MULHER", lat: -22.97966733718405, lng: -49.87410952060253 },
      { name: "POLÍCIA MILITAR", lat: -22.965902372024612, lng: -49.865990865022596 },
      { name: "GCM 2", lat: -22.97890047462074, lng: -49.87858783409708 },
    ];

    setPolicePoints(policeLocations);
    setShowPolicePoints(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();


    setName("");
    setAddress("");
    setPhone("");
    setMessage("");
  };

  return (
    <div className="w-screen sm:flex justify-center bg-gradient-to-b from-purple-200 to-purple-300">
      <div className="min-h-screen max-h-fit max-w-xl p-2 flex flex-col">
        <Header />

        <div className="mt-4">
          <div>
            <table className="table-auto flex justify-center">
              <thead></thead>
              <tbody>
                <tr className="bg-gray-100">
                  <td className="px-2 py-2 whitespace-nowrap">PM</td>
                  <td className="px-2 py-2 whitespace-nowrap">190</td>
                </tr>
                <tr className="bg-gray-200">
                  <td className="px-2 py-2 whitespace-nowrap">GCM 1</td>
                  <td className="px-2 py-2 whitespace-nowrap">153</td>
                </tr>
                <tr className="bg-gray-100">
                  <td className="px-2 py-2 whitespace-nowrap">GCM 2</td>
                  <td className="px-2 py-2 whitespace-nowrap">(14) 3326-4570</td>
                </tr>
                <tr className="bg-gray-200">
                  <td className="px-2 py-2 whitespace-nowrap">Delegacia da Mulher</td>
                  <td className="px-2 py-2 whitespace-nowrap">(14) 3322-5343</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="flex justify-center mt-4">
            <button
              type="button"
              onClick={handleViewPolicePoints}
              className="px-2 py-2 bg-purple-500 text-white rounded-md mt-4"
            >
              Visualizar Pontos de Policiamento
            </button>
          </div>

          {showPolicePoints && (
            <div className="mt-4">
              <Mapa/>
            </div>
          )}
        </div>
      </div>

      <Menumaria path={"./"} />
    </div>
  );
};

export default Contatos;
