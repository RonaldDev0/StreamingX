'use client'
import Link from 'next/link'
import { Menu } from 'lucide-react'
import { useUser } from '@/store'

export function Brand () {
  const { openSideBarr, setStore } = useUser()

  const toggleOpenSideBarr = () => {
    setStore('openSideBarr', !openSideBarr)
    localStorage.setItem('SideBarOpen', JSON.stringify(!openSideBarr))
  }

  return (
    <div className='relative w-full flex items-center justify-ce gap-4 overflow-hidden'>
      <Menu size={30} className={`cursor-pointer shrink-0 ${!openSideBarr && 'ml-[6px]'}`} onClick={toggleOpenSideBarr} />
      <div className='relative flex items-center h-full'>
        <Link
          href='/'
          className={`transition-opacity duration-200 whitespace-nowrap leading-normal ${
            openSideBarr ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
        >
          <h1 className='text-3xl font-bold mb-[5px]'>StreamingX</h1>
        </Link>
      </div>
    </div>
  )
}
