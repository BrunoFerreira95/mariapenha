"use client";
import { useState } from "react";
import Voltar from "@assets/voltar.svg";
import Link from "next/link";
import Image from "next/image";
import Menumaria from "../../../components/Menumaria";
import Header from "@/components/Header";
import Logo from '@/components/logo'; 

const Contatos = () => {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [policePoints, setPolicePoints] = useState([]);
  const [showPolicePoints, setShowPolicePoints] = useState(false);

  const handleViewPolicePoints = (e) => {
    e.preventDefault();

    // Simulando a busca de pontos de policiamento próximos.
    // Neste exemplo, usamos um array de objetos.
    const mockPolicePoints = [
      
      {
        name: "GCM",
        address: "Praça Mello Peixoto, s/n - Centro, Ourinhos - SP, 19900-030",
      },
      {
        name: "SEDE GCM",
        address: "R. Silva Jardim, 164 - Vila Emilia, Ourinhos - SP, 19900-191",
      },
      {
        name: "DELEGACIA DA MULHER",
        address:
          "R. Aristídes Lau Sampaio, 159 - Jardim Paulista, Ourinhos - SP, 19907-090",
      },
      {
        name: "POLÍCIA MILITAR",
        address:
        "Av. Domingos Perino, 1055 - Vila Perino, Ourinhos - SP, 19911-781",
      },
      {
        name: "GCM 2",
        address: "R. Pedro Marques de Leão, 484-654 - Jardim Paulista, Ourinhos - SP, 19907-010",
      },
      
      
    ];

    setPolicePoints(mockPolicePoints);
    setShowPolicePoints(true);

    // Abrir o Google Maps com os pontos de policiamento próximos
    const googleMapsLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
      mockPolicePoints.map((point) => point.address).join("|")
    )}`;
    window.open(googleMapsLink, "_blank");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Aqui você pode adicionar a lógica para enviar a denúncia para o servidor.
    console.log("Nome:", name);
    console.log("Endereço:", address);
    console.log("Telefone:", phone);
    console.log("Mensagem:", message);

    // Limpar os campos após o envio (opcional)
    setName("");
    setAddress("");
    setPhone("");
    setMessage("");

    // Exemplo de notificação após o envio (você pode personalizar ou remover)
    toast.success("Denúncia enviada com sucesso!", {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  return (
    <div className="w-screen sm:flex justify-center bg-gradient-to-b from-purple-200 to-purple-300">
      <div className="min-h-screen max-h-fit max-w-xl p-2 flex flex-col">
        <Header />

        <div className="mt-4">
         
            <div className="flex justify-center">
              {/* Conteúdo do formulário */}
            </div>
            <div>
              <table className="table-auto flex justify-center">
                <thead>
                  {/* Cabeçalho da tabela */}
                  
                </thead>
                <tbody>
                  {/* Linhas da tabela com cores neutras */}
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
                    <td className="px-2 py-2 whitespace-nowrap">(14) 3335-9320</td>
                  </tr>
                  <tr className="bg-gray-200">
                    <td className="px-2 py-2 whitespace-nowrap">Delegacia da Mulher</td>
                    <td className="px-2 py-2 whitespace-nowrap">(14) 3322-5343</td>
                  </tr>
                  {/* Adicione mais linhas da tabela conforme necessário */}
                </tbody>
              </table>
            </div>

            {/* Adicione o botão "Visualizar Pontos de Policiamento" e configure o link */}
            <div className="flex justify-center mt-4">
              <button
                type="button"
                onClick={handleViewPolicePoints}
                className="px-2 py-2 bg-purple-500 text-white rounded-md mt-4"
              >
                Visualizar Pontos de Policiamento
              </button>
            </div>
          
        </div>
      </div>

      <Menumaria path={"./"} />
    </div>
  );
};

export default Contatos;