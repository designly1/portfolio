/**

    Calls OpenAI's chat completions API and returns a ReadableStream that emits the text responses from the model.
    @async
    @function
    @param {string} system - The system prompt to send to the OpenAI model.
    @param {string} prompt - The user prompt to send to the OpenAI model.
    @throws {Error} If the HTTP response status code is not 200.
*/
import { createParser } from 'eventsource-parser';

const openAiChat = async (system, prompt) => {
	const res = await fetch('https://api.openai.com/v1/chat/completions', {
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${process.env.OPENAI_KEY}`,
		},
		method: 'POST',
		body: JSON.stringify({
			model: 'gpt-3.5-turbo',
			messages: [
				{
					role: 'system',
					content: system,
				},
				{
					role: 'user',
					content: prompt,
				},
			],
			max_tokens: 150,
			stream: false,
		}),
	});

	if (res.status !== 200) {
		const mess = await res.text();
		throw new Error(mess);
	}
	const json = await res.json();
	const answer = json.choices[0]?.message?.content;
	if (!answer) throw new Error('No answer returned');

	return answer;
};

export default openAiChat;
