import React from "react";
import Image from "next/image";
import Service from "@assets/Logo.png";
import { useRouter } from "next/router";

const Logo = () => {
  return (
    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
      <Image className="h-20 w-20" src={Service} alt="" />
    </div>
  );
};

export default Logo;
