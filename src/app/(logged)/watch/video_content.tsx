'use client'

export function VideoContent ({ id }: { id: string }) {
  return (
    <div className='border-2 border-gray-600 w-[1280px] h-[720px] rounded-xl flex justify-center items-center'>
      {id}
      {/* <video
        src={id}
        controls
        className='w-full rounded-2xl'
      /> */}
    </div>
  )
}