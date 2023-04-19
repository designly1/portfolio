import { createClient } from "@supabase/supabase-js";
import readRequestBody from "@/lib/readRequestBody";

// Use Next.js edge runtime
export const config = {
    runtime: 'edge',
}

export default async function handler(request) {
    const MATCHES = 3; // max matches to return
    const THRESHOLD = 0.01; // similarity threshold

    try {
        const requestData = await readRequestBody(request);
        const supabase = createClient(process.env.NEXT_PUBLIC_SB_URL, process.env.SB_SERVICE_KEY);

        // Get embedding vector for search term via OpenAI
        const input = requestData.searchTerm.replace(/\n/g, " ");
        const result = await fetch("https://api.openai.com/v1/embeddings", {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${process.env.OPENAI_KEY}`
            },
            method: "POST",
            body: JSON.stringify({
                model: "text-embedding-ada-002",
                input
            })
        });

        if (!result.ok) {
            const mess = await result.text();
            throw new Error(mess)
        }

        const json = await result.json();
        const embedding = json.data[0].embedding;

        // Perform cosine similarity search via RPC call
        const { data: chunks, error } = await supabase.rpc("vector_search", {
            query_embedding: embedding,
            similarity_threshold: THRESHOLD,
            match_count: MATCHES
        });

        if (error) {
            console.error(error);
            throw new Error(error);
        }

        return new Response(JSON.stringify(chunks), {
            status: 200,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    } catch (err) {
        return new Response(`Server error: ${err.message}`, { status: 500 });
    }
}