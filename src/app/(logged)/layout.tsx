import { SideBar, SearchBarr } from '@/components'

import type { ReactNode } from 'react'

export default function LogguedLayout ({ children }: Readonly<{children: ReactNode}>) {
  return (
    <div className='flex w-screen gap-4'>
      <SideBar />
      <div className='flex flex-col items-center justify-start w-full'>
        <div className='w-[14dvw]' />
        <SearchBarr />
        {children}
      </div>
    </div>
  )
}
