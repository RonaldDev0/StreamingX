'use client'
import Link from 'next/link'
import { useUser } from '@/store'
import Image from 'next/image'
import { Play } from 'lucide-react'

type IProps = {
  id: string,
  title: string
}

export function VideoCard ({ title, id }: IProps) {
  const { openSideBarr, user } = useUser()

  if (!user) return null

  return (
    <Link href={`/watch?v=${id}`}>
      <div className='flex flex-col cursor-pointer'>
        <div
          className={`border-2 border-gray-600 border-opacity-20 rounded-xl flex justify-center items-center hover:border-opacity-90 transition-all
            ${openSideBarr ? 'w-[310px] h-[175px]' : 'w-[344px] h-[193px]'}`}
        >
          <Play size={30} />
        </div>
        <div
          className={`mt-2 flex h-[100px] ${openSideBarr ? 'w-[300px]' : 'w-[334px]'} pl-4`}
        >
          <div className='flex-shrink-0'>
            <Image
              width={40}
              height={40}
              src={user.avatar}
              alt='Avatar del canal'
              className='rounded-full bg-neutral-400 p-[2px]'
            />
          </div>
          <div className='ml-3 flex flex-col gap-2 h-full'>
            <p className='font-bold text-sm text-white truncate'>
              {title}
            </p>
            <p className='text-xs text-gray-400 truncate'>
              {user.user_name}
            </p>
            <div className='flex justify-between gap-4 text-xs text-gray-400'>
              <p>1.2M views</p>
              <li>3 days ago</li>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}
