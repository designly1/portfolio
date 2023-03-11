// @/components/Layout/index.js
import React from 'react'
import Head from 'next/head'
import Sidebar from './Sidebar';
import { motion } from "framer-motion";

export default function Layout({ pageTitle, children }) {
    let titleConcat = "Jay Simons";
    if (pageTitle) titleConcat += " | " + pageTitle;

    return (
        <>
            <Head>
                <title>{titleConcat}</title>
            </Head>
            <div className="h-screen text-white">
                <div className="flex h-screen">
                    <Sidebar />
                    <motion.div
                        className="h-screen flex flex-col flex-grow w-screen md:w-full"
                        initial={{ y: 300, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: 300, opacity: 0 }}
                        transition={{
                            type: "spring",
                            stiffness: 260,
                            damping: 20,
                        }}
                    >
                        {children}
                    </motion.div>
                </div>
            </div>
        </>
    )
}