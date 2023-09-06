'use client'
import Link from 'next/link'
import React, { useState } from 'react'
import Image from 'next/image'
import Logo2 from '@assets/Logo2.png'
import Simbolo from '@assets/simbolo.png'
import Voltar from '@assets/voltar.svg'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Menumaria from '../../../components/Menumaria'
import Wtt from '@assets/Wtt.svg'

const Chat = () => {
  const [name, setName] = useState('')
  const [address, setAddress] = useState('')
  const [phone, setPhone] = useState('')
  const [message, setMessage] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()

    // Aqui você pode enviar os dados de cadastro e mensagem de denúncia para o servidor ou executar alguma outra ação necessária.

    console.log('Nome:', name)
    console.log('Endereço:', address)
    console.log('Telefone:', phone)
    console.log('Mensagem:', message)

    // Limpar os campos após o envio (opcional)
    setName('')
    setAddress('')
    setPhone('')
    setMessage('')

    // Exemplo de notificação após o envio (você pode personalizar ou remover)
    toast.success('Denúncia enviada com sucesso!', {
      position: 'top-center',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'light'
    })
  }

  return (
    <div className="w-screen sm:flex justify-center bg-gradient-to-b from-purple-500 to-pink-200">
      <div className="min-h-screen max-h-fit max-w-xl 0 py-2 flex flex-col">
        <div className="m-2 ml-5"></div>
        <div className="flex justify-center sm:mt-8">
          <Image src={Logo2} alt="logo da Service Security" />
        </div>
        <div>
          <form
            className="mx-4 bg-white p-5 rounded-xl mt-4"
            onSubmit={handleSubmit}>
            <div className="flex justify-center">
              <Image
                className="m-2"
                src={Simbolo}
                alt="Simbolo da maria da penha"
              />
            </div>

            <div className="mt-4">
              <p className="block mb-2 text-justify italic">
                Mulher, sua força é imensurável. Se você está enfrentando
                violência psicológica, saiba que não precisa suportar isso
                sozinha. Denuncie! Sua coragem em falar sobre o que está
                passando é o primeiro passo para recuperar sua paz e dignidade.
                Ao denunciar, você não apenas se liberta, mas também ajuda
                outras mulheres a encontrar sua voz. Não deixe que a violência
                psicológica defina quem você é. Lembre-se, você merece respeito,
                amor e felicidade. Denuncie agora!
              </p>
            </div>

            <div className='flex justify-center'>
            <a href="https://api.whatsapp.com/send?phone=14997826762">
            <Image src={Wtt} alt="Descrição da imagem" className="w-12 h-12"></Image>
            </a>
            </div>
           

            <div className="flex justify-center">
            <Link href={'/usuario'}>
                <Image src={Voltar} alt="Botão de voltar" className="mt-5" />
              </Link>
            </div>
          </form>
        </div>
      </div>
      <Menumaria path={'./'} />
    </div>
  )
}

export default Chat
