"use client";
import Link from "next/link";
import React from "react";
import "react-toastify/dist/ReactToastify.css";
import Image from "next/image";
import Logo2 from "@assets/Logo2.png";
import Sirene from "@assets/sirene.svg";
import MenuMaria from "../../components/Menumaria";
import { supabase } from "../../lib/supabaseClient";
import { useSession } from "@supabase/auth-helpers-react";
import Instagram from "@assets/Instagram.svg";
import Site from "@assets/Site.svg";
import Facebook from "@assets/Facebook.svg";

export default function Maria() {
  const session = useSession();

  console.log(session?.user.user_metadata);

  async function createANewAlert(session, dataFormatada, latitude, longitude) {
    const { data: result, error } = await supabase
      .from("alertaGuarda")
      .insert([
        {
          nome: session?.user.user_metadata.nome,
          cpf: session?.user.user_metadata.cpf,
          telefone: session?.user.user_metadata.telefone,
          data: dataFormatada,
          latitude,
          longitude,
        },
      ])
      .select();

    console.log(result);
    console.log(error);
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

            createANewAlert(session, dataFormatada, latitude, longitude, local);
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

  return (
    <>
      <div className=" bg-purple-200 flex justify-center items-center">
        <div className="min-h-screen max-h-fit max-w-xl 0 py-2 sm:flex  sm:flex-col">
          <div className="mt-5 h-fit"></div>
          <Image
            src={Logo2}
            alt="Logo Maria da Penha"
            className="w-72 h-72 mx-auto"
            priority={true}
          />

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
              <Image src={Site} alt="Site" width={35} height={35} className="ml-4"/>
            </a>
            <a
              href="https://www.facebook.com/ServiceTecnologiaLtda/?locale=pt_BR"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image src={Facebook} alt="Facebook" width={35} height={35} className="ml-4"/>
            </a>
          </div>
          <div className="">
            <MenuMaria path={undefined} />
          </div>
        </div>
      </div>
    </>
  );
}
