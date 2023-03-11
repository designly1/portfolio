import query from "./query";

export default async function fetchSolutions(props) {
    const { skip, limit, preview, where } = {
        skip: 0,
        limit: 0,
        where: "",
        preview: false,
        ...props
    }

    const whereClause = (where) ? `where: {${where}},` : "";
    const q = `{
        solutionCollection(
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
                slug,
                description,
                intro,
                order
              }
            }
      }`;
    const res = await query({ q, preview });
    return (res) ? res.data.solutionCollection.items : false;
}