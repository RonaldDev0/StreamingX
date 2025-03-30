'use client'
import { Brand } from './brand'
import { LogOutButton } from './logout_button'
import { LoginButton } from './login_button'
import { useUser } from '@/store'
import { Home, Upload, UserRound } from 'lucide-react'
import Link from 'next/link'

type Iitems = {
  icon: any,
  label: string,
  url: string
}[]

const items: Iitems = [
  {
    icon: <Home />,
    label: 'Home',
    url: '/'
  },
  {
    icon: <UserRound />,
    label: 'Profile',
    url: '/profile'
  },
  {
    icon: <Upload />,
    label: 'upload',
    url: '/upload'
  }
]

export function SideBar () {
  const { openSideBarr, user } = useUser()

  return (
    <div className={`h-screen ${openSideBarr ? 'w-[323px]' : 'w-[70px]'}`}>
      <div
        className={`border-r-2 border-gray-600 border-opacity-20 h-screen flex flex-col justify-between transition-width bg-neutral-900 fixed z-40
          ${openSideBarr ? 'w-[270px]' : 'w-[70px]'} p-3 gap-3`}
      >
        <Brand />
        <div className='h-full py-10 flex flex-col gap-2'>
          {items.map(({ url, label, icon }) => (
            <Link key={url} href={url}>
              {openSideBarr ? (
                <div className='w-full flex justify-start items-center gap-4 p-2 pl-5 rounded-xl bg-[#27272A] hover:bg-[#212124] transition-colors'>
                  {icon}
                  {label}
                </div>
              ) : (
                <div className='bg-[#27272A] p-[10px] rounded-lg'>
                  {icon}
                </div>
              )}
            </Link>
          ))}
        </div>
        {
          user
            ? <LogOutButton />
            : <LoginButton />
        }
      </div>
    </div>
  )
}