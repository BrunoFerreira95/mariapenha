
import React, { useState } from "react"
import Image from "next/image"
import Logo from "../assets/Logo2.png"

const Header = () => {
  return (
    <>
      <div>

        <div className="w-full flex justify-center">
          <Image className="mt-5 h-56 w-56" src={Logo} alt="" priority={true}/>
        </div>
        <div className="relative">
          <svg
            className="absolute"
            viewBox="0 0 1440 180"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
          >
          </svg>
        </div>
      </div>
    </>
  );
};

export default Header;