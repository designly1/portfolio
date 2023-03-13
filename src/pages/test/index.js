import React from 'react'
import Layout from '@/components/Layout';

export default function TestPage({ products }) {
    return (
        <Layout>
            <div>{JSON.stringify(products)}</div>
        </Layout>
    )
}

export async function getStaticProps() {
    let products = [];
    try {
        const result = await fetch("https://dummyjson.com/products");
        const out = await result.json();
        products = out;
    } catch (err) {
        console.error(err);
    }

    return ({
        props: {
            products
        }
    })
}