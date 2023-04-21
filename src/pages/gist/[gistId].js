import React, { useState, useEffect } from 'react'
import Layout from '@/components/Layout'
import Page404 from '../404'
import GithubGist from '@/components/GithubGist'

import { useRouter } from 'next/router'

export default function GistListPage({ title }) {
    const router = useRouter();
    const gistId = router.query.gistId;
    const [gist, setGist] = useState(null);
    const [notFound, setNotFound] = useState(false);

    useEffect(() => {
        if (gistId) {
            const apiUrl = `https://api.github.com/gists/${gistId}`;
            fetch(apiUrl)
                .then((response) => {
                    if (!response.ok) {
                        setNotFound(true);
                    } else {
                        return response.json();
                    }
                })
                .then((data) => {
                    setGist(data);
                });
        }
    }, [gistId]);

    if (notFound) {
        return <Page404 />
    } else {
        return (
            <Layout pageTitle={`Gist List${title ? ' | ' + title : ''}`}>
                {
                    gist && gist.files
                        ?
                        <GithubGist gist={gist} />
                        :
                        <div>Loading...</div>
                }
            </Layout>
        )
    }
}
