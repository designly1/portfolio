import query from "./query";

export default async function fetchPolicy({ slug, preview = false }) {
    const q = `{
        policyCollection(
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
                lastModified,
                description,
                content
              }
            }
      }`;
    const res = await query({ q, preview });
    return (res) ? res.data.policyCollection.items[0] : false;
}