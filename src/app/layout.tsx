import { Providers } from './providers'
import { Poppins } from 'next/font/google'

import { SideBar, SearchBarr } from '@/components'

import './globals.css'

import type { Metadata } from 'next'
import type { ReactNode } from 'react'

const poppins = Poppins({
  weight: ['400', '500', '700'],
  subsets: ['latin']
})

export const metadata: Metadata = {
  title: 'StreamingX',
  description: 'Streaming platform',
  metadataBase: new URL('https://streaming-x.vercel.app/'),
  openGraph: {
    title: 'StreamingX',
    description: 'Streaming platform',
    url: 'https://streaming-x.vercel.app/',
    siteName: 'Ronald Zamora | Software Developer',
    images: [
      {
        url: 'https://streaming-x.vercel.app/preview.webp',
        width: 1200,
        height: 630,
        alt: 'StreamingX'
      }
    ],
    type: 'website',
    locale: 'en_US'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'StreamingX',
    description: 'Streaming platform',
    creator: '@RonaldDev0',
    images: ['https://streaming-x.vercel.app/preview.webp']
  },
  authors: [{ name: 'Ronald Zamora', url: 'https://streaming-x.vercel.app/' }],
  keywords: [
    'StreamingX',
    'Streaming',
    'Netflix',
    'Disney+',
    'Hulu',
    'Amazon Prime Video',
    'YouTube',
    'Movies',
    'Series',
    'Anime',
    'Documentaries',
    'Kids',
    'Music',
    'TV Shows'
  ]
}

export default function RootLayout ({ children }: Readonly<{children: ReactNode}>) {
  return (
    <html lang='en' className='dark'>
      <body className={`${poppins.className} flex flex-row gap-8`}>
        <Providers>
          <div className='flex w-screen gap-4'>
            <SideBar />
            <div className='flex flex-col items-center justify-start w-full'>
              <div className='w-[14dvw]' />
              <SearchBarr />
              {children}
            </div>
          </div>
        </Providers>
      </body>
    </html>
  )
}
