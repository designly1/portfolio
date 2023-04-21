/**
 * Gets the embedding vector for a given search term using the OpenAI API.
 * @async
 * @function
 * @param {string} str - The search term to embed.
 * @returns {Promise<number[]>} A promise that resolves to an array of numerical values representing the embedding vector.
 * @throws {Error} If the API request fails, an error is thrown with the error message from the API response.
 */
export default async function getEmbedding(str) {
    // Get embedding vector for search term via OpenAI
    const input = str.replace(/\s+/g, " ");
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

    return embedding;
}