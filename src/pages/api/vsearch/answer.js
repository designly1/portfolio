import readRequestBody from "@/lib/api/readRequestBody";
import endent from "endent";
import openAiStream from "@/lib/openAi/openAiStream";

// Use Next.js edge runtime
export const config = {
    runtime: 'edge',
}

export default async function handler(request) {
    try {
        const requestData = await readRequestBody(request);
        const query = requestData.searchTerm.replace(/\n/g, " ");

        const system = endent`
    You are a helpful assistant that answers questions based on a provided body of text.
    Use only the provided text to answer the question. Try not to copy the text word-for-word.
    If you are not certain of the answer, then answer: "Sorry, I can't help you with that."
    `

        const textBody = requestData.chunks.map(c => {
            return c.content + ' ';
        });

        const prompt = `Please answer this query: ${query}\n\n`
            + `Use only the following information:\n\n${textBody}`;

        const stream = await openAiStream(system, prompt);

        return new Response(stream);
    } catch (err) {
        return new Response(`Server error: ${err.message}`, { status: 500 });
    }
}