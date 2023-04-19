import React from 'react'
import Img from './Img';

import svg from '@/svg/ai-anim.svg';

export default function AILoader({ className }) {
    return (
        <div className={`flex flex-col [&>*]:mx-auto ${className ? className : ''}`}>
            <Img src={svg.src} alt="Loading" />
        </div>
    )
}
