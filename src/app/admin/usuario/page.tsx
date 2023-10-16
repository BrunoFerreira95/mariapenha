"use client";
import Topoonda from "@/components/Header";
import { fetchUserData } from "@/controler/admin/users/users.controler";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Lapis from "@assets/lapis.svg";
import Voltar from "@/components/voltar";
import Logo from "../../../assets/Logo2.png"
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
import SearchBar from "../../../components/SearchBar";

const SemPermissoes = () => {
  const [users, setUsers] = useState<UsersProps>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');

  useEffect(() => {
    // Assuming fetchUserData fetches user data correctly and updates the state
    fetchUserData(setUsers);
  }, []);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const filteredUsers = users.filter(user =>
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <div className="flex flex-col min-h-screen max-h-fit">
        <ButtonVoltar />
        <div className="w-full flex justify-center">
          <Image className="mt-5 h-56 w-56" src={Logo} alt="" priority={true} />
        </div>
        <div className="flex justify-center">
          <SearchBar filter={searchTerm} change={handleSearchChange} />
        </div>
        <div className="flex justify-center">
          <div className="md:w-1/4 flex justify-center">
            <Table>
              <TableHeader>
                <TableRow className="">
                  <TableHead>Usuários</TableHead>
                  <TableHead>Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.map((usuario) => (
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