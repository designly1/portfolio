import React from 'react'
import Layout from '@/components/Layout';

export default function TestPage({ products }) {
    return (
        <div>{JSON.stringify(products)}</div>
    )
}

export async function getServerSideProps() {
    let products = [];
    try {
        const result = await fetch("https://dummyjson.com/products");
        const out = await result.json();
        products = out.data;
    } catch (err) {
        console.error(err);
    }

    return ({
        props: {
            products
        }
    })
}