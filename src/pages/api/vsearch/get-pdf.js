export const config = {
    runtime: 'edge',
}

export default async function handler() {
    const result = await fetch('https://cdn.designly.biz/pdf/hackers.pdf');
    return new Response(result);
}