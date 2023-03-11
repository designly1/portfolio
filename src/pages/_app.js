import '@/styles/globals.scss'
import localFont from '@next/font/local'
import { IBM_Plex_Sans } from 'next/font/google';
import NextNProgress from "nextjs-progressbar";
import { AnimatePresence } from 'framer-motion'

const ibm = IBM_Plex_Sans({ subsets: ['latin'], weight: '400' });
const dsFont = localFont({ src: '../fonts/deathstar/death_star-webfont.woff' });

export default function App({ Component, pageProps, router }) {
  return (
    <>
      <NextNProgress />
      <main className={ibm.className}>
        <style jsx global>
          {`
          :root {
            --deathstar-font: ${dsFont.style.fontFamily};
          }
        `}
        </style>
        <AnimatePresence mode="wait" initial={false}>
          <Component {...pageProps} key={router.asPath} />
        </AnimatePresence>
      </main>
    </>
  )
}
