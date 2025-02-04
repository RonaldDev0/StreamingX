import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import './globals.css'

const poppins = Poppins({
  weight: ['400', '500', '700'],
  subsets: ['latin']
})

export const metadata: Metadata = {
  title: 'StreamingX',
  description: 'Explora contenido optimizado en streaming con tecnología avanzada. ¡El futuro del streaming está aquí!'
}

export default function RootLayout ({ children }: Readonly<{children: React.ReactNode}>) {
  return (
    <html lang='en'>
      <body className={`${poppins.className} antialiased`}>
        {children}
      </body>
    </html>
  )
}
