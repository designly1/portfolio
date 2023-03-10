// @/components/Home/TypeWriter.js
import React, { useState, useEffect } from 'react'

const hats = [
    'Web Developer',
    'UI/UX Designer',
    'Graphics Designer',
    'Application Developer'
];

export default function TypeWriter({ appendClass }) {
    let className = "flex flex-col gap-4";
    if (appendClass) className += " " + appendClass;

    const typeWriterClass = "font-bold border-b-2 border-b-blue-400 border-r-2 pr-1 animate-cursor overflow-hidden whitespace-nowrap transition-[width] ease-in-out duration-1000 mr-auto";

    const [currentHat, setCurrentHat] = useState(0);
    const [collapseClass, setCollapseClass] = useState(" w-full");

    useEffect(() => {
        const incrementHat = async () => {
            setCollapseClass(" w-0");
            setTimeout(() => {
                setCurrentHat(oldVal => {
                    if (oldVal >= hats.length - 1) {
                        return 0;
                    } else {
                        return oldVal + 1;
                    }
                });
            }, 1100);
            setTimeout(() => {
                setCollapseClass(" w-full");
            }, 1000);
        }
        const id = setInterval(incrementHat, 4000);

        return () => clearInterval(id);
    }, []);

    return (
        <div className={className}>
            <div className="text-6xl text-center mx-auto">
                Jay <span className="text-blue-400 font-bold">Simons</span>
            </div>
            <div className="flex gap-2 text-4xl mx-auto">
                <div className="shrink-0 whitespace-nowrap ml-auto">I am a</div>
                <div className={`${typeWriterClass}${collapseClass}`}>{hats[currentHat]}</div>
            </div>
        </div>
    )
}
