'use client'

import React, { useEffect, useState } from 'react'
import SignIn from './signIn/page'
import { AuthSession } from '@supabase/supabase-js'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import AdminHome from './admin/page'
import HomeUsuario from './usuario/page'
import { initSession } from '@/controler/admin/users/users.controler'
import Maria from './usuario/page'
import AlertaGuarda from './guarda/emergencia/page'
import Visitante from './visitante/page'



export default function Home() {
  const [session, setSession ] = useState<AuthSession | null>(null)
  
  useEffect(() => {
    initSession(setSession)
  }, [])
  
  return (
    <>
      {session ? checkUserSession(session) : <SignIn/>}
    </>
  )
}



function checkUserSession(session: AuthSession) {
  if(session.user.app_metadata.claims_admin) {
    return <AdminHome/>
  }
  const usuario = session.user.app_metadata.usuario

  switch (usuario) {
    case 'guarda':
        return <AlertaGuarda/>
      break;
    case 'maria':
        return <Maria/>
    default:
      return <Visitante/>
      break;
  }

}