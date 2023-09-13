'use client'
import Topoonda from '@/components/Header'
import ButtonVoltar from '@/components/voltar'
import { alterClaims } from '@/controler/admin/users/claims/claims.controler'
import { fetchOneUser, fetchUserClaims } from '@/controler/admin/users/users.controler'
import { setUser } from '@/controler/users/user.controler'
import { supabase } from '@/lib/supabaseClient'
import { useSearchParams } from 'next/navigation'
import React, { ChangeEvent, useEffect, useState } from 'react'
import { useForm, SubmitHandler } from "react-hook-form";
import InputMask from "react-input-mask";

type UserProps = {
  email: string;
  id: string;
  full_name: string;
  telefone: string;
  rua: string;
  bairro: string;
  cidade: string;
  numero: string;
}

type ClaimProps = {
  usuario: string;
}

type CidadesPros = {
  id: number,
  cidade: string
}[]

type EscolasProp = {
  id: number;
  name: string;
  url: string;
}[];

const Usuario = () => {
  const searchParams = useSearchParams()
  const id = searchParams.get('id')

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm<UserProps>();

  const [user2, setUser2] = useState<UserProps>()
  const [claim, setClaim] = useState<ClaimProps>()
  const [handleClaim, setHandleClaim] = useState()

  const hanldeAlterClaims = () => {
    alterClaims(id, handleClaim)
  }

  const onSubmit: SubmitHandler = (data) => {
    setUser(data, user2?.id);
    reset();
  };

  useEffect(() => {
    if (id) {
      fetchOneUser(id, setUser2)
      fetchUserClaims(id, setClaim)
    }
  }, [id])
  
  return (
    <>
      <div className="max-h-fit min-h-screen">
        <Topoonda />
        <ButtonVoltar/>
        <div className="flex justify-center items-center m-16 flex-col">

          <div className="flex justify-center flex-col mt-5">

            <label htmlFor="email" className="text-black font-bold">Email:</label>
            <span>{user2?.email}</span>

            <label htmlFor="Setor" className="text-black font-bold">
              Permisão de usuario:
            </label>
            <span
              className="bg-white text-black flex justify-center items-center h-11 w-64 mb-1 rounded-lg mt-2 border-2
                                    border-black">
              {claim?.usuario}
            </span>
            <label htmlFor="cidade" className="text-black font-bold">
              Alterar cidade do usuario:
            </label>

            <select
              className="bg-white  text-black h-11 w-64 rounded-lg  border-2
                border-black"
              onChange={(e) => setHandleClaim(e.target.value)}
              name="cidade">
              <option value="">Escolha um opção</option>
              <option value='maria'>Maria da Penha</option>
              <option value='guarda'>Guarda</option>
            </select>
            <button
              onClick={hanldeAlterClaims}
              className="w-64 h-8 mt-2 bg-blue-500 text-white rounded-md">
              Editar permissão
            </button>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col p-5">
            <label htmlFor="nome">Nome completo:</label>
            <input
              className="border-2 border-black rounded-lg"
              type="text"
              defaultValue={user2?.full_name}
              {...register("full_name")}
            />
            <label htmlFor="telefone">Telefone:</label>
            <InputMask
              mask="99-999999999"
              className="border-2 border-black rounded-lg"
              type="text"
              defaultValue={user2?.telefone}
              {...register("telefone")}
            />
            <label htmlFor="rua">Rua:</label>
            <input type="text" defaultValue={user2?.rua} className="border-2 border-black rounded-lg" {...register("rua")}/>
            <label htmlFor="numero">Numero:</label>
            <input type="text" defaultValue={user2?.numero} className="border-2 border-black rounded-lg" {...register("numero")}/>
            <label htmlFor="bairro">Bairro:</label>
            <input type="text" defaultValue={user2?.bairro} className="border-2 border-black rounded-lg" {...register("bairro")}/>
            <label htmlFor="cidade">Cidade:</label>
            <input type="text" defaultValue={user2?.cidade} className="border-2 border-black rounded-lg" {...register("cidade")}/>
            <div className="flex justify-center">
              <button
                className="p-2 bg-blue-500 w-1/4 rounded-lg mt-5 text-white"
                type="submit"
              >
                Salvar
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default Usuario