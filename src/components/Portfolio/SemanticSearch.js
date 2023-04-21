import React, { useState, useEffect } from 'react'
import Balancer from 'react-wrap-balancer'
import AILoader from '../UI/AILoader';
import PdfReader from '../UI/PdfReader';
import useCaptcha from '@/hooks/useCaptcha';
import ExtLink from '../UI/ExtLink';

export default function SemanticSearch() {
    const [searchTerm, setSearchTerm] = useState('');
    const [token, setToken] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [errorMess, setErrorMess] = useState('');
    const [searchErrorMess, setSearchErrorMess] = useState('');
    const [answer, setAnswer] = useState('');
    const [currentPageNumber, setCurrentPageNumber] = useState(1);
    const [pageNumbers, setPageNumbers] = useState([]);

    const captcha = useCaptcha({ onVerify: setToken });

    useEffect(() => {
        if (pageNumbers.length) {
            setCurrentPageNumber(pageNumbers[0]);
        }
    }, [pageNumbers])

    const embedSearchTerm = async () => {
        const body = new FormData();
        body.append('searchTerm', searchTerm);
        body.append('token', token);
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
        };

        const response = await fetch('/api/vsearch/answer', {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            const message = await response.text();
            throw new Error(message);
        }

        const stream = response.body;
        const reader = stream.getReader();

        while (true) {
            const { done, value } = await reader.read();

            if (done) {
                break;
            }

            const chunk = new TextDecoder('utf-8').decode(value);
            setAnswer((prev) => prev + chunk);
        }
    };


    const handleSearch = async (e) => {
        e.preventDefault();
        e.stopPropagation();
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
            captcha.reset();
        } finally {
            setIsLoading(false);
        }
    }

    const resetForm = () => {
        captcha.reset();
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
            <div className="flex gap-6">
                <ExtLink
                    title="Blog Article"
                    target="_blank"
                    href="https://designly.biz/blog/post/implementing-semantic-search-with-supabase-next-js-and-openai-a-tutorial"
                />
                <ExtLink
                    title="Source Code"
                    href="/gist/05258dc58a0a67698f4cf5b21bb9d913"
                />
            </div>
            <div className="flex flex-col gap-4">
                <h2 className="text-xl">Suggested Queries:</h2>
                <ol className="list-decimal">
                    <li>Tell me about the IBM 704</li>
                    <li>What is the author&apos;s sentiment about IBM?</li>
                    <li>Who was Jack Dennis?</li>
                </ol>
            </div>
            <form className="w-full md:w-[400px] flex flex-col gap-6" onSubmit={handleSearch}>
                <div className="mx-auto">
                    {captcha.render()}
                </div>
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
                                        <div className="text-xl text-red-500 max-w-[500px] overflow-auto">
                                            <Balancer>{errorMess}</Balancer>
                                        </div>
                                        <button
                                            type="button"
                                            className="btn-bordered w-32 mx-auto hover:bg-bg0"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                setErrorMess(false)
                                            }}
                                        >Try Again</button>
                                    </div>
                                    :
                                    <>
                                        {
                                            answer
                                                ?
                                                <div className="flex flex-col gap-6 text-mono overflow-auto">
                                                    <div>{answer}</div>
                                                    <button
                                                        type="button"
                                                        className="btn-bordered w-32 mx-auto hover:bg-bg0"
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            resetForm()
                                                        }}
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
                                                    <button
                                                        type="submit"
                                                        className="btn-bordered w-32 mx-auto hover:bg-bg0"
                                                    >Search</button>
                                                </div>
                                        }
                                    </>
                            }
                        </>
                }
            </form>
            <h2 className="text-xl">PDF Document: <span className="italic">True Hackers</span></h2>
            <p>Upon successful search match, the PDF viewer automatically takes you to the first relevant page.</p>
            <PdfReader
                file="https://cdn.designly.biz/pdf/hackers.pdf"
                currentPageNumber={currentPageNumber}
            />
            <div className="flex flex-col gap-6 pt-10 max-w-[800px]">
                <h2 className="text-2xl text-center">Conclusion</h2>
                <p>Thanks to the semantic similarity search, I am able to feed the most relevant passages from the body of text to ChatGPT.{' '}
                    ChatGPT has the ability to not just find the meaning of the question, but also summize the answer based on very limited information.
                </p>
                <p>This technology is going to utterly change the world as we know it. Our individual access to information and knowledge will be limitless.</p>
            </div>
        </div>

    )
}
