'use client'
import { use } from 'react'
import { VideoContent } from './video_content'

export default function WatchPage ({ searchParams }: { searchParams: Promise<{ v: string }> }) {
  const { v = 'null' } = use(searchParams)
  return (
    <main className='mt-10'>
      <VideoContent id={v} />
    </main>
  )
}