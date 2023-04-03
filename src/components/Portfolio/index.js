import React from 'react'
import Link from 'next/link'
import Heading from '../UI/Heading'

import portfolioItems from '@/data/portfolioItems'

const Category = ({ title, items }) => (
    <fieldset className="border-2 border-white/20 rounded-2xl h-fit w-full md:w-[300px] px-4 py-2">
        <legend>{title}</legend>
        <div className="">
            {
                items.map((item) => {
                    const target = item.route.match(/^http/) ? '_blank' : null;
                    return (
                        <React.Fragment key={item.route}>
                            <Link className="link" href={item.route} target={target}>{item.title}</Link>
                            <div className="text-sm text-white/80 ml-2 mb-2">
                                {item.description}
                            </div>
                        </React.Fragment>
                    )
                })
            }
        </div>
    </fieldset>
)

export default function Portfolio() {
    return (
        <div className="bg-bg2 min-h-screen flex flex-col py-20 px-4 md:px-20 xl:px-64">
            <Heading type='h1' appendClass="text-center mb-10">Portfolio</Heading>
            <div className="flex flex-wrap gap-4">
                {
                    portfolioItems.map(item => <Category title={item.title} items={item.items} key={item.title} />)
                }
            </div>
        </div>
    )
}
