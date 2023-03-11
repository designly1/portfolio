import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Head from 'next/head'

import xEyes from '@/svg/x-eyes.svg'

export default function Page404() {
    return (
        <>
            <Head>
                <title>Error 404</title>
            </Head>
            <div className="bg-bg1 h-screen flex flex-col text-white">
                <div className="m-auto flex flex-col">
                    <h1 className="text-6xl text-center mb-4">Error <span className="text-gray-400">404</span></h1>
                    <p className="text-center">The page or resource you were looking for could not be located on this server. Sorry.</p>
                    <Image className="mx-auto" src={xEyes} alt="X-eyes" width={400} height={400} />
                    <Link href="/" className="text-center text-lg mx-auto hover:opacity-60">[ Take me home! ]</Link>
                </div>
            </div>
        </>
    )
}
