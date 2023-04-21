import readRequestBody from "@/lib/api/readRequestBody";
import checkTurnstileToken from "@/lib/api/checkTurnstileToken";
import semanticSim from "@/lib/openAi/semanticSim";

// Use Next.js edge runtime
export const config = {
    runtime: 'edge',
}

export default async function handleRequest(request) {
    const OPENAI_API_KEY = process.env.OPENAI_KEY;
    const OPENAI_COMPLETION_ENDPOINT = 'https://api.openai.com/v1/completions';
    const formData = await readRequestBody(request);
    try {
        // Check CAPTCHA token
        if (!await checkTurnstileToken(formData.token)) {
            throw new Error('Captcha verification failed');
        }

        // Check input
        if (formData.answer.length < 3 || formData.answer.length > 100) {
            throw new Error('Answer length out of range');
        }
        if (formData.submitted.length < 3 || formData.submitted.length > 100) {
            throw new Error('Submitted length out of range');
        }

        const sim = await semanticSim(formData.answer, formData.submitted);

        return new Response(JSON.stringify({ score: sim }), {
            headers: {
                'Content-Type': 'application/json'
            }
        });
    } catch (err) {
        return new Response(err.message, { status: 500 });
    }
}