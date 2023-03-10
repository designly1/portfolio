// @/pages/index.js

import React from 'react'
import Image from 'next/image';
import Layout from '@/components/Layout'

import coverImg from '@/img/cover.jpg';

export default function HomePage() {
  return (
    <Layout>
      <div className="flex h-screen">
        <div className="w-[300px] bg-bg1">
          sidebar
        </div>
        <div className="flex">
          content
        </div>
      </div>
    </Layout>
  )
}
