// Use Next.js edge runtime
export const config = {
    runtime: 'edge',
}

export default async function handleRequest(request) {
    const OPENAI_API_KEY = process.env.NEXT_PUBLIC_OPENAI_KEY;
    const OPENAI_COMPLETION_ENDPOINT = 'https://api.openai.com/v1/completions';

    // Define the input text to be completed
    const formData = await request.formData();
    const input = `Using a Semantic similarity algorithm, please rate the similarity of the following phrases as a percentage:\n${formData.get('answer')}\n${formData.get('submitted')}`;
    // Define the parameters for the completion request
    const params = {
        "model": "text-davinci-003",
        "prompt": input,
    };

    // Make the completion request to OpenAI
    const response = await fetch(OPENAI_COMPLETION_ENDPOINT, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${OPENAI_API_KEY}`
        },
        body: JSON.stringify(params)
    });

    // Get the response from OpenAI and return it to the user
    let score = 0;
    const result = await response.json();
    const percentageRegex = /(\d+(\.\d+)?)%/;
    const match = percentageRegex.exec(result.choices[0].text);
    if (match !== null) {
        score = parseFloat(match[1]);
    }
    return new Response(JSON.stringify({
        score: score
    }), { status: 200 });
}

