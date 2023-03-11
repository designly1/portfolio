import query from "./query";

export default async function fetchPosts(props) {
  const { skip, limit, preview, where } = {
    skip: 0,
    limit: 0,
    where: "",
    preview: false,
    ...props
  }

  const whereClause = (where) ? `where: {${where}},` : "";
  const q = `{
        postCollection(
          ${whereClause}
          preview: ${preview.toString()},
          skip: ${skip},
          limit: ${limit}
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
  return (res) ? res.data.postCollection.items : false;
}