"use client";
import Topoonda from "@/components/Topoonda";
import { initSession } from "@/controler/admin/users/users.controler";
import { setUser } from "@/controler/users/user.controler";
import { AuthSession } from "@supabase/supabase-js";
import React, { RefObject, useRef, useState, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import InputMask from "react-input-mask";

type FormProps = {
  nome: string;
  tel: string;
};

const Visitante = () => {
  const dialogRef: RefObject<HTMLDialogElement> = useRef(null);

  const [session, setSession] = useState<AuthSession | null>(null);

  useEffect(() => {
    initSession(setSession);
  }, []);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit: SubmitHandler<FormProps> = (data) => {
    console.log(data);
    setUser(data, session?.user.id);
    reset();
  };

  return (
    <>
      <div className="bg-white h-screen w-screen">
        <Topoonda />

        <div className="bg-gray-100 p-8 md:mx-auto md:w-3/5 text-center font-poppins sm:mt-20 mt-14 mx-2 ">
          <p className="text-2xl text-black mb-4">
            Olá! Seja bem-vindo(a) ao aplicativo Proteja-me
          </p>
          <p className="text-lg text-gray-700">
            O aplicativo permite que mulheres que tenham medida protetiva
            concedida pela Justiça acionem o apoio da Guarda Civil Municipal de
            Ourinhos em casos de risco à integridade física ou à própria vida.
            
            Se esse é seu primeiro acesso, clique em cadastro e informe seus
            dados. Lembramos que você deve ter uma conta Google para utilizar o
            aplicativo. Após realizar o cadastro, aguarde enquanto confirmamos
            seus dados. Em breve vamos liberar o seu acesso 😉
          </p>
          <button
            onClick={() => showModal(dialogRef)}
            className="bg-slate-400 px-5 py-2 rounded-lg mt-2"
          >
            Informar seus Dados
          </button>
          
          <p className="mt-4 text-lg text-gray-700">
            Atenciosamente,
            <br />
            Equipe Service Security
          </p>
        </div>

        <dialog
          ref={dialogRef}
          className="sm:w-1/4 w-4/5 rounded-lg border-2 border-black"
        >
          <div className="flex justify-end">
            <button onClick={() => closeModal(dialogRef)} className="m-5">
              Fechar
            </button>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col p-5">
            <label htmlFor="nome">Nome completo:</label>
            <input
              className="border-2 border-black rounded-lg"
              type="text"
              {...register("nome")}
            />
            <label htmlFor="tel">telefone:</label>
            <InputMask
              mask="99-999999999"
              className="border-2 border-black rounded-lg"
              type="text"
              {...register("tel")}
            />

            <div className="flex justify-center">
              <button
                className="p-2 bg-blue-500 w-1/4 rounded-lg mt-5 text-white"
                type="submit"
              >
                Salvar
              </button>
            </div>
          </form>
        </dialog>
      </div>
    </>
  );
};

export default Visitante;

function showModal(dialogRef: RefObject<HTMLDialogElement>) {
  dialogRef.current?.showModal();
}

function closeModal(dialogRef: RefObject<HTMLDialogElement>) {
  dialogRef.current?.close();
}
