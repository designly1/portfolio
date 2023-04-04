import React from 'react'
import { FiMenu as Icon } from 'react-icons/fi'

export default function MenuButton({ setter }) {
    return (
        <button
            className="fixed top-4 left-4 text-4xl flex md:hidden z-20 print:hidden"
            onClick={() => {
                setter(oldVal => !oldVal);
            }}
        >
            <Icon />
        </button>
    )
}
