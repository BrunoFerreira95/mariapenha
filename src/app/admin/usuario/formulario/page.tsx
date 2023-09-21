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
        <div className="flex justify-center items-center flex-col">

          <div className="flex justify-center flex-col">

            <label htmlFor="email" className="text-black font-bold">Email:</label>
            <span>{user2?.email}</span>
            <div className='border border-black w-64'></div>

            <label htmlFor="Setor" className="text-black font-bold">
              Permisão de usuario:
            </label>
            
            <span
              className="bg-white text-black flex justify-center items-center h-8 w-64">
              {claim?.usuario}
            </span>
            <div className='border border-black w-64'></div>
            <label htmlFor="cidade" className="text-black font-bold">
              Alterar cidade do usuario:
            </label>

            <select
              className="bg-white  text-black p-1 w-64 rounded-lg"
              onChange={(e) => setHandleClaim(e.target.value)}
              name="cidade">
              <option value="">Escolha um opção</option>
              <option value='maria'>Maria da Penha</option>
              <option value='guarda'>Guarda</option>
            </select>
            <div className='border border-black w-64'></div>
            <button
              onClick={hanldeAlterClaims}
              className="w-64 h-8 mt-2 bg-blue-500 text-white rounded-md">
              Editar permissão
            </button>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col mt-1">
            <label className="text-black font-bold" htmlFor="nome">Nome completo:</label>
            <input
            className='border border-black rounded-md p-1'
              type="text"
              defaultValue={user2?.full_name}
              {...register("full_name")}
            />
            <label className="text-black font-bold mt-1" htmlFor="telefone">Telefone:</label>
            <InputMask
            className='border border-black rounded-md p-1'
              mask="99-999999999"
              type="text"
              defaultValue={user2?.telefone}
              {...register("telefone")}
            />
            <label className="text-black font-bold mt-1" htmlFor="rua">Rua:</label>
            <input className='border border-black rounded-md p-1 w-64' type="text" defaultValue={user2?.rua} {...register("rua")}/>
            <label className="text-black font-bold mt-1" htmlFor="numero">Numero:</label>
            <input className='border border-black rounded-md p-1 w-64' type="text" defaultValue={user2?.numero}  {...register("numero")}/>
            <label className="text-black font-bold mt-1" htmlFor="bairro">Bairro:</label>
            <input className='border border-black rounded-md p-1 w-64' type="text" defaultValue={user2?.bairro}  {...register("bairro")}/>
            <label className="text-black font-bold mt-1" htmlFor="cidade">Cidade:</label>
            <input className='border border-black rounded-md p-1 w-64' type="text" defaultValue={user2?.cidade}  {...register("cidade")}/>
            <div className="flex justify-center">
              <button
                className="p-2 bg-blue-500 w-1/4 rounded-lg m-5 text-white"
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