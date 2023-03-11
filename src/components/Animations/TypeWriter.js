// @/components/Home/TypeWriter.js
import React, { useState, useEffect } from 'react'

// List of things to type
const hats = [
    'Web Developer',
    'UI/UX Designer',
    'Graphics Designer',
    'Application Developer'
];

export default function TypeWriter({ appendClass }) {
    // Outer container base class + append custom class
    let className = "flex flex-col gap-4";
    if (appendClass) className += " " + appendClass;

    // Typewriter effect base class
    const typeWriterClass = "font-bold border-b-2 border-b-blue-400 border-r-2 pr-1"
        + "animate-cursor overflow-hidden whitespace-nowrap transition-[width] ease-in-out duration-1000 mr-auto";

    // State of current hat index
    const [currentHat, setCurrentHat] = useState(0);
    // State to toggle word collapse effect
    const [collapseClass, setCollapseClass] = useState(" w-full");

    useEffect(() => {
        const incrementHat = async () => {
            // Set the width to 0 - transition duration is 1000ms
            setCollapseClass(" w-0");
            setTimeout(() => {
                /**
                 * After 1100ms, change the displayed text while the div
                 * is collapsed by incrementing the index
                 */
                setCurrentHat(oldVal => {
                    if (oldVal >= hats.length - 1) {
                        return 0;
                    } else {
                        return oldVal + 1;
                    }
                });
            }, 1100);
            // After 1000ms, set width to 100% - transition duration is 1000ms
            setTimeout(() => {
                setCollapseClass(" w-full");
            }, 1000);
        }
        // Interval timer to change text every 4000ms
        const id = setInterval(incrementHat, 4000);

        // Cleanup interval timer
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
