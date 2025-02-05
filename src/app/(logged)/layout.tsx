import { SideBar, SearchBarr } from '@/components'


import type { ReactNode } from 'react'

export default function LogguedLayout ({ children }: Readonly<{children: ReactNode}>) {
  return (
    <>
      <SideBar />
      <div className='flex flex-col items-center justify-start'>
        <SearchBarr />
        {children}
      </div>
    </>
  )
}
