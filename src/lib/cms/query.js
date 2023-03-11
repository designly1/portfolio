import axios from 'axios'
import CMSConfig from '@/constants/CMSConfig'

const accessToken = process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN;
const previewAccessToken = process.env.NEXT_PUBLIC_CONTENTFUL_PREVIEW_TOKEN;

export default async function query({ q, preview = false }) {
    try {
        const res = await axios({
            url: CMSConfig.endpoint,
            method: 'post',
            headers: {
                'content-type': 'application/json',
                authorization: `Bearer ${preview ? previewAccessToken : accessToken}`
            },
            data: {
                query: q
            }
        });

        return res.data;
    } catch (err) {
        console.error(err.response.data.errors);
    }

    return false;
}