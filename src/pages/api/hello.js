// Next.js Edge API Routes: https://nextjs.org/docs/api-routes/edge-api-routes

export default async function handler(req) {
  return Response.json({ name: 'John Doe' })
}
