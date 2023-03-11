import query from "./query";

export default async function fetchSolution({ slug, preview = false }) {
    const q = `{
        solutionCollection(
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
                title,
                slug,
                description,
                content,
                intro,
                order
              }
            }
      }`;
    const res = await query({ q, preview });
    return (res) ? res.data.solutionCollection.items[0] : false;
}