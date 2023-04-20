export default async function checkTurnstileToken(token) {
    const url = "https://challenges.cloudflare.com/turnstile/v0/siteverify";

    const formData = new FormData();
    formData.append('secret', process.env.TURNSTILE_SECRET_KEY);
    formData.append('response', token);

    try {
        const result = await fetch(url, {
            body: formData,
            method: 'POST',
        });

        const outcome = await result.json();
        if (outcome.success) {
            return true;
        }
    } catch (err) {
        console.error(err);
    }
    return false;
}