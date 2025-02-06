'use client'
import { Brand } from './brand'
import { LogOutButton } from './logout_button'
import { useUser } from '@/store'

export function SideBar () {
  const { openSideBarr } = useUser()


  return (
    <div className={`h-screen ${openSideBarr ? 'w-[323px]' : 'w-[57px]'}`}>
      <div
        className={`border-r-2 border-gray-600 border-opacity-20 h-screen flex flex-col justify-between transition-all bg-neutral-900 fixed z-50
          ${openSideBarr ? 'w-[270px]' : 'w-[57px]'} p-3 gap-3`}
      >
        <Brand />
        <LogOutButton />
      </div>
    </div>
  )
}