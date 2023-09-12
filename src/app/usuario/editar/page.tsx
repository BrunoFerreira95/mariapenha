'use client'

import Header from '@/components/Header'
import Menumaria from '@/components/Menumaria'
import React from 'react'

import { useForm, SubmitHandler } from "react-hook-form";
import InputMask from "react-input-mask";
const EditarUsuario = () => {

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
        reset,
    } = useForm();
    return (
        <>
            <div className=" bg-purple-200 flex justify-center items-center">
                <div className="min-h-screen max-h-fit max-w-xl 0 py-2 sm:flex  sm:flex-col">
                    <Header />

                    <form className="mx-4 bg-white p-5 rounded-xl mt-4 flex flex-col">
                        <label htmlFor="nome">Nome completo:</label>
                        <input
                            className="border-2 border-black rounded-lg"
                            type="text"
                        />
                        <label htmlFor="tel">telefone:</label>
                        <InputMask
                            mask="99-999999999"
                            className="border-2 border-black rounded-lg"
                            type="text"
                            {...register("tel")}
                        />
                        <label htmlFor="endereco">Rua:</label>
                        <input className="border-2 border-black rounded-lg" type="text" />
                        <label htmlFor="numero">Numero:</label>
                        <input className="border-2 border-black rounded-lg" type="text" />
                        <label htmlFor="complemento">Complemento:</label>
                        <input className="border-2 border-black rounded-lg" type="text" />
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
                <Menumaria path={"./"} />
            </div>
        </>
    )
}

export default EditarUsuario