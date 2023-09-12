'use client'
import React, { useEffect, useState, useRef, RefObject } from 'react'
import Image from 'next/image'
import Link from 'next/link'

import 'react-toastify/dist/ReactToastify.css'

import MenuMaria from '../../components/Menumaria'
import { supabase } from '../../lib/supabaseClient'
import { useSession } from '@supabase/auth-helpers-react'
import { initSession } from '@/controler/admin/users/users.controler'
import { AuthSession } from '@supabase/supabase-js'

import { Logo2, Sirene, Site, Facebook, Instagram } from '@assets/export'
import dynamic from 'next/dynamic'
import { MyTimer } from '@/components/MyTimer'
import Header from '@/components/Header'
export default function Maria() {
  const [session, setSession] = useState<AuthSession | null>(null)
  const [dialogSwitch, setDialogSwitch] = useState(false)

  const dialogRef: RefObject<HTMLDialogElement> = useRef(null)
  const dialog2Ref: RefObject<HTMLDialogElement> = useRef(null)

  

  useEffect(() => {
    initSession(setSession)
  }, [])

  async function createANewAlert(dataFormatada, latitude, longitude) {


    let { data: profiles, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', session?.user?.id)
    console.log(profiles[0].full_name)

    const { data: result, error: erro2 } = await supabase
      .from('alertaGuarda')
      .insert([
        {
          nome: profiles[0].full_name,
          telefone: profiles[0].telefone,
          data: dataFormatada,
          latitude,
          longitude,
        },
      ])
      .select()
    console.log(erro2)

  }
  
  const time = new Date();
  time.setSeconds(time.getSeconds() + 10); // 10 minutes timer
  async function handleEmergencPress() {
    showModal(dialogRef)
  }

  async function handleSendAlert() {
    try {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(async (position) => {
          try {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            const dataAtual = new Date().toLocaleString("pt-BR", {
              timeZone: "UTC",
            });
            const dataFormatada = dataAtual.replace(
              /(\d+)\/(\d+)\/(\d+), (\d+):(\d+):(\d+)/,
              "$3-$2-$1 $4:$5:$6"
            );

            const ponto = {
              lat: latitude,
              lng: longitude,
            };
            let local;

            createANewAlert(dataFormatada, latitude, longitude, local)
          } catch (error) {
            console.error("Erro no processamento da localização:", error);
          }
        });
      } else {
        console.error("Geolocalização não suportada neste navegador.");
      }
    } catch (error) {
      console.error("Erro na função handleSendAlert:", error);
    }
  }

  useEffect(() => {
    if(dialogSwitch){
      showModal(dialog2Ref)
    }
  }, [dialogSwitch])

  return (
    <>
      <div className=" bg-purple-200 flex justify-center items-center">
        <div className="min-h-screen max-h-fit max-w-xl 0 py-2 sm:flex  sm:flex-col">
          <Header />

          <div className="flex justify-center">
            <div className="">
              <div className="flex justify-center mb-10">
                <button
                  className="bg-gradient-to-r from-purple-300 to-indigo-300 mt-4 w-40 h-40 sm:h-36 sm:w-36 rounded-full flex flex-col items-center justify-center shadow-lg hover:shadow-xl focus:outline-none"
                  onClick={handleSendAlert}
                >
                  <Image
                    src={Sirene}
                    alt="Emergencia"
                    className="sm:h-10 sm:w-10 h-14 w-14"
                  />
                  <p className="text-center text-white font-bold mt-2">
                    EMERGÊNCIA
                  </p>
                </button>
              </div>
            </div>
          </div>

          <div className="flex justify-center space-x-4 mt-20">
            <a
              href="https://www.instagram.com/servicesecurity/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image src={Instagram} alt="Instagram" width={35} height={35} />
            </a>
            <a
              href="https://servicesecurity.com.br/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image src={Site} alt="Site" width={35} height={35} className="ml-4" />
            </a>
            <a
              href="https://www.facebook.com/ServiceTecnologiaLtda/?locale=pt_BR"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image src={Facebook} alt="Facebook" width={35} height={35} className="ml-4" />
            </a>
          </div>
          <div className="">
            <MenuMaria path={undefined} />
          </div>
          <dialog ref={dialogRef} className='sm:w-1/4 w-1/5 rounded-lg border-2 border-black'>
            <div className='flex justify-end'>
              <button onClick={() => closeModal(dialogRef)} className='m-5'>Fechar</button>

            </div>
          </dialog >
          
        </div >
      </div >
    </>
  );
}


function showModal(dialogRef: RefObject<HTMLDialogElement>) {
  dialogRef.current?.showModal()
}

function closeModal(dialogRef: RefObject<HTMLDialogElement>) {
  dialogRef.current?.close()
}
