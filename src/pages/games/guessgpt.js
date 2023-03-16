import React from 'react'
import Layout from '@/components/Layout'
import GuessGPT from '@/components/Games/GuessGPT'

export default function PicsGamePage() {
    return (
        <Layout
            pageTitle="GuessGPT"
        >
            <GuessGPT />
        </Layout>
    )
}
