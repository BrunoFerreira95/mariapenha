'use client'
import { useState } from 'react';
import Voltar from "@assets/voltar.svg";
import Link from 'next/link';
import Image from 'next/image';
import Menumaria from '../../../components/Menumaria';

const Rota = () => {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [policePoints, setPolicePoints] = useState([]);
  const [showPolicePoints, setShowPolicePoints] = useState(false);

  const handleViewPolicePoints = (e) => {
    e.preventDefault();

    // Simulando a busca de pontos de policiamento próximos.
    // Neste exemplo, usamos um array de objetos.
    const mockPolicePoints = [
      { name: 'GCM 1 ', address: 'Praça dos Burgueses, s/n - Jardim Paulista, Ourinhos - SP, 19907-120' },
      { name: 'GCM 2', address: 'Praça Mello Peixoto, s/n - Centro, Ourinhos - SP, 19900-030' },
      { name: 'GCM 3', address: 'R. Silva Jardim, 164 - Vila Emilia, Ourinhos - SP, 19900-191' },
      { name: 'Delegacia da Mulher Ourinhos', address: 'R. Aristídes Lau Sampaio, 159 - Jardim Paulista, Ourinhos - SP, 19907-090' },
      // ... mais pontos de policiamento
    ];

    setPolicePoints(mockPolicePoints);
    setShowPolicePoints(true);

    // Abrir o Google Maps com os pontos de policiamento próximos
    const googleMapsLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
      mockPolicePoints.map((point) => point.address).join('|')
    )}`;
    window.open(googleMapsLink, '_blank');
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Aqui você pode adicionar a lógica para enviar a denúncia para o servidor.
    console.log('Nome:', name);
    console.log('Endereço:', address);
    console.log('Telefone:', phone);
    console.log('Mensagem:', message);

    // Limpar os campos após o envio (opcional)
    setName('');
    setAddress('');
    setPhone('');
    setMessage('');

    // Exemplo de notificação após o envio (você pode personalizar ou remover)
    toast.success('Denúncia enviada com sucesso!', {
      position: 'top-center',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'light',
    });
  };

  return (
    <div className="w-screen sm:flex justify-center bg-gradient-to-b from-purple-500 to-pink-200">
      <div className="min-h-screen max-h-fit max-w-xl 0 py-2 flex flex-col">
        {/* ... Resto do seu código ... */}
        <div className="flex justify-center mt-4">
          <button
            type="button"
            onClick={handleViewPolicePoints}
            className="px-6 py-2 bg-purple-500 text-white rounded-md mt-10"
          >
            Visualizar Pontos de Policiamento
          </button>
        </div>

        {showPolicePoints && (
          <div>
            <h2 className="mt-4 text-lg font-bold ml-2">Pontos de Policiamento Próximos:</h2>
            <ul>
              {policePoints.map((point, index) => (
                <li key={index} className="mb-10 ml-2 mr-2">
                  {point.name} - {point.address}
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="flex justify-center mt-4">
        <Link href={'/usuario'}>
            <Image src={Voltar} alt="Botão de voltar" className="mb-4" />
          </Link>
        </div>
      </div>

      <div className="flex justify-center">
        <Menumaria path="./" />
      </div>
    </div>
  );
};

export default Rota;