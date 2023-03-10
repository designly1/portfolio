// @/components/Layout/index.js
import React from 'react'
import Head from 'next/head'
import Image from 'next/image';
import coverImg from '@/img/cover.jpg';

export default function Layout({ pageTitle, children }) {
    let titleConcat = "Jay Simons";
    if (pageTitle) titleConcat += " | " + pageTitle;

    return (
        <>
            <Head>
                <title>{titleConcat}</title>
            </Head>
            <div className="h-screen text-white">
                <div className="flex fixed top-0 right-0 bottom-0 left-0" style={{ zIndex: -1 }}>
                    <div className="flex shrink-0">
                        <Image
                            src={coverImg}
                            alt="Cover Image"
                            className="mx-auto min-[1920px]:w-[100vw] opacity-50"
                            width={1920}
                            height={1080}
                        />
                    </div>
                </div>
                {children}
            </div>
        </>
    )
}
