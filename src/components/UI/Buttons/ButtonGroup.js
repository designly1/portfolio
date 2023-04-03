import React from 'react'
import { ClockLoader } from 'react-spinners'

export default function ButtonGroup({ buttons, hoverClass, isLoading, loadingText = 'Loading...' }) {
    if (isLoading) {
        return (
            <div className="flex gap-2 [&>*]:my-auto text-white/60 text-xl border-2 border-white/20 w-fit px-4 py-2 rounded-xl">
                <ClockLoader size={25} color="white" />
                <div>{loadingText}</div>
            </div>
        )
    } else {
        return (
            <div className="flex">
                {buttons.map(b => (
                    <button
                        className={`btn-trans hover:${hoverClass} flex gap-2 [&>*]:my-auto px-4 py-2 first:rounded-l-lg last:rounded-r-lg ${b?.className}`}
                        type='button'
                        key={b.title}
                        onClick={b.onClick}
                    >
                        {b?.icon ? b.icon : <></>}
                        <div>{b.title}</div>
                    </button>
                ))}
            </div>
        )
    }
}
