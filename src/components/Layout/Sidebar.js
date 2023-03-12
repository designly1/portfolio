import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { motion, AnimatePresence } from "framer-motion";

import { SlHome } from 'react-icons/sl'
import { BsInfoSquare, BsBriefcase, BsEnvelopeAt } from 'react-icons/bs'
import { ImProfile } from 'react-icons/im'

import jay from '@/img/jay.jpg'

export default function Sidebar({ show, setter }) {
    const router = useRouter();

    const className = "w-[200px] bg-bg1 transition-[margin-left] ease-in-out duration-500 fixed md:static top-0 bottom-0 left-0 z-40";
    const appendClass = show ? " ml-0" : " ml-[-200px] md:ml-0";

    const MenuItem = ({ icon, name, route }) => {
        const colorClass = router.pathname === route ? "text-white" : "text-white/50 hover:text-white";

        return (
            <Link
                href={route}
                onClick={() => {
                    setter(oldVal => !oldVal);
                }}
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
        <>
            <div className={`${className}${appendClass}`}>
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
                    <MenuItem
                        name="Resume"
                        route="/resume"
                        icon={<ImProfile />}
                    />
                    <MenuItem
                        name="Portfolio"
                        route="/portfolio"
                        icon={<BsBriefcase />}
                    />
                    <MenuItem
                        name="Contact"
                        route="/contact"
                        icon={<BsEnvelopeAt />}
                    />
                </div>
            </div>
            <AnimatePresence>
                {
                    show
                        ?
                        <motion.div
                            className={`flex md:hidden fixed top-0 right-0 bottom-0 left-0 bg-black/50 z-30`}
                            onClick={() => {
                                setter(oldVal => !oldVal);
                            }}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{
                                type: "spring",
                                stiffness: 100,
                                damping: 20,
                            }}
                        />
                        :
                        <></>
                }
            </AnimatePresence>
        </>
    )
}
