'use client'
import Topoonda from '@/components/Topoonda'
import { fetchUserData } from '@/controler/admin/users/users.controler'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import Voltar from '@/components/voltar'
import ButtonVoltar from '@/components/voltar'

type UsersProps = {
    email: string
    id: string

}[]

const SemPermissoes = () => {
    const [users, setUsers] = useState<UsersProps>([])
    useEffect(() => {
        fetchUserData(setUsers)
    }, [])
    return (
        <>
            <div className='flex flex-col min-h-screen max-h-fit'>
                <Topoonda />
                <ButtonVoltar/>
                <div className='flex justify-center items-center flex-col mt-52 gap-5'>
                    {users.map((usuario) => (
                        <Link href={`./usuario/formulario?id=${usuario.id}`} key={usuario.id}>
                            <button className='border-black border-2'>{usuario.email}</button>
                        </Link>
                    ))}

                </div>
            </div>
        </>
    )
}


export default SemPermissoes