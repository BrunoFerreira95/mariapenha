"use client";
import React, { useState, useEffect, useRef, RefObject } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { supabase } from "@/lib/supabaseClient";
import { format } from "date-fns";
import { Logo2, InsigniaGCM } from "@assets/export";
import ButtonVoltar from "@/components/voltar";
import { ConnectFirebase } from "@/lib/firebase";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const Mapa = dynamic(() => import("../../../components/Mapa"), { ssr: false });

type AlertProps = {
  cpf: string;
  create_at: string;
  data: string;
  id: string;
  latitude: string;
  longitude: string;
  nome: string;
  telefone: string;
  status: string;
}[];

export default function AlertaGuarda() {
  const [alerts, setAlerts] = useState<AlertProps | null>([]);
  const [alertData, setAlertData] = useState();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogOpenEndereco, setDialogOpenEndereco] = useState(false);
  const [openConfimation, setOpenConfimation] = useState(false);
  const [vitima, setVitima] = useState({});
  const { firestore, pc } = ConnectFirebase();
  let localStream = null;
  let remoteStream = null;
  const voiceSound = useRef(null);
  const remoteVideo = useRef<HTMLVideoElement>(null);
  const callInput = useRef<HTMLInputElement>({ current: null });
  const [inputCallValue, setInputCallValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  supabase
    .channel("custom-insert-channel22222")
    .on(
      "postgres_changes",
      { event: "INSERT", schema: "public", table: "codigoComunicacao" },
      (payload) => {
        setInputCallValue(payload.new.codigo);
        setCurrentPage(1);
      }
    )
    .subscribe();

  const dialogRef1: RefObject<HTMLDialogElement> = useRef(null);
  const [modalConfirmationClosed, setModalConfirmationClosed] = useState(false);


  // ------------------------------------------------------------------- VOICE CALL --------------------------------------------------------------------------------
  // // VOICE CALL ---------------------------------------------------------------------------------
  const voiceClick = async () => {
    localStream = await navigator?.mediaDevices.getUserMedia({
      video: false,
      audio: true,
    });
    remoteStream = new MediaStream();

    // Push tracks from local stream to peer connection
    localStream.getTracks().forEach((track) => {
      pc.addTrack(track, localStream);
    });

    // Pull tracks from remote stream, add to video stream
    pc.ontrack = (event) => {
      event.streams[0].getTracks().forEach((track) => {
        remoteStream.addTrack(track);
      });
    };
    const videoElementRemote = voiceSound.current;
    videoElementRemote.srcObject = remoteStream;

    VoiceCallSound();
  };

  // 2. Create an offer
  const VoiceCallSound = async () => {
    // Reference Firestore collections for signaling
    const callDoc = firestore.collection("call").doc();
    const offerCandidates = callDoc.collection("offerCandidates");
    const answerCandidates = callDoc.collection("answerCandidates");

    callInput.current.value = callDoc.id;
    setInputCallValue(callInput.current?.value);

    const { data, error } = await supabase
      .from("codigoComunicacao")
      .insert([
        { codigo: callInput.current?.value, id_vitima: vitima?.idUser },
      ]);
    // Get candidates for caller, save to db
    pc.onicecandidate = (event) => {
      event.candidate && offerCandidates.add(event.candidate.toJSON());
    };

    // Create offer
    const offerDescription = await pc.createOffer();
    await pc.setLocalDescription(offerDescription);

    const offer = {
      sdp: offerDescription.sdp,
      type: offerDescription.type,
    };

    await callDoc.set({ offer });

    // Listen for remote answer
    callDoc.onSnapshot((snapshot) => {
      const data = snapshot.data();
      if (!pc.currentRemoteDescription && data?.answer) {
        const answerDescription = new RTCSessionDescription(data.answer);
        pc.setRemoteDescription(answerDescription);
      }
    });

    // When answered, add candidate to peer connection
    answerCandidates.onSnapshot((snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === "added") {
          const candidate = new RTCIceCandidate(change.doc.data());
          pc.addIceCandidate(candidate);
        }
      });
    });
  };

  const handleConfirmation2 = async () => {
    const { data, error } = await supabase
      .from("alertaGuarda")
      .update({ status: "confirmado" })
      .eq("id", vitima?.id)
      .select();
    setOpenConfimation(false);
    voiceClick();
    setModalConfirmationClosed(true);  // Atualiza o estado para indicar que o modal de confirmação foi fechado
  };

  supabase
    .channel("custom-insert-channel")
    .on(
      "postgres_changes",
      { event: "INSERT", schema: "public", table: "errorConnect" },
      (payload) => {
        showModal(dialogRef1);
      }
    )
    .subscribe();

  // 3. Answer the call with the unique ID
  const voiceReceiverCall = async () => {
    const callId = callInput.current.value;
    console.log(callId);
    const callDoc = firestore.collection("call").doc(callId);
    const answerCandidates = callDoc.collection("answerCandidates");
    const offerCandidates = callDoc.collection("offerCandidates");

    pc.onicecandidate = (event) => {
      event.candidate && answerCandidates.add(event.candidate.toJSON());
    };

    const callData = (await callDoc.get()).data();

    if (callData) {
      const offerDescription = callData.offer;
      await pc.setRemoteDescription(
        new RTCSessionDescription(offerDescription)
      );

      const answerDescription = await pc.createAnswer();
      await pc.setLocalDescription(answerDescription);

      const answer = {
        type: answerDescription.type,
        sdp: answerDescription.sdp,
      };

      await callDoc.update({ answer });

      offerCandidates.onSnapshot((snapshot) => {
        snapshot.docChanges().forEach((change) => {
          console.log(change);
          if (change.type === "added") {
            let data = change.doc.data();
            pc.addIceCandidate(new RTCIceCandidate(data));
          }
        });
      });
    }
  };

  const openDialog = (alert) => {
    setAlertData(alert);
    setDialogOpen(true);
  };

  const openDialogEndereco = (alert) => {
    setAlertData(alert);
    setDialogOpenEndereco(true);
  };

  supabase
    .channel("channel-alertamariadapenha")
    .on(
      "postgres_changes",
      { event: "INSERT", schema: "public", table: "alertaGuarda" },
      (payload) => {
        fetchAlertsByPage(1);
        setVitima(payload.new);
        const audio = new Audio("/panico.mp3");
        audio.play();
        setOpenConfimation(true);
        setCurrentPage(1); // Adicione esta linha para voltar à primeira página
      }
    )
    .subscribe();

  const fetchAlertsByPage = async (page: number) => {
    const offset = (page - 1) * itemsPerPage;
    const { data: alertaGuarda, error } = await supabase
      .from("alertaGuarda")
      .select("*")
      .range(offset, offset + itemsPerPage - 1)
      .order("created_at", { ascending: false }); // Ordenar por data, do mais recente para o mais antigo

    setAlerts(alertaGuarda);
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage + 1, 1));
    fetchAlertsByPage(currentPage + 1);
  };

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
    fetchAlertsByPage(currentPage - 1);
  };
  useEffect(() => {
    fetchAlertsByPage(1); // Carrega a primeira página inicialmente
  }, []);

  const closeDialog = () => {
    setDialogOpen(false);
  };

  const closeDialog2 = () => {
    setDialogOpenEndereco(false);
  };

  const fecharDialog = () => {
    if (dialogRef1.current) {
      dialogRef1.current.close();
    }
  };

  const handleConfirmation = async () => {
    const { data, error } = await supabase
      .from("alertaGuarda")
      .update({ status: "confimado" })
      .eq("id", vitima?.id)
      .select();
    setOpenConfimation(false);
    voiceClick();
  };

  const handleResolve = async (alert) => {
    const { data, error } = await supabase
      .from("alertaGuarda")
      .update({ cor: "bg-green-500" }) // Atualize a cor e o status
      .eq("id", alert.id)
      .select();
    fetchAlertsByPage(1);
  };

  // Função para ordenar os alertas por data e hora
  // const sortAlertsByDateTime = (alerts) => {
  //   return alerts.sort((a, b) => {
  //     const dateA = new Date(a.data);
  //     const dateB = new Date(b.data);
  //     return dateB - dateA;
  //   });
  // };
  const router = useRouter();

  async function resetPage() {
    const { data, error } = await supabase
      .from("resetCall")
      .insert([{ id_receiver: vitima?.idUser }])
      .select();

    location.reload();
  }
  return (
    <>
      <div className="">
        <div className="grid items-center grid-cols-3">
          <div></div>
          <ButtonVoltar />
          <div className="flex justify-center">
            <Image
              className="sm:h-52 h-28 w-28 sm:w-52"
              src={Logo2}
              alt=""
            />
          </div>
          <div className="flex justify-end ">
            <Image
              className="sm:h-36 w-20 sm:w-36 mr-3 md:mb-8"
              src={InsigniaGCM}
              alt=""
            />
          </div>
        </div>
        <div className="flex justify-center">
          {modalConfirmationClosed && (
            <button
              className="bg-red-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-red-600"
              onClick={resetPage}
            >
              Cancelar Chamada
            </button>
          )}
          <input
            ref={callInput}
            className="bg-white h-8 font-semibold rounded-md mb-2"
            defaultValue={inputCallValue}
            hidden
          />
        </div>
        <audio
          className="h-20 w-96 bg-black"
          ref={voiceSound}
          autoPlay
          hidden
          controls
        ></audio>
        <div className="p-4">
          <div className="overflow-x-auto">
            <table className="w-full bg-yellow-300">
              <caption className="bg-corgcm text-black font-bold py-2 rounded-t-lg text-center text-2xl">
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
                    Geolocalização
                  </th>
                  <th className="font-bold text-black p-2 border-b border-black"></th>
                </tr>
              </thead>
              <tbody>
                <>
                  {alerts
                    ? alerts.map((alert) => (
                        <tr key={alert.id} className={`${alert.cor}`}>
                          <td className="p-2  text-center font-medium text-black border-b border-black">
                            {alert.nome}
                          </td>
                          <td className="p-2 text-center font-medium text-black border-b border-black">
                            {alert.telefone}
                          </td>
                          <td className="p-2 text-center font-medium text-black border-b border-black">
                            {format(
                              new Date(alert.data),
                              "dd/MM/yyyy HH:mm:ss"
                            )}
                          </td>
                          <td className="p-2 text-center font-medium border-b border-black">
                            <span className="bg-yellow-500 hover:bg-yellow-600 m-2 text-white font-semibold py-1 px-4 rounded-full transition duration-300 ease-in-out transform hover:scale-105">
                              {Number(alert.precisao).toFixed(1)}m
                            </span>
                            <a target="_blank" rel="noopener noreferrer">
                              <button
                                onClick={(e) => openDialog(alert)}
                                className="bg-slate-300 m-2 h-8 w-24 rounded-3xl hover:bg-slate-200"
                              >
                                <span className="text-black font-bold text-sm">
                                  Localização
                                </span>
                              </button>
                              <button
                                onClick={(e) => openDialogEndereco(alert)}
                                className="bg-slate-300 md:m-2 h-8 w-24 rounded-3xl hover:bg-slate-200"
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
                                      <label htmlFor="nome">
                                        Nome completo:
                                      </label>
                                      <input
                                        className="border-2 border-black rounded-lg"
                                        type="text"
                                        defaultValue={alertData?.nome}
                                      />
                                      <label htmlFor="telefone">
                                        Telefone:
                                      </label>
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
                                          onClick={handleConfirmation2}
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
                          <td
                            className={`p-2 text-center font-medium border-b border-black`}
                          >
                            <Button
                              onClick={() => handleResolve(alert)}
                              className={`${
                                alert.cor === "bg-green-500"
                                  ? "bg-blue-500"
                                  : "bg-red-500"
                              }  hover:bg-slate-500`}
                            >
                              <span className="text-black">
                                {alert.cor === "bg-green-500"
                                  ? "Resolvido"
                                  : "Resolver"}
                              </span>
                            </Button>
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
      <div className="flex justify-center">
        <button
          className="bg-blue-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-blue-600"
          onClick={handlePreviousPage}
          disabled={currentPage <= 1} // Desabilitar o botão quando estiver na primeira página
        >
          Anterior
        </button>

        <button
          className="bg-blue-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-blue-600 ml-4"
          onClick={handleNextPage}
        >
          Próximo
        </button>
      </div>
      <dialog
        ref={dialogRef1}
        className="sm:w-1/4 md:w-1/3 lg:w-1/4 rounded-lg border-2 fixed inset-0 z-50"
        style={{ maxHeight: "80vh" }}
      >
        <div className="flex justify-end"></div>
        <div className="flex justify-center p-3">
          <span>
            Lamentavelmente, houve um problema com a reprodução do áudio. Por favor, entre em contato com a pessoa afetada ligando diretamente para o celular dela.
          </span>
          <div className="flex justify-center"></div>
          <button
            className="h-11 mt-10 bg-gray-300 hover:bg-gray-200 px-3 py-1 rounded-md"
            onClick={fecharDialog}
          >
            Fechar
          </button>
        </div>
      </dialog>
    </>
  );
}

// Restante do código

async function fetchAllAlertMaria(setAlerts) {
  let { data: alertaGuarda, error } = await supabase
    .from("alertaGuarda")
    .select("*");

  setAlerts(alertaGuarda?.reverse());
}

function showModal(dialogRef: RefObject<HTMLDialogElement>) {
  dialogRef.current?.showModal();
}

function closeModal(dialogRef: RefObject<HTMLDialogElement>) {
  dialogRef.current?.close();
} 