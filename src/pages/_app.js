import '@/styles/globals.scss'
import { Inter } from 'next/font/google'
import { IBM_Plex_Sans } from 'next/font/google';
import NextNProgress from "nextjs-progressbar";

const inter = Inter({ subsets: ['latin'] });
const ibm = IBM_Plex_Sans({ subsets: ['latin'], weight: '400' });

export default function App({ Component, pageProps }) {
  return (
    <>
      <NextNProgress />
      <main className={ibm.className}>
        <Component {...pageProps} />
      </main>
    </>
  )
}
