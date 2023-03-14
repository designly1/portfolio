import React from 'react'
import Layout from '@/components/Layout'
import TicTacToe from '@/components/Games/TicTacToe'

export default function tttPage() {
    return (
        <Layout
            pageTitle="Tic Tac Toe"
        >
            <div className="bg-bg0 min-h-screen flex">
                <TicTacToe />
            </div>
        </Layout>
    )
}
