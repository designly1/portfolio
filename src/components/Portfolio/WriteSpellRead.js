import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

import img from '@/img/wsrmain.jpg';

const originalWidth = 1920;
const originalHeight = 1080;
const displayWidth = 800;
const displayHeight = (displayWidth * originalHeight) / originalWidth;

export default function WriteSpellRead() {
	return (
		<div className="m-auto bg-bg1 border-white/20 md:border-4 p-5 md:rounded-xl flex flex-col items-center gap-6 w-full max-w-4xl text-center">
			<h1 className="text-2xl md:text-3xl font-bold text-center">Write Spell Read</h1>
			<Image src={img} width={displayWidth} height={displayHeight} alt="Write Spell Read" />
			<p>
				This is an ed-tech platform that teaches students to write, spell and read using phonetic cards, a
				talking avatar, and other teaching widgets.
			</p>
			<ul className="list-disc">
				<li>
                    <Link className="link" href="https://www.youtube.com/watch?v=UnuM11IFhe0&t=11s" target="_blank">Lesson Editor Demo Video</Link>
                </li>
			</ul>
		</div>
	);
}
