import React from 'react'
import Link from 'next/link'
import Heading from '../UI/Heading'
import ExtLink from '../UI/ExtLink'

import portfolioItems from '@/data/portfolioItems'
import { VscLinkExternal } from 'react-icons/vsc'

const Category = ({ title, items }) => (
    <fieldset className="border-2 border-white/20 rounded-2xl h-[350px] w-full md:w-[300px] px-4 py-2 overflow-auto">
        <legend>{title}</legend>
        <div className="">
            {
                items.map((item) => {
                    const target = item.route.match(/^http/) ? '_blank' : null;
                    return (
                        <React.Fragment key={item.route}>
                            <ExtLink
                                href={item.route}
                                target={target}
                                title={item.title}
                            />
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
        <div className="bg-bg2 min-h-screen flex flex-col gap-6 py-20 px-4 md:px-20 xl:px-64">
            <Heading type='h1' appendClass="text-center">Portfolio</Heading>
            <p className="text-center">Below are a selection of project and experiments I&apos;d like to showcase.</p>
            <ExtLink
                className={`mx-auto`}
                href={`https://github.com/designly1/portfolio`}
                target={`_blank`}
                title={`Code for this site`}
            />
            <div className="flex flex-wrap gap-4">
                {
                    portfolioItems.map(item => <Category title={item.title} items={item.items} key={item.title} />)
                }
            </div>
        </div>
    )
}
