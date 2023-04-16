// Use Next.js edge runtime
export const config = {
    runtime: 'edge',
}

export default async function handler(req) {
    const data = {
        collection: 'twoPics',
        database: 'portfolio',
        dataSource: 'Cluster0'
    };

    const url = `${process.env.DB_ENDPOINT}/action/find`;

    const config = {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Request-Headers': '*',
            'api-key': process.env.DB_KEY
        },
        body: JSON.stringify(data)
    }

    try {
        const result = await fetch(url, config);
        const json = await result.json();
        return new Response(
            JSON.stringify(json),
            {
                status: 200,
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        )
    } catch (err) {
        console.error(err);
        return new Response(
            null,
            {
                status: 500,
                statusText: 'Error fetching game data'
            }
        )
    }
}