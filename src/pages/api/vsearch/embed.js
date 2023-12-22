/**
    URL: /api/vsearch/embed
    
    Searches for similar chunks of text in a Supabase database using cosine similarity.

    @param {Request} request - The incoming HTTP request object.

    @returns {Response} A response object containing a JSON array of matching text chunks.

    @throws {Error} If captcha verification fails or search term length is out of range.
*/
import { createClient } from '@supabase/supabase-js';
import readRequestBody from '@/lib/api/readRequestBody';
import checkTurnstileToken from '@/lib/api/checkTurnstileToken';
import getEmbedding from '@/lib/openAi/getEmbedding';
import openAiChat from '@/lib/openAi/chat';
import endent from 'endent';

// Use Next.js edge runtime
export const config = {
	runtime: 'edge',
};

export default async function handler(request) {
	const isDev = process.env.NODE_ENV === 'development';
	const MATCHES = 3; // max matches to return
	const THRESHOLD = 0.01; // similarity threshold

	try {
		const requestData = await readRequestBody(request);

		// Validate CAPTCHA response
		if (!isDev) {
			if (!(await checkTurnstileToken(requestData.token))) {
				throw new Error('Captcha verification failed');
			}
		}

		// Validate length
		if (requestData.searchTerm.length < 10 || requestData.searchTerm.length > 100) {
			throw new Error('Search term length out of range');
		}

		const embedding = await getEmbedding(requestData.searchTerm);

		const supabase = createClient(process.env.NEXT_PUBLIC_SB_URL, process.env.SB_SERVICE_KEY);

		// Perform cosine similarity search via RPC call
		const { data: chunks, error } = await supabase.rpc('vector_search', {
			query_embedding: embedding,
			similarity_threshold: THRESHOLD,
			match_count: MATCHES,
		});

		if (error) {
			console.error(error);
			throw new Error(error);
		}

		// Get answer from OpenAI
		const system = endent`
    You are a helpful assistant that answers questions based on a provided body of text.
    Use only the provided text to answer the question. Try not to copy the text word-for-word.
    If you are not certain of the answer, then answer: "Sorry, I can't help you with that."
    `;

		const query = requestData.searchTerm;
		const textBody = chunks
			.map(c => {
				return c.content + ' ';
			})
			.join('\n');

		// Validate length
		if (query.length < 10 || query.length > 100) {
			throw new Error('Search term out of range');
		}
		if (textBody.length > 3000) {
			throw new Error('Received data length out of range');
		}

		const prompt =
			`Please answer this query: ${query}\n\n` + `Use only the following information:\n\n${textBody}`;

		const answer = await openAiChat(system, prompt);

		return new Response(JSON.stringify({ chunks, answer }), {
			headers: {
				'Content-Type': 'application/json',
			},
		});
	} catch (err) {
		return new Response(`Server error: ${err.message}`, { status: 500 });
	}
}
