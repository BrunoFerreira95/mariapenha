"use client";
import Topoonda from "@/components/Header";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

const AdminHome = () => {
  return (
    <>
      <div className="flex flex-col min-h-screen max-h-fit">
        <Topoonda />
        <div className="flex items-center justify-center gap-2 mt-20 sm:mt-48 flex-col sm:flex-row">
          <Link href={"./admin/usuario"}>
            <button className="bg-pink-300 border-2  h-12 w-40 sm:h-16 rounded-md">
              Usuarios
            </button>
          </Link>
        </div>
        <div className='flex justify-center mt-10'>
          <form method="post">
            <button className='bg-red-300 border-2 h-12 w-40 sm:h-16 rounded-md' formAction={"/auth/logout"}>Sair</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AdminHome;
