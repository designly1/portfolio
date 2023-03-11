import timeAgo from "./timeAgo"

export const blogPostMeta = (post) => {
    return {
        canonicalUrl: process.env.NEXT_PUBLIC_BASE_URL + "/blog/post/" + post.slug,
        timeAgo: timeAgo(post.date)
    }
}