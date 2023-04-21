import React from 'react'
import Heading from '@/components/UI/Heading'
import { v4 } from 'uuid';

export default function GuessResults({ results, score, resetGame }) {
    const maxScore = results.length;

    return (
        <div className="max-w-[1200px] text-center mb-10">
            <h2 className="text-2xl text-yellow-400 mb-6">Game Summary</h2>
            <table className="table-dark md:min-w-[600px]">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Correct Phrase</th>
                        <th>Your Answer</th>
                        <th>Score</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        results.map((r, i) => (
                            <tr key={v4()}>
                                <td>{i + 1}</td>
                                <td>{r.phrase.answer}</td>
                                <td>{r.answer}</td>
                                <td>{r.score}</td>
                            </tr>
                        ))
                    }
                </tbody>
                <tfoot>
                    <tr className="bg-slate-800">
                        <td colSpan="3" className="">Total Score</td>
                        <td className="w-[100px]">{score} / {maxScore}</td>
                    </tr>
                </tfoot>
            </table>
            <button
                className="btn-bordered bg-sky-600 hover:bg-sky-400"
                onClick={resetGame}
            >
                Play Again
            </button>
        </div>
    )
}
