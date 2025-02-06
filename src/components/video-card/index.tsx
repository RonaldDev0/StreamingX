'use client'
import Link from 'next/link'
import { useUser } from '@/store'

type IProps = {
  id: string,
  title: string
}

export function VideoCard ({ title, id }: IProps) {
  const { openSideBarr } = useUser()

  return (
    <Link href={`/watch?v=${id}`}>
      <div className={`border-2 border-gray-600 border-opacity-20 rounded-xl flex justify-center items-center hover:border-opacity-90 transition-all
        ${openSideBarr ? 'w-[310px] h-[175px]' : 'w-[344px] h-[193px]'}`}>
        {title}
      </div>
      <div className='h-[100px] flex flex-col justify-between'>
        <p>title</p>
        <p>description</p>
        <p>views</p>
      </div>
    </Link>
  )
}