import query from "./query";

export default async function fetchPortfolio({ slug, preview = false }) {
    const q = `{
        portfolioCollection(
          where: {slug: "${slug}"},
          preview: ${preview.toString()},
          limit: 1
        ) {
            items {
                sys {
                  id,
                  publishedAt,
                  firstPublishedAt
                },
                company,
                slug,
                date,
                thumb,
                description,
                url
              }  
            }
      }`;
    const res = await query({ q, preview });
    return (res) ? res.data.portfolioCollection.items[0] : false;
}