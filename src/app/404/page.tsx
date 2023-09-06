import React from "react";
import Image from "next/image";
import Icon404 from "../../assets/page404maria.svg";
import Link from "next/link";

const page404 = () => {

  return (
    <>
      <div className="bg-violet-300 max-h-fit min-h-screen">
        <div className="flex justify-center items-center flex-col">
          <div>
          <div className="mt-28">
            <Image src={Icon404} alt="" />
          </div>
          <div className="text-white text-center mt-8">
            <span className="block">
              404 <br/> A página que você tentou acessar <br/> não existe!
            </span>
          </div>
          <div className="flex justify-center mt-10">
            <Link href="/">
            <button className="border-2 rounded-lg bg-violet-400 border-violet-700">
              <span className="text-white m-5">Voltar ao inicio</span>
            </button>
            </Link>
          </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default page404;
