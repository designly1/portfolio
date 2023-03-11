// @/pages/index.js
import React from 'react'
import Image from 'next/image';
import Layout from '@/components/Layout'
import TypeWriter from '@/components/Animations/TypeWriter';
import ParticleOverlay from '@/components/Animations/ParticleOverlay';

import hexa from '@/particleConfigs/hexa';
import coverImg from '@/img/cover.jpg';

export default function HomePage() {
  return (
    <Layout>
      <div className="flex flex-col flex-grow relative">
        <Image
          src={coverImg}
          alt="Cover Image"
          className="bg-img opacity-50"
          fill
        />
        <ParticleOverlay config={hexa} usePolygon />
        <TypeWriter appendClass="m-auto" />
      </div>
    </Layout>
  )
}
