import query from "./query";

export default async function fetchPortfolios(props) {
    const { skip, limit, preview, where } = {
        skip: 0,
        limit: 0,
        where: "",
        preview: false,
        ...props
    }

    const whereClause = (where) ? `where: {${where}},` : "";
    const q = `{
        portfolioCollection(
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
    return (res) ? res.data.portfolioCollection.items : false;
}