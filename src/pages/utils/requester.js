import React, { useState } from 'react'
import Layout from '@/components/Layout'
import Requester from '@/components/Requester'

export default function RequesterPage() {


    return (
        <Layout
            pageTitle="Requester"
        >
            <Requester />
        </Layout>
    )
}
