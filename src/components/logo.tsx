import React from "react";
import Image from "next/image";
import Voltar from "@assets/voltar.svg";
import { useRouter } from 'next/router'

const Logo = () => {

 

  return (
  <div className="z-10 absolute top-0 left-0 ml-2 mt-4">
    
      <Image className="" src={Voltar} alt="" />
   
  </div>

  );
};

export default Logo;
