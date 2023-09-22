"use client";

import React, {
  ButtonHTMLAttributes,
  DetailedHTMLProps,
  RefObject,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import Fechar from "../../assets/Fechar.svg";

import { supabase } from "@/lib/supabaseClient";

import { format } from "date-fns";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

import { Logo2, InsigniaGCM } from "@assets/export";
import Link from "next/link";

export default function GuardaHome() {
  return (
    <>
      <div className="bg-white max-h-fit min-h-screen">
        <div className="grid items-center grid-cols-3">
          <div>
          </div>

          <div className="flex justify-center">
            <Image
              className="sm:h-72 h-36 sm:w-72 w-36 mb-16"
              src={Logo2}
              alt=""
            />
          </div>
          <div className="flex justify-end mt-[-100px]">
          
          <Image
            className="sm:h-36 w-20 sm:w-36 mb-9 mr-3"
            src={InsigniaGCM}
            alt=""
          />
        </div>
        </div>
        <div className="p-4">
          <div className="overflow-x-auto flex justify-center">
            <Link
              className="bg-purple-500 hover:bg-purple-600 p-4 sm:p-5 rounded-md text-white font-semibold text-lg sm:text-xl shadow-md transition duration-300"
              href={"/guarda/emergencia"}
            >
              ALERTAS
            </Link>
          </div>
          <div className="flex justify-center mt-10">
            <form method="post">
              <button formAction={"/auth/logout"}>
                
              <Image
                src={Fechar}
                alt="Fechar"
                className="h-8 w-8"
                />
                </button>
            </form>

          </div>
        </div>
      </div>
    </>
  );
}

async function fetchAllAlertMaria(setAlerts) {
  let { data: alertaGuarda, error } = await supabase
    .from("alertaGuarda")
    .select("*");

  setAlerts(alertaGuarda?.reverse());
}
