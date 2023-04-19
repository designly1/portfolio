import React from 'react'

export default function Img({ src, alt, width, height, className }) {
    return (
        <>
            {/* eslint-disable-next-line*/}
            <img className={className} src={src} alt={alt} width={width} height={height} />
        </>
    )
}