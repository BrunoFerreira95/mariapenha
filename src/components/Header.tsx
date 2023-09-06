import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

import Logo2 from '@assets/Logo2.png'
import Voltar from '@assets/voltar.svg'

export function Header({ isMiddle, stopCall }) {
  const router = useRouter()

  function handleVoltar() {
    if(stopCall) {
      stopCall()
    }
    router.back()
  }
  let header
  if (!isMiddle) {
    header = (
      <div className="flex justify-between sm:mx-14 mx-4 items-center">
        <Link
          href="/"
          onClick={handleVoltar}
          className="text-lg sm:w-12 sm:h-16 w-28 h-9 mt-6">
          <Image className="sm:w-4  w-4" src={Voltar} alt="Botão voltar" />
        </Link>

        <div className="flex justify-center">
          <Image
            className="sm:w-24 w-20 "
            src={Logo2}
            alt="Logo do Apoio Monitorado"
            priority={true}
          />
        </div>
      </div>
    )
  } else {
    header = (
      <div className="flex justify-center sm:mx-14 mx-4 items-center">
        <div className="flex justify-center">
          <Image
            className="sm:w-52 w-44"
            src={Logo2}
            alt="Logo do Apoio Monitorado"
            priority={true}
          />
        </div>
      </div>
    )
  }

  return <>{header}</>
}
