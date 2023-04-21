import React from 'react'
import Link from 'next/link'
import { VscLinkExternal } from 'react-icons/vsc'

export default function ExtLink({ className, href, target, title }) {
    return (
        <Link className={`link ${className ? className : ''}`} href={href} target={target}>
            <div>{title}</div>
            <VscLinkExternal />
        </Link>
    )
}
