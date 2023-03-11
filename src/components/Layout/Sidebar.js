import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'

import { SlHome } from 'react-icons/sl'
import { BsInfoSquare } from 'react-icons/bs'

import jay from '@/img/jay.jpg'

export default function Sidebar() {
    const router = useRouter();

    const MenuItem = ({ icon, name, route }) => {
        const colorClass = router.pathname === route ? "text-white" : "text-white/50 hover:text-white";

        return (
            <Link
                href={route}
                className={`flex gap-1 [&>*]:my-auto text-md pl-6 py-3 border-b-[1px] border-b-white/10 ${colorClass}`}
            >
                <div className="text-xl flex [&>*]:mx-auto w-[30px]">
                    {icon}
                </div>
                <div>{name}</div>
            </Link>
        )
    }

    return (
        <div className="w-[200px] bg-bg1 ml-[-200px] md:ml-0">
            <div className="relative">
                <Image className="z-10" src={jay} alt="Jay" width={200} height={200} />
                <div className="absolute bottom-0 left-0 right-0 z-20 bg-gray-600/90 py-2 uppercase text-center">
                    Jay Simons
                </div>
            </div>
            <div className="flex flex-col">
                <MenuItem
                    name="Home"
                    route="/"
                    icon={<SlHome />}
                />
                <MenuItem
                    name="About Me"
                    route="/about"
                    icon={<BsInfoSquare />}
                />
            </div>
        </div>
    )
}
