"use client"
import React, { useState } from "react"
import Image from "next/image"
import Googleicon from "../../assets/googleicon.svg"
import { SubmitHandler, useForm } from "react-hook-form"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import signInWithGoogle from "@/controler/auth/signIn"
import Topoonda from "@/components/Topoonda"

type SignIn = {
  email: string
  password: string
}

const SignIn = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<SignIn>()

  return (
    <>
      <div className="w-screen h-screen bg-white">
        <Topoonda />
        <div className="flex justify-center">
          <form
            onSubmit={signInWithGoogle}
            className="flex justify-center flex-col bg-white rounded-xl sm:mt-52 mt-32 sm:w-6/6 sm:h-2/5 "
          >
            <button
              className="bg-purple-200 h-10 w-32 rounded-md text-white"
              type="submit"
            >
              <div className="flex justify-center">
              <Image className="h-7 w-7 mr-2" src={Googleicon} alt=""/>
              <span className="font-semibold text-lg">Entrar</span>
              </div>
            </button>
          </form>
          <ToastContainer />
        </div>
      </div>
    </>
  );
};

export default SignIn;