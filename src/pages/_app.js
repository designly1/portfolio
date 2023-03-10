import '@/styles/globals.scss'
import { Inter } from 'next/font/google'
import NextNProgress from "nextjs-progressbar";

const inter = Inter({ subsets: ['latin'] })

export default function App({ Component, pageProps }) {
  return (
    <>
      <NextNProgress />
      <Component className={inter.className} {...pageProps} />
    </>
  )
}
