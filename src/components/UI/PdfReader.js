import React, { useState, useEffect } from 'react'
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/esm/Page/TextLayer.css';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';

import { BsArrowRightSquare, BsArrowLeftSquare } from 'react-icons/bs'
import { AiOutlineHome } from 'react-icons/ai'

export default function PdfReader({ file, className, currentPageNumber }) {
    const [numPages, setNumPages] = useState(null);
    const [thisPageNumber, setThisPageNumber] = useState(1);
    pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

    const onDocumentLoadSuccess = ({ numPages }) => {
        setNumPages(numPages);
    }

    const handleNexPage = () => {
        if (thisPageNumber >= numPages) return;
        setThisPageNumber(old => old + 1);
    }

    const handlePrevPage = () => {
        if (thisPageNumber - 1 === 0) return;
        setThisPageNumber(old => old - 1);
    }

    useEffect(() => {
        if (currentPageNumber) {
            setThisPageNumber(currentPageNumber);
        }
    }, [currentPageNumber]);

    return (
        <div className={`flex flex-col gap-4 h-[800px] ${className ? className : ''}`}>
            <Document
                file={file ? file : null}
                onLoadSuccess={onDocumentLoadSuccess}
                onLoadError={console.error}
            >
                <Page pageNumber={thisPageNumber} />
            </Document>
            <div className="flex justify-around">
                <div className="flex gap-6 text-2xl">
                    <button onClick={handlePrevPage}>
                        <BsArrowLeftSquare />
                    </button>
                    <button onClick={() => setThisPageNumber(1)}>
                        <AiOutlineHome />
                    </button>
                    <button onClick={handleNexPage}>
                        <BsArrowRightSquare />
                    </button>
                </div>
                <p>
                    Page {thisPageNumber} of {numPages}
                </p>
            </div>
        </div>
    )
}
