import React, { useEffect, useState } from 'react'
import Layout from '@/components/Layout'
import Stars from '@/components/Animations/Stars'
import Balancer from 'react-wrap-balancer'
import MdPage from '@/components/Common/MdPage'

const md = `
Jay was born in the mid-1970s with a natural curiosity for technology. As a child, he spent countless hours tinkering with computers and teaching himself to code. In the mid-90s, Jay's fascination with web development began, and he launched his first website using the original Mosaic browser.

From that moment on, Jay was hooked. He dedicated himself to learning about the latest languages, technologies, and frameworks, always striving to stay ahead of the curve. Over the years, he became a skilled programmer and web developer, excelling in creating interactive and engaging websites.

Jay also had a creative side, with talents in graphic design and music production. He leveraged these skills to create websites that not only functioned flawlessly but were also visually stunning and captivating.

Throughout his career, Jay worked with a wide range of clients, from small businesses to multinational corporations, helping them achieve their goals by creating innovative, responsive, and user-friendly websites.

With over two decades of experience, Jay remains as passionate as ever about web development. He is constantly pushing the boundaries of what is possible and delivering exceptional results for his clients.
`

export default function AboutPage() {
    const [showStars, setShowStars] = useState(false);

    useEffect(() => {
        setTimeout(() => setShowStars(true), 300);
    }, [])

    return (
        <Layout
            pageTitle="About Me"
        >
            {
                showStars ?
                    <>
                        <Stars
                            speed={10}
                            streakOpacity={0.4}
                            acceleration={1}
                        />
                    </>
                    :
                    <></>
            }
            <div className="h-screen flex relative bg-bg0/50">
                <div className="mx-auto py-20 overflow-hidden absolute top-0 right-0 bottom-0 left-0">
                    <div className="starwars text-white/80 m-auto md:px-[400px]">
                        <span>
                            <MdPage markdown={md} />
                        </span>
                    </div>
                </div>
            </div>
        </Layout>
    )
}
