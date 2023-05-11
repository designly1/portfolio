import React, { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import VideoPlayer from './VideoPlayer'

import svg from '@/svg/play-rotate.svg'

export default function VideoItem({ title, vid, thumb }) {
    const [showPlay, setShowPlay] = useState(false);
    const [showPlayer, setShowPlayer] = useState(false);

    const handlePlay = () => {
        setShowPlayer(true);
    }

    return (
        <>
            {showPlayer && (
                <VideoPlayer title={title} vid={vid} setShowPlayer={setShowPlayer} />
            )}
            <div className="flex flex-col gap-4">
                <h2 className="text-xl text-center">{title}</h2>
                <button
                    className="relative w-full h-full"
                    onMouseEnter={() => setShowPlay(true)}
                    onMouseLeave={() => setShowPlay(false)}
                    aria-label={title}
                    onClick={handlePlay}
                >
                    <Image className="w-full" src={thumb} alt={title} width={600} height={333} placeholder='blur' />
                    <AnimatePresence>
                        {showPlay && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.3 }}
                                className="absolute top-0 left-0 w-full h-full flex justify-center items-center bg-black/80"
                            >
                                <Image className="shadow" src={svg} alt="Play Button" width={200} height={200} />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </button>
            </div>
        </>
    )
}
