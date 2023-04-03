import React from 'react'

export default function Switch({
    on = 'On',
    off = 'Off',
    value = false,
    onClick
}) {
    return (
        <div className="flex cursor-pointer w-fit" onClick={onClick}>
            <div className={`px-4 py-2 rounded-l-xl ${value ? 'bg-gray-600' : 'bg-gray-800'}`}>
                <span className={value ? 'opacity-50' : ''}>{off}</span>
            </div>
            <div className={`px-4 py-2 rounded-r-xl ${value ? 'bg-gray-800' : 'bg-gray-600'}`}>
                <span className={!value ? 'opacity-50' : ''}>{on}</span>
            </div>
        </div>
    )
}
