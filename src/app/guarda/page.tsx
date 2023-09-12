'use client'

import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';

import { supabase } from '@/lib/supabaseClient';

import { format } from 'date-fns';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

import Sound from '../../../public/panico.mp3'
import { Logo2, InsigniaGCM } from '@assets/export'


const Mapa = dynamic(() => import('../../components/Mapa'), { ssr: false });

type AlertProps = {
  cpf: string;
  create_at: string;
  data: string;
  id: string;
  latitude: string;
  longitude: string;
  nome: string;
  telefone: string;
}[];

export default function AlertaGuarda() {
  const [alerts, setAlerts] = useState<AlertProps | null>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);

  useEffect(() => {
    supabase
      .channel('channel-alertamariadapenha')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'alertaGuarda' },
        (payload) => {
          fetchAllAlertMaria(setAlerts);
          checkNewAlerta();
        }
      )
      .subscribe();
  }, []);

  useEffect(() => {
    fetchAllAlertMaria(setAlerts);
  }, []);

  const audio = new Audio(Sound);
  const playSound = () => {
    audio.play();
  };

  const checkNewAlerta = () => {
    playSound();
  };

  const handleGoBack = () => {
    history.back();
  };

  const openDialog = () => {
    setDialogOpen(true);
  };

  const closeDialog = () => {
    setDialogOpen(false);
    setDeleteConfirmationOpen(false);
  };

  async function deleteAlert(alertId) {
    try {
      const response = await supabase
        .from('alertaGuarda')
        .delete()
        .eq('id', alertId);

      if (response.error) {
        throw new Error(response.error.message);
      }

      fetchAllAlertMaria(setAlerts);
      closeDialog();
    } catch (error) {
      console.error('Erro ao excluir alerta:', error);
    }
  }

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
          <div className="overflow-x-auto">
            <table className="w-full bg-yellow-300">
              <caption className="bg-corgcm text-white font-bold py-2 rounded-t-lg text-center">
                Lista de Ocorrências
              </caption>
              <thead>
                <tr>
                  <th className="font-bold text-black p-2 border-b border-black">
                    Nome
                  </th>
                  <th className="font-bold text-black p-2 border-b border-black">
                    Telefone
                  </th>
                  <th className="font-bold text-black p-2 border-b border-black">
                    Data
                  </th>
                  <th className="font-bold text-black p-2 border-b border-black">
                    Ações
                  </th>
                  <th className="font-bold text-black p-2 border-b border-black"></th>
                </tr>
              </thead>
              <tbody>
                <>
                  {alerts
                    ? alerts.map((alert) => (
                      <tr key={alert.id} className="bg-corgcmtabela">
                        <td className="p-2 text-center font-medium text-white border-b border-black">
                          {alert.nome}
                        </td>
                        <td className="p-2 text-center font-medium text-white border-b border-black">
                          {alert.telefone}
                        </td>
                        <td className="p-2 text-center font-medium text-white border-b border-black">
                          {format(
                            new Date(alert.data),
                            'dd/MM/yyyy HH:mm:ss'
                          )}
                        </td>
                        <td className="p-2 text-center font-medium border-b border-black">
                          <a target="_blank" rel="noopener noreferrer">
                            <button
                              onClick={openDialog}
                              className="bg-slate-300 h-8 w-24 rounded-3xl hover:bg-slate-200"
                            >
                              <span className="text-black font-bold text-sm">
                                Ver Local
                              </span>
                            </button>

                            {dialogOpen && (
                              <div className="fixed inset-0 flex items-center justify-center z-50">
                                <div className="absolute inset-0 bg-black opacity-50"></div>
                                <div className="bg-white p-4  w-1/2 rounded-lg shadow-lg z-10">
                                  <Mapa data={alert} />
                                  <button
                                    onClick={closeDialog}
                                    className="mt-4 bg-gray-300 hover:bg-gray-200 px-3 py-1 rounded-md"
                                  >
                                    Fechar
                                  </button>
                                </div>
                              </div>
                            )}
                          </a>
                        </td>

                        <td className="p-2 text-center font-medium border-b border-black">
                          <a target="_blank" rel="noopener noreferrer">
                            <button
                              onClick={() => setDeleteConfirmationOpen(true)}
                              className="bg-slate-300 h-8 w-24 rounded-3xl hover:bg-slate-200"
                            >
                              <span className="text-black font-bold text-sm">
                                Excluir
                              </span>
                            </button>
                            {deleteConfirmationOpen && (
                              <div className="fixed inset-0 flex items-center justify-center z-50">
                                <div className="absolute inset-0 bg-black opacity-50"></div>
                                <div className="bg-white p-4 w-1/2 rounded-lg shadow-lg z-10">
                                  <p className="mb-4">
                                    Deseja realmente excluir?
                                  </p>
                                  <button
                                    onClick={() => {
                                      deleteAlert(alert.id);
                                      closeDialog(); // Fechar o diálogo após a exclusão
                                    }}
                                    className="bg-red-500 hover:bg-red-400 px-3 py-1 rounded-md mr-2"
                                  >
                                    Sim
                                  </button>
                                  <button
                                    onClick={closeDialog}
                                    className="bg-gray-300 hover:bg-gray-200 px-3 py-1 rounded-md"
                                  >
                                    Cancelar
                                  </button>
                                </div>
                              </div>
                            )}
                          </a>
                        </td>
                      </tr>
                    ))
                    : null}
                </>
              </tbody>
            </table>
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
