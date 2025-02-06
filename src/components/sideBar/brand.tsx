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
    <div className='relative w-full flex items-center gap-4 overflow-hidden'>
      <Menu size={30} className='cursor-pointer shrink-0' onClick={toggleOpenSideBarr} />
      <div className='relative'>
        <Link
          href='/'
          className={`absolute left-0 top-1/2 -translate-y-1/2 transition-opacity duration-200 ${
            openSideBarr ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
        >
          <h1 className='text-neutral-400 text-3xl font-bold'>StreamingX</h1>
        </Link>
      </div>
    </div>
  )
}
