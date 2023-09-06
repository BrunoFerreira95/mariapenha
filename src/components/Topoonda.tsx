
import React, { useState } from "react"
import Image from "next/image"
import Logo from "../assets/Logo2.png"

const Topoonda = () => {




  return (
    <>
      <div>

        <div className="bg-purple-200 w-full flex justify-center">
          <Image className="mt-5 h-56 w-56" src={Logo} alt="" priority={true}/>
        </div>
        <div className="relative">
          <svg
            className="absolute"
            viewBox="0 0 1440 180"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
          >
            <path
              fill="#e9d5ff"
              d="M0 37 Q 360 20 720 37 Q 1080 54 1440 37 L 1440 0 L 0 0 Z"
            ></path>
          </svg>
        </div>
      </div>
    </>
  );
};

export default Topoonda;