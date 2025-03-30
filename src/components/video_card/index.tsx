'use client'
import Link from 'next/link'
import { useUser } from '@/store'
import { Avatar } from '@heroui/react'
import { Play } from 'lucide-react'

type IProps = {
  id: string,
  title: string
}

export function VideoCard ({ title, id }: IProps) {
  const { openSideBarr } = useUser()

  return (
    <Link href={`/watch?v=${id}`}>
      <div className='flex flex-col cursor-pointer'>
        <div
          className={`border-2 bg-[#27272A] border-gray-600 border-opacity-20 rounded-xl flex justify-center items-center hover:border-opacity-90 transition-all
            ${openSideBarr ? 'w-[310px] h-[175px]' : 'w-[344px] h-[193px]'}`}
        >
          <Play size={30} />
        </div>
        <div
          className={`mt-2 flex h-[100px] ${openSideBarr ? 'w-[300px]' : 'w-[334px]'} pl-4`}
        >
          <div className='flex-shrink-0'>
            <Avatar name='Creator' />
          </div>
          <div className='ml-3 flex flex-col gap-2 h-full'>
            <p className='font-bold text-sm text-white truncate'>
              {title}
            </p>
            <p className='text-xs text-gray-400 truncate'>
              Creator
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
