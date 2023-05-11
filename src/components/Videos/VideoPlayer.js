import React, { useEffect, useState } from 'react'
import YouTube from 'react-youtube';
import { FaTimes } from 'react-icons/fa'

import { aspectRatio } from '@/lib/imageFunctions';

export default function VideoPlayer({ vid, title, setShowPlayer }) {
    const [videoDims, setVideoDims] = useState([640, 390]);

    useEffect(() => {
        const dims = aspectRatio([640, 390], window.innerWidth - 500);
        setVideoDims(dims);
    }, []);

    const opts = {
        height: videoDims[1],
        width: videoDims[0],
        playerVars: {
            // https://developers.google.com/youtube/player_parameters
            autoplay: 1,
        },
    };

    const onReady = (event) => {
        // access to player in all event handlers via event.target
        event.target.pauseVideo();
    }

    return (
        <div className="fixed top-0 right-0 bottom-0 left-0 bg-black z-50 flex justify-center items-center">
            <button
                className="fixed top-4 left-4 text-white text-3xl"
                onClick={() => setShowPlayer(false)}
            >
                <FaTimes />
            </button>
            <YouTube videoId={vid} opts={opts} onReady={onReady} />
        </div>
    )
}
