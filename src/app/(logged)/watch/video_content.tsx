'use client'

export function VideoContent ({ id }: { id: string }) {
  return (
    <div className='border-2 border-gray-600 border-opacity-20 w-[84dvw] h-[80dvh] rounded-xl flex justify-center items-center'>
      {id}
    </div>
  )
}