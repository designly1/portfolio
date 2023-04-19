import readRequestBody from "@/lib/readRequestBody";
import endent from "endent";
import { createParser } from "eventsource-parser";

// Use Next.js edge runtime
export const config = {
    runtime: 'edge',
}

export default async function handler(request) {
    try {
        const encoder = new TextEncoder();
        const decoder = new TextDecoder();

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

        const result = await fetch("https://api.openai.com/v1/chat/completions", {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${process.env.OPENAI_KEY}`
            },
            method: "POST",
            body: JSON.stringify({
                model: 'gpt-3.5-turbo',
                messages: [
                    {
                        role: "system",
                        content: system
                    },
                    {
                        role: "user",
                        content: prompt
                    }
                ],
                max_tokens: 150,
                temperature: 0.0,
                stream: true
            })
        });
        console.log(prompt)

        if (!result.ok) {
            const mess = await result.text();
            throw new Error(mess);
        }

        const stream = new ReadableStream({
            async start(controller) {
                const onParse = (event) => {
                    if (event.type === "event") {
                        const data = event.data;

                        if (data === "[DONE]") {
                            controller.close();
                            return;
                        }

                        try {
                            const json = JSON.parse(data);
                            const text = json.choices[0].delta.content;
                            const queue = encoder.encode(text);
                            controller.enqueue(queue);
                        } catch (e) {
                            controller.error(e);
                        }
                    }
                };

                const parser = createParser(onParse);

                for await (const chunk of result.body) {
                    parser.feed(decoder.decode(chunk));
                }
            }
        });

        return new Response(stream);

    } catch (err) {
        return new Response(`Server error: ${mess}`, { status: 500 });
    }
}