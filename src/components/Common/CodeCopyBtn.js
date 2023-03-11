import React, { useState } from 'react'
import { RxCopy } from 'react-icons/rx'
import { BsCheckSquareFill } from 'react-icons/bs'

export default function CodeCopyBtn({ children }) {
    const [copyOk, setCopyOk] = useState(false);

    const iconColor = copyOk ? '#0af20a' : '#ddd';
    const icon = copyOk ? <BsCheckSquareFill className="text-green-500" /> : <RxCopy className="text-white" />;

    const handleClick = (e) => {
        navigator.clipboard.writeText(children[0].props.children[0]);
        console.log(children)

        setCopyOk(true);
        setTimeout(() => {
            setCopyOk(false);
        }, 500);
    }

    return (
        <button
            className="absolute top-4 right-4 text-xl"
            type="button"
            onClick={handleClick}
        >
            {icon}
        </button>
    )
}
