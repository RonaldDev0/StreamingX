import { VideoCard } from '@/components'

export default function HomePage () {
  return (
    <main className='flex gap-4 flex-wrap mt-8 h-[900px] overflow-y-auto scrollbar-hide focus:outline-none focus:ring-0'>
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