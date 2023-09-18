'use client'
import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { supabase } from '@/lib/supabaseClient';
import { format } from 'date-fns';
import { Logo2, InsigniaGCM } from '@assets/export';
import ButtonVoltar from '@/components/voltar';

const Mapa = dynamic(() => import('../../../components/Mapa'), { ssr: false });

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
  const [alertData, setAlertData] = useState();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogOpenEndereco, setDialogOpenEndereco] = useState(false);
  const [openConfimation, setOpenConfimation] = useState(false);
  const [vitima, setVitima] = useState({});

  const openDialog = (alert) => {
    setAlertData(alert);
    setDialogOpen(true);
  };

  const openDialogEndereco = (alert) => {
    setAlertData(alert);
    setDialogOpenEndereco(true);
  };

  supabase
    .channel('channel-alertamariadapenha')
    .on(
      'postgres_changes',
      { event: 'INSERT', schema: 'public', table: 'alertaGuarda' },
      (payload) => {
        fetchAllAlertMaria(setAlerts);
        setOpenConfimation(true);
        setVitima(payload.new);
        const audio = new Audio('/panico.mp3');
        audio.play();
      }
    )
    .subscribe();

  useEffect(() => {
    fetchAllAlertMaria(setAlerts);
  }, []);

  const closeDialog = () => {
    setDialogOpen(false);
  };

  const closeDialog2 = () => {
    setDialogOpenEndereco(false);
  };

  const handleConfirmation = async () => {
    const { data, error } = await supabase
      .from('alertaGuarda')
      .update({ status: 'confimado' })
      .eq('id', vitima?.id)
      .select();

    console.log(data);
    console.log(error);
    setOpenConfimation(false);
  };

  const handleResolve = async (alert) => {

    const { data, error } = await supabase
      .from('alertaGuarda')
      .update({ cor: 'bg-green-500' })
      .eq('id', alert.id)
      .select()
    fetchAllAlertMaria(setAlerts)
  }
  return (
    <>
      <div className="bg-white max-h-fit min-h-screen">
        <div className="grid items-center grid-cols-3">
          <div></div>
          <ButtonVoltar />
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
                      <tr key={alert.id} className={`${alert.cor}`}>
                        <td className="p-2  text-center font-medium text-white border-b border-black">
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
                              onClick={(e) => openDialog(alert)}
                              className="bg-slate-300 h-8 w-24 rounded-3xl hover:bg-slate-200"
                            >
                              <span className="text-black font-bold text-sm">
                                Localização
                              </span>
                            </button>
                            <button
                              onClick={(e) => openDialogEndereco(alert)}
                              className="bg-slate-300 md:ml-2 mt-2 h-8 w-24 rounded-3xl hover:bg-slate-200"
                            >
                              <span className="text-black font-bold text-sm">
                                Endereço
                              </span>
                            </button>
                            {dialogOpenEndereco && (
                              <>
                                <div className="fixed inset-0 flex items-center justify-center z-50">
                                  <div className="absolute inset-0 bg-black opacity-50"></div>
                                  <div className="bg-white p-4 flex flex-col sm:w-1/4 md:w-2/4 lg:w-1/4 rounded-lg shadow-lg z-10">
                                    <label htmlFor="nome">Nome completo:</label>
                                    <input
                                      className="border-2 border-black rounded-lg"
                                      type="text"
                                      defaultValue={alertData?.nome}
                                    />
                                    <label htmlFor="telefone">Telefone:</label>
                                    <input
                                      className="border-2 border-black rounded-lg"
                                      type="text"
                                      defaultValue={alertData?.telefone}
                                    />
                                    <label htmlFor="rua">Rua:</label>
                                    <input
                                      type="text"
                                      defaultValue={alertData?.rua}
                                      className="border-2 border-black rounded-lg"
                                    />
                                    <label htmlFor="numero">Numero:</label>
                                    <input
                                      type="text"
                                      defaultValue={alertData?.numero}
                                      className="border-2 border-black rounded-lg"
                                    />
                                    <label htmlFor="bairro">Bairro:</label>
                                    <input
                                      type="text"
                                      defaultValue={alertData?.bairro}
                                      className="border-2 border-black rounded-lg"
                                    />
                                    <label htmlFor="cidade">Cidade:</label>
                                    <input
                                      type="text"
                                      defaultValue={alertData?.cidade}
                                      className="border-2 border-black rounded-lg"
                                    />
                                    <button
                                      onClick={closeDialog2}
                                      className="mt-4 bg-gray-300 hover:bg-gray-200 px-3 py-1 rounded-md"
                                    >
                                      Fechar
                                    </button>
                                  </div>
                                </div>
                              </>
                            )}
                            {openConfimation && (
                              <>
                                <div className="fixed inset-0 flex items-center justify-center z-50">
                                  <div className="absolute inset-0 bg-black opacity-50"></div>
                                  <div className="bg-white p-4 flex flex-col w-1/4 rounded-lg shadow-lg z-10">
                                    Confirme o alerta
                                    <div>
                                      <button
                                        onClick={handleConfirmation}
                                        className="p-5 mt-2 bg-green-500 rounded-lg"
                                      >
                                        Sim, recebi
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </>
                            )}
                            {dialogOpen && (
                              <div className="fixed inset-0 flex items-center justify-center z-50">
                                <div className="absolute inset-0 bg-black opacity-50"></div>
                                <div className="bg-white p-4 w-1/2 rounded-lg shadow-lg z-10">
                                  <Mapa data={alertData} />
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
                            <td>
                              <button onClick={() => handleResolve(alert)} className='bg-slate-300 md:ml-2 mt-2 h-8 w-24 rounded-3xl hover:bg-slate-200'>
                                <span className="text-black font-bold text-sm">Resolvido</span>
                              </button>
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
  );
}

async function fetchAllAlertMaria(setAlerts) {
  let { data: alertaGuarda, error } = await supabase
    .from('alertaGuarda')
    .select('*');

  setAlerts(alertaGuarda?.reverse());
}
