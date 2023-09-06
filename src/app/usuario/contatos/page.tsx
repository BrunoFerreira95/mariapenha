import Link from 'next/link'
import React from 'react'
import Image from 'next/image'
import Logo2 from '@assets/Logo2.png';
import Simbolo from '@assets/simbolo.png'
import Voltar from '@assets/voltar.svg'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Menumaria from '../../../components/Menumaria'

const Contatos = () => {
  return (
    <div className="w-screen sm:flex justify-center bg-gradient-to-b from-purple-500 to-pink-200">
      <div className="min-h-screen max-h-fit  max-w-xl 0 py-2 flex  flex-col">
        <div className="m-2 ml-5"></div>
        <div className="flex justify-center sm:mt-8">
          <Image src={Logo2} alt="logo da Service Security" />
        </div>
        <div>
  <form className="mx-4 bg-white p-5 rounded-xl mt-4">
    <div className="flex justify-center">
      {/* Conteúdo do formulário */}
    </div>
    <table className="table-auto mx-auto mt-4">
      <tbody>
        <tr>
          <td className="pr-4">Bombeiros:</td>
          <td>193</td>
        </tr>
        <tr>
          <td className="pr-4">PM:</td>
          <td>190</td>
        </tr>
        <tr>
          <td className="pr-4">Polícia Civil:</td>
          <td>197</td>
        </tr>
        <tr>
          <td className="pr-4">Disque Denúncia:</td>
          <td>181</td>
        </tr>
        <tr>
          <td className="pr-4">Violência Doméstica:</td>
          <td>180</td>
        </tr>
      </tbody>
    </table>

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

export default Contatos