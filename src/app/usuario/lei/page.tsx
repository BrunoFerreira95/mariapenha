"use client"

import Link from "next/link";
import React from "react";
import Image from "next/image";
import Logo2 from '@assets/Logo2.png';
import Simbolo from "@assets/simbolo.png";
import Voltar from "@assets/voltar.svg";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Menumaria from "../../../components/Menumaria";

const Lei = () => {
  return (
    <div className="w-screen sm:flex justify-center bg-gradient-to-b from-purple-500 to-pink-200">


        <div className="min-h-screen max-h-fit  max-w-xl 0 py-2 flex  flex-col">
          <div className="m-2 ml-5">
            
          </div>
          <div className="flex justify-center sm:mt-8">
            <Image src={Logo2} alt="logo da Service Security" />
          </div>
          <div>
            
            <form className="mx-4 bg-white p-5 rounded-xl mt-4">
            <div className="flex justify-center">
                <Image className=" m-2" src={Simbolo} alt="Simbolo da maria da penha" />
              </div>
              <p className="text-justify flex justify-center text-sm">
                Art. 1° Esta Lei cria mecanismos para coibir e prevenir a violência doméstica e familiar contra a mulher, nos termo do § 8° do art. 226 da Constituição Federal, da Convenção sobre a
                Eliminação de Todas as Formas de Violência contra a Mulher, da Convenção Interamericana para Prevenir, unir e Erradicar a Violência contra a Mulher e de outros tratados internacionais ratificados pela República Federativa do Brasil;
                Dispõe sobre a criação dos Juizados de Violência Doméstica e Familiar contra a Mulher; e estabelece medidas de assistência e proteção às mulheres em situação de violência doméstica e familiar.
              </p>
             
              <div className="flex justify-center">
              <Link href={'/usuario'}>
              <Image src={Voltar} alt="Botão de voltar" className="mt-5" />
            </Link>
            </div>
            </form>
          </div>
        </div>
      
      <Menumaria path={"./"}/>
    </div>

  );
};

export default Lei