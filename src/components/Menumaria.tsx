'use client'
import React, { useState, useEffect, useRef } from 'react'
import { FiMenu } from 'react-icons/fi'
import Image from 'next/image'
import Link from 'next/link'
import Logoservice from '@assets/Original.png'
import Contatos from '@assets/contatos.svg'
import Geolocalizacao from '@assets/geolocalizacao.png'
import { supabase } from '../lib/supabaseClient'
import Nao from '@assets/Nao.svg'

function Menumaria({ path }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const menuRef = useRef(null)
  

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(true)
      }
    }

    document.addEventListener('click', handleOutsideClick)

    return () => {
      document.removeEventListener('click', handleOutsideClick)
    }
  }, [])

  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen)
  }

  const handleMenuClick = (event) => {
    event.stopPropagation()
    setMenuOpen(!menuOpen)
  }

  return (
    <>
      <div className="flex justify-between items-center">
        <button
          className="flex justify-center items-center w-8 h-8"
          onClick={handleMenuClick}
          style={{ position: 'absolute', top: '8px', left: '8px' }}>
          <FiMenu size={24} />
        </button>
      </div>
      {menuOpen && (
        <div
          ref={menuRef}
          className="menu-container mt-2 mr-4 rounded-md bg-purple-300 h-42 w-56"
          style={{ position: 'absolute', top: '48px', left: '30px' }}
          onClick={(event) => event.stopPropagation()}>
          
          

          <Link href={`/usuario/chat`} passHref>
            <button className="w-full h-8 my-2 flex items-start justify-start menu-button ml-2">
              <Image
                src={Nao}
                alt="Service"
                className="h-6 w-6 mr-2 flex-shrink-0"
              />
              <span
                style={{
                  whiteSpace: 'nowrap',
                  fontFamily: 'Poppins, sans-serif'
                }}>
                Violência Psicológica
              </span>
            </button>
          </Link>

          <Link href={`/usuario/contatos`} passHref>
            <button className="w-full h-8 my-2 flex items-start justify-start menu-button ml-2">
              <Image
                src={Contatos}
                alt="Service"
                className="h-6 w-6 mr-2 flex-shrink-0"
              />
              <span
                style={{
                  whiteSpace: 'nowrap',
                  fontFamily: 'Poppins, sans-serif'
                }}>
                Contatos de Emergência
              </span>
            </button>
          </Link>

          <Link href={`/usuario/rota`} passHref>
            <button className="w-full h-8 my-2 flex items-start justify-start menu-button ml-2">
              <Image
                src={Geolocalizacao}
                alt="Service"
                className="h-6 w-6 mr-2 flex-shrink-0"
              />
              <span
                style={{
                  whiteSpace: 'nowrap',
                  fontFamily: 'Poppins, sans-serif'
                }}>
                Policiamento próximo
              </span>
            </button>
          </Link>

          <Link href={`/usuario/conhecaservice`} passHref>
            <button className="w-full h-8 my-2 flex items-start justify-start menu-button ml-2">
              <Image
                src={Logoservice}
                alt="Service"
                className="h-6 w-6 mr-2 flex-shrink-0"
              />
              <span
                style={{
                  whiteSpace: 'nowrap',
                  fontFamily: 'Poppins, sans-serif'
                }}>
                Conheça a Service
              </span>
            </button>
          </Link>
          <form method="post">
            <button formAction={"/auth/logout"} className="w-full h-8 my-2 flex items-start justify-start menu-button ml-10">
              <span
                style={{
                  whiteSpace: 'nowrap',
                  fontFamily: 'Poppins, sans-serif'
                }}>
                Sair
              </span>
            </button>
            </form>
        </div>
      )}
    </>
  )
}

export default Menumaria

const handleSignOut = () => {
  supabase.auth.signOut()
}