import React from "react";
import Image from "next/image";
import Voltar from "@assets/voltar.svg";
import { useRouter } from 'next/router'

const ButtonVoltar = () => {

  const handleGoBack = () => {
    history.back();
  };

  return (
  <div className="z-10 absolute top-0 left-0 ml-2 mt-4">
    <button onClick={handleGoBack}>
      <Image className="" src={Voltar} alt="" />
    </button>
  </div>

  );
};

export default ButtonVoltar;
