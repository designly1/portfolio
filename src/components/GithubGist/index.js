import React, { useState, useEffect } from "react";
import MdPage from "../Common/MdPage";
import getMarkdownLanguageCode from "@/lib/content/getMarkdownLanguageCode";
import Balancer from 'react-wrap-balancer'

import { FiArrowLeftCircle, FiArrowRightCircle } from 'react-icons/fi'

const GithubGist = ({ gist }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const files = Object.values(gist.files);
    const nextFile = files[currentIndex + 1] ? files[currentIndex + 1].filename : '--';

    const handleLeftArrow = () => {
        if (currentIndex > 0) {
            setCurrentIndex(old => old - 1);
        }
    }

    const handleRightArrow = () => {
        if (currentIndex < files.length - 1) {
            setCurrentIndex(old => old + 1);
        }
    }

    return (
        <div className="flex flex-col gap-6 px-4 md:px-20 bg-bg0 py-20">
            <h1 className="text-2xl text-center">
                <Balancer>{gist.description}</Balancer>
            </h1>
            {files.map((file, i) => {
                const md = "```" + getMarkdownLanguageCode(file.language) + "\n" + file.content + "\n```";
                if (i === currentIndex) {
                    return (
                        <div key={file.filename}>
                            <div className="grid grid-cols-3">
                                <h3 className="font-mono">{file.filename}</h3>
                                <div className="flex justify-around text-3xl">
                                    <button onClick={handleLeftArrow}>
                                        <FiArrowLeftCircle />
                                    </button>
                                    <button onClick={handleRightArrow}>
                                        <FiArrowRightCircle />
                                    </button>
                                </div>
                                <div className="text-right">Next: {nextFile}</div>
                            </div>
                            <MdPage markdown={md} />
                        </div>
                    )
                }
            })}
        </div>
    );
};

export default GithubGist;
