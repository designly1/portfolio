import query from "./query";

export default async function fetchPost({ slug, preview = false }) {
  const q = `{
        postCollection(
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
            date,
            slug,
            coverImage,
            author {
              name
              bio,
              picture {
                url,
                width,
                height
              }
            },
            excerpt,
            content,
            category {
              categoryName
              slug
              description
            },
            tagsCollection {
              items {
                tag,
                slug
              }
            }
          }
        }
      }`;
  const res = await query({ q, preview });
  return (res) ? res.data.postCollection.items[0] : false;
}