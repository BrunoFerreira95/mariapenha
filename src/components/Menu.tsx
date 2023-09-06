import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

const Menu = (data) => {
    const menuList = data.data
    useEffect(() => {
    }, [])
    return (
        <div>
            <div className="bg-white/2 rounded-3xl md:h-auto grid grid-cols-1 sm:grid-cols-3 gap-2 md:rounded-3xl">
                {menuList.map((item) => {
                    // Check if it's the WhatsApp link
                    const isWhatsAppLink = item.path.startsWith('https://api.whatsapp.com/send');
                    const link = isWhatsAppLink ? item.path : `${item.path}?pathToGo=${encodeURIComponent(item.go)}`;

                    return (
                        <Link key={item.id} className={`bg-gray-100 border-l-8 mt-3 ${item.style} px-2 flex items-center h-16  rounded-md`} href={link}>
                            <div>
                                <Image
                                    src={item.image}
                                    alt="icone"
                                    className="justify-center ml-2 h-8 w-8"
                                />
                            </div>
                            <div className="ml-5 flex flex-col">
                                <span
                                    className="text-black font-poppins font-bold lg:text-lg"
                                >
                                    {item.title}
                                </span>
                            </div>
                        </Link>
                    );
                })}
            </div>
        </div>
    )
}

export default Menu
