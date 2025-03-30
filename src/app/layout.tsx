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
  description: 'Explora contenido optimizado en streaming con tecnología avanzada. ¡El futuro del streaming está aquí!'
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
