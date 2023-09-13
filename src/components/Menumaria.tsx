'use client'

import React, { useState, useRef } from 'react';
import { FiMenu } from 'react-icons/fi';
import Image from 'next/image';
import Link from 'next/link';
import Logoservice from '@assets/Original.png';
import Contatos from '@assets/contatos.svg';
import Geolocalizacao from '@assets/geolocalizacao.png';
import { supabase } from '../lib/supabaseClient';
import Nao from '@assets/Nao.svg';
import Home from '../assets/Home.svg';
import Sair from '../assets/Sair.svg';
import Edite from '../assets/Edite.svg';

function Menumaria({ path }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen);
  };

  const handleOutsideClick = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setMenuOpen(false);
    }
  };

  return (
    <>
      <div className="flex justify-between items-center">
        <button
          className="flex justify-center items-center w-8 h-8"
          onClick={(event) => {
            event.stopPropagation();
            handleMenuToggle();
          }}
          style={{ position: 'absolute', top: '8px', left: '8px' }}
        >
          <FiMenu size={24} />
        </button>
      </div>
      {menuOpen && (
        <div
          ref={menuRef}
          className="menu-container mt-2 mr-4 rounded-md bg-purple-300 h-42 w-64"
          style={{ position: 'absolute', top: '48px', left: '30px' }}
          onClick={(event) => event.stopPropagation()}
        >
          <Link href={`/usuario`} passHref>
            <button className="w-full h-8 my-2 flex items-start justify-start menu-button ml-2">
              <Image
                src={Home}
                alt="Home"
                className="h-6 w-6 mr-2 flex-shrink-0"
              />
              <span
                className="whitespace-nowrap font-Poppins"
              >
                Botão Emergência
              </span>
            </button>
          </Link>

          <Link href={`/usuario/chat`} passHref>
            <button className="w-full h-8 my-2 flex items-start justify-start menu-button ml-2">
              <Image
                src={Nao}
                alt="Service"
                className="h-6 w-6 mr-2 flex-shrink-0"
              />
              <span
                className="whitespace-nowrap font-Poppins"
              >
                Violência Psicológica
              </span>
            </button>
          </Link>

          <Link href={`/usuario/rota`} passHref>
            <button className="w-full h-8 my-2 flex items-start justify-start menu-button ml-2">
              <Image
                src={Contatos}
                alt="Service"
                className="h-6 w-6 mr-2 flex-shrink-0"
              />
              <span
                className="whitespace-nowrap font-Poppins"
              >
                Contatos de Emergência
              </span>
            </button>
          </Link>

          <Link href={`/usuario/edite-dados`} passHref>
            <button className="w-full h-8 my-2 flex items-start justify-start menu-button ml-2">
            <Image
                src={Edite}
                alt="Service"
                className="h-6 w-6 mr-2 flex-shrink-0"
              />
              <span className="whitespace-nowrap font-Poppins">
                Edite seus dados
              </span>
            </button>
          </Link>

          <form method="post">
            <button formAction={"/auth/logout"} className="w-full h-8 my-2 flex items-start justify-start menu-button ml-2">
              <Image
                src={Sair}
                alt="Service"
                className="h-6 w-6 mr-2 flex-shrink-0"
              />
              <span
                className="whitespace-nowrap font-Poppins"
              >
                Sair
              </span>
            </button>
          </form>
        </div>
      )}
    </>
  );
}

export default Menumaria;
