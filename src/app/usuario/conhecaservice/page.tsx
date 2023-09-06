"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Logo2 from '@assets/Logo2.png';
import "react-toastify/dist/ReactToastify.css";
import ReactPlayer from "react-player";
import Voltar from "@assets/voltar.svg";
import Menumaria from "../../../components/Menumaria";

const Service = () => {
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
  }, [])
  return (
    <div className="w-screen sm:flex justify-center min-h-screen max-h-fit bg-gradient-to-b from-purple-500 to-pink-200">

      <div className="max-w-xl 0 py-2">
        <div className="mt-5 h-fit"></div>
        <div className="m-2 ml-5">
          <button>
            
          </button>
        </div>
        <div className="flex justify-center sm:mt-8">
          <Image src={Logo2} alt="logo da Service Security" />
        </div>
        <div>
          <form className="flex justify-center mx-4 flex-col bg-white p-5 rounded-xl mt-4 sm:w-6/6 sm:h-2/5">
            <p className="text-clip text-black flex justify-center m-1">
              
            </p>
            <div className="flex justify-center">
              {loading ? (
                <ReactPlayer className="" url={"https://www.youtube.com/watch?v=s5-etJldCVk"} width="auto" height="auto" />

              ) : null}
            </div>
            <div className="flex justify-center">
            <Link href={'/usuario'}>
              <Image src={Voltar} alt="Botão de voltar" className="mt-5" />
            </Link>
            </div>
          </form>
          <div className="flex justify-center m-2"></div>
        </div>
      </div>
      <Menumaria path={"./"}/>
    </div>
  );
};

export default Service;
