// @/pages/index.js
import React from 'react'
import Image from 'next/image';
import Layout from '@/components/Layout'
import TypeWriter from '@/components/Home/TypeWriter';

import coverImg from '@/img/cover.jpg';

export default function HomePage() {
  return (
    <Layout>
      <div className="flex h-screen">
        <div className="w-[300px] bg-bg1">
          sidebar
        </div>
        <div className="flex flex-col flex-grow relative">
          <Image
            src={coverImg}
            alt="Cover Image"
            className="bg-img opacity-50"
            fill
          />
          <TypeWriter appendClass="m-auto" />
        </div>
      </div>
    </Layout>
  )
}
