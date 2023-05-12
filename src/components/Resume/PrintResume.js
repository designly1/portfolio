import React from 'react'
import PdfReader from '../UI/PdfReader'
import Link from 'next/link'
import { BsFillCloudDownloadFill } from 'react-icons/bs'

export default function PrintResume() {
    return (
        <div className="flex flex-col justify-center items-center min-h-screen bg-bg0 gap-4">
            <Link className="flex items-center gap-2" href="https://cdn.designly.biz/jay/resume.pdf" target="_blank">
                <BsFillCloudDownloadFill />
                <div>Download File</div>
            </Link>
            <PdfReader
                file="https://cdn.designly.biz/jay/resume.pdf"
            />
        </div>
    )
}
