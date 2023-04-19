import React from 'react'
import Layout from '@/components/Layout'
import SemanticSearch from '@/components/Portfolio/SemanticSearch'

export default function SemanticSearchPage() {
    return (
        <Layout pageTitle="Semantic Search Example"
            description="Proof of concept for GPT-powered semantic search"
        >
            <SemanticSearch />
        </Layout>
    )
}
