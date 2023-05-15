import React, { useState, useEffect } from 'react'
import { HiCalculator } from 'react-icons/hi'
import { FaEquals, FaUndoAlt } from 'react-icons/fa'

const pitchData = [
    { pitch: '1/12', angle: '4.8', multiplyBy: 1.003 },
    { pitch: '2/12', angle: '9.5', multiplyBy: 1.014 },
    { pitch: '3/12', angle: '14.0', multiplyBy: 1.031 },
    { pitch: '4/12', angle: '18.4', multiplyBy: 1.054 },
    { pitch: '5/12', angle: '22.6', multiplyBy: 1.083 },
    { pitch: '6/12', angle: '26.6', multiplyBy: 1.118 },
    { pitch: '7/12', angle: '30.3', multiplyBy: 1.158 },
    { pitch: '8/12', angle: '33.7', multiplyBy: 1.202 },
    { pitch: '9/12', angle: '36.9', multiplyBy: 1.250 },
    { pitch: '10/12', angle: '39.8', multiplyBy: 1.302 },
    { pitch: '11/12', angle: '42.5', multiplyBy: 1.357 },
    { pitch: '12/12', angle: '45.0', multiplyBy: 1.414 },
    { pitch: '13/12', angle: '47.3', multiplyBy: 1.474 },
    { pitch: '14/12', angle: '49.4', multiplyBy: 1.537 },
    { pitch: '15/12', angle: '51.3', multiplyBy: 1.601 },
    { pitch: '16/12', angle: '53.1', multiplyBy: 1.667 },
    { pitch: '17/12', angle: '54.8', multiplyBy: 1.734 },
    { pitch: '18/12', angle: '56.3', multiplyBy: 1.803 },
    { pitch: '19/12', angle: '57.7', multiplyBy: 1.873 },
    { pitch: '20/12', angle: '59.0', multiplyBy: 1.944 },
    { pitch: '21/12', angle: '60.3', multiplyBy: 2.016 },
    { pitch: '22/12', angle: '61.4', multiplyBy: 2.088 },
    { pitch: '23/12', angle: '62.4', multiplyBy: 2.162 },
    { pitch: '24/12', angle: '63.4', multiplyBy: 2.236 },
];

export default function RoofCalc() {
    const [result, setResult] = useState(0);
    const [footprint, setFootprint] = useState(null);
    const [pitch, setPitch] = useState(null);

    useEffect(() => {
        const calculate = () => {
            if (!footprint || !pitch) return;

            const res = footprint * pitchData.find(item => item.pitch === pitch).multiplyBy;
            setResult(res.toFixed(2));
        }

        calculate();
    }, [footprint, pitch]);

    return (
        <div className="min-h-screen bg-bg2 flex flex-col gap-10 px-4 md:px-20 py-20">
            <h1 className="text-center text-2xl font-bold text-white">Rooftop Area Calculator</h1>
            <div className="flex flex-col gap-6 max-w-xs w-full mx-auto h-72">
                <div className="form-control w-full">
                    <label className="label">
                        <span className="label-text">Rooftop footprint area</span>
                        <span className="label-text-alt">Feet<sup>2</sup></span>
                    </label>
                    <input
                        type="number"
                        placeholder="e.g. 2380"
                        className="input input-bordered w-full max-w-xs"
                        min={1}
                        max={999999999999}
                        value={footprint}
                        onChange={(e) => setFootprint(e.target.value)}
                    />
                </div>
                <div className="form-control w-full">
                    <label className="label">
                        <span className="label-text">Rooftop pitch</span>
                        <span className="label-text-alt">Rise/Run</span>
                    </label>
                    <select
                        className="select w-full"
                        value={pitch}
                        onChange={(e) => setPitch(e.target.value)}
                    >
                        <option disabled>Select Pitch</option>
                        {pitchData.map((item) => (
                            <option key={item.pitch} value={item.pitch}>
                                {item.pitch} ({item.angle}°)
                            </option>
                        ))}
                    </select>
                </div>
                <div className="text-center text-3xl font-bold text-white mx-auto flex gap-1 items-center">
                    <FaEquals className="mr-4" /> {result} ft<sup>2</sup>
                </div>
            </div>
        </div>
    )
}
