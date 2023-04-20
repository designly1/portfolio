import { createParser } from "eventsource-parser";

const openAiStream = async (system, prompt) => {
    const encoder = new TextEncoder();
    const decoder = new TextDecoder();

    const res = await fetch("https://api.openai.com/v1/chat/completions", {
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

    if (res.status !== 200) {
        const mess = await res.text();
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

            for await (const chunk of res.body) {
                parser.feed(decoder.decode(chunk));
            }
        }
    });

    return stream;
};

export default openAiStream;