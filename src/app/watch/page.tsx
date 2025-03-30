'use client'

import { use } from 'react'
import { VideoContent } from './video_content'
import { Actions } from './actions'
import { Aside } from './aside'

export default function WatchPage ({ searchParams }: { searchParams: Promise<{ v: string }> }) {
  const { v = 'null' } = use(searchParams)

  return (
    <div className='flex flex-col md:flex-row p-4 gap-6 h-[920px] mt-[10px] w-full overflow-y-auto scrollbar-hide focus:outline-none focus:ring-0'>
      <div>
        <VideoContent id={v} />
        <div className='mt-4 flex justify-between w-[1280px] px-2'>
          <div>
            <h1 className='text-xl font-bold'>Video title {v}</h1>
            <p className='text-sm text-gray-500'>100K views · 2 days ago</p>
          </div>
          <Actions />
        </div>
        <div className='p-4 w-[1280px]'>
          <h3>Description:</h3>
          <p className='mt-2 text-base text-gray-400'>
            This video provides an in-depth look at the latest trends in web development,
            offering valuable insights and practical tips to enhance your coding skills. Enjoy
            and learn more! 😊📹
          </p>
        </div>
      </div>
      <Aside />
    </div>
  )
}
