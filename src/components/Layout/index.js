// @/components/Layout/index.js
import React, { useState } from 'react'
import Head from 'next/head'
import Sidebar from './Sidebar';
import { motion } from "framer-motion";
import MenuButton from './MenuButton';

export default function Layout({ pageTitle, children }) {
    let titleConcat = "Jay Simons";
    if (pageTitle) titleConcat += " | " + pageTitle;

    const [showSidebar, setShowSidebar] = useState(false);

    return (
        <>
            <Head>
                <title>{titleConcat}</title>
            </Head>
            <div className="text-white min-h-screen">
                <div className="flex">
                    <MenuButton setter={setShowSidebar} />
                    <Sidebar show={showSidebar} setter={setShowSidebar} />
                    <motion.div
                        className="flex flex-col flex-grow w-screen md:w-full min-h-screen"
                        initial={{ y: 300, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: 300, opacity: 0 }}
                        transition={{
                            type: "spring",
                            stiffness: 100,
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