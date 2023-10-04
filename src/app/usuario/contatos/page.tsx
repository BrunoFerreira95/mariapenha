import Link from 'next/link';
import React from 'react';
import Image from 'next/image';
import Logo2 from '@assets/Logo2.png';
import Simbolo from '@assets/simbolo.png';
import Voltar from '@assets/voltar.svg';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Menumaria from '../../../components/Menumaria';

const Contatos = () => {
  return (
    <div className="w-screen sm:flex justify-center bg-gradient-to-b from-purple-500 to-pink-200">
      <div className="min-h-screen max-h-fit max-w-xl 0 py-2 flex flex-col">
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
                  <td className="pr-4">PM</td>
                  <td>190</td>
                </tr>
                <tr>
                  <td className="pr-4">GCM 1</td>
                  <td>153</td>
                </tr>
                <tr>
                  <td className="pr-4">GCM 2</td>
                  <td>(14) 3326-4570</td>
                </tr>
                <tr>
                  <td className="pr-4">Delegacia da Mulher</td>
                  <td>(14) 3322-5343</td>
                </tr>
              </tbody>
            </table>

            {/* Adicione o botão "Policiamento Próximo" e configure o link */}
            <div className="flex justify-center">
              <Link href={'/policiamento-proximo'}>
                <button className="px-6 py-2 bg-purple-500 text-white rounded-md mt-10">
                  Policiamento Próximo
                </button>
              </Link>
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
  );
};

export default Contatos;
