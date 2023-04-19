import React, { useState, useEffect } from 'react'
import Balancer from 'react-wrap-balancer'
import AILoader from '../UI/AILoader';
import Captcha from '../UI/Captcha';
import PdfReader from '../UI/PdfReader';

export default function SemanticSearch() {
    const [searchTerm, setSearchTerm] = useState('');
    const [token, setToken] = useState(false);
    const [showCap, setShowCap] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [errorMess, setErrorMess] = useState('');
    const [searchErrorMess, setSearchErrorMess] = useState('');
    const [answer, setAnswer] = useState('');
    const [currentPageNumber, setCurrentPageNumber] = useState(1);
    const [pageNumbers, setPageNumbers] = useState([]);

    useEffect(() => {
        if (pageNumbers.length) {
            setCurrentPageNumber(pageNumbers[0]);
        }
    }, [pageNumbers])

    const embedSearchTerm = async () => {
        const body = new FormData();
        body.append('searchTerm', searchTerm);
        const result = await fetch('/api/vsearch/embed', {
            method: 'POST',
            body
        });
        if (!result.ok) {
            const mess = await result.text();
            throw new Error(mess);
        }
        const chunks = await result.json();
        if (!chunks.length) {
            setErrorMess('Sorry, I was unable to find a match');
            return;
        }
        setPageNumbers(chunks.map(c => (c.page_no)));

        return chunks;
    }

    const getAnswer = async (chunks) => {
        const body = {
            searchTerm,
            chunks
        }

        const result = await fetch('/api/vsearch/answer', {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (!result.ok) {
            const mess = await result.text();
        }

        // Get stream buffer
        const data = result.body;
        if (!data) return;

        setIsLoading(false);

        // Stream ouput from ChatGPT
        const reader = data.getReader();
        const decoder = new TextDecoder();
        let done = false;

        while (!done) {
            const { value, done: doneReading } = await reader.read();
            done = doneReading;
            const chunkValue = decoder.decode(value);
            setAnswer((prev) => prev + chunkValue);
        }
    }

    const handleSearch = async () => {
        if (isLoading) return;

        setSearchErrorMess('');
        if (!searchTerm.length) {
            setSearchErrorMess('Please fill this out');
            return;
        }

        setIsLoading(true);
        try {
            const chunks = await embedSearchTerm();
            if (chunks.length) {
                await getAnswer(chunks);
            }
        } catch (err) {
            setErrorMess(err.message);
        } finally {
            setIsLoading(false);
        }
    }

    const resetCaptcha = () => {
        setShowCap(false);
        setTimeout(() => setShowCap(true), 200);
    }

    const resetForm = () => {
        resetCaptcha();
        setSearchTerm('');
        setErrorMess('');
        setSearchErrorMess('');
        setAnswer('');
    }

    return (
        <div className="bg-bg2 min-h-screen py-20 px-6 flex flex-col gap-6 items-center">
            <h1 className="text-2xl font-bold text-center">
                <Balancer>Semantic Search Experiment</Balancer>
            </h1>
            <p className="max-w-[800px] text-justify">This tool uses OpenAI&apos;s GPT-3 text-embedding-ada model to transform a search term into a 1,536-element vector.{" "}
                That data is then compared with chunks of data from documents stored in a PostgreSQL table using the pg-vector extension. The documents are pre-parsed{" "}
                into roughly 1000-word chunks, analyzed by OpenAI, and then stored in the table. When a search is made against the data, the back-end makes a remote{" "}
                procedure call to a stored function in the PG database. The function returns 3 matches in order of its cosine similarity. Those 3 chunks are concatenated{" "}
                and then another API call is made to ChatGPT to digest the information and generate an answer to the question based on the provided data.
            </p>
            <form className="w-full md:w-[400px] flex flex-col gap-6 h-[210px]">
                {
                    isLoading
                        ?
                        <AILoader className="[&>img]:h-[130px] m-auto" />
                        :
                        <>
                            {
                                errorMess
                                    ?
                                    <div className="font-mono m-auto text-center flex flex-col gap-6">
                                        <div className="text-xl text-red-500 max-h-[210px] max-w-[500px] overflow-auto">
                                            <Balancer>{errorMess}</Balancer>
                                        </div>
                                        <button
                                            type="button"
                                            className="btn-bordered w-32 mx-auto hover:bg-bg0"
                                            onClick={() => setErrorMess(false)}
                                        >Try Again</button>
                                    </div>
                                    :
                                    <>
                                        {
                                            answer
                                                ?
                                                <div className="flex flex-col gap-6 text-mono">
                                                    <div>{answer}</div>
                                                    <button
                                                        type="button"
                                                        className="btn-bordered w-32 mx-auto hover:bg-bg0"
                                                        onClick={() => resetForm()}
                                                    >Try Again</button>
                                                </div>
                                                :
                                                <div className="flex flex-col gap-6 my-auto">
                                                    <div className="flex flex-col gap-1">
                                                        <input
                                                            className="input-base"
                                                            placeholder="Enter search term"
                                                            value={searchTerm}
                                                            onChange={e => setSearchTerm(e.target.value)}
                                                            onFocus={e => e.target.select()}
                                                        />
                                                        <p className="text-sm text-red-500 font-mono pl-2">{searchErrorMess}</p>
                                                    </div>
                                                    <Captcha setter={setToken} show={showCap} className="mx-auto" />
                                                    <button
                                                        type="button"
                                                        className="btn-bordered w-32 mx-auto hover:bg-bg0"
                                                        onClick={() => handleSearch()}
                                                    >Search</button>
                                                </div>
                                        }
                                    </>
                            }
                        </>
                }
            </form>
            <PdfReader
                file="https://cdn.designly.biz/pdf/hackers.pdf"
                currentPageNumber={currentPageNumber}
            />
        </div>
    )
}
