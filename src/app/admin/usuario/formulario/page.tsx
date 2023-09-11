'use client'
import Topoonda from '@/components/Header'
import ButtonVoltar from '@/components/voltar'
import { fetchCidadesData } from '@/controler/admin/cidades/cidades.controler'
import { fetchEscolasData, fetchEscolasDataWhereCity } from '@/controler/admin/escolas/escolas.controler'
import { alterClaims } from '@/controler/admin/users/claims/claims.controler'
import { fetchOneUser, fetchUserClaims } from '@/controler/admin/users/users.controler'
import { supabase } from '@/lib/supabaseClient'
import { useSearchParams } from 'next/navigation'
import React, { ChangeEvent, useEffect, useState } from 'react'

type UserProps = {
  email: string;
  id: string;
  full_name: string
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

  const [user, setUser] = useState<UserProps>()
  const [claim, setClaim] = useState<ClaimProps>()
  const [handleClaim, setHandleClaim] = useState()

  const hanldeAlterClaims = () => {
    alterClaims(id, handleClaim)
  }

  useEffect(() => {
    if (id) {
      fetchOneUser(id, setUser)
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
            <span>{user?.email}</span>

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
        </div>
      </div>
    </>
  )
}

export default Usuario