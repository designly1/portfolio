import query from "./query";

export default async function fetchSlugs(contentType = 'postCollection') {
    const q = `{
        ${contentType} {
          items {
            slug
          }
        }
      }`;
    const res = await query({ q, preview: false });
    const slugs = (res) ? res.data[contentType]['items'] : false;
    return slugs.map((slug) => (slug.slug));
}