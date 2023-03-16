import React from 'react'
import Image from 'next/image'
import loadingSvg from '@/svg/loading.svg'
import { motion, AnimatePresence } from "framer-motion";

export default function Loading({ isLoading }) {
    return (
        <>
            {
                isLoading
                    ?
                    <AnimatePresence>
                        <motion.div
                            className="fixed top-0 right-0 bottom-0 left-0 bg-black/70 flex h-screen w-screen"
                            style={{ zIndex: 9999 }}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                        >
                            <Image className="m-auto" src={loadingSvg.src} alt="Loading" width={200} height={200} />
                        </motion.div>
                    </AnimatePresence>
                    :
                    <></>
            }
        </>
    )
}
