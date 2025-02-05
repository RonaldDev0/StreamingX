import { Providers } from './providers'
import { Poppins } from 'next/font/google'
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
      <body className={`${poppins.className} antialiased`}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}
