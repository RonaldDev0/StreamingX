'use client'
import { VideoCard } from '@/components'
import { useUser } from '@/store'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function HomePage () {
  const { user, openSideBarr } = useUser()
  const router = useRouter()

  useEffect(() => {
    if (!user) return

    router.push('/')
  }, [user])

  return (
    <main className={`flex gap-4 flex-wrap mt-8 h-[900px] overflow-y-auto scrollbar-hide focus:outline-none focus:ring-0
    ${!openSideBarr && 'ml-8'}`}>
      {Array.from({ length: 20 }).map((_, i) =>
        <VideoCard
          key={i}
          id={i.toString()}
          title={i.toString()}
        />
      )}
    </main>
  )
}