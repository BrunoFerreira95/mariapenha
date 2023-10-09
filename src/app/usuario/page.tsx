"use client";
import React, { useEffect, useState, useRef, RefObject } from "react";
import Image from "next/image";
import Link from "next/link";
import "react-toastify/dist/ReactToastify.css";
import { supabase } from "../../lib/supabaseClient";
import { useSession } from "@supabase/auth-helpers-react";
import { initSession } from "@/controler/admin/users/users.controler";
import { AuthSession } from "@supabase/supabase-js";
import { Logo2, Sirene, Site, Facebook, Instagram } from "@assets/export";
import dynamic from "next/dynamic";
import { MyTimer } from "@/components/MyTimer";
import Header from "@/components/Header";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ConnectFirebase } from "@/lib/firebase";
import { Button } from "@/components/ui/button";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import Logo from "../../assets/Logo.png";

const Mapa = dynamic(() => import("../../components/Map"), { ssr: false });

const chamadaCancelada = () =>
  toast.success("A GCM desligou a chamada!", {
    position: "top-center",
    autoClose: 15000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });

const notify = () =>
  toast.success("A GCM recebeu o seu sinal!", {
    position: "top-center",
    autoClose: 15000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });

export default function Maria() {
  const [session, setSession] = useState<AuthSession | null>(null);
  const [dialogSwitch, setDialogSwitch] = useState(false);
  const { firestore, pc } = ConnectFirebase();
  let localStream = null;
  let remoteStream = null;
  const voiceSound = useRef(null);
  const remoteVideo = useRef<HTMLVideoElement>(null);
  const callInput = useRef<HTMLInputElement>({ current: null });
  const [inputCallValue, setInputCallValue] = useState("");
  const [policePoints, setPolicePoints] = useState([]);
  const [showPolicePoints, setShowPolicePoints] = useState(false);
  const handleViewPolicePoints = (e) => {
    e.preventDefault();

    const policeLocations = [
      { name: "GCM", lat: -22.97794717549575, lng: -49.86824625696814 },
      { name: "SEDE GCM", lat: -22.985907706493986, lng: -49.86897232165561 },
      {
        name: "DELEGACIA DA MULHER",
        lat: -22.97966733718405,
        lng: -49.87410952060253,
      },
      {
        name: "POLÍCIA MILITAR",
        lat: -22.965902372024612,
        lng: -49.865990865022596,
      },
      { name: "GCM 2", lat: -22.97890047462074, lng: -49.87858783409708 },
    ];

    setPolicePoints(policeLocations);
    setShowPolicePoints(true);
  };

  const dialogRef: RefObject<HTMLDialogElement> = useRef(null);
  const dialogRef2: RefObject<HTMLDialogElement> = useRef(null);
  const dialog2Ref: RefObject<HTMLDialogElement> = useRef(null);
  // ------------------------------------------------------------------- VOICE CALL --------------------------------------------------------------------------------
  // // VOICE CALL ---------------------------------------------------------------------------------
  const voiceClick = async () => {
    localStream = await navigator.mediaDevices.getUserMedia({
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

    voiceReceiverCall();
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
      .insert([{ codigo: callInput.current?.value }]);
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
  supabase
    .channel('custom-insert-channel22222')
    .on(
      'postgres_changes',
      { event: 'INSERT', schema: 'public', table: 'codigoComunicacao' },
      (payload) => {
        setInputCallValue(payload.new.codigo)
        if (payload.new.id_vitima === session?.user.id) {
          showModal(dialogRef2)
          voiceClick()
        }
      }
    )
    .subscribe()


  // 3. Answer the call with the unique ID
  const voiceReceiverCall = async () => {
    if (callInput.current.value.length < 0) {
    }
    const callId = callInput.current.value;
    console.log("teste", callId);
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
            if (pc?.iceConnectionState === 'closed' || pc?.iceConnectionState === 'disconnected' || pc?.iceConnectionState === 'failed') {
              SendErrorConnect()


            } else {
            }
          }
        });
      });
    }
  };

  async function SendErrorConnect() {
    await supabase
      .from('errorConnect')
      .insert([
        { connect: 'error' },
      ])
      .select()
  }

  useEffect(() => {
    initSession(setSession);
  }, []);

  async function createANewAlert(
    dataFormatada,
    latitude,
    longitude,
    local,
    precisao
  ) {
    let { data: profiles, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", session?.user?.id);
    const { data: result, error: erro2 } = await supabase
      .from("alertaGuarda")
      .insert([
        {
          nome: profiles[0].full_name,
          telefone: profiles[0].telefone,
          data: dataFormatada,
          latitude,
          longitude,
          rua: profiles[0].rua,
          bairro: profiles[0].bairro,
          cidade: profiles[0].cidade,
          numero: profiles[0].numero,
          idUser: profiles[0].id,
          precisao,
        },
      ])
      .select();
  }

  const time = new Date();
  time.setSeconds(time.getSeconds() + 10); // 10 minutes timer
  async function handleEmergencPress() {
    showModal(dialogRef);
  }

  async function handleSendAlert() {
    try {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            try {
              const latitude = position.coords.latitude;
              const longitude = position.coords.longitude;
              const precisao = position.coords.accuracy; // Obtém a precisão em metros
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

              // Agora você pode usar 'precisao' em sua função ou armazená-la para referência futura
              if (precisao) {
                createANewAlert(
                  dataFormatada,
                  latitude,
                  longitude,
                  local,
                  precisao
                );
                showModal(dialogRef);
              }
            } catch (error) {
              console.error("Erro no processamento da localização:", error);
            }
          },
          (error) => {
            // Tratamento de erros aqui
            console.error("Erro na solicitação de localização:", error);
          },
          {
            enableHighAccuracy: true, // Solicita alta precisão
          }
        );
      } else {
        console.error("Geolocalização não suportada neste navegador.");
      }
    } catch (error) {
      console.error("Erro na função handleSendAlert:", error);
    }
  }

  useEffect(() => {
    if (dialogSwitch) {
      showModal(dialog2Ref);
    }
  }, [dialogSwitch]);

  supabase
    .channel("updating-confimation-user")
    .on(
      "postgres_changes",
      { event: "UPDATE", schema: "public", table: "alertaGuarda" },
      (payload) => {
        if (payload.new.idUser === session?.user.id) {
          if (payload.new.cor === "bg-green-500") {
            return;
          }
          notify();
          closeModal(dialogRef)
        }
      }
    )
    .subscribe();


  supabase.channel('custom-insert-channelreset-call')
    .on(
      'postgres_changes',
      { event: 'INSERT', schema: 'public', table: 'resetCall' },
      (payload) => {
        if (payload.new.id_receiver === session?.user.id) {
          chamadaCancelada()
          setTimeout(() => {
            location.reload();
          }, 5000)
        }
      }
    )
    .subscribe()
  return (
    <>
      <div className=" bg-purple-200 flex justify-center items-center">
        <div className="min-h-screen max-h-fit max-w-xl 0 py-2 sm:flex  sm:flex-col">
          <Header />

          <div className="flex justify-center">
            <div className="">
              <div className="flex justify-center mb-10">
                <button
                  className="bg-gradient-to-r from-purple-300 to-indigo-300 mt-20 w-48 h-48 sm:h-36 sm:w-36 rounded-full flex flex-col items-center justify-center shadow-lg hover:shadow-xl focus:outline-none"
                  onClick={handleSendAlert}
                >
                  <Image
                    src={Sirene}
                    alt="Emergencia"
                    className="sm:h-10 sm:w-10 h-20 w-20"
                  />
                  <p className="text-center text-xl text-white font-bold mt-2">
                    EMERGÊNCIA
                  </p>
                </button>
              </div>
            </div>
          </div>

          <div className=""></div>
          <dialog
            ref={dialogRef}
            className="sm:w-1/4 md:w-1/3 lg:w-1/4 rounded-lg border-2 border-black"
            style={{ maxHeight: "80vh" }}
          >
            <div className="flex justify-end">
            </div>
            <div className="flex justify-center p-3">
              <span>A GCM está sendo contatada!</span>
              <div className="flex justify-center"></div>
            </div>
          </dialog>
          <dialog
            ref={dialogRef2}
            className="sm:w-1/4 md:w-1/3 lg:w-1/4 rounded-lg border-2 border-black"
            style={{ maxHeight: "80vh" }}
          >
            <div className="flex justify-end">
            </div>
            <div className="flex justify-center p-3">
              <span>A GCM entrando em contato!</span>
              <div className="flex justify-center"></div>
            </div>
          </dialog>
          <video
            controls
            className="w-4/5 h-96  "
            ref={remoteVideo}
            autoPlay
            hidden
            playsInline
          ></video>
          <audio
            className="h-20 w-96 bg-black"
            ref={voiceSound}
            autoPlay
            hidden
            controls
          ></audio>
          <input
            ref={callInput}
            className="bg-white h-8 font-semibold rounded-md mb-2 "
            defaultValue={inputCallValue}
            hidden
          />
          <ToastContainer />
          <div>
            <table className="table-auto flex justify-center">
              <thead></thead>
              <tbody>
                <tr className="bg-gray-100">
                  <td className="px-2 py-2 whitespace-nowrap">PM</td>
                  <td className="px-2 py-2 whitespace-nowrap">190</td>
                </tr>
                <tr className="bg-gray-200">
                  <td className="px-2 py-2 whitespace-nowrap">GCM 1</td>
                  <td className="px-2 py-2 whitespace-nowrap">153</td>
                </tr>
                <tr className="bg-gray-100">
                  <td className="px-2 py-2 whitespace-nowrap">GCM 2</td>
                  <td className="px-2 py-2 whitespace-nowrap">
                    (14) 3335-9320
                  </td>
                </tr>
                <tr className="bg-gray-200">
                  <td className="px-2 py-2 whitespace-nowrap">
                    Delegacia da Mulher
                  </td>
                  <td className="px-2 py-2 whitespace-nowrap">
                    (14) 3322-5343
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="flex justify-center mt-4">
            <button
              type="button"
              onClick={handleViewPolicePoints}
              className="px-2 py-2 bg-purple-500 text-white rounded-md mt-4"
            >
              Visualizar Pontos de Policiamento
            </button>
          </div>

          {showPolicePoints && (
            <div className="mt-4">
              <Mapa />
            </div>
          )}
          <div className="mt-4 flex justify-center">
            <Image src={Logo} alt="Logo" className="w-16 h-16" />
          </div>
        </div>
      </div>
    </>
  );
}

function showModal(dialogRef: RefObject<HTMLDialogElement>) {
  dialogRef.current?.showModal();
}

function closeModal(dialogRef: RefObject<HTMLDialogElement>) {
  dialogRef.current?.close();
}