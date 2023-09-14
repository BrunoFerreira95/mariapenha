'use client'

import React, { ButtonHTMLAttributes, DetailedHTMLProps, RefObject, useEffect, useLayoutEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';

import { supabase } from '@/lib/supabaseClient';

import { format } from 'date-fns';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';


import { Logo2, InsigniaGCM } from '@assets/export'
import Link from 'next/link';



export default function AlertaGuarda() {

  return (
    <>
      <div className="bg-white max-h-fit min-h-screen">
        <div className="grid items-center grid-cols-3">
          <div>
          </div>

          <div className="flex justify-center">
            <Image
              className="sm:h-52 h-28 w-28 sm:w-52 mb-16"
              src={Logo2}
              alt=""
            />
          </div>
          <div className="flex justify-end ">
            <Image
              className=" sm:h-36 w-20 sm:w-36 mb-16 mr-3"
              src={InsigniaGCM}
              alt=""
            />
          </div>
        </div>
        <div className="p-4">
          <div className="overflow-x-auto flex justify-center">
            <Link className='bg-purple-500 p-5 rounded-lg text-white' href={'/guarda/emergencia'}>
              Alertas
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}

async function fetchAllAlertMaria(setAlerts) {
  let { data: alertaGuarda, error } = await supabase
    .from('alertaGuarda')
    .select('*');

  setAlerts(alertaGuarda?.reverse());
}
