import React, { useState } from 'react';
import VideoItem from './VideoItem';

import vid1 from '@/img/videos/lamp.jpg';
import vid2 from '@/img/videos/lakelife.jpg';
import vid3 from '@/img/videos/wsrdemo.jpg';

export default function Videos() {
	return (
		<div className="min-h-screen bg-bg2 flex flex-col gap-10 px-4 md:px-20 py-20">
			<h1 className="text-center text-2xl md:text-3xl font-bold">Videos</h1>
			<div className="grid grid-cols-1 md:grid-cols-2 gap-20">
				<VideoItem
					title="An Ed-tech platform lesson manager demo"
					thumb={vid3}
					vid={`UnuM11IFhe0?si=sePXp8XelOu_GzNX`}
				/>
				<VideoItem
					title="How to Install a Production LAMP Server on GCP Instance"
					thumb={vid1}
					vid={`ycqtq2BAZpg/edit?c=UC08GUICkvoztTXYlEiNDoXA`}
				/>
				<VideoItem
					title="Lake Life Rentals - Payment Flow Demo"
					thumb={vid2}
					vid={`r-UuWA_dYz0/edit?c=UC08GUICkvoztTXYlEiNDoXA`}
				/>
			</div>
		</div>
	);
}
