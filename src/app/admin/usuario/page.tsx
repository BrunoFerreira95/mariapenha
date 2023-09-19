"use client";
import Topoonda from "@/components/Header";
import { fetchUserData } from "@/controler/admin/users/users.controler";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Lapis from "@assets/lapis.svg";
import Voltar from "@/components/voltar";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import ButtonVoltar from "@/components/voltar";

type UsersProps = {
  email: string;
  id: string;
}[];

const SemPermissoes = () => {
  const [users, setUsers] = useState<UsersProps>([]);
  useEffect(() => {
    fetchUserData(setUsers);
  }, []);
  return (
    <>
      <div className="flex flex-col min-h-screen max-h-fit">
        <Topoonda />
        <ButtonVoltar />
        <div className="flex justify-center">
          <div className="w-1/4 flex justify-center">
            <Table>
              <TableHeader>
                <TableRow className="">
                  <TableHead>Usuários</TableHead>
                  <TableHead>Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((usuario) => (
                  <TableRow key={usuario.id}>
                    <TableCell className="font-medium">
                        {usuario.email}
                    </TableCell>
                    <TableCell className="">
                      <Link href={`./usuario/formulario?id=${usuario.id}`}>
                        <button>
                        <Image className="ml-3" src={Lapis} alt="editar" />
                        </button>
                      </Link>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </>
  );
};

export default SemPermissoes;
